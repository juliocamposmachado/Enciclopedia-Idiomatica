import { useMemo, useState } from 'react';
import { Gauge, Plus, Trash2, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { PageHeader, SectionTitle } from '@/components/Shared';
import { Callout } from '@/components/Callout';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { downloadCSV, num } from '@/utils/storage';
import type { ExperimentRecord } from '@/types';

type CsvRow = Record<string, string | number>;
const asCsvRows = (rows: ExperimentRecord[]) => rows as unknown as CsvRow[];

const variables = [
  { id: 'tokens', label: 'Consumo de tokens', weight: 0.15, desc: 'Tokens totais consumidos por tarefa' },
  { id: 'calls', label: 'Quantidade de chamadas', weight: 0.125, desc: 'Chamadas necessárias para concluir a tarefa' },
  { id: 'correct', label: 'Taxa de acertos', weight: 0.175, desc: 'Proporção de respostas aprovadas na validação' },
  { id: 'rework', label: 'Taxa de retrabalho', weight: 0.125, desc: 'Chamadas de correção sobre o total' },
  { id: 'terminology', label: 'Precisão terminológica', weight: 0.1, desc: 'Consistência entre conceitos técnicos' },
  { id: 'ambiguity', label: 'Ambiguidades', weight: 0.1, desc: 'Interpretações dúplices identificadas' },
  { id: 'fidelity', label: 'Fidelidade de tradução', weight: 0.1, desc: 'Preservação de significado entre idiomas' },
  { id: 'cost', label: 'Custo por resultado validado', weight: 0.125, desc: 'Custo total dividido por resultados válidos' },
];

const empty: ExperimentRecord & { correct: number; total: number } = {
  id: '', createdAt: '', model: '', language: 'Português', promptSummary: '',
  inputTokens: 0, outputTokens: 0, calls: 1, cost: 0, correct: 0, total: 0, errorType: 'nenhum', notes: '',
};

export function IeiiaPage() {
  const [experiments, setExperiments] = useLocalStorage<ExperimentRecord[]>('eii:ieiia-experiments', []);
  const [draft, setDraft] = useState(empty);

  /** Experimental scoring: 0–100, normalized per variable against reference caps. Higher = better. */
  const score = useMemo(() => {
    if (!experiments.length) return null;
    const norm = experiments.map((e) => {
      const total = Math.max(e.total, 1);
      const correctRate = e.correct / total; // 0..1 higher better
      const reworkRate = total > 0 ? Math.max(0, (e.calls - 1) / e.calls) : 0; // proxy, lower better
      const tokensPerResult = e.correct > 0 ? (e.inputTokens + e.outputTokens) / e.correct : e.inputTokens + e.outputTokens;
      const tokenScore = 1 / (1 + tokensPerResult / 1000); // saturating, higher better
      const costScore = 1 / (1 + e.cost / 10); // R$10 saturates, higher better
      return { tokens: tokenScore, calls: 1 / e.calls, correct: correctRate, rework: 1 - reworkRate, terminology: 0.8, ambiguity: 0.8, fidelity: 0.8, cost: costScore };
    });
    const avg = variables.reduce((acc, v) => {
      acc[v.id] = norm.reduce((s, n) => s + ((n as unknown as Record<string, number>)[v.id] ?? 0), 0) / norm.length;
      return acc;
    }, {} as Record<string, number>);
    return Math.round(variables.reduce((s, v) => s + v.weight * (avg[v.id] ?? 0), 0) * 100);
  }, [experiments]);

  const chartData = experiments.map((e, i) => ({
    name: e.promptSummary.slice(0, 18) || `Exp ${i + 1}`,
    IEIIA: (() => {
      const total = Math.max(e.total, 1);
      const correctRate = e.correct / total;
      const tokenScore = 1 / (1 + (e.inputTokens + e.outputTokens) / (1000 * Math.max(e.correct, 1)));
      const costScore = 1 / (1 + e.cost / 10);
      return Math.round((0.3 * correctRate + 0.3 * tokenScore + 0.2 * (1 / e.calls) + 0.2 * costScore) * 100);
    })(),
  }));

  const add = () => {
    if (!draft.promptSummary.trim()) return;
    setExperiments((list) => [...list, { ...draft, id: crypto.randomUUID(), createdAt: new Date().toISOString() }]);
    setDraft(empty);
  };

  return (
    <div>
      <PageHeader
        icon={<Gauge size={20} />}
        title="Metodologia IEIIA"
        subtitle="Índice de Eficiência Idiomática em Inteligência Artificial: indicador experimental proposto por este projeto para medir a relação entre qualidade linguística, consumo computacional, precisão semântica e confiabilidade."
        badge="Indicador experimental — sem validação acadêmica prévia"
      />

      <SectionTitle>Variáveis de avaliação</SectionTitle>
      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {variables.map((v) => (
          <div key={v.id} className="panel p-4">
            <p className="text-[13px] font-semibold text-white">{v.label}</p>
            <p className="mt-1 text-[12px] leading-relaxed text-slate-400">{v.desc}</p>
            <p className="mt-2 font-mono text-[11px] text-cyan-400">peso {Math.round(v.weight * 100)}%</p>
          </div>
        ))}
      </div>

      <SectionTitle>Painel de avaliação comparativa</SectionTitle>
      {score !== null && (
        <div className="panel mb-6 flex flex-wrap items-center gap-6 p-6">
          <div>
            <p className="label">IEIIA consolidado (simulado)</p>
            <p className="font-mono text-4xl font-bold text-cyan-300">{score}<span className="text-lg text-slate-500">/100</span></p>
          </div>
          <p className="max-w-md text-[12px] leading-relaxed text-slate-400">
            Pontuação calculada a partir dos experimentos cadastrados, com normalização saturante e pesos fixos definidos nesta metodologia. Trata-se de indicador proposto pelo projeto, sem alegação de validação acadêmica.
          </p>
        </div>
      )}

      {chartData.length > 1 && (
        <div className="panel mb-6 p-5">
          <p className="label mb-3">Comparação entre experimentos</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} width={30} />
              <Tooltip contentStyle={{ background: '#0A1122', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} />
              <Bar dataKey="IEIIA" radius={[6, 6, 0, 0]}>
                {chartData.map((_, i) => <Cell key={i} fill={['#22d3ee', '#8b5cf6', '#10b981', '#f59e0b'][i % 4]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <SectionTitle>Cadastrar experimento</SectionTitle>
      <div className="panel mb-4 grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
        <label className="block text-[13px] text-slate-300">Resumo do experimento
          <input className="input-base mt-1" value={draft.promptSummary} onChange={(e) => setDraft({ ...draft, promptSummary: e.target.value })} placeholder="Ex.: comparação PT x EN" />
        </label>
        <label className="block text-[13px] text-slate-300">Modelo
          <input className="input-base mt-1" value={draft.model} onChange={(e) => setDraft({ ...draft, model: e.target.value })} placeholder="Ex.: modelo X (informe versão)" />
        </label>
        <label className="block text-[13px] text-slate-300">Idioma
          <select className="input-base mt-1" value={draft.language} onChange={(e) => setDraft({ ...draft, language: e.target.value })}>
            {['Português', 'Inglês', 'Espanhol', 'Francês', 'Alemão'].map((l) => <option key={l}>{l}</option>)}
          </select>
        </label>
        <label className="block text-[13px] text-slate-300">Tokens de entrada
          <input type="number" min={0} className="input-base mt-1" value={draft.inputTokens || ''} onChange={(e) => setDraft({ ...draft, inputTokens: Number(e.target.value) })} />
        </label>
        <label className="block text-[13px] text-slate-300">Tokens de saída
          <input type="number" min={0} className="input-base mt-1" value={draft.outputTokens || ''} onChange={(e) => setDraft({ ...draft, outputTokens: Number(e.target.value) })} />
        </label>
        <label className="block text-[13px] text-slate-300">Chamadas
          <input type="number" min={1} className="input-base mt-1" value={draft.calls} onChange={(e) => setDraft({ ...draft, calls: Math.max(1, Number(e.target.value)) })} />
        </label>
        <label className="block text-[13px] text-slate-300">Custo total (R$)
          <input type="number" min={0} step="0.01" className="input-base mt-1" value={draft.cost || ''} onChange={(e) => setDraft({ ...draft, cost: Number(e.target.value) })} />
        </label>
        <label className="block text-[13px] text-slate-300">Resultados corretos
          <input type="number" min={0} className="input-base mt-1" value={draft.correct || ''} onChange={(e) => setDraft({ ...draft, correct: Number(e.target.value) })} />
        </label>
        <label className="block text-[13px] text-slate-300">Total de avaliações
          <input type="number" min={0} className="input-base mt-1" value={draft.total || ''} onChange={(e) => setDraft({ ...draft, total: Number(e.target.value) })} />
        </label>
        <div className="sm:col-span-2 lg:col-span-3 flex gap-3">
          <button className="btn-primary" onClick={add}><Plus size={15} /> Registrar experimento</button>
          {experiments.length > 0 && (
            <>
              <button className="btn-ghost" onClick={() => downloadCSV('ieiia-experimentos.csv', experiments as unknown as Record<string, string | number>[])}><Download size={14} /> Exportar CSV</button>
              <button className="btn-ghost" onClick={() => setExperiments([])}><Trash2 size={14} /> Limpar tudo</button>
            </>
          )}
        </div>
      </div>

      {experiments.length > 0 && (
        <div className="mb-6 overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="text-left">
                {['Experimento', 'Modelo', 'Idioma', 'Tokens', 'Chamadas', 'Custo', 'Acertos', ''].map((h) => (
                  <th key={h} className="border-b border-white/10 px-3 py-2 text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {experiments.map((e) => (
                <tr key={e.id} className="text-slate-300">
                  <td className="border-b border-white/5 px-3 py-2">{e.promptSummary}</td>
                  <td className="border-b border-white/5 px-3 py-2">{e.model || '—'}</td>
                  <td className="border-b border-white/5 px-3 py-2">{e.language}</td>
                  <td className="border-b border-white/5 px-3 py-2 font-mono">{num(e.inputTokens + e.outputTokens)}</td>
                  <td className="border-b border-white/5 px-3 py-2 font-mono">{e.calls}</td>
                  <td className="border-b border-white/5 px-3 py-2 font-mono">R$ {num(e.cost)}</td>
                  <td className="border-b border-white/5 px-3 py-2 font-mono">{e.correct}/{e.total}</td>
                  <td className="border-b border-white/5 px-3 py-2">
                    <button onClick={() => setExperiments((l) => l.filter((x) => x.id !== e.id))} aria-label="Remover experimento"><Trash2 size={14} className="text-slate-500 hover:text-rose-400" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Callout tone="warning" title="Metodologia, critérios e limitações">
        A pontuação IEIIA é um indicador experimental proposto por este projeto, sem validação acadêmica prévia. Os pesos são fixos e arbitrários; a normalização usa limites saturantes escolhidos didaticamente. A metodologia recomendada para estudos reais exige conjuntos de testes controlados, múltiplas repetições, avaliação independente e documentação dos resultados. Os valores cadastrados nesta página ficam armazenados apenas no seu navegador.
      </Callout>
    </div>
  );
}
