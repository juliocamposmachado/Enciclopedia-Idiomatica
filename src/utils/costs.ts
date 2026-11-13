export interface CostScenario {
  inputTokens: number;
  outputTokens: number;
  calls: number;
  inputPrice: number;
  outputPrice: number;
  reasoningPrice: number;
  reasoningTokens: number;
  cacheDiscountPct: number;
}

/** CUSTO = (T_in × P_in + T_out × P_out + T_r × P_r) × chamadas. Preços por milhão de tokens; desconto de cache sobre a entrada. */
export function scenarioCost(s: CostScenario) {
  const effectiveInput = s.inputPrice * (1 - s.cacheDiscountPct / 100);
  const perCall = (s.inputTokens * effectiveInput + s.outputTokens * s.outputPrice + s.reasoningTokens * s.reasoningPrice) / 1_000_000;
  return { perCall, perOp: perCall * s.calls };
}
