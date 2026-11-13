import { useMemo, useState } from 'react';
import { Radar, Plus, Trash2, Download, ShieldAlert } from 'lucide-react';
import { PageHeader, SectionTitle, StatCard } from '@/components/Shared';
import { Callout } from '@/components/Callout';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { downloadCSV, num } from '@/utils/storage';
import { errorTypeDefinitions } from '@/data/semantic';
import type { ExperimentRecord } from '@/types';

type CsvRow = Record<string, string | number>;
const asCsvRows = (rows: ExperimentRecord[]) => rows as unknown as CsvRow[];

const phenomena = [
  { id: 'alucinacoes', label: 'Alucinações', desc: 'Geração de informação sem suporte factual adequado. Investigável com testes de verificabilidade e avaliação independente.' },
  { id: 'traducao', label: 'Erros de tradução', desc: 'Perda ou inversão de significado entre idiomas, especialmente em terminologia técnica (accuracy × precision).' },
  { id: 'contexto', label: 'Perda de contexto', desc: 'Degrauação quando o histórico excede a janela de contexto ou é comprimido.' },
  { id: 'contraditorias', label: 'Respostas contraditórias', desc: 'Afirmações incompatíveis dentro da mesma interação ou entre repetições.' },
  { id: 'matematica', label: 'Erros matemáticos', desc: 'Falhas de cálculo decorrentes da inferência probabilística, não de um motor simbólico.' },
  { id: 'programacao', label: 'Falhas de programação', desc: 'Código gerado incorretamente; geração de código não significa validação de software.' },
  { id: 'conflitantes', label: 'Instruções conflitantes', desc: 'Requisitos incompatíveis no prompt produzem saídas imprevisíveis.' },
  { id: 'multilingue', label: 'Limitações de modelos multilíngues', desc: 'Fragmentação desigual e desempenho variável entre idiomas — comparar experimentalmente.' },
  { id: 'versoes', label: 'Alterações de desempenho entre versões', desc: 'Mudanças de comportamento após atualizações; exigem protocolo de repetibilidade e documentação.' },
];

const emptyTest: Omit<ExperimentRecord, 'id' | 'createdAt'> = {
  model: '', language: 'Português', promptSummary: '', inputTokens: 0, outputTokens: 0,
  calls: 1, cost: 0, correct: 0, total: 0, errorType: 'nenhum', notes: '',
};

export function ObservatoryLab() {
  const [tests, setTests] = useLocalStorage<ExperimentRecord[]>('eii:observatory-tests', []);
  const [draft, setDraft] = useState(emptyTest);

  const stats = useMemo(() => {
    if (!tests.length) return null;
    const total = tests.reduce((s, t) => s + t.total, 0);
    const correct = tests.reduce((s, t) => s + t.correct, 0);
    return {
      records: tests.length,
      accuracy: total ? ((correct / total) * 100).toFixed(1) : '—',
      cost: tests.reduce((s, t) => s + t.cost, 0),
      tokens: tests.reduce((s, t) => s + t.inputTokens + t.outputTokens, 0),
    };
  }, [tests]);

  const byErrorType = useMemo(() => {
    const counts = new Map<string, number>();
    for (const t of tests) counts.set(t.errorType, (counts.get(t.errorType) ?? 0) + 1);
    return errorTypeDefinitions.map((d) => ({ ...d, count: counts.get(d.id) ?? 0 }));
  }, [tests]);

  const add = () => {
    if (!draft.promptSummary.trim()) return;
    setTests((l) => [...l, { ...draft, id: crypto.randomUUID(), createdAt: new Date().toISOString() }]);
    setDraft(emptyTest);
  };

  return (
    <div>
      <PageHeader
        icon={<Radar size={20} />}
        title="Observatório de erros e confiabilidade"
        subtitle="Módulo de investigação sobre alucinações, retrabalho e confiabilidade, com matriz de auditoria comparativa e classificação criteriosa das causas."
      />

      <SectionTitle>Fenômenos investigados</SectionTitle>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {phenomena.map((p) => (
          <div key={p.id} className="panel p-4">
            <p className="text-[13px] font-semibold text-white">{p.label}</p>
            <p className="mt-1 text-[12px] leading-relaxed text-slate-400">{p.desc}</p>
          </div>
        ))}
      </div>

      <SectionTitle>Classificação criteriosa das causas</SectionTitle>
      <Callout tone="warning" title="Princípio central">
        Falha não é prova de intenção. A ocorrência de erros frequentes não demonstra que foram programados para gerar cobranças. Hipótese de abuso comercial exige evidências técnicas, documentais, contratuais ou estatísticas verificáveis (capítulo 9).
      </Callout>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {byErrorType.map((d) => (
          <div key={d.id} className="panel p-4">
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2 text-[12px] font-bold text-white"><ShieldAlert size={13} className="text-amber-300" />{d.label}</p>
              <span className="stat-value text-base">{d.count}</span>
            </div>
            <p className="mt-1 text-[12px] leading-relaxed text-slate-400">{d.description}</p>
          </div>
        ))}
      </div>

      <SectionTitle>Matriz de auditoria comparativa</SectionTitle>
      {stats && (
        <div className="mb-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="Testes registrados" value={String(stats.records)} />
          <StatCard label="Taxa de acerto média" value={`${stats.accuracy}%`} accent="emerald" />
          <StatCard label="Custo acumulado" value={`R$ ${num(stats.cost)}`} accent="amber" />
          <StatCard label="Tokens acumulados" value={num(stats.tokens)} accent="violet" />
        </div>
      )}

      <div className="panel mb-4 grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
        <label className="block text-[13px] text-slate-300">Teste realizado
          <input className="input-base mt-1" value={draft.promptSummary} onChange={(e) => setDraft({ ...draft, promptSummary: e.target.value })} placeholder="Ex.: mesmo prompt em PT e EN" />
        </label>
        <label className="block text-[13px] text-slate-300">Modelo e versão
          <input className="input-base mt-1" value={draft.model} onChange={(e) => setDraft({ ...draft, model: e.target.value })} placeholder="Ex.: modelo X, v2024-08" />
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
        <label className="block text-[13px] text-slate-300">Custo (R$)
          <input type="number" min={0} step="0.01" className="input-base mt-1" value={draft.cost || ''} onChange={(e) => setDraft({ ...draft, cost: Number(e.target.value) })} />
        </label>
        <label className="block text-[13px] text-slate-300">Acertos
          <input type="number" min={0} className="input-base mt-1" value={draft.correct || ''} onChange={(e) => setDraft({ ...draft, correct: Number(e.target.value) })} />
        </label>
        <label className="block text-[13px] text-slate-300">Total de avaliações
          <input type="number" min={0} className="input-base mt-1" value={draft.total || ''} onChange={(e) => setDraft({ ...draft, total: Number(e.target.value) })} />
        </label>
        <label className="block text-[13px] text-slate-300">Classificação
          <select className="input-base mt-1" value={draft.errorType} onChange={(e) => setDraft({ ...draft, errorType: e.target.value as ExperimentRecord['errorType'] })}>
            <option value="nenhum">Nenhum erro</option>
            {errorTypeDefinitions.map((d) => <option key={d.id} value={d.id}>{d.label}</option>)}
          </select>
        </label>
        <label className="block text-[13px] text-slate-300 sm:col-span-2 lg:col-span-3">Observações
          <input className="input-base mt-1" value={draft.notes} onChange={(e) => setDraft({ ...draft, notes: e.target.value })} placeholder="Parâmetros, temperatura, contexto do teste..." />
        </label>
        <div className="flex flex-wrap gap-3 sm:col-span-2 lg:col-span-3">
          <button className="btn-primary" onClick={add}><Plus size={15} /> Registrar teste</button>
          {tests.length > 0 && (
            <>
              <button className="btn-ghost" onClick={() => downloadCSV('observatorio-testes.csv', asCsvRows(tests))}><Download size={14} /> Exportar CSV</button>
              <button className="btn-ghost" onClick={() => setTests([])}><Trash2 size={14} /> Limpar tudo</button>
            </>
          )}
        </div>
      </div>

      {tests.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="text-left">
                {['Teste', 'Modelo', 'Idioma', 'Tokens', 'Custo', 'Acertos', 'Classificação', ''].map((h) => (
                  <th key={h} className="border-b border-white/10 px-3 py-2 text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tests.map((t) => (
                <tr key={t.id} className="text-slate-300">
                  <td className="border-b border-white/5 px-3 py-2">{t.promptSummary}</td>
                  <td className="border-b border-white/5 px-3 py-2">{t.model || '—'}</td>
                  <td className="border-b border-white/5 px-3 py-2">{t.language}</td>
                  <td className="border-b border-white/5 px-3 py-2 font-mono">{num(t.inputTokens + t.outputTokens)}</td>
                  <td className="border-b border-white/5 px-3 py-2 font-mono">R$ {num(t.cost)}</td>
                  <td className="border-b border-white/5 px-3 py-2 font-mono">{t.correct}/{t.total}</td>
                  <td className="border-b border-white/5 px-3 py-2">{errorTypeDefinitions.find((d) => d.id === t.errorType)?.label ?? 'Nenhum'}</td>
                  <td className="border-b border-white/5 px-3 py-2">
                    <button onClick={() => setTests((l) => l.filter((x) => x.id !== t.id))} aria-label="Remover teste"><Trash2 size={14} className="text-slate-500 hover:text-rose-400" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Callout tone="info" title="Protocolo de auditoria comparativa">
        Registre versão do modelo, tokenizador quando disponível, temperatura, parâmetros, idioma, número de chamadas, custos, resultados e critérios de avaliação. Compare amostras suficientemente grandes, evitando conclusões baseadas em episódios isolados. Os registros ficam salvos apenas no seu navegador.
      </Callout>
    </div>
  );
}
