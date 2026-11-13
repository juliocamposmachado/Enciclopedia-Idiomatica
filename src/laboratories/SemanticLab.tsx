import { useState } from 'react';
import { Target, Search, Check, X, GitCompare } from 'lucide-react';
import { PageHeader, SectionTitle } from '@/components/Shared';
import { Callout } from '@/components/Callout';
import { wordSenses, semanticPairs } from '@/data/semantic';

export function SemanticLab() {
  const [query, setQuery] = useState('precisão');
  const [selected, setSelected] = useState<string | null>(null);
  const [pairId, setPairId] = useState(semanticPairs[0].id);

  const key = query.trim().toLowerCase();
  const sense = Object.entries(wordSenses).find(([k]) => k.includes(key) || key.includes(k));
  const pair = semanticPairs.find((p) => p.id === pairId)!;

  return (
    <div>
      <PageHeader
        icon={<Target size={20} />}
        title="Laboratório de precisão semântica"
        subtitle="Analise palavras e expressões: significados, contextos, sinônimos, ambiguidades e exemplos de uso correto e inadequado. Compare conceitos próximos que a tradução e o uso corrente frequentemente confundem."
      />

      <SectionTitle>Analise uma expressão</SectionTitle>
      <div className="flex flex-wrap gap-2">
        {Object.keys(wordSenses).map((k) => (
          <button key={k} onClick={() => { setQuery(k); setSelected(k); }} className={`tag border px-3 py-1.5 ${sense?.[0] === k ? 'border-cyan-400/40 bg-cyan-400/15 text-cyan-200' : 'border-white/10 bg-white/5 text-slate-300 hover:border-cyan-400/30'}`}>
            {k}
          </button>
        ))}
      </div>
      <div className="mt-3 flex max-w-md gap-2">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input value={query} onChange={(e) => { setQuery(e.target.value); setSelected(null); }} placeholder="Digite uma expressão (precisão, eficiência...)" className="input-base pl-9" aria-label="Expressão para analisar" />
        </div>
      </div>

      {sense ? (
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <div className="panel p-5">
            <p className="label mb-2">Possíveis significados</p>
            <ul className="mb-4 list-disc space-y-1 pl-5 text-[13px] text-slate-300">{sense[1].meanings.map((m) => <li key={m}>{m}</li>)}</ul>
            <p className="label mb-2">Contextos de utilização</p>
            <div className="mb-4 flex flex-wrap gap-2">{sense[1].contexts.map((c) => <span key={c} className="tag bg-cyan-400/10 text-cyan-300">{c}</span>)}</div>
            <p className="label mb-2">Termos técnicos relacionados</p>
            <div className="flex flex-wrap gap-2">{sense[1].related.map((r) => <span key={r} className="tag bg-violet-400/10 text-violet-300">{r}</span>)}</div>
          </div>
          <div className="panel p-5">
            <div className="grid grid-cols-2 gap-4">
              <div><p className="label mb-2">Sinônimos</p><ul className="space-y-1 text-[13px] text-slate-300">{sense[1].synonyms.map((s) => <li key={s}>· {s}</li>)}</ul></div>
              <div><p className="label mb-2">Antônimos</p><ul className="space-y-1 text-[13px] text-slate-300">{sense[1].antonyms.map((s) => <li key={s}>· {s}</li>)}</ul></div>
            </div>
            <p className="label mt-4 mb-2">Ambiguidades</p>
            <ul className="mb-4 list-disc space-y-1 pl-5 text-[13px] text-amber-100/80">{sense[1].ambiguities.map((a) => <li key={a}>{a}</li>)}</ul>
            <div className="space-y-2">
              {sense[1].good.map((g) => (
                <p key={g} className="flex items-start gap-2 text-[13px] text-emerald-200"><Check size={14} className="mt-0.5 shrink-0" />{g}</p>
              ))}
              {sense[1].bad.map((b) => (
                <p key={b} className="flex items-start gap-2 text-[13px] text-rose-200"><X size={14} className="mt-0.5 shrink-0" />{b}</p>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="panel mt-5 p-5 text-[13px] text-slate-400">
          {selected === null
            ? `Nenhuma entrada cadastrada para "${query}". Este laboratório didático trabalha com um vocabulário controlado — selecione um dos conceitos disponíveis acima.`
            : 'Selecione um conceito disponível.'}
        </div>
      )}

      <SectionTitle>Comparador de conceitos próximos</SectionTitle>
      <div className="mb-4 flex flex-wrap gap-2">
        {semanticPairs.map((p) => (
          <button key={p.id} onClick={() => setPairId(p.id)} className={`tag px-3 py-1.5 ${pairId === p.id ? 'bg-cyan-400/15 text-cyan-200' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}>
            {p.a} × {p.b}
          </button>
        ))}
      </div>
      <div className="panel p-6">
        <p className="mb-3 flex items-center gap-2 text-lg font-bold text-white"><GitCompare size={17} className="text-cyan-300" />{pair.a} × {pair.b}</p>
        <p className="text-[14px] leading-relaxed text-slate-300">{pair.distinction}</p>
        <div className="mt-4 space-y-2">
          <p className="flex items-start gap-2 text-[13px] text-emerald-200"><Check size={14} className="mt-0.5 shrink-0" />Uso correto: {pair.exampleCorrect}</p>
          <p className="flex items-start gap-2 text-[13px] text-rose-200"><X size={14} className="mt-0.5 shrink-0" />Uso inadequado: {pair.exampleWrong}</p>
        </div>
      </div>

      <Callout tone="info" title="Escopo">
        Este laboratório é didático e trabalha com um vocabulário controlado. A desambiguação completa depende do contexto de uso — ver capítulo 4 da enciclopédia (os cinco níveis de precisão linguística).
      </Callout>
    </div>
  );
}
