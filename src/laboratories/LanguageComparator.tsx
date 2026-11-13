import { useMemo } from 'react';
import { Languages, RefreshCw } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { PageHeader, SectionTitle } from '@/components/Shared';
import { Callout } from '@/components/Callout';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { countRealTokens } from '@/utils/tokenizer';

const defaults = {
  pt: 'Analise a precisão dos resultados.',
  en: 'Analyze the accuracy of the results.',
  es: 'Analice la precisión de los resultados.',
};

export function LanguageComparator() {
  const [texts, setTexts] = useLocalStorage('eii:comparator', defaults);

  const rows = useMemo(() => {
    return (['pt', 'en', 'es'] as const).map((k) => {
      const t = texts[k];
      const words = t.trim() ? t.trim().split(/\s+/).filter(Boolean).length : 0;
      const tokens = countRealTokens(t);
      return { key: k, lang: { pt: 'Português', en: 'Inglês', es: 'Espanhol' }[k], text: t, words, chars: t.length, tokens, tokensPerWord: words ? tokens / words : 0 };
    });
  }, [texts]);

  const maxTokens = Math.max(...rows.map((r) => r.tokens), 1);

  const differences = useMemo(() => {
    const d: string[] = [];
    const [pt, en, es] = rows;
    if (pt.tokens !== en.tokens) d.push(`Português e inglês diferem em ${Math.abs(pt.tokens - en.tokens)} token(s) para esta frase — resultado específico deste texto, não regra geral.`);
    if (es.tokens !== pt.tokens) d.push(`Espanhol e português diferem em ${Math.abs(es.tokens - pt.tokens)} token(s) nesta amostra.`);
    d.push('Terminologia: "precisão" (PT) e "precisión" (ES) são cognatas; "accuracy" (EN) corresponde conceitualmente a "exatidão" em contextos científicos — ambiguidade potencial de tradução intermediária.');
    d.push('Possível alteração de significado: usar "accuracy" como "precisão" em contextos estatísticos pode inverter os conceitos de exatidão e precisão.');
    d.push('Eficiência textual comparativa: tokens por palavra variam por tokenizador; nenhuma conclusão de superioridade entre idiomas pode ser extraída de uma única frase.');
    return d;
  }, [rows]);

  return (
    <div>
      <PageHeader
        icon={<Languages size={20} />}
        title="Comparador idiomático multilíngue"
        subtitle="Compare textos semanticamente equivalentes em português, inglês e espanhol. Edite os três textos e realize novas comparações com contagem real de tokens."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {rows.map((r) => (
          <div key={r.key} className="panel p-4">
            <div className="mb-2 flex items-center justify-between">
              <p className="label">{r.lang}</p>
              <button
                onClick={() => setTexts({ ...texts, [r.key]: defaults[r.key] })}
                className="text-slate-500 hover:text-cyan-300"
                aria-label={`Restaurar texto padrão em ${r.lang}`}
              ><RefreshCw size={13} /></button>
            </div>
            <textarea
              value={r.text}
              onChange={(e) => setTexts({ ...texts, [r.key]: e.target.value })}
              rows={3}
              className="input-base"
              aria-label={`Texto em ${r.lang}`}
            />
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              <div><p className="stat-value text-base">{r.words}</p><p className="label">palavras</p></div>
              <div><p className="stat-value text-base">{r.chars}</p><p className="label">caracteres</p></div>
              <div><p className="stat-value text-base">{r.tokens}</p><p className="label">tokens reais</p></div>
            </div>
          </div>
        ))}
      </div>

      <SectionTitle>Eficiência textual comparativa</SectionTitle>
      <div className="panel p-5">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={rows}>
            <XAxis dataKey="lang" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} width={30} />
            <Tooltip contentStyle={{ background: '#0A1122', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }} cursor={{ fill: 'rgba(34,211,238,0.06)' }} />
            <Bar dataKey="tokens" radius={[6, 6, 0, 0]}>
              {rows.map((_, i) => <Cell key={i} fill={['#22d3ee', '#3b82f6', '#8b5cf6'][i]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="mt-2 text-[11px] text-slate-500">Contagem com codificação o200k_base (compatível com GPT-4o). Tokens relativos ao texto mais eficiente: {(rows.map((r) => r.tokens / maxTokens).map((v, i) => `${rows[i].lang}: ${(v * 100).toFixed(0)}%`).join(' · '))}.</p>
      </div>

      <SectionTitle>Análise comparativa</SectionTitle>
      <ul className="space-y-2">
        {differences.map((d, i) => (
          <li key={i} className="panel p-4 text-[13px] leading-relaxed text-slate-300">{d}</li>
        ))}
      </ul>

      <Callout tone="warning" title="Neutralidade metodológica">
        Esta ferramenta não declara um idioma superior a outro. A comparação depende do tokenizador, do modelo e do texto; conclusões exigem experimentos com amostras suficientemente grandes (ver metodologia IEIIA).
      </Callout>
    </div>
  );
}
