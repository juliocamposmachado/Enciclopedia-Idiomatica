import { encodingForModel, type Tiktoken } from 'js-tiktoken';
import type { TokenPiece } from '@/types';

let encoder: Tiktoken | null = null;
function getEncoder(): Tiktoken {
  if (!encoder) encoder = encodingForModel('gpt-4o');
  return encoder;
}

export const TECH_TERMS = [
  'tokenização', 'tokenizador', 'semantic', 'inference', 'inicializar', 'inicialização',
  'obsolecência', 'responsabilização', 'imputabilidade', 'concordância', 'desambiguação',
  'alucinação', 'multilíngue', 'computacional', 'arquitetura', 'probabilística',
  'intelegência', 'inteligência', 'terminologia', 'idiomática', 'fragmentação',
];

const PT_STOP = new Set(['de', 'da', 'do', 'das', 'dos', 'e', 'em', 'um', 'uma', 'para', 'com', 'por', 'que', 'a', 'o', 'as', 'os', 'no', 'na', 'se', 'ao', 'à']);

/** Didactic heuristic tokenizer: splits words into chunks of <= maxLen for long/unfrequent words. */
export function heuristicTokenize(text: string): TokenPiece[] {
  const pieces: TokenPiece[] = [];
  const regex = /(\s+)|([\p{L}\p{N}\u00C0-\u024F\u1E00-\u1EFF]+)|(.)/gu;
  const wordCount = new Map<string, number>();
  const matches = [...text.matchAll(regex)];
  for (const m of matches) matches.length && wordCount.set(m[0].toLowerCase(), (wordCount.get(m[0].toLowerCase()) ?? 0) + 1);

  for (const m of matches) {
    const raw = m[0] ?? '';
    if (/^\s+$/.test(raw)) {
      pieces.push({ text: raw, type: 'space' });
    } else if (/^[\p{L}\p{N}]+$/u.test(raw)) {
      const lower = raw.toLowerCase();
      const isTechnical = TECH_TERMS.some((t) => lower.includes(t)) || raw.length > 12;
      if (isTechnical && raw.length > 6) {
        const chunkSize = 4;
        for (let i = 0; i < raw.length; i += chunkSize) {
          pieces.push({ text: raw.slice(i, i + chunkSize), type: i === 0 && !TECH_TERMS.some((t) => lower.includes(t)) ? 'word' : 'fragment' });
        }
      } else {
        pieces.push({ text: raw, type: (wordCount.get(lower) ?? 0) > 2 && !PT_STOP.has(lower) ? 'repeated' : 'word' });
      }
    } else {
      pieces.push({ text: raw, type: 'punct' });
    }
  }
  return pieces;
}

export interface TokenAnalysis {
  chars: number;
  words: number;
  heuristicTokens: number;
  realTokens: number | null;
  pieces: TokenPiece[];
  realPieces: string[] | null;
  repeated: string[];
  longWords: string[];
}

export function analyzeText(text: string): TokenAnalysis {
  const pieces = heuristicTokenize(text);
  const words = text.trim() ? text.trim().split(/\s+/).filter(Boolean).length : 0;
  let realPieces: string[] | null = null;
  let realTokens: number | null = null;
  try {
    const enc = getEncoder();
    realPieces = enc.encode(text).map(() => ''); // count only; decoding per-id is heavy
    realTokens = enc.encode(text).length;
  } catch {
    realTokens = null;
  }
  const freq = new Map<string, number>();
  for (const p of pieces) {
    if (p.type === 'word' || p.type === 'fragment') {
      const k = p.text.toLowerCase();
      freq.set(k, (freq.get(k) ?? 0) + 1);
    }
  }
  const repeated = [...freq.entries()].filter(([, c]) => c > 2).map(([w]) => w);
  const longWords = [...new Set(text.match(/[\p{L}]{14,}/gu) ?? [])];
  return {
    chars: text.length,
    words,
    heuristicTokens: pieces.filter((p) => p.type !== 'space').length,
    realTokens,
    pieces,
    realPieces,
    repeated,
    longWords,
  };
}

export function estimateRealTokens(text: string): number | null {
  try {
    return getEncoder().encode(text).length;
  } catch {
    return null;
  }
}

export function countRealTokens(text: string): number {
  return estimateRealTokens(text) ?? 0;
}
