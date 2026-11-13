import { useState, type ReactNode } from 'react';
import {
  LayoutDashboard, BookOpen, Braces, Languages, PenTool, Wallet, Target,
  ArrowLeftRight, Library, ClipboardCheck, Radar, Scale, Gauge, Sparkles,
  BookMarked, Quote, Info, Menu, X, Sun, Moon, Search, User, Linkedin,
  Globe, MessageCircle,
} from 'lucide-react';
import { navItems } from '@/data/navigation';
import { GlobalSearch } from './GlobalSearch';
import { useHashRoute, useScrollProgress } from '@/hooks/useHashRoute';

const iconMap: Record<string, ReactNode> = {
  inicio: <LayoutDashboard size={16} />,
  enciclopedia: <BookOpen size={16} />,
  'laboratorio-tokenizacao': <Braces size={16} />,
  'comparador-idiomas': <Languages size={16} />,
  'engenharia-prompts': <PenTool size={16} />,
  'simulador-custos': <Wallet size={16} />,
  'precisao-semantica': <Target size={16} />,
  traducoes: <ArrowLeftRight size={16} />,
  'biblioteca-terminologica': <Library size={16} />,
  auditoria: <ClipboardCheck size={16} />,
  observatorio: <Radar size={16} />,
  'biblioteca-juridica': <Scale size={16} />,
  ieiia: <Gauge size={16} />,
  simulacoes: <Sparkles size={16} />,
  glossario: <BookMarked size={16} />,
  referencias: <Quote size={16} />,
  sobre: <Info size={16} />,
  creditos: <User size={16} />,
};

const groups = ['Geral', 'Laboratórios', 'Conteúdo'];

export function Layout({ children, theme, toggleTheme }: { children: ReactNode; theme: string; toggleTheme: () => void }) {
  const [route, navigate] = useHashRoute();
  const progress = useScrollProgress();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const nav = (
    <nav aria-label="Navegação principal" className="flex-1 overflow-y-auto px-3 pb-6">
      {groups.map((g) => (
        <div key={g} className="mb-4">
          <p className="label px-3 py-2">{g}</p>
          <ul className="space-y-0.5">
            {navItems.filter((n) => n.group === g).map((item) => (
              <li key={item.id}>
                <a
                  href={`#/${item.id}`}
                  onClick={() => setSidebarOpen(false)}
                  aria-current={route === item.id ? 'page' : undefined}
                  className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] transition-colors ${
                    route === item.id
                      ? 'bg-cyan-400/10 font-medium text-cyan-300'
                      : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                  }`}
                >
                  <span className={route === item.id ? 'text-cyan-300' : 'text-slate-500'}>{iconMap[item.id]}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-night-950">
      {/* fixed ambient background */}
      <div aria-hidden className="pointer-events-none fixed inset-0">
        <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute top-1/3 right-0 h-80 w-80 rounded-full bg-blue-700/10 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-violet-600/8 blur-[100px]" />
      </div>

      {/* desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-white/10 bg-night-900/80 backdrop-blur-xl lg:flex">
        <a href="#/inicio" className="flex items-center gap-3 px-5 py-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 font-mono text-sm font-bold text-night-950">EI</div>
          <div>
            <p className="text-[13px] font-bold leading-tight text-white">Enciclopédia Idiomática</p>
            <p className="text-[10px] uppercase tracking-widest text-cyan-400/80">Inteligência Artificial</p>
          </div>
        </a>
        {nav}
        <p className="border-t border-white/10 px-5 py-3 text-[10px] leading-relaxed text-slate-600">
          Indicadores experimentais. Não constituem benchmarks reais nem aconselhamento jurídico.
        </p>
      </aside>

      {/* mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute inset-y-0 left-0 flex w-72 flex-col border-r border-white/10 bg-night-900">
            <div className="flex items-center justify-between px-5 py-4">
              <p className="text-sm font-bold text-white">Enciclopédia Idiomática</p>
              <button onClick={() => setSidebarOpen(false)} aria-label="Fechar menu"><X size={18} className="text-slate-400" /></button>
            </div>
            {nav}
          </aside>
        </div>
      )}

      <div className="relative flex min-h-screen w-full flex-col lg:pl-64">
        {/* top bar */}
        <header className="sticky top-0 z-30 border-b border-white/10 bg-night-950/80 backdrop-blur-xl">
          <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
            <button className="btn-ghost px-2 py-1.5 lg:hidden" onClick={() => setSidebarOpen(true)} aria-label="Abrir menu">
              <Menu size={16} />
            </button>
            <div className="hidden flex-1 sm:block">
              {searchOpen ? (
                <GlobalSearch navigate={navigate} />
              ) : (
                <button onClick={() => setSearchOpen(true)} className="btn-ghost" aria-label="Abrir pesquisa">
                  <Search size={14} /> Pesquisar
                </button>
              )}
            </div>
            <div className="flex-1 sm:hidden"><GlobalSearch navigate={navigate} /></div>
            {searchOpen && <button className="btn-ghost hidden px-2 py-1.5 sm:inline-flex" onClick={() => setSearchOpen(false)} aria-label="Fechar pesquisa"><X size={14} /></button>}
            <button onClick={toggleTheme} className="btn-ghost px-2 py-1.5" aria-label="Alternar tema claro/escuro">
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </div>
          {/* reading progress */}
          <div className="h-0.5 w-full bg-white/5">
            <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-[width] duration-150" style={{ width: `${progress * 100}%` }} />
          </div>
        </header>

        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6">{children}</main>

        <footer className="border-t border-white/10 px-6 py-8 text-center">
          <p className="text-[12px] font-medium text-slate-400">
            Idealização: <span className="text-cyan-400">Julio Cesar Campos Machado</span> | <a href="https://likelook.wixsite.com/solutions" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline decoration-cyan-400/40 underline-offset-2 hover:text-cyan-300">Like Look Solutions</a>
          </p>
          <p className="mt-2 text-[11px] leading-relaxed text-slate-600">
            Enciclopédia Idiomática da Inteligência Artificial — conteúdo técnico-conceitual. Indicadores experimentais exigem validação empírica. A fundamentação jurídica é informativa e não substitui análise de caso concreto.
          </p>
        </footer>
      </div>
    </div>
  );
}
