import { useMemo, useState } from 'react';
import { BookMarked, Linkedin, Globe, MessageCircle, User } from 'lucide-react';
import { glossary, glossaryCategories } from '@/data/glossary';
import { PageHeader } from '@/components/Shared';
import { Callout } from '@/components/Callout';

export function GlossaryPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Todas');
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return glossary.filter(
      (g) => (category === 'Todas' || g.category === category) && (!q || g.term.toLowerCase().includes(q) || g.definition.toLowerCase().includes(q)),
    );
  }, [query, category]);

  const term = glossary.find((g) => g.term === selected);

  return (
    <div>
      <PageHeader
        icon={<BookMarked size={20} />}
        title="Glossário técnico"
        subtitle="Definições com categorias, exemplos e referências cruzadas. Pesquise e filtre por área do conhecimento."
      />

      <div className="mb-5 flex flex-wrap gap-3">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Pesquisar conceito..." className="input-base max-w-xs" aria-label="Pesquisar no glossário" />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="input-base max-w-xs" aria-label="Filtrar por categoria">
          <option>Todas</option>
          {glossaryCategories.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-2">
          {filtered.map((g) => (
            <button
              key={g.term}
              onClick={() => setSelected(g.term)}
              className={`panel panel-hover block w-full p-4 text-left ${selected === g.term ? 'border-cyan-400/40' : ''}`}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold text-white">{g.term}</p>
                <span className="tag bg-cyan-400/10 text-cyan-300">{g.category}</span>
              </div>
              <p className="mt-1 line-clamp-2 text-[13px] text-slate-400">{g.definition}</p>
            </button>
          ))}
          {filtered.length === 0 && <p className="text-sm text-slate-500">Nenhum conceito encontrado.</p>}
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          {term ? (
            <div className="panel p-6">
              <span className="tag mb-2 bg-cyan-400/10 text-cyan-300">{term.category}</span>
              <h3 className="text-xl font-bold text-white">{term.term}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-slate-300">{term.definition}</p>
              {term.example && (
                <>
                  <p className="label mt-4 mb-1">Exemplo</p>
                  <p className="text-[13px] italic leading-relaxed text-slate-300">{term.example}</p>
                </>
              )}
              {term.related && term.related.length > 0 && (
                <>
                  <p className="label mt-4 mb-2">Referências cruzadas</p>
                  <div className="flex flex-wrap gap-2">
                    {term.related.map((r) => {
                      const exists = glossary.some((g) => g.term === r);
                      return exists ? (
                        <button key={r} onClick={() => setSelected(r)} className="tag bg-violet-400/10 text-violet-300 hover:bg-violet-400/20">{r}</button>
                      ) : (
                        <span key={r} className="tag bg-white/5 text-slate-400">{r}</span>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="panel p-6 text-sm text-slate-500">Selecione um conceito para ver a definição completa, exemplos e referências cruzadas.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export function AboutPage() {
  return (
    <div>
      <PageHeader
        icon={<BookMarked size={20} />}
        title="Sobre o projeto"
        subtitle="Natureza, objetivos, método e limitações da Enciclopédia Idiomática da Inteligência Artificial."
      />
      <div className="prose-content panel p-6 sm:p-8">
        <h2>Objetivo</h2>
        <p>Estabelecer uma metodologia na qual a linguagem deixa de ser apenas um instrumento de comunicação e passa a ser tratada como um componente de engenharia de sistemas inteligentes — cobrindo tokenização, semântica, economia de processamento e responsabilidade jurídica.</p>
        <h2>Natureza deste trabalho</h2>
        <p>Documento técnico-conceitual e proposta de investigação interdisciplinar. As hipóteses econômicas e o índice IEIIA precisam de validação empírica. Todos os números exibidos na plataforma são simulações didáticas, nunca resultados reais de benchmark.</p>
        <h2>Limitações declaradas</h2>
        <ul>
          <li>A estimativa de tokens usa um tokenizador real (codificação compatível com GPT-4o) e um simulador didático com heurísticas visíveis — nenhum dos dois representa todos os modelos.</li>
          <li>Nenhuma tradução automática é simulada sem integração real com serviço de IA.</li>
          <li>A auditoria de respostas é heurística e não alega compreensão semântica avançada.</li>
          <li>A fundamentação jurídica é informativa e não substitui análise de caso concreto.</li>
          <li>Falsas alegações não são feitas: falha não é prova de intenção; hipóteses comerciais exigem evidências verificáveis.</li>
        </ul>
        <h2>Como usar</h2>
        <p>Comece pela enciclopédia para a base conceitual, utilize os laboratórios para experimentar e registre seus testes no observatório e na metodologia IEIIA. Os dados dos laboratórios ficam salvos localmente no seu navegador, e os resultados podem ser exportados em CSV.</p>
      </div>

      <div className="prose-content panel mt-6 p-6 sm:p-8">
        <h2>Idealização e identidade institucional</h2>
        <p>A Enciclopédia Idiomática da Inteligência Artificial é um projeto idealizado por Julio Cesar Campos Machado, com iniciativa institucional da Like Look Solutions. Seu propósito é contribuir para a compreensão da relação entre linguagem humana, inteligência artificial, engenharia de prompts, precisão semântica e eficiência computacional, promovendo o conhecimento, a pesquisa e o uso mais consciente das tecnologias de inteligência artificial.</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="panel p-5">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 text-cyan-300"><User size={18} /></div>
              <div>
                <p className="font-semibold text-white">Julio Cesar Campos Machado</p>
                <p className="text-[12px] text-slate-400">Idealizador da Enciclopédia Idiomática da Inteligência Artificial</p>
              </div>
            </div>
            <div className="space-y-2 text-[13px]">
              <a href="https://br.linkedin.com/in/juliocamposmachado" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-300 transition-colors hover:text-cyan-300">
                <Linkedin size={14} className="text-cyan-400" /> br.linkedin.com/in/juliocamposmachado
              </a>
              <a href="https://wa.me/5511970603441" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-300 transition-colors hover:text-cyan-300">
                <MessageCircle size={14} className="text-cyan-400" /> +55 11 97060-3441
              </a>
            </div>
          </div>

          <div className="panel p-5">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-violet-400/20 bg-violet-400/10 text-violet-300"><Globe size={18} /></div>
              <div>
                <p className="font-semibold text-white">Like Look Solutions</p>
                <p className="text-[12px] text-slate-400">Organização e iniciativa institucional do projeto</p>
              </div>
            </div>
            <div className="space-y-2 text-[13px]">
              <a href="https://likelook.wixsite.com/solutions" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-300 transition-colors hover:text-cyan-300">
                <Globe size={14} className="text-violet-400" /> likelook.wixsite.com/solutions
              </a>
            </div>
            <p className="mt-3 text-[12px] leading-relaxed text-slate-500">
              Iniciativa de pesquisa, organização, sistematização e divulgação de conhecimentos relacionados à linguagem, à inteligência artificial, à engenharia de prompts, à precisão semântica, à eficiência computacional e à economia de tokens.
            </p>
          </div>
        </div>

        <Callout tone="info" title="Nota institucional">
          Este bloco apresenta exclusivamente as informações fornecidas pela idealização do projeto. Nenhuma informação biográfica, qualificação profissional, certificação ou reconhecimento acadêmico além dos aqui declarados foi adicionado.
        </Callout>
      </div>
    </div>
  );
}
