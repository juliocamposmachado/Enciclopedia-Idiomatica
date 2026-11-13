import { useMemo } from 'react';
import { ClipboardCheck, Download, Share2 } from 'lucide-react';
import { PageHeader, SectionTitle } from '@/components/Shared';
import { Callout } from '@/components/Callout';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { downloadCSV } from '@/utils/storage';

interface AuditInput { prompt: string; response: string; expected: string }

const emptyAudit: AuditInput = { prompt: '', response: '', expected: '' };

interface AuditLine { criterion: string; status: 'ok' | 'warn' | 'fail'; detail: string }

function audit(i: AuditInput): { lines: AuditLine[]; score: number; needsFix: boolean } {
  const lines: AuditLine[] = [];
  const resp = i.response.trim();
  const exp = i.expected.trim();
  const prompt = i.prompt.trim();

  // Adherence: keyword overlap between expected and response
  const contentWords = (s: string) => new Set((s.toLowerCase().match(/[\p{L}]{5,}/gu) ?? []));
  if (exp && resp) {
    const eWords = contentWords(exp);
    const rWords = contentWords(resp);
    const overlap = [...eWords].filter((w) => rWords.has(w));
    const ratio = eWords.size ? overlap.length / eWords.size : 0;
    lines.push({
      criterion: 'Aderência à solicitação', status: ratio > 0.4 ? 'ok' : ratio > 0.15 ? 'warn' : 'fail',
      detail: `Sobreposição léxica de ${(ratio * 100).toFixed(0)}% entre resultado esperado e resposta recebida (heurística; não mede compreensão semântica).`,
    });
    lines.push({
      criterion: 'Completude', status: ratio > 0.4 ? 'ok' : 'warn',
      detail: ratio > 0.4 ? 'Elementos do resultado esperado parecem presentes na resposta.' : 'Parte dos elementos do resultado esperado não foi localizada na resposta (verificação manual recomendada).',
    });
  } else {
    lines.push({ criterion: 'Aderência à solicitação', status: 'warn', detail: 'Preencha o resultado esperado e a resposta recebida para avaliar a aderência.' });
    lines.push({ criterion: 'Completude', status: 'warn', detail: 'Avaliação indisponível sem os dois campos preenchidos.' });
  }

  // Prompt clarity
  lines.push({
    criterion: 'Clareza do prompt', status: prompt.length > 200 ? 'ok' : 'warn',
    detail: prompt.length > 200 ? `Prompt com ${prompt.length} caracteres — estrutura mínima presente.` : `Prompt curto (${prompt.length} caracteres): falta frequentemente contexto, critérios e formato (cap. 4 e 5).`,
  });

  // Terminological consistency within the response
  const terms = ['precisão', 'exatidão', 'eficiência', 'eficácia', 'correlação', 'causalidade', 'inferência', 'dedução'];
  const respLower = resp.toLowerCase();
  const mixed = terms.filter((t) => respLower.includes(t));
  lines.push({
    criterion: 'Consistência terminológica', status: mixed.length <= 2 ? 'ok' : 'warn',
    detail: mixed.length > 2
      ? `Vários termos técnicos próximos coocorrem (${mixed.join(', ')}). Verifique se foram usados em seus significados técnicos distintos.`
      : 'Nenhuma coocorrência suspeita de termos próximos detectada.',
  });

  // Contradictions: simple negation-claim patterns
  const hasNeg = /\b(não é possível|não existe|impossível)\b/i.test(resp);
  const hasPos = /\b(sempre|garantido|certamente|comprovadamente)\b/i.test(resp);
  lines.push({
    criterion: 'Contradições', status: hasNeg && hasPos ? 'fail' : 'warn',
    detail: hasNeg && hasPos
      ? 'Coocorrência de negações categóricas e garantias absolutas — examine se a resposta se contradiz.'
      : 'Análise heurística limitada: contradições semânticas exigem leitura humana.',
  });

  // Unsupported info: absolutist claims without hedging
  const unsupported = /\b(definitivamente|com certeza|sem dúvida|todo mundo sabe|é fato que)\b/i.test(resp);
  lines.push({
    criterion: 'Informações não fundamentadas', status: unsupported ? 'fail' : 'ok',
    detail: unsupported
      ? 'Expressões de certeza absoluta detectadas — possível sinal de afirmação sem suporte adequado (risco de alucinação).'
      : 'Nenhuma expressão de certeza absoluta detectada (heurística superficial).',
  });

  const fails = lines.filter((l) => l.status === 'fail').length;
  const warns = lines.filter((l) => l.status === 'warn').length;
  const score = Math.max(0, Math.round(100 - fails * 25 - warns * 8));
  return { lines, score, needsFix: fails > 0 || warns >= 3 };
}

export function AuditLab() {
  const [input, setInput] = useLocalStorage<AuditInput>('eii:audit', emptyAudit);

  const result = useMemo(() => audit(input), [input]);

  const statusIcon = { ok: '✓', warn: '!', fail: '×' };
  const statusColor = { ok: 'text-emerald-300', warn: 'text-amber-300', fail: 'text-rose-300' };

  return (
    <div>
      <PageHeader
        icon={<ClipboardCheck size={20} />}
        title="Auditoria de prompts e respostas"
        subtitle="Insira o prompt original, a resposta recebida e o resultado esperado para uma avaliação estruturada heurística de aderência, clareza, consistência e contradições."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {([['prompt', '1. Prompt original'], ['response', '2. Resposta recebida'], ['expected', '3. Resultado esperado']] as const).map(([key, label]) => (
          <label key={key} className="panel block p-4">
            <span className="label">{label}</span>
            <textarea
              value={input[key]}
              onChange={(e) => setInput({ ...input, [key]: e.target.value })}
              rows={6}
              className="input-base mt-1.5"
            />
          </label>
        ))}
      </div>

      <SectionTitle>Avaliação estruturada (heurística)</SectionTitle>
      <div className="mb-4 flex flex-wrap items-center gap-6 panel p-5">
        <div>
          <p className="label">Índice heurístico de qualidade</p>
          <p className="font-mono text-3xl font-bold text-cyan-300">{result.score}<span className="text-base text-slate-500">/100</span></p>
        </div>
        <div>
          <p className="label">Necessidade de correção</p>
          <p className={`font-semibold ${result.needsFix ? 'text-amber-300' : 'text-emerald-300'}`}>
            {result.needsFix ? 'Recomendada — revise os pontos sinalizados' : 'Não evidente na análise heurística'}
          </p>
        </div>
        <div className="ml-auto flex gap-2">
          <button className="btn-ghost text-[12px]" onClick={() => downloadCSV('auditoria.csv', result.lines.map((l) => ({ criterio: l.criterion, status: l.status, detalhe: l.detail })))}>
            <Download size={13} /> CSV
          </button>
          <button
            className="btn-ghost text-[12px]"
            onClick={async () => {
              try {
                const text = `Auditoria de resposta IA — índice ${result.score}/100\nPrompt: ${input.prompt.slice(0, 300)}\nAvaliação: ${result.needsFix ? 'correção recomendada' : 'sem evidência de correção'}`;
                if (navigator.share) await navigator.share({ title: 'Auditoria de resposta IA', text });
                else { await navigator.clipboard.writeText(text); alert('Resumo copiado para a área de transferência.'); }
              } catch { /* user cancelled share */ }
            }}
          ><Share2 size={13} /> Compartilhar</button>
        </div>
      </div>

      <div className="space-y-2">
        {result.lines.map((l) => (
          <div key={l.criterion} className="panel flex items-start gap-3 p-4">
            <span className={`font-mono font-bold ${statusColor[l.status]}`}>{statusIcon[l.status]}</span>
            <div>
              <p className="text-[13px] font-semibold text-white">{l.criterion}</p>
              <p className="text-[13px] text-slate-400">{l.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <Callout tone="warning" title="Sem alegação de compreensão semântica avançada">
        Sem integração com um modelo de IA, esta auditoria aplica heurísticas léxicas e de superfície (sobreposição de palavras, padrões de certeza absoluta, coocorrência terminológica). Ela não compreende o significado das respostas e não substitui avaliação humana independente.
      </Callout>
    </div>
  );
}
