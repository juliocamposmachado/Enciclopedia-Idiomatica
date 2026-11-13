import { describe, expect, it } from 'vitest';
import { heuristicTokenize, estimateRealTokens } from '@/utils/tokenizer';
import { toCSV } from '@/utils/storage';
import { scenarioCost } from '@/utils/costs';

describe('tokenização', () => {
  it('conta tokens reais (codificação GPT-4o) para texto simples', () => {
    const n = estimateRealTokens('Hello world');
    expect(n).toBeGreaterThan(0);
    expect(n).toBeLessThanOrEqual(4);
  });

  it('retorna 0 para texto vazio', () => {
    expect(estimateRealTokens('')).toBe(0);
  });

  it('fragmenta palavras longas em múltiplos blocos (heurística)', () => {
    const pieces = heuristicTokenize('responsabilizando');
    const fragments = pieces.filter((p) => p.type === 'fragment');
    expect(fragments.length).toBeGreaterThanOrEqual(2);
  });

  it('não produz peças vazias', () => {
    const pieces = heuristicTokenize('Analise a precisão dos resultados.');
    expect(pieces.every((p) => p.text.length > 0)).toBe(true);
  });
});

describe('CSV', () => {
  it('escapa separadores e aspas', () => {
    const csv = toCSV([{ nome: 'Item; um', valor: 2, obs: 'tem "aspas"' }]);
    expect(csv).toContain('"Item; um"');
    expect(csv).toContain('"tem ""aspas"""');
  });

  it('produz cabeçalho e linhas', () => {
    const csv = toCSV([{ a: 1, b: 2 }, { a: 3, b: 4 }]);
    const lines = csv.split('\n');
    expect(lines).toHaveLength(3);
    expect(lines[0]).toBe('a;b');
  });
});

describe('cálculo de custos', () => {
  it('aplica a fórmula CUSTO = T_in×P_in + T_out×P_out por milhão', () => {
    const c = scenarioCost({ inputTokens: 1_000_000, outputTokens: 1_000_000, inputPrice: 2.5, outputPrice: 10, calls: 1, reasoningPrice: 0, reasoningTokens: 0, cacheDiscountPct: 0 });
    expect(c.perCall).toBeCloseTo(12.5, 6);
    expect(c.perOp).toBeCloseTo(12.5, 6);
  });

  it('aplica desconto de cache sobre o preço de entrada', () => {
    const c = scenarioCost({ inputTokens: 1_000_000, outputTokens: 0, inputPrice: 2, outputPrice: 0, calls: 1, reasoningPrice: 0, reasoningTokens: 0, cacheDiscountPct: 50 });
    expect(c.perCall).toBeCloseTo(1, 6);
  });

  it('multiplica pelas chamadas da operação', () => {
    const c = scenarioCost({ inputTokens: 500_000, outputTokens: 0, inputPrice: 1, outputPrice: 0, calls: 4, reasoningPrice: 0, reasoningTokens: 0, cacheDiscountPct: 0 });
    expect(c.perOp).toBeCloseTo(2, 6);
  });
});
