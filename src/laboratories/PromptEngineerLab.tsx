import { useMemo, useState } from 'react';
import { PenTool, Copy, Check, Wand2 } from 'lucide-react';
import { PageHeader, SectionTitle } from '@/components/Shared';
import { Callout } from '@/components/Callout';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { countRealTokens } from '@/utils/tokenizer';

interface PromptFields {
  identity: string; objective: string; context: string; terminology: string;
  methodology: string; restrictions: string; format: string; validation: string;
}

const emptyFields: PromptFields = {
  identity: '', objective: '', context: '', terminology: '',
  methodology: '', restrictions: '', format: '', validation: '',
};

const vagueTerms = ['preciso', 'precisa', 'bom', 'melhor', 'adequado', 'correto', 'detalhado', 'otimizado', 'rápido', 'simples', 'robusto'];
const conflictPairs: [RegExp, RegExp, string][] = [
  [/detalhad[oa]s?|exaustiv[oa]/i, /máximo de \d+ palavras|no máximo \d+ palavras|resumid[oa]/i, 'Extensão detalhada × limite de palavras/resumo'],
  [/não omita|todas as informações/i, /máximo|resumid[oa]|breve/i, 'Completude × restrição de tamanho'],
  [/responda imediatamente/i, /pesquise|analise profundamente/i, 'Imediação × análise profunda'],
];

interface Finding { kind: 'redundancia' | 'ambiguidade' | 'conflito' | 'imprecisao' | 'simplificacao'; text: string }

function analyzePrompt(p: PromptFields): { findings: Finding[]; score: number; filled: number } {
  const all = [p.identity, p.objective, p.context, p.terminology, p.methodology, p.restrictions, p.format, p.validation].filter(Boolean).join(' ');
  const findings: Finding[] = [];
  const filled = [p.identity, p.objective, p.context, p.terminology, p.methodology, p.restrictions, p.format, p.validation].filter((v) => v.trim()).length;

  // redundancy: repeated contentful words across fields
  const words = all.toLowerCase().match(/[\p{L}]{6,}/gu) ?? [];
  const freq = new Map<string, number>();
  for (const w of words) freq.set(w, (freq.get(w) ?? 0) + 1);
  for (const [w, c] of freq) if (c >= 3) findings.push({ kind: 'redundancia', text: `"${w}" aparece ${c} vezes — considere consolidar para reduzir tokens de entrada.` });

  // vagueness
  for (const t of vagueTerms) {
    if (new RegExp(`\\b${t}`, 'i').test(all)) findings.push({ kind: 'imprecisao', text: `Termo impreciso detectado: "${t}". Defina um critério verificável (o que exatamente significa "${t}" aqui?).` });
    break;
  }

  // conflicts (works on the free-text fields; restrictions may deliberately override)
  for (const [a, b, label] of conflictPairs) {
    if (a.test(all) && b.test(all)) findings.push({ kind: 'conflito', text: `Possível instrução conflitante: ${label}. Estabeleça prioridades explícitas.` });
  }

  // ambiguity: "análise precisa" style constructions
  if (/análise precisa|de forma precisa|precisamente/i.test(all)) findings.push({ kind: 'ambiguidade', text: 'Expressão ambígua: "precisa/precisamente" não define critério. Especifique o critério de aceitação.' });
  if (filled < 4) findings.push({ kind: 'ambiguidade', text: `Apenas ${filled} de 8 componentes estruturais preenchidos. Componentes ausentes geram ambiguidade sobre requisitos.` });

  // simplification
  if (all.length > 1200) findings.push({ kind: 'simplificacao', text: `Prompt extenso (${all.length} caracteres). Considere dicionário terminológico e instruções reutilizáveis para reduzir contexto desnecessário.` });

  // structural score: component coverage + weighted penalties
  const coverage = filled / 8;
  const penalties = findings.reduce((s, f) => s + (f.kind === 'conflito' ? 0.08 : f.kind === 'imprecisao' ? 0.05 : f.kind === 'redundancia' ? 0.04 : 0.03), 0);
  const score = Math.max(0, Math.min(100, Math.round((coverage * 100) - penalties * 100 + (filled === 8 ? 5 : 0))));
  return { findings, score, filled };
}

export function PromptEngineerLab() {
  const [fields, setFields] = useLocalStorage<PromptFields>('eii:prompt-fields', emptyFields);
  const [copied, setCopied] = useState(false);

  const structured = useMemo(() => {
    const parts: string[] = [];
    if (fields.identity.trim()) parts.push(`IDENTIDADE FUNCIONAL:\n${fields.identity}`);
    if (fields.objective.trim()) parts.push(`OBJETIVO:\n${fields.objective}`);
    if (fields.context.trim()) parts.push(`CONTEXTO:\n${fields.context}`);
    if (fields.terminology.trim()) parts.push(`TERMINOLOGIA:\n${fields.terminology}`);
    if (fields.methodology.trim()) parts.push(`METODOLOGIA:\n${fields.methodology}`);
    if (fields.restrictions.trim()) parts.push(`RESTRIÇÕES:\n${fields.restrictions}`);
    if (fields.format.trim()) parts.push(`FORMATO:\n${fields.format}`);
    if (fields.validation.trim()) parts.push(`VALIDAÇÃO:\n${fields.validation}`);
    return parts.join('\n\n');
  }, [fields]);

  const { findings, score, filled } = useMemo(() => analyzePrompt(fields), [fields]);
  const freeText = Object.values(fields).filter(Boolean).join(' ');
  const originalTokens = countRealTokens(freeText);
  const structuredTokens = countRealTokens(structured);

  const kindLabel: Record<Finding['kind'], string> = {
    redundancia: 'Redundância', ambiguidade: 'Ambiguidade', conflito: 'Instrução conflitante',
    imprecisao: 'Termo impreciso', simplificacao: 'Sugestão de simplificação',
  };
  const kindColor: Record<Finding['kind'], string> = {
    redundancia: 'bg-rose-400/15 text-rose-200', ambiguidade: 'bg-amber-400/15 text-amber-200',
    conflito: 'bg-violet-400/15 text-violet-200', imprecisao: 'bg-orange-400/15 text-orange-200',
    simplificacao: 'bg-cyan-400/15 text-cyan-200',
  };

  const fieldList: [keyof PromptFields, string][] = [
    ['identity', 'Identidade funcional'], ['objective', 'Objetivo'], ['context', 'Contexto'],
    ['terminology', 'Terminologia'], ['methodology', 'Metodologia'], ['restrictions', 'Restrições'],
    ['format', 'Formato de saída'], ['validation', 'Critérios de validação'],
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(structured);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div>
      <PageHeader
        icon={<PenTool size={20} />}
        title="Simulador de engenharia de prompts"
        subtitle="Estruture instruções em oito componentes, gere o prompt formatado, identifique redundâncias, ambiguidades e conflitos, e acompanhe a pontuação experimental de qualidade estrutural."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          {fieldList.map(([key, label]) => (
            <label key={key} className="panel block p-4">
              <span className="label">{label}</span>
              <textarea
                value={fields[key]}
                onChange={(e) => setFields({ ...fields, [key]: e.target.value })}
                rows={key === 'context' || key === 'methodology' ? 3 : 2}
                className="input-base mt-1.5"
                placeholder={`Ex.: ${label.toLowerCase()}...`}
              />
            </label>
          ))}
        </div>

        <div className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <div className="panel p-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="label">Pontuação experimental de qualidade estrutural</p>
              <span className="tag bg-white/5 text-slate-400">{filled}/8 componentes</span>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-mono text-4xl font-bold text-cyan-300">{score}<span className="text-base text-slate-500">/100</span></p>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500" style={{ width: `${score}%` }} />
              </div>
            </div>
            <p className="mt-2 text-[11px] text-slate-500">Indicador heurístico de estrutura (cobertura de componentes e penalidades). A qualidade do prompt não garante a veracidade da resposta do modelo.</p>
          </div>

          <div className="panel p-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="label">Prompt estruturado gerado</p>
              <button onClick={copy} className="btn-ghost px-2 py-1 text-[12px]">{copied ? <Check size={13} /> : <Copy size={13} />}{copied ? 'Copiado' : 'Copiar'}</button>
            </div>
            <pre className="max-h-80 overflow-auto whitespace-pre-wrap rounded-lg border border-white/10 bg-night-900/80 p-4 font-mono text-[12px] leading-relaxed text-cyan-100">
              {structured || 'Preencha os campos à esquerda para gerar o prompt estruturado.'}
            </pre>
            {structured && (
              <div className="mt-3 grid grid-cols-2 gap-3 text-center">
                <div className="rounded-lg border border-white/10 p-2">
                  <p className="stat-value text-base">{originalTokens}</p><p className="label">tokens (campos soltos)</p>
                </div>
                <div className="rounded-lg border border-white/10 p-2">
                  <p className="stat-value text-base">{structuredTokens}</p><p className="label">tokens (estruturado)</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <SectionTitle>Ferramentas de análise</SectionTitle>
      {findings.length ? (
        <div className="space-y-2">
          {findings.map((f, i) => (
            <div key={i} className="panel flex items-start gap-3 p-4">
              <span className={`tag shrink-0 ${kindColor[f.kind]}`}>{kindLabel[f.kind]}</span>
              <p className="text-[13px] leading-relaxed text-slate-300">{f.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="panel p-5 text-[13px] text-slate-400">Nenhuma ocorrência detectada no texto atual. Preencha mais campos para uma análise completa.</div>
      )}

      <SectionTitle>Comparação: original × otimizado</SectionTitle>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="panel p-5">
          <p className="label mb-2">Campos soltos (original)</p>
          <p className="text-[13px] leading-relaxed text-slate-400">{freeText || '—'}</p>
        </div>
        <div className="panel p-5">
          <p className="label mb-2 flex items-center gap-2"><Wand2 size={13} /> Estruturado (otimizado)</p>
          <p className="text-[13px] leading-relaxed text-slate-300">{structured || '—'}</p>
        </div>
      </div>

      <Callout tone="warning" title="Limitação declarada">
        A pontuação mede a estrutura da instrução, não a verdade do conteúdo. Uma boa engenharia de prompts reduz ambiguidades e retrabalho, mas não garante a veracidade de uma resposta — a validação dos resultados permanece necessária.
      </Callout>
    </div>
  );
}
