import { useState } from 'react';
import { Scale, ExternalLink, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { legalActs } from '@/data/legal';
import { PageHeader } from '@/components/Shared';
import { Callout } from '@/components/Callout';
import type { LegalAct } from '@/types';

function LegalCard({ act }: { act: LegalAct }) {
  return (
    <article className="panel p-6">
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <span className={`tag ${act.status === 'vigente' ? 'bg-emerald-400/15 text-emerald-300' : 'bg-amber-400/15 text-amber-300'}`}>
          {act.status === 'vigente' ? <CheckCircle2 size={11} className="mr-1" /> : <AlertTriangle size={11} className="mr-1" />}
          {act.status === 'vigente' ? 'Lei vigente' : 'Projeto de lei — em tramitação'}
        </span>
        <h3 className="font-semibold text-white">{act.number}</h3>
      </div>
      <p className="mb-4 text-sm font-medium text-cyan-300">{act.title}</p>
      <p className="mb-4 text-[13px] leading-relaxed text-slate-300">{act.ementa}</p>

      <p className="label mb-2">Artigos relevantes</p>
      <div className="mb-4 overflow-x-auto">
        <table className="w-full text-[13px]">
          <tbody>
            {act.articles.map((a) => (
              <tr key={a.ref}>
                <td className="border border-white/10 px-3 py-1.5 align-top font-mono text-cyan-300">{a.ref}</td>
                <td className="border border-white/10 px-3 py-1.5 text-slate-300">{a.subject}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="label mb-1">Relação com IA</p>
      <p className="mb-3 text-[13px] leading-relaxed text-slate-300">{act.aiRelation}</p>

      <p className="label mb-1">Exemplos de aplicação</p>
      <ul className="mb-3 list-disc space-y-1 pl-5 text-[13px] text-slate-300">
        {act.examples.map((e) => <li key={e}>{e}</li>)}
      </ul>

      <p className="label mb-1">Limites de incidência</p>
      <p className="mb-4 text-[13px] leading-relaxed text-amber-100/80">{act.limits}</p>

      <a href={act.sourceUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost text-[12px]">
        <ExternalLink size={12} /> Fonte oficial: {act.sourceName}
      </a>
    </article>
  );
}

export function LegalPage() {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();
  const filtered = legalActs.filter(
    (a) => !q || a.number.toLowerCase().includes(q) || a.title.toLowerCase().includes(q) || a.ementa.toLowerCase().includes(q),
  );

  return (
    <div>
      <PageHeader
        icon={<Scale size={20} />}
        title="Biblioteca jurídica brasileira"
        subtitle="Fichas organizadas por norma, com artigos relevantes, relação com IA, limites de incidência e fonte oficial. O projeto distingue leis vigentes de projetos legislativos."
      />

      <Callout tone="warning" title="Ressalva jurídica">
        Este material é informativo e não substitui a análise de um caso concreto por profissional habilitado. Não existe uma única lei que regule integralmente a engenharia de prompts e a tokenização; a incidência depende da atividade, finalidade, agentes e danos.
      </Callout>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Pesquisar norma (ex.: LGPD, 13.709, consumidor)..."
        className="input-base my-5 max-w-md"
        aria-label="Pesquisar legislação"
      />

      <div className="grid gap-5">
        {filtered.map((act) => <LegalCard key={act.id} act={act} />)}
        {filtered.length === 0 && <p className="text-sm text-slate-500">Nenhuma norma encontrada para "{query}".</p>}
      </div>
    </div>
  );
}
