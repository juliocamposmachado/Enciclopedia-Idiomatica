import { useMemo } from 'react';
import { Wallet, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts';
import { PageHeader, SectionTitle, StatCard } from '@/components/Shared';
import { Callout } from '@/components/Callout';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { brl, num, downloadCSV } from '@/utils/storage';
import { scenarioCost as baseScenarioCost, type CostScenario } from '@/utils/costs';

type Scenario = CostScenario;

function scenarioCost(s: Scenario, monthlyCalls: number) {
  const c = baseScenarioCost(s);
  return { ...c, monthly: c.perOp * monthlyCalls, totalTokens: (s.inputTokens + s.outputTokens + s.reasoningTokens) * s.calls };
}

const defaultA: Scenario = { inputTokens: 1200, outputTokens: 800, calls: 4, inputPrice: 2.5, outputPrice: 10, reasoningPrice: 0, reasoningTokens: 0, cacheDiscountPct: 0 };
const defaultB: Scenario = { inputTokens: 400, outputTokens: 350, calls: 1, inputPrice: 2.5, outputPrice: 10, reasoningPrice: 0, reasoningTokens: 0, cacheDiscountPct: 0 };

function ScenarioCard({ title, tone, s, set, monthlyCalls }: { title: string; tone: 'rose' | 'emerald'; s: Scenario; set: (s: Scenario) => void; monthlyCalls: number }) {
  const c = scenarioCost(s, monthlyCalls);
  const numField = (label: string, key: keyof Scenario, step = 1, suffix?: string) => (
    <label className="block">
      <span className="label">{label}</span>
      <input
        type="number" min={0} step={step} value={s[key]}
        onChange={(e) => set({ ...s, [key]: Math.max(0, Number(e.target.value) || 0) })}
        className="input-base mt-1"
      />
      {suffix && <span className="mt-0.5 block text-[10px] text-slate-500">{suffix}</span>}
    </label>
  );
  return (
    <div className={`panel p-5 ${tone === 'rose' ? 'border-rose-400/20' : 'border-emerald-400/20'}`}>
      <p className={`mb-4 font-semibold ${tone === 'rose' ? 'text-rose-300' : 'text-emerald-300'}`}>{title}</p>
      <div className="grid grid-cols-2 gap-3">
        {numField('Tokens de entrada / chamada', 'inputTokens')}
        {numField('Tokens de saída / chamada', 'outputTokens')}
        {numField('Chamadas por operação', 'calls')}
        {numField('Preço entrada (R$ / 1M tokens)', 'inputPrice', 0.1)}
        {numField('Preço saída (R$ / 1M tokens)', 'outputPrice', 0.1)}
        {numField('Desconto de cache (%)', 'cacheDiscountPct', 1)}
        {numField('Tokens de raciocínio / chamada', 'reasoningTokens')}
        {numField('Preço raciocínio (R$ / 1M)', 'reasoningPrice', 0.1)}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/10 pt-4 text-center">
        <div><p className="stat-value text-base">{num(c.totalTokens)}</p><p className="label">tokens totais</p></div>
        <div><p className="stat-value text-base">{brl(c.perOp)}</p><p className="label">custo/operação</p></div>
        <div><p className="stat-value text-base">{brl(c.monthly)}</p><p className="label">projeção mensal</p></div>
      </div>
    </div>
  );
}

export function CostSimulator() {
  const [a, setA] = useLocalStorage<Scenario>('eii:cost-a', defaultA);
  const [b, setB] = useLocalStorage<Scenario>('eii:cost-b', defaultB);
  const [monthlyCalls, setMonthlyCalls] = useLocalStorage('eii:cost-monthly', 1000);

  const cA = useMemo(() => scenarioCost(a, monthlyCalls), [a, monthlyCalls]);
  const cB = useMemo(() => scenarioCost(b, monthlyCalls), [b, monthlyCalls]);

  const savings = cA.monthly - cB.monthly;
  const savingsPct = cA.monthly > 0 ? (savings / cA.monthly) * 100 : 0;
  const callsAvoided = Math.max(0, (a.calls - b.calls)) * monthlyCalls;

  const chartData = [
    { name: 'Cenário A (inadequado)', Custo: cA.monthly, fill: '#f43f5e' },
    { name: 'Cenário B (otimizado)', Custo: cB.monthly, fill: '#10b981' },
  ];

  return (
    <div>
      <PageHeader
        icon={<Wallet size={20} />}
        title="Simulador econômico de tokens"
        subtitle="Calculadora de custos com fórmula explícita, dois cenários comparativos e preços totalmente configuráveis. Nenhum preço de fornecedor é inventado — informe as tarifas do seu plano."
      />

      <label className="panel mb-5 flex flex-wrap items-center gap-4 p-4">
        <span className="label">Chamadas por mês (projeção)</span>
        <input type="range" min={10} max={100000} step={10} value={monthlyCalls} onChange={(e) => setMonthlyCalls(Number(e.target.value))} className="flex-1 accent-cyan-400" aria-label="Chamadas por mês" />
        <span className="stat-value text-base">{num(monthlyCalls)}</span>
      </label>

      <div className="grid gap-5 lg:grid-cols-2">
        <ScenarioCard title="Cenário A — Engenharia de prompt inadequada" tone="rose" s={a} set={setA} monthlyCalls={monthlyCalls} />
        <ScenarioCard title="Cenário B — Engenharia de prompt otimizada" tone="emerald" s={b} set={setB} monthlyCalls={monthlyCalls} />
      </div>

      <SectionTitle>Diferença financeira</SectionTitle>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Economia mensal" value={brl(Math.max(0, savings))} accent="emerald" />
        <StatCard label="Percentual de economia" value={`${savingsPct.toFixed(1)}%`} accent="emerald" />
        <StatCard label="Chamadas evitadas / mês" value={num(callsAvoided)} accent="cyan" />
        <StatCard label="Diferença por operação" value={brl(Math.max(0, cA.perOp - cB.perOp))} accent="violet" />
      </div>

      <div className="panel mt-5 p-5">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={chartData} layout="vertical">
            <XAxis type="number" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `R$ ${num(Number(v))}`} />
            <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} width={180} />
            <Tooltip contentStyle={{ background: '#0A1122', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} formatter={(v) => brl(Number(v))} cursor={{ fill: 'rgba(34,211,238,0.06)' }} />
            <Legend wrapperStyle={{ fontSize: 12, color: '#94a3b8' }} />
            <Bar dataKey="Custo" radius={[0, 6, 6, 0]}>
              {chartData.map((d, i) => <Cell key={i} fill={d.fill} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-3 flex justify-end">
          <button className="btn-ghost text-[12px]" onClick={() => downloadCSV('simulador-custos.csv', [
            { cenario: 'A inadequado', tokens_totais: cA.totalTokens, custo_operacao: cA.perOp.toFixed(4), custo_mensal: cA.monthly.toFixed(2), chamadas: a.calls * monthlyCalls },
            { cenario: 'B otimizado', tokens_totais: cB.totalTokens, custo_operacao: cB.perOp.toFixed(4), custo_mensal: cB.monthly.toFixed(2), chamadas: b.calls * monthlyCalls },
          ])}><Download size={13} /> Exportar CSV</button>
        </div>
      </div>

      <div className="mt-5 panel p-5 font-mono text-[13px] leading-relaxed text-cyan-100">
        CUSTO = (T_entrada × P_entrada + T_saída × P_saída + T_raciocínio × P_raciocínio) × chamadas
        <span className="mt-2 block text-slate-400">Preços informados por milhão de tokens; desconto de cache aplicado sobre o preço de entrada. Unidades de cobrança verificadas na fórmula — confirme as tarifas vigentes do seu fornecedor.</span>
      </div>

      <Callout tone="warning" title="Transparência">
        Todos os preços são configuráveis pelo usuário e nenhum valor de mercado é sugerido. A simulação compara cenários hipotéticos e não garante economia real: a comparação só é válida se ambos os métodos produzirem resultados equivalentes em qualidade (capítulo 8 da enciclopédia).
      </Callout>
    </div>
  );
}
