import { AlertTriangle, Info } from 'lucide-react';
import type { ReactNode } from 'react';

export function Callout({ tone = 'info', title, children }: { tone?: 'info' | 'warning'; title?: string; children: ReactNode }) {
  const isWarning = tone === 'warning';
  const Icon = isWarning ? AlertTriangle : Info;
  return (
    <div
      className={`my-4 flex gap-3 rounded-xl border p-4 text-sm leading-relaxed ${
        isWarning
          ? 'border-amber-400/30 bg-amber-400/10 text-amber-100'
          : 'border-cyan-400/30 bg-cyan-400/10 text-cyan-50'
      }`}
    >
      <Icon size={18} className={`mt-0.5 shrink-0 ${isWarning ? 'text-amber-300' : 'text-cyan-300'}`} />
      <div>
        {title && <p className="mb-1 font-semibold">{title}</p>}
        <div className={isWarning ? 'text-amber-100/90' : 'text-cyan-100/90'}>{children}</div>
      </div>
    </div>
  );
}
