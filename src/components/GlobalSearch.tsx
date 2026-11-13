import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { navItems } from '@/data/navigation';
import { glossary } from '@/data/glossary';

export function GlobalSearch({ navigate }: { navigate: (h: string) => void }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return { pages: [], terms: [] };
    return {
      pages: navItems.filter((n) => n.label.toLowerCase().includes(q) || n.description?.toLowerCase().includes(q)).slice(0, 5),
      terms: glossary.filter((g) => g.term.toLowerCase().includes(q) || g.definition.toLowerCase().includes(q)).slice(0, 5),
    };
  }, [query]);

  const go = (h: string) => {
    navigate(h);
    setOpen(false);
    setQuery('');
  };

  return (
    <div className="relative w-full max-w-md">
      <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
      <input
        value={query}
        onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
        placeholder="Pesquisar capítulos e conceitos..."
        aria-label="Pesquisa global"
        className="input-base pl-9"
      />
      {open && query.trim().length >= 2 && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-white/10 bg-night-850/95 shadow-card backdrop-blur-lg">
          {results.pages.length === 0 && results.terms.length === 0 && (
            <p className="px-4 py-3 text-sm text-slate-500">Nenhum resultado encontrado.</p>
          )}
          {results.pages.length > 0 && <p className="label px-4 pt-3">Capítulos</p>}
          {results.pages.map((p) => (
            <button key={p.id} onClick={() => go(p.id)} className="block w-full px-4 py-2 text-left text-sm text-slate-200 hover:bg-cyan-400/10">
              {p.label}
            </button>
          ))}
          {results.terms.length > 0 && <p className="label px-4 pt-3">Conceitos</p>}
          {results.terms.map((t) => (
            <button key={t.term} onClick={() => go('glossario')} className="block w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-cyan-400/10">
              {t.term} <span className="text-xs text-slate-500">— {t.definition.slice(0, 60)}...</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
