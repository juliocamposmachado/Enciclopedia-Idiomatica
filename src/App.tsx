import { Layout } from '@/components/Layout';
import { useTheme } from '@/hooks/useTheme';
import { useHashRoute } from '@/hooks/useHashRoute';
import { DashboardPage } from '@/pages/DashboardPage';
import { EncyclopediaPage, ReferencesPage } from '@/pages/EncyclopediaPage';
import { LegalPage } from '@/pages/LegalPage';
import { IeiiaPage } from '@/pages/IeiiaPage';
import { GlossaryPage, AboutPage } from '@/pages/MiscPages';
import { CreditsPage } from '@/pages/CreditsPage';
import { TokenizerLab } from '@/laboratories/TokenizerLab';
import { LanguageComparator } from '@/laboratories/LanguageComparator';
import { PromptEngineerLab } from '@/laboratories/PromptEngineerLab';
import { CostSimulator } from '@/laboratories/CostSimulator';
import { SemanticLab } from '@/laboratories/SemanticLab';
import { TranslationLab } from '@/laboratories/TranslationLab';
import { AuditLab } from '@/laboratories/AuditLab';
import { ObservatoryLab } from '@/laboratories/ObservatoryLab';
import { SimulationsPage } from '@/simulations/SimulationsPage';

const routes: Record<string, React.ComponentType> = {
  inicio: DashboardPage,
  enciclopedia: EncyclopediaPage,
  'laboratorio-tokenizacao': TokenizerLab,
  'comparador-idiomas': LanguageComparator,
  'engenharia-prompts': PromptEngineerLab,
  'simulador-custos': CostSimulator,
  'precisao-semantica': SemanticLab,
  traducoes: TranslationLab,
  'biblioteca-terminologica': GlossaryPage,
  auditoria: AuditLab,
  observatorio: ObservatoryLab,
  'biblioteca-juridica': LegalPage,
  ieiia: IeiiaPage,
  simulacoes: SimulationsPage,
  glossario: GlossaryPage,
  referencias: ReferencesPage,
  sobre: AboutPage,
  creditos: CreditsPage,
};

export default function App() {
  const { theme, toggle } = useTheme();
  const [route] = useHashRoute();
  const Page = routes[route] ?? DashboardPage;

  return (
    <Layout theme={theme} toggleTheme={toggle}>
      <Page />
    </Layout>
  );
}
