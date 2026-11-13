import { useState } from 'react';
import { ArrowLeftRight, AlertTriangle } from 'lucide-react';
import { PageHeader, SectionTitle } from '@/components/Shared';
import { Callout } from '@/components/Callout';
import { translationEntries } from '@/data/semantic';
import { countRealTokens } from '@/utils/tokenizer';
import type { TranslationEntry } from '@/types';

const langLabels: Record<string, string> = { pt: 'Português (BR)', en: 'Inglês', es: 'Espanhol', fr: 'Francês', de: 'Alemão' };
const typeLabel: Record<TranslationEntry['type'], string> = {
  'falso-cognato': 'Falso cognato', 'termo-tecnico': 'Termo técnico', expressao: 'Expressão idiomática', ambiguidade: 'Ambiguidade cultural',
};
const typeColor: Record<TranslationEntry['type'], string> = {
  'falso-cognato': 'bg-rose-400/15 text-rose-200', 'termo-tecnico': 'bg-cyan-400/15 text-cyan-200',
  expressao: 'bg-violet-400/15 text-violet-200', ambiguidade: 'bg-amber-400/15 text-amber-200',
};

export function TranslationLab() {
  const [filter, setFilter] = useState<'todos' | TranslationEntry['type']>('todos');
  const entries = translationEntries.filter((e) => filter === 'todos' || e.type === filter);

  return (
    <div>
      <PageHeader
        icon={<ArrowLeftRight size={20} />}
        title="Laboratório de tradução equivalente"
        subtitle="Comparação terminológica entre português brasileiro, inglês, espanhol, francês e alemão, com exemplos cadastrados de falsos cognatos, termos técnicos e ambiguidades culturais."
        badge="Laboratório didático — nenhum serviço de tradução automática está conectado"
      />

      <Callout tone="warning" title="Escopo declarado">
        Este módulo NÃO simula tradução automática inteligente. Sem integração real com um serviço de IA, apresenta um laboratório didático com exemplos cadastrados por especialistas. A tradução automática sem controle terminológico pode introduzir erros conceituais difíceis de identificar (capítulo 3.2).
      </Callout>

      <SectionTitle>Explorar por tipo de problema</SectionTitle>
      <div className="mb-4 flex flex-wrap gap-2">
        {(['todos', 'falso-cognato', 'termo-tecnico', 'expressao', 'ambiguidade'] as const).map((t) => (
          <button key={t} onClick={() => setFilter(t)} className={`tag px-3 py-1.5 ${filter === t ? 'bg-cyan-400/15 text-cyan-200' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}>
            {t === 'todos' ? 'Todos' : typeLabel[t]}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {entries.map((e) => (
          <article key={e.id} className="panel p-5">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className={`tag ${typeColor[e.type]}`}>{typeLabel[e.type]}</span>
              <AlertTriangle size={13} className="text-amber-300" />
            </div>
            <div className="grid gap-2 sm:grid-cols-5">
              {(['pt', 'en', 'es', 'fr', 'de'] as const).map((k) => (
                <div key={k} className="rounded-lg border border-white/10 bg-night-900/60 p-3">
                  <p className="label mb-1">{langLabels[k]}</p>
                  <p className="text-[13px] font-medium text-cyan-200">{e[k]}</p>
                  <p className="mt-1 font-mono text-[10px] text-slate-500">{countRealTokens(e[k])} tokens</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-slate-300">{e.note}</p>
          </article>
        ))}
      </div>

      <Callout tone="info" title="Perda de contexto e alterações de significado">
        As contagens de tokens exibidas usam a codificação o200k_base (compatível com GPT-4o) e servem para ilustrar como o mesmo conceito pode se fragmentar de forma diferente em cada idioma. A equivalência semântica não é garantida pela tradução literal — ver o comparador "Tradução × Equivalência semântica" no laboratório de precisão.
      </Callout>
    </div>
  );
}
