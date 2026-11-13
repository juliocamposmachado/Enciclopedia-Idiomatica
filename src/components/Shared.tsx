import { Info } from 'lucide-react';
import type { ReactNode } from 'react';

export { Callout } from './Callout';

export function PageHeader({ icon, title, subtitle, badge }: { icon: ReactNode; title: string; subtitle: string; badge?: string }) {
  return (
    <header className="mb-8">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">{icon}</div>
        <div>
          <h1 className="text-2xl font-bold text-white dark:text-white">{title}</h1>
          {badge && <span className="tag mr-0 bg-violet-400/15 text-violet-300">{badge}</span>}
        </div>
      </div>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-400">{subtitle}</p>
      {badge && <SimulationBadge />}
    </header>
  );
}

export function SimulationBadge() {
  return (
    <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[11px] font-medium text-amber-200">
      <Info size={12} />
      Valores experimentais simulados — não constituem benchmark real
    </div>
  );
}

export function StatCard({ label, value, hint, accent = 'cyan' }: { label: string; value: string; hint?: string; accent?: 'cyan' | 'violet' | 'emerald' | 'amber' }) {
  const accents: Record<string, string> = {
    cyan: 'text-cyan-300 dark:text-cyan-300',
    violet: 'text-violet-300 dark:text-violet-300',
    emerald: 'text-emerald-300 dark:text-emerald-300',
    amber: 'text-amber-300 dark:text-amber-300',
  };
  return (
    <div className="panel panel-hover p-4">
      <p className="label">{label}</p>
      <p className={`stat-value mt-1 ${accents[accent]}`}>{value}</p>
      {hint && <p className="mt-1 text-[11px] text-slate-500">{hint}</p>}
    </div>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="mb-4 mt-10 border-l-2 border-cyan-400 pl-3 text-lg font-semibold text-white dark:text-white">{children}</h2>;
}
