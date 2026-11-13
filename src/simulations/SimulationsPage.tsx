import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { PageHeader } from '@/components/Shared';
import { Callout } from '@/components/Callout';

function useTicker(intervalMs: number) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return tick;
}

const Flow = ({ steps, colors }: { steps: string[]; colors: string[] }) => {
  const tick = useTicker(1400);
  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-2">
          <div
            className={`rounded-lg border px-3 py-2 text-[12px] font-medium transition-all duration-500 ${tick % steps.length === i ? 'scale-105 shadow-glow' : ''}`}
            style={{ borderColor: `${colors[i]}55`, background: `${colors[i]}18`, color: colors[i] }}
          >
            {s}
          </div>
          {i < steps.length - 1 && <span className="text-slate-600">→</span>}
        </div>
      ))}
    </div>
  );
};

function TokenFlow() {
  const sentence = ['Analise', 'a', 'precisão', 'dos', 'resultados'];
  const [wordIdx, setWordIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setWordIdx((w) => (w + 1) % (sentence.length + 2)), 900);
    return () => clearInterval(id);
  }, []);
  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-2">
        {sentence.map((w, i) => (
          <span key={w} className={`rounded-lg border px-3 py-1.5 font-mono text-[13px] transition-all duration-300 ${i <= wordIdx ? 'border-cyan-400/50 bg-cyan-400/15 text-cyan-200' : 'border-white/10 text-slate-500'}`}>
            {w}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {[['Anal', 'ise'], [' a'], [' prec', 'is', 'ão'], [' dos'], [' result', 'ados']].flat().map((frag, i) => (
          <span key={i} className={`rounded border px-2 py-1 font-mono text-[12px] transition-opacity duration-300 ${i <= wordIdx * 2 + 1 ? 'border-violet-400/50 bg-violet-400/15 text-violet-200' : 'border-white/10 text-slate-600'}`}>
            {frag.trim() || '␣'}
          </span>
        ))}
      </div>
      <p className="mt-3 text-[12px] text-slate-500">Ilustração didática: uma palavra pode virar um ou vários tokens. As fronteiras reais dependem do tokenizador — teste no laboratório de tokenização.</p>
    </div>
  );
}

function NumericRepresentation() {
  const tick = useTicker(1000);
  const tokens = [
    { text: 'Anal', id: 45210 }, { text: 'ise', id: 7431 }, { text: ' precis', id: 18933 }, { text: 'ão', id: 22864 },
  ];
  return (
    <div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {tokens.map((t, i) => (
          <div key={t.text} className={`rounded-lg border p-3 text-center transition-all duration-500 ${tick % 4 === i ? 'border-cyan-400/60 bg-cyan-400/10 shadow-glow' : 'border-white/10 bg-white/5'}`}>
            <p className="font-mono text-[13px] text-slate-200">"{t.text}"</p>
            <p className="mt-1 font-mono text-lg font-bold text-cyan-300">{t.id}</p>
            <div className="mt-2 flex justify-center gap-0.5">
              {[0.4, 0.7, 0.5, 0.9].map((v, j) => (
                <div key={j} className="w-1.5 rounded-full bg-violet-400/70" style={{ height: `${v * 28 + 6}px`, opacity: tick % 4 === i ? 1 : 0.4 }} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[12px] text-slate-500">Cada token é associado a um identificador numérico e a um vetor (representação densa). Os valores exibidos são ilustrativos, não correspondem a uma codificação real.</p>
    </div>
  );
}

function ContextProcessing() {
  const layers = ['Tokens de entrada', 'Embeddings', 'Atenção (camadas)', 'Predição do próximo token'];
  return <Flow steps={layers} colors={['#22d3ee', '#8b5cf6', '#3b82f6', '#10b981']} />;
}

function Ambiguity() {
  const [branch, setBranch] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setBranch((b) => (b + 1) % 2), 2200);
    return () => clearInterval(id);
  }, []);
  return (
    <div>
      <div className="rounded-lg border border-amber-400/40 bg-amber-400/10 px-4 py-2 text-center text-[13px] text-amber-200">
        "Analise a precisão dos resultados da agência no banco."
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {[
          { label: 'Leitura A: "banco" = instituição financeira', detail: '"agência" reforça a interpretação bancária.' },
          { label: 'Leitura B: "banco" = assento', detail: 'Interpretação possível se "agência" for de publicidade, por exemplo.' },
        ].map((b, i) => (
          <div key={i} className={`rounded-lg border p-4 transition-all duration-500 ${branch === i ? 'border-rose-400/50 bg-rose-400/10' : 'border-white/10 bg-white/5 opacity-60'}`}>
            <p className="text-[13px] font-semibold text-white">{b.label}</p>
            <p className="mt-1 text-[12px] text-slate-400">{b.detail}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[12px] text-slate-500">Ambiguidades lexicais e sintáticas podem gerar interpretações diferentes — e respostas diferentes. A desambiguação é tarefa da engenharia de prompts.</p>
    </div>
  );
}

function ConflictingInstructions() {
  return (
    <div>
      <div className="grid gap-2 sm:grid-cols-2">
        {['Produza um relatório extremamente detalhado.', 'Utilize no máximo 100 palavras.', 'Não omita nenhuma informação.', 'Responda imediatamente.'].map((inst, i) => (
          <div key={i} className={`rounded-lg border px-3 py-2 text-[13px] ${i < 2 ? 'border-rose-400/40 bg-rose-400/10 text-rose-200' : 'border-amber-400/40 bg-amber-400/10 text-amber-200'}`}>
            {inst}
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-lg border border-rose-400/40 bg-rose-400/10 p-4 text-center">
        <p className="text-[13px] font-semibold text-rose-200">Resultado: saída imprevisível</p>
        <p className="mt-1 text-[12px] text-slate-400">Requisitos incompatíveis competem entre si; o modelo prioriza implicitamente — ou oscila entre eles entre repetições.</p>
      </div>
      <p className="mt-3 text-[12px] text-slate-500">Boa engenharia de prompts estabelece prioridades e define qual requisito prevalece (capítulo 5.3).</p>
    </div>
  );
}

function ReworkCost() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % 8), 1000);
    return () => clearInterval(id);
  }, []);
  const cycle = ['Prompt impreciso', 'Resposta inadequada', 'Correção do prompt', 'Nova chamada (+tokens)', 'Ainda inadequada', 'Nova correção', 'Nova chamada (+tokens)', 'Custo acumulado ↑'];
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {cycle.map((c, i) => (
          <span key={i} className={`rounded-lg border px-3 py-1.5 text-[12px] transition-all duration-300 ${i <= step ? 'border-amber-400/50 bg-amber-400/10 text-amber-200' : 'border-white/10 text-slate-600'}`}>
            {c}
          </span>
        ))}
      </div>
      <div className="mt-4 flex items-end gap-2">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="flex-1 rounded-t bg-gradient-to-t from-cyan-500/60 to-cyan-300/80 transition-all duration-500" style={{ height: `${n * 28 + 8}px`, opacity: step >= n * 2 - 1 ? 1 : 0.25 }}>
            <p className="pt-1 text-center font-mono text-[10px] text-night-950">chamada {n}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[12px] text-slate-500">Cada ciclo de retrabalho soma tokens de entrada + saída + novas chamadas (capítulo 6.1). Compare com a chamada estruturada única no simulador de custos.</p>
    </div>
  );
}

function StructuredPrompt() {
  const before = ['objetivo repetido 3×', 'contexto disperso', 'critério indefinido', 'formato ausente'];
  const after = ['objetivo único', 'contexto estruturado', 'restrições explícitas', 'formato definido'];
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <p className="label mb-2 text-rose-300">Antes (redundâncias)</p>
        <div className="space-y-1.5">{before.map((b) => <div key={b} className="rounded border border-rose-400/30 bg-rose-400/10 px-3 py-1.5 text-[12px] text-rose-200">{b}</div>)}</div>
      </div>
      <div>
        <p className="label mb-2 text-emerald-300">Depois (estruturado)</p>
        <div className="space-y-1.5">{after.map((b) => <div key={b} className="rounded border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-[12px] text-emerald-200">{b}</div>)}</div>
      </div>
    </div>
  );
}

function LanguageFragmentation() {
  const [langIdx, setLangIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setLangIdx((i) => (i + 1) % 3), 2000);
    return () => clearInterval(id);
  }, []);
  const data = [
    { lang: 'Português', frags: ['Anal', 'ise', ' a prec', 'is', 'ão dos result', 'ados'], n: 6 },
    { lang: 'Inglês', frags: ['An', 'alyze', ' the acc', 'uracy', ' of the res', 'ults'], n: 6 },
    { lang: 'Espanhol', frags: ['Anal', 'ice la prec', 'isión', ' de los res', 'ult', 'ados'], n: 6 },
  ];
  const current = data[langIdx];
  return (
    <div>
      <div className="flex gap-2">
        {data.map((d, i) => (
          <button key={d.lang} onClick={() => setLangIdx(i)} className={`tag px-3 py-1.5 ${i === langIdx ? 'bg-cyan-400/15 text-cyan-200' : 'bg-white/5 text-slate-400'}`}>{d.lang}</button>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {current.frags.map((f, i) => (
          <span key={i} className="rounded border border-violet-400/40 bg-violet-400/10 px-2 py-1 font-mono text-[12px] text-violet-200" style={{ animation: `float ${3 + i * 0.3}s ease-in-out infinite` }}>
            {f.trim()}
          </span>
        ))}
      </div>
      <p className="mt-3 text-[12px] text-slate-500">Ilustração da fragmentação: fronteiras variam por idioma e tokenizador. Nenhum idioma é universalmente mais eficiente — compare experimentalmente no comparador de idiomas.</p>
    </div>
  );
}

const sims = [
  { id: 'A', title: 'Como uma frase é transformada em tokens', comp: <TokenFlow /> },
  { id: 'B', title: 'Como os tokens são representados numericamente', comp: <NumericRepresentation /> },
  { id: 'C', title: 'Como um modelo processa contexto', comp: <ContextProcessing /> },
  { id: 'D', title: 'Como ambiguidades podem gerar interpretações diferentes', comp: <Ambiguity /> },
  { id: 'E', title: 'Como instruções contraditórias prejudicam resultados', comp: <ConflictingInstructions /> },
  { id: 'F', title: 'Como o retrabalho aumenta o custo', comp: <ReworkCost /> },
  { id: 'G', title: 'Como a estruturação de um prompt reduz redundâncias', comp: <StructuredPrompt /> },
  { id: 'H', title: 'Como diferentes idiomas apresentam fragmentações diferentes', comp: <LanguageFragmentation /> },
];

export function SimulationsPage() {
  return (
    <div>
      <PageHeader
        icon={<Sparkles size={20} />}
        title="Simulações visuais"
        subtitle="Animações didáticas em SVG sobre tokenização, representação numérica, contexto e falhas. São abstrações pedagógicas — não reproduções fiéis de arquiteturas proprietárias."
      />
      <div className="grid gap-5 lg:grid-cols-2">
        {sims.map((s) => (
          <section key={s.id} className="panel p-5">
            <p className="mb-4 flex items-center gap-2 font-semibold text-white">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-cyan-400/15 font-mono text-[12px] text-cyan-300">{s.id}</span>
              {s.title}
            </p>
            {s.comp}
          </section>
        ))}
      </div>
      <Callout tone="warning" title="Ressalva de representação">
        Nenhuma animação desta página representa o funcionamento interno de uma rede neural como reprodução fiel de uma arquitetura proprietária. Os fluxos ilustram conceitos públicos de processamento de linguagem.
      </Callout>
    </div>
  );
}
