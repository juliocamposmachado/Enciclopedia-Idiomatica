import { useMemo } from 'react';
import {
  Braces, Languages, PenTool, Wallet, Target, ArrowRight, BookOpen, Scale, Gauge,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, Legend, Cell } from 'recharts';
import { PageHeader, StatCard, SectionTitle, SimulationBadge } from '@/components/Shared';
import { editorialSections } from '@/data/editorial';
import { glossary } from '@/data/glossary';
import { countRealTokens } from '@/utils/tokenizer';

const labs = [
  { id: 'laboratorio-tokenizacao', label: 'Tokenização', icon: <Braces size={18} />, desc: 'Fragmentação real e estimada de texto em tokens' },
  { id: 'comparador-idiomas', label: 'Comparador de idiomas', icon: <Languages size={18} />, desc: 'PT, EN e ES lado a lado' },
  { id: 'engenharia-prompts', label: 'Engenharia de prompts', icon: <PenTool size={18} />, desc: 'Editor estruturado com pontuação' },
  { id: 'simulador-custos', label: 'Simulador de custos', icon: <Wallet size={18} />, desc: 'Consumo e projeção financeira' },
  { id: 'precisao-semantica', label: 'Precisão semântica', icon: <Target size={18} />, desc: 'Ambiguidades e pares conceituais' },
  { id: 'traducoes', label: 'Laboratório de traduções', icon: <ArrowRight size={18} />, desc: 'Falsos cognatos em 5 idiomas' },
];

// Simulation constants — clearly labeled as illustrative
const langData = [
  { lang: 'Português', tokens: 128, char: 100 },
  { lang: 'Inglês', tokens: 100, char: 85 },
  { lang: 'Espanhol', tokens: 118, char: 96 },
  { lang: 'Francês', tokens: 122, char: 98 },
  { lang: 'Alemão', tokens: 112, char: 90 },
].map((d) => ({ ...d, tokens: countRealTokens('Analise a precisão dos resultados processados pelo modelo de linguagem.') || d.tokens }));

const accuracyData = [
  { name: 'Prompt não estruturado', value: 54, fill: '#f59e0b' },
  { name: 'Prompt estruturado', value: 86, fill: '#22d3ee' },
];

const tooltipStyle = { background: '#0A1122', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#e2e8f0' };

export function DashboardPage() {
  const conceptCount = glossary.length + editorialSections.length;
  const quickStats = useMemo(
    () => [
      { label: 'Eficiência linguística simulada', value: '72%', hint: 'Índice ilustrativo — prompt estruturado vs. não estruturado' },
      { label: 'Consumo de tokens (simulação)', value: '-68,75%', hint: 'Cenário do capítulo 8: 1.500 vs. 4.800 tokens' },
      { label: 'Taxa de precisão experimental', value: '86%', hint: 'Simulação didática, não benchmark real' },
      { label: 'Conceitos estudados', value: String(conceptCount), hint: 'Glossário + capítulos da enciclopédia' },
    ],
    [conceptCount],
  );

  return (
    <div>
      <PageHeader
        icon={<BookOpen size={20} />}
        title="Painel principal"
        subtitle="Engenharia de linguagem, precisão semântica, economia de tokens e inteligência computacional. Uma investigação técnica, linguística, computacional, econômica e jurídica sobre a influência dos idiomas nos sistemas de IA."
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {quickStats.map((s, i) => (
          <StatCard key={s.label} label={s.label} value={s.value} hint={s.hint} accent={(['cyan', 'emerald', 'violet', 'amber'] as const)[i]} />
        ))}
      </div>

      <SectionTitle>Economia simulada e comparação de idiomas</SectionTitle>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="panel p-5">
          <p className="label mb-3">Tokens estimados por idioma (simulação)</p>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={langData}>
              <XAxis dataKey="lang" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} width={30} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(34,211,238,0.06)' }} />
              <Bar dataKey="tokens" radius={[6, 6, 0, 0]}>
                {langData.map((_, i) => <Cell key={i} fill={['#22d3ee', '#3b82f6', '#8b5cf6', '#06b6d4', '#6366f1'][i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="mt-2 text-[11px] text-slate-500">Valores ilustrativos. A comparação real depende do tokenizador, do modelo e do texto — use o laboratório de tokenização.</p>
        </div>
        <div className="panel p-5">
          <p className="label mb-3">Taxa experimental de precisão (simulação)</p>
          <ResponsiveContainer width="100%" height={240}>
            <RadialBarChart innerRadius="30%" outerRadius="90%" data={accuracyData} startAngle={90} endAngle={-270}>
              <RadialBar dataKey="value" cornerRadius={8} background={{ fill: 'rgba(255,255,255,0.05)' }} />
              <Legend formatter={(v) => <span style={{ color: '#94a3b8', fontSize: 12 }}>{v}</span>} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => `${Number(v)}% (simulado)`} />
            </RadialBarChart>
          </ResponsiveContainer>
          <p className="mt-2 text-[11px] text-slate-500">Dados hipotéticos para fins didáticos. Nunca apresentar como resultado real de benchmark.</p>
        </div>
      </div>

      <SectionTitle>Laboratórios</SectionTitle>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {labs.map((lab) => (
          <a key={lab.id} href={`#/${lab.id}`} className="panel panel-hover group p-5">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 transition-colors group-hover:bg-cyan-400/20">{lab.icon}</div>
            <p className="font-semibold text-white">{lab.label}</p>
            <p className="mt-1 text-[13px] leading-relaxed text-slate-400">{lab.desc}</p>
            <p className="mt-3 inline-flex items-center gap-1 text-[12px] font-medium text-cyan-400 opacity-0 transition-opacity group-hover:opacity-100">Abrir laboratório <ArrowRight size={12} /></p>
          </a>
        ))}
      </div>

      <SectionTitle>Da investigação</SectionTitle>
      <div className="grid gap-4 sm:grid-cols-2">
        <a href="#/enciclopedia" className="panel panel-hover flex items-start gap-4 p-5">
          <BookOpen size={20} className="mt-0.5 text-violet-300" />
          <div>
            <p className="font-semibold text-white">Enciclopédia científica</p>
            <p className="text-[13px] text-slate-400">{editorialSections.length} capítulos integrais: tokenização, semântica, economia de tokens e jurídico.</p>
          </div>
        </a>
        <a href="#/biblioteca-juridica" className="panel panel-hover flex items-start gap-4 p-5">
          <Scale size={20} className="mt-0.5 text-emerald-300" />
          <div>
            <p className="font-semibold text-white">Biblioteca jurídica brasileira</p>
            <p className="text-[13px] text-slate-400">CF/88, LGPD, CDC, Código Civil, Marco Civil e mais — distinguindo leis vigentes de projetos.</p>
          </div>
        </a>
        <a href="#/ieiia" className="panel panel-hover flex items-start gap-4 p-5">
          <Gauge size={20} className="mt-0.5 text-cyan-300" />
          <div>
            <p className="font-semibold text-white">Metodologia IEIIA</p>
            <p className="text-[13px] text-slate-400">Índice experimental de eficiência idiomática: cadastre experimentos e compare resultados.</p>
          </div>
        </a>
        <a href="#/observatorio" className="panel panel-hover flex items-start gap-4 p-5">
          <Wallet size={20} className="mt-0.5 text-amber-300" />
          <div>
            <p className="font-semibold text-white">Observatório de erros</p>
            <p className="text-[13px] text-slate-400">Investigação de alucinações, retrabalho e confiabilidade com classificação criteriosa.</p>
          </div>
        </a>
      </div>
      <div className="mt-6"><SimulationBadge /></div>

      <p className="mt-8 border-t border-white/5 pt-4 text-center text-[11px] text-slate-500">
        Projeto idealizado por <span className="text-slate-400">Julio Cesar Campos Machado</span> · Organização e iniciativa: <a href="https://likelook.wixsite.com/solutions" target="_blank" rel="noopener noreferrer" className="text-slate-400 underline decoration-slate-600 underline-offset-2 transition-colors hover:text-cyan-400">Like Look Solutions</a>
      </p>
    </div>
  );
}
