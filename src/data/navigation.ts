import type { NavItem } from '@/types';

const I = 'Icons placeholder';

export const navItems: NavItem[] = [
  { id: 'inicio', label: 'Painel principal', icon: I, group: 'Geral', description: 'Indicadores, resumo e acesso rápido' },
  { id: 'enciclopedia', label: 'Enciclopédia científica', icon: I, group: 'Conteúdo', description: 'Capítulos integrais da investigação' },
  { id: 'laboratorio-tokenizacao', label: 'Laboratório de tokenização', icon: I, group: 'Laboratórios', description: 'Fragmentação textual, tokens reais e estimados' },
  { id: 'comparador-idiomas', label: 'Comparador de idiomas', icon: I, group: 'Laboratórios', description: 'Textos equivalentes em PT, EN e ES' },
  { id: 'engenharia-prompts', label: 'Engenharia de prompts', icon: I, group: 'Laboratórios', description: 'Editor estruturado e pontuação de qualidade' },
  { id: 'simulador-custos', label: 'Simulador de custos', icon: I, group: 'Laboratórios', description: 'Cálculo de consumo e projeção financeira' },
  { id: 'precisao-semantica', label: 'Precisão semântica', icon: I, group: 'Laboratórios', description: 'Significados, ambiguidades e pares conceituais' },
  { id: 'traducoes', label: 'Laboratório de traduções', icon: I, group: 'Laboratórios', description: 'Falsos cognatos e equivalência terminológica' },
  { id: 'biblioteca-terminologica', label: 'Biblioteca terminológica', icon: I, group: 'Laboratórios', description: 'Glossário categorizado e pesquisável' },
  { id: 'auditoria', label: 'Auditoria de respostas', icon: I, group: 'Laboratórios', description: 'Avaliação heurística de prompts e respostas' },
  { id: 'observatorio', label: 'Observatório de erros', icon: I, group: 'Laboratórios', description: 'Confiabilidade e matriz de auditoria' },
  { id: 'biblioteca-juridica', label: 'Biblioteca jurídica', icon: I, group: 'Conteúdo', description: 'Legislação brasileira aplicável à IA' },
  { id: 'ieiia', label: 'Metodologia IEIIA', icon: I, group: 'Conteúdo', description: 'Índice de eficiência idiomática experimental' },
  { id: 'simulacoes', label: 'Simulações visuais', icon: I, group: 'Laboratórios', description: 'Animações didáticas de processamento' },
  { id: 'glossario', label: 'Glossário técnico', icon: I, group: 'Conteúdo', description: 'Definições com referências cruzadas' },
  { id: 'referencias', label: 'Referências científicas', icon: I, group: 'Conteúdo', description: 'Fontes técnicas e jurídicas' },
  { id: 'sobre', label: 'Sobre o projeto', icon: I, group: 'Geral', description: 'Objetivos, idealização, limitações e método' },
  { id: 'creditos', label: 'Créditos e contato', icon: I, group: 'Geral', description: 'Idealizador, instituição e contatos oficiais' },
];
