import type { SemanticPair, TranslationEntry } from '@/types';

export const semanticPairs: SemanticPair[] = [
  {
    id: 'prec-exat', a: 'Precisão', b: 'Exatidão',
    distinction: 'Precisão é a proximidade entre resultados repetidos entre si (concordância). Exatidão é a proximidade do resultado em relação ao valor verdadeiro ou de referência. Um sistema pode ser preciso sem ser exato: resultados consistentes, porém deslocados do valor correto.',
    exampleCorrect: '"As medições do sensor são precisas, porém não exatas: agrupadas, mas deslocadas do valor de referência."',
    exampleWrong: '"O modelo é preciso" usado como sinônimo de "o modelo acerta o valor verdadeiro" — sem verificar a referência.',
  },
  {
    id: 'efic-efic', a: 'Eficiência', b: 'Eficácia',
    distinction: 'Eficiência é a relação entre recursos empregados e resultados obtidos. Eficácia é a capacidade de alcançar o objetivo, independentemente dos recursos. Um processo pode ser eficaz (atinge o objetivo) e ineficiente (consome recursos em excesso).',
    exampleCorrect: '"O fluxo é eficaz (entrega o relatório), mas ineficiente (exige 4 chamadas e 4.800 tokens)."',
    exampleWrong: '"O processo é eficiente porque entrega o resultado" — sem comparar recursos consumidos.',
  },
  {
    id: 'corr-caus', a: 'Correlação', b: 'Causalidade',
    distinction: 'Correlação é uma relação estatística entre variáveis. Causalidade é uma relação de produção de efeito. A correlação, por si, não estabelece causa — pode haver variável de confusão ou coincidência.',
    exampleCorrect: '"Há correlação entre consumo de tokens e erros; a causalidade requer investigação controlada."',
    exampleWrong: '"Tokens a mais causam erro, pois aumentam juntos" — confunde associação com causa.',
  },
  {
    id: 'inf-ded', a: 'Inferência', b: 'Dedução',
    distinction: 'Inferência é o processo geral de obter conclusões a partir de informações, incluindo formas probabilísticas. Dedução é uma inferência em que a conclusão decorre necessariamente das premissas. Em LLMs, a inferência é probabilística, não dedutiva.',
    exampleCorrect: '"O modelo realiza inferência probabilística: a resposta não é uma conclusão dedutiva garantida."',
    exampleWrong: '"O modelo deduziu a resposta" — atribui necessidade lógica a uma geração probabilística.',
  },
  {
    id: 'resp-resp', a: 'Responsabilidade', b: 'Responsabilização',
    distinction: 'Responsabilidade é o dever jurídico de responder pelas consequências de determinada conduta. Responsabilização é o processo efetivo de atribuir esse dever a alguém, com contraditório. Ter responsabilidade pressuposta não equivale a ter sido responsabilizado.',
    exampleCorrect: '"A responsabilização do fornecedor exige comprovação dos pressupostos legais de responsabilidade."',
    exampleWrong: '"O erro aconteceu, logo o fornecedor já foi responsabilizado" — confunde dever com processo instaurado.',
  },
  {
    id: 'trad-eq', a: 'Tradução', b: 'Equivalência semântica',
    distinction: 'Tradução é a conversão de uma expressão entre idiomas. Equivalência semântica é a preservação do significado conceitual. Uma tradução gramaticalmente correta pode não preservar o conceito técnico (accuracy ≠ precisão, em contextos científicos).',
    exampleCorrect: '"A tradução literal de accuracy é adequada ao contexto estatístico como exatidão, não como precisão."',
    exampleWrong: '"Traduziu tudo, então o significado técnico foi preservado" — sem verificação terminológica.',
  },
];

export const wordSenses: Record<string, { meanings: string[]; contexts: string[]; synonyms: string[]; antonyms: string[]; ambiguities: string[]; related: string[]; good: string[]; bad: string[] }> = {
  precisão: {
    meanings: ['Proximidade entre resultados repetidos (concordância)', 'Qualidade de algo feito com exatidão e detalhe (uso corrente)', 'Em estatística: inverso da variabilidade de estimadores'],
    contexts: ['Metrologia e estatística', 'Engenharia', 'Uso cotidiano'],
    synonyms: ['concordância', 'acuidade (conforme disciplina)', 'rigor'],
    antonyms: ['dispersão', 'imprecisão', 'vagueza'],
    ambiguities: ['Confundida com exatidão em contextos técnicos', 'Uso corrente dilui o significado estatístico'],
    related: ['exatidão', 'confiabilidade', 'acurácia'],
    good: ['"A precisão das medições foi avaliada em relação ao padrão de referência."'],
    bad: ['"O modelo é preciso" sem definir critério (acerto? concordância? referência?)'],
  },
  'eficiência': {
    meanings: ['Relação entre recursos empregados e resultados obtidos', 'Qualidade de quem age com competência (uso corrente)'],
    contexts: ['Economia computacional', 'Engenharia', 'Gestão'],
    synonyms: ['produtividade', 'rendimento'],
    antonyms: ['desperdício', 'ineficiência'],
    ambiguities: ['Confundida com eficácia (alcançar o objetivo, qualquer que seja o custo)'],
    related: ['eficácia', 'custo por resultado válido'],
    good: ['"A eficiência do prompt melhorou: mesma qualidade com menos tokens."'],
    bad: ['"É eficiente porque funciona" — sem considerar recursos.'],
  },
  'inference': {
    meanings: ['Em LLMs: geração probabilística de tokens sequenciais', 'Em lógica: derivação de conclusões a partir de premissas'],
    contexts: ['Arquitetura de modelos', 'Lógica', 'Estatística'],
    synonyms: ['derivação (parcial)', 'conclusão'],
    antonyms: ['dedução (quando exige necessidade lógica)', 'aleatoriedade pura'],
    ambiguities: ['Atribuir necessidade lógica a saídas probabilísticas'],
    related: ['inferência', 'dedução', 'probabilidade'],
    good: ['"A inferência do modelo depende de temperatura e amostragem."'],
    bad: ['"O modelo deduziu" — sem premissas que garantam a conclusão.'],
  },
  'responsabilidade': {
    meanings: ['Dever jurídico de responder por consequências de conduta', 'Atributo pessoal (ser responsável)'],
    contexts: ['Direito civil', 'Direito do consumidor', 'Uso cotidiano'],
    synonyms: ['dever jurídico', 'imputabilidade (conforme contexto)'],
    antonyms: ['isenção', 'irresponsabilidade'],
    ambiguities: ['Confundida com responsabilização (processo efetivo de atribuição)', 'Diferente de obrigação e dever jurídico em sentido estrito'],
    related: ['responsabilização', 'imputabilidade', 'obrigação'],
    good: ['"A responsabilidade do fornecedor pressupõe dano, defeito e nexo causal."'],
    bad: ['"A plataforma é responsável automaticamente por qualquer erro do modelo."'],
  },
};

export const translationEntries: TranslationEntry[] = [
  {
    id: 'accuracy', pt: 'precisão', en: 'accuracy', es: 'precisión', fr: 'précision', de: 'Genauigkeit',
    note: 'Falso cognato técnico clássico: accuracy (exatidão) e precision (precisão) são conceitos distintos em estatística. Traduzir accuracy como "precisão" pode alterar o conceito.',
    type: 'falso-cognato',
  },
  {
    id: 'actualmente', pt: 'atualmente', en: 'actually', es: 'actualmente', fr: 'actuellement', de: 'gegenwärtig',
    note: 'Falso cognato: "actually" em inglês significa "na verdade / de fato", não "atualmente".',
    type: 'falso-cognato',
  },
  {
    id: 'tokenization', pt: 'tokenização', en: 'tokenization', es: 'tokenización', fr: 'tokenisation', de: 'Tokenisierung',
    note: 'Termo técnico estável entre idiomas, mas com derivações morfológicas que afetam a fragmentação em tokens.',
    type: 'termo-tecnico',
  },
  {
    id: 'prompt', pt: 'prompt (instrução)', en: 'prompt', es: 'prompt / indicación', fr: 'prompt / requête', de: 'Prompt / Eingabeaufforderung',
    note: 'Anglicismo técnico adotado em vários idiomas; traduções literais ("indicação", "requête") podem não preservar o conceito de engenharia de prompts.',
    type: 'termo-tecnico',
  },
  {
    id: 'responsibility', pt: 'responsabilidade', en: 'responsibility / liability', es: 'responsabilidad', fr: 'responsabilité', de: 'Verantwortung / Haftung',
    note: 'O inglês distingue responsibility (dever) de liability (responsabilidade legal/passivo). Traduções automáticas frequentemente confundem os dois em contextos jurídicos.',
    type: 'ambiguidade',
  },
  {
    id: 'custo', pt: 'custo por resultado válido', en: 'cost per valid result', es: 'coste por resultado válido', fr: 'coût par résultat valide', de: 'Kosten pro gültigem Ergebnis',
    note: 'Expressões compostas técnicas devem preservar o critério de validação; traduções literais de "válido" podem perder o sentido metodológico.',
    type: 'expressao',
  },
  {
    id: 'pego', pt: 'pegar (general)', en: 'to take / to get', es: 'coger / tomar', fr: 'prendre', de: 'nehmen',
    note: 'Ambiguidade cultural: "coger" em espanhol tem significados regionais muito diferentes; contexto cultural é indispensável.',
    type: 'ambiguidade',
  },
  {
    id: 'idioma-quebra', pt: 'quebrar o galho (expr.)', en: 'to make do', es: 'apañarse', fr: 'se débrouiller', de: 'sich behelfen',
    note: 'Expressões idiomáticas raramente têm equivalente literal; tradução automática sem contexto cultural produz absurdo ("break the branch").',
    type: 'expressao',
  },
];

export const errorTypeDefinitions: { id: string; label: string; description: string; tone: string }[] = [
  { id: 'erro-tecnico', label: 'ERRO TÉCNICO', description: 'Falha pontual de execução, recuperação ou cálculo, sem padrão deliberado.', tone: 'amber' },
  { id: 'limitacao-arquitetural', label: 'LIMITAÇÃO ARQUITETURAL', description: 'Restrição inerente ao design do modelo (contexto, tokenização, inferência probabilística).', tone: 'sky' },
  { id: 'erro-prompt', label: 'ERRO DE ENGENHARIA DE PROMPT', description: 'Falha decorrente de formulação inadequada da instrução pelo usuário.', tone: 'violet' },
  { id: 'hipotese-comercial', label: 'HIPÓTESE DE PROBLEMA COMERCIAL', description: 'Suspeita de incentivo econômico indevido — exige investigação; falha não é prova de intenção.', tone: 'orange' },
  { id: 'evidencia-abusiva', label: 'EVIDÊNCIA DE PRÁTICA ABUSIVA', description: 'Somente com evidências técnicas, documentais, contratuais ou estatísticas verificáveis de estratégia deliberada.', tone: 'rose' },
];
