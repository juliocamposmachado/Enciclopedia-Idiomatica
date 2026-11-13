import { useMemo, useState } from 'react';
import { Braces, Info, Trash2 } from 'lucide-react';
import { PageHeader, StatCard, SectionTitle } from '@/components/Shared';
import { Callout } from '@/components/Callout';
import { analyzeText, heuristicTokenize, type TokenAnalysis } from '@/utils/tokenizer';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const pieceStyles: Record<string, string> = {
  word: 'bg-cyan-400/15 text-cyan-200 border-cyan-400/30',
  fragment: 'bg-violet-400/15 text-violet-200 border-violet-400/30',
  punct: 'bg-slate-400/15 text-slate-300 border-slate-400/30',
  technical: 'bg-amber-400/15 text-amber-200 border-amber-400/30',
  repeated: 'bg-rose-400/15 text-rose-200 border-rose-400/30',
  space: 'bg-transparent border-transparent',
};

const legend = [
  ['Palavra frequente', 'word'], ['Fragmento (heurística)', 'fragment'], ['Pontuação', 'punct'],
  ['Termo técnico/palavra longa', 'technical'], ['Repetição', 'repeated'],
] as const;

export function TokenizerLab() {
  const [text, setText] = useLocalStorage('eii:tok-text', 'Analise a precisão dos resultados da tokenização e a inicialização do modelo responsabilizando-se pela desambiguação semântica.');
  const [lang, setLang] = useLocalStorage('eii:tok-lang', 'Português brasileiro');
  const [mode, setMode] = useState<'didatico' | 'real'>('didatico');
  const [error, setError] = useState<string | null>(null);

  const analysis: TokenAnalysis | null = useMemo(() => {
    try {
      return analyzeText(text);
    } catch {
      setError('Não foi possível analisar o texto. Tente reduzir o tamanho da entrada.');
      return null;
    }
  }, [text]);

  const realRatio = analysis && analysis.words > 0 && analysis.realTokens !== null
    ? (analysis.realTokens / analysis.words).toFixed(2) : null;
  const heuristicRatio = analysis && analysis.words > 0
    ? (analysis.heuristicTokens / analysis.words).toFixed(2) : null;

  return (
    <div>
      <PageHeader
        icon={<Braces size={20} />}
        title="Laboratório de tokenização"
        subtitle="Contabilize caracteres, palavras e tokens; visualize a fragmentação textual e a relação entre palavras e tokens. Dois modos: simulador didático com heurísticas visíveis e tokenizador real."
      />

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <select value={lang} onChange={(e) => setLang(e.target.value)} className="input-base max-w-xs" aria-label="Idioma do texto">
          {['Português brasileiro', 'Inglês', 'Espanhol', 'Francês', 'Alemão'].map((l) => <option key={l}>{l}</option>)}
        </select>
        <div className="flex rounded-lg border border-white/10 p-0.5" role="tablist" aria-label="Modo de tokenização">
          {(['didatico', 'real'] as const).map((m) => (
            <button key={m} role="tab" aria-selected={mode === m} onClick={() => setMode(m)}
              className={`rounded-md px-3 py-1.5 text-[12px] font-medium transition-colors ${mode === m ? 'bg-cyan-400/15 text-cyan-300' : 'text-slate-400 hover:text-slate-200'}`}>
              {m === 'didatico' ? 'Simulador didático' : 'Tokenizador real'}
            </button>
          ))}
        </div>
        {text && <button className="btn-ghost px-2 py-1.5" onClick={() => setText('')} aria-label="Limpar texto"><Trash2 size={14} /></button>}
      </div>

      <textarea
        value={text}
        onChange={(e) => { setText(e.target.value); setError(null); }}
        rows={5}
        className="input-base font-mono"
        placeholder={`Digite ou cole seu texto em ${lang}...`}
        aria-label="Texto para tokenizar"
      />
      {error && <p className="mt-2 text-[13px] text-rose-400">{error}</p>}

      {analysis && (
        <>
          <div className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatCard label="Caracteres" value={String(analysis.chars)} />
            <StatCard label="Palavras" value={String(analysis.words)} />
            <StatCard
              label={mode === 'real' ? 'Tokens (real, GPT-4o)' : 'Tokens (didático)'}
              value={String(mode === 'real' ? analysis.realTokens ?? '—' : analysis.heuristicTokens)}
              accent="violet"
            />
            <StatCard label="Palavras por token" value={mode === 'real' ? (realRatio ? `1 : ${realRatio}` : '—') : `1 : ${heuristicRatio ?? '—'}`} accent="emerald" />
          </div>

          <Callout tone="info" title={mode === 'real' ? 'Modo real: codificação o200k_base, compatível com GPT-4o (OpenAI)' : 'Modo didático: heurísticas identificadas'}>
            {mode === 'real'
              ? 'A contagem usa a biblioteca js-tiktoken com a codificação o200k_base, compatível com o tokenizador do GPT-4o. Outros modelos e fornecedores usam tokenizadores diferentes: o resultado não é universal.'
              : 'A fragmentação didática usa heurísticas explícitas: palavras longas (acima de 12 caracteres) e termos técnicos são divididos em blocos de 4 caracteres para ilustrar a fragmentação. NÃO representa a tokenização real de qualquer LLM — use o modo real para contagem compatível com GPT-4o.'}
          </Callout>

          <SectionTitle>Fragmentação visual</SectionTitle>
          <div className="panel flex flex-wrap gap-1 p-4 leading-loose">
            {(mode === 'didatico' ? analysis.pieces : null)?.map((p, i) =>
              p.type === 'space' ? (
                <span key={i}> </span>
              ) : (
                <span key={i} className={`inline-block rounded border px-1.5 py-0.5 font-mono text-[12px] ${pieceStyles[p.type]}`} title={p.type}>
                  {p.text}
                </span>
              ),
            )}
            {mode === 'real' && (
              <p className="text-[13px] text-slate-400">
                A visualização token a token do modo real não está disponível nesta versão para evitar representação imprecisa; a contagem real é exibida acima. Use o modo didático para ver a fragmentação ilustrativa.
              </p>
            )}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {legend.map(([label, type]) => (
              <span key={type} className={`tag border ${pieceStyles[type]}`}>{label}</span>
            ))}
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="panel p-5">
              <p className="label mb-2">Palavras longas (14+ caracteres)</p>
              {analysis.longWords.length ? (
                <ul className="space-y-1 text-[13px] text-slate-300">
                  {analysis.longWords.map((w) => <li key={w} className="font-mono">{w} <span className="text-slate-500">({w.length} caracteres)</span></li>)}
                </ul>
              ) : <p className="text-[13px] text-slate-500">Nenhuma no texto atual.</p>}
            </div>
            <div className="panel p-5">
              <p className="label mb-2 flex items-center gap-2"><Info size={13} /> Expressões repetidas (3+ ocorrências)</p>
              {analysis.repeated.length ? (
                <div className="flex flex-wrap gap-2">
                  {analysis.repeated.map((w) => <span key={w} className="tag bg-rose-400/15 text-rose-200">{w}</span>)}
                </div>
              ) : <p className="text-[13px] text-slate-500">Nenhuma no texto atual.</p>}
            </div>
          </div>

          <Callout tone="warning" title="Transparência metodológica">
            A relação entre palavras e tokens varia por idioma, tokenizador e texto. Não existe regra universal de que um idioma consome menos tokens que outro: a comparação precisa ser experimental.
          </Callout>
        </>
      )}
    </div>
  );
}
