import { useMemo, useState } from 'react';
import { BookOpen, Printer, Star } from 'lucide-react';
import { editorialSections } from '@/data/editorial';
import { references } from '@/data/editorial';
import { PageHeader } from '@/components/Shared';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Callout } from '@/components/Callout';

export function EncyclopediaPage() {
  const [active, setActive] = useLocalStorage<string>('eii:chapter', 'sec-1');
  const [favorites, setFavorites] = useLocalStorage<string[]>('eii:favorites', []);
  const [filter, setFilter] = useState('');

  const filtered = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return editorialSections;
    return editorialSections.filter(
      (s) => s.title.toLowerCase().includes(q) || JSON.stringify(s.content).toLowerCase().includes(q),
    );
  }, [filter]);

  const section = editorialSections.find((s) => s.id === active) ?? editorialSections[0];
  const toggleFav = (id: string) => setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  return (
    <div>
      <PageHeader
        icon={<BookOpen size={20} />}
        title="Enciclopédia científica"
        subtitle="Conteúdo editorial integral, organizado em capítulos navegáveis. Pesquise, favorite e leia em fluxo contínuo."
      />

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Pesquisar nos capítulos..."
          className="input-base max-w-xs"
          aria-label="Pesquisar capítulos"
        />
        <button onClick={() => window.print()} className="btn-ghost" aria-label="Imprimir relatório">
          <Printer size={14} /> Imprimir
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <p className="label mb-2">Índice automático</p>
          <ol className="max-h-[60vh] space-y-0.5 overflow-y-auto pr-1">
            {filtered.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => setActive(s.id)}
                  className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-[13px] transition-colors ${
                    active === s.id ? 'bg-cyan-400/10 font-medium text-cyan-300' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                  }`}
                >
                  <span>
                    <span className="mr-2 font-mono text-[11px] text-slate-500">{s.number}</span>
                    {s.title}
                  </span>
                  {favorites.includes(s.id) && <Star size={12} className="shrink-0 fill-amber-400 text-amber-400" />}
                </button>
              </li>
            ))}
          </ol>
        </aside>

        <article className="panel min-h-[50vh] p-6 sm:p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="label mb-1">Capítulo {section.number}</p>
              <h2 className="text-xl font-bold text-white sm:text-2xl">{section.title}</h2>
            </div>
            <button
              onClick={() => toggleFav(section.id)}
              className="btn-ghost px-2 py-1.5"
              aria-label={favorites.includes(section.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            >
              <Star size={15} className={favorites.includes(section.id) ? 'fill-amber-400 text-amber-400' : ''} />
            </button>
          </div>

          {section.content}

          <Callout tone="info" title="Navegação">
            Use o índice para saltar entre capítulos. As referências citadas estão reunidas na seção "Referências científicas".
          </Callout>

          <div className="mt-8 flex justify-between border-t border-white/10 pt-5">
            {editorialSections.indexOf(section) > 0 && (
              <button
                className="btn-ghost"
                onClick={() => setActive(editorialSections[editorialSections.indexOf(section) - 1].id)}
              >
                ← Anterior
              </button>
            )}
            <span />
            {editorialSections.indexOf(section) < editorialSections.length - 1 && (
              <button
                className="btn-primary"
                onClick={() => setActive(editorialSections[editorialSections.indexOf(section) + 1].id)}
              >
                Próximo capítulo →
              </button>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}

export function ReferencesPage() {
  return (
    <div>
      <PageHeader
        icon={<BookOpen size={20} />}
        title="Referências científicas e jurídicas"
        subtitle="Fontes oficiais e documentação técnica citada nos capítulos. Nenhuma referência foi inventada; verifique sempre a versão atualizada na fonte."
      />
      <ol className="space-y-3">
        {references.map((r) => (
          <li key={r.id} className="panel p-4">
            <span className="mr-2 font-mono text-cyan-400">[{r.id}]</span>
            <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-slate-200 underline decoration-cyan-400/40 underline-offset-4 hover:text-cyan-300">
              {r.label}
            </a>
            <p className="mt-1 break-all text-[11px] text-slate-500">{r.url}</p>
          </li>
        ))}
      </ol>
      <Callout tone="warning" title="Transparência">
        As referências legais remetem a fontes oficiais (Planalto, Câmara dos Deputados, Senado Federal). Confirme sempre a vigência e a atualização das normas.
      </Callout>
    </div>
  );
}
