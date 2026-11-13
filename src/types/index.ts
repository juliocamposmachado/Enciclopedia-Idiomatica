export type Theme = 'dark' | 'light';

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  group: string;
  description?: string;
}

export interface GlossaryTerm {
  term: string;
  category: string;
  definition: string;
  example?: string;
  related?: string[];
}

export interface LegalAct {
  id: string;
  number: string;
  title: string;
  status: 'vigente' | 'projeto';
  ementa: string;
  articles: { ref: string; subject: string }[];
  aiRelation: string;
  examples: string[];
  limits: string;
  sourceUrl: string;
  sourceName: string;
}

export interface SemanticPair {
  id: string;
  a: string;
  b: string;
  distinction: string;
  exampleCorrect: string;
  exampleWrong: string;
}

export interface TranslationEntry {
  id: string;
  pt: string;
  en: string;
  es: string;
  fr: string;
  de: string;
  note: string;
  type: 'falso-cognato' | 'termo-tecnico' | 'expressao' | 'ambiguidade';
}

export interface ExperimentRecord {
  id: string;
  createdAt: string;
  model: string;
  language: string;
  promptSummary: string;
  inputTokens: number;
  outputTokens: number;
  calls: number;
  cost: number;
  correct: number;
  total: number;
  errorType: 'erro-tecnico' | 'limitacao-arquitetural' | 'erro-prompt' | 'hipotese-comercial' | 'evidencia-abusiva' | 'nenhum';
  notes: string;
}

export interface TokenPiece {
  text: string;
  type: 'word' | 'punct' | 'space' | 'fragment' | 'technical' | 'repeated';
}
