import type { ReactNode } from 'react';
import { Callout } from '@/components/Callout';

export interface EditorialSection {
  id: string;
  number: string;
  title: string;
  level: 1 | 2;
  content: ReactNode;
}

const eq = 'font-mono text-cyan-300 bg-white/5 rounded-lg px-4 py-3 block text-center my-4 overflow-x-auto';

export const editorialSections: EditorialSection[] = [
  {
    id: 'sec-new-2', number: '2', level: 1, title: 'Linguagem natural e processamento computacional',
    content: (
      <div className="prose-content">
        <p>A linguagem natural — falada ou escrita por pessoas — não foi projetada para computadores. Ela evoluiu para comunicação entre humanos: tolerante a ruído, dependente de contexto compartilhado, cheia de exceções. O processamento computacional, ao contrário, exige representações formais, quantificáveis e operáveis por máquinas. A ponte entre esses dois mundos é o campo do Processamento de Linguagem Natural (NLP).</p>
        <h3>O percurso do texto pela máquina</h3>
        <p>Quando um usuário envia uma frase a um modelo de linguagem, ela percorre uma sequência de transformações:</p>
        <ol>
          <li><strong>Tokenização:</strong> o texto é dividido em unidades (tokens) pertencentes ao vocabulário do tokenizador.</li>
          <li><strong>Representação numérica:</strong> cada token recebe um identificador inteiro e um vetor denso (embedding) que codifica relações semânticas aprendidas.</li>
          <li><strong>Processamento contextual:</strong> camadas de atenção ponderam as relações entre todos os tokens da sequência.</li>
          <li><strong>Inferência probabilística:</strong> o modelo calcula a distribuição de probabilidade do próximo token.</li>
          <li><strong>Geração sequencial:</strong> a resposta é produzida token a token, condicionada a tudo o que veio antes.</li>
        </ol>
        <p>Cada etapa introduz possibilidades de perda, fragmentação ou ambiguidade. Uma palavra inexistente no vocabulário do tokenizador se fragmenta; uma ambiguidade lexical pode desviar a atenção; um contexto insuficiente aumenta a incerteza da distribuição de probabilidade.</p>
        <h3>Por que a linguagem natural é difícil para máquinas</h3>
        <table>
          <thead><tr><th>Propriedade da linguagem humana</th><th>Consequência computacional</th></tr></thead>
          <tbody>
            <tr><td>Ambiguidade lexical ("banco", "cabeça")</td><td>Múltiplas representações possíveis; erro de desambiguação altera o sentido</td></tr>
            <tr><td>Polissemia contextual</td><td>O mesmo termo exige representações diferentes conforme o contexto</td></tr>
            <tr><td>Implicatura e ironia</td><td>O significado pretendido excede o significado literal</td></tr>
            <tr><td>Morfologia rica (flexões, derivação)</td><td>Fragmentação desigual em tokens; maior consumo</td></tr>
            <tr><td>Variação dialectal e de registro</td><td>Desempenho desigual entre variedades linguísticas</td></tr>
            <tr><td>Referência implícita (anáfora, elipse)</td><td>Exige resolução de dependências de longo alcance</td></tr>
          </tbody>
        </table>
        <h3>Exemplos práticos</h3>
        <p>A frase <em>"Ele subiu o pedido para a diretoria"</em> usa "subir" em sentido organizacional, não físico. Um sistema sem domínio do registro corporativo brasileiro pode interpretar literalmente. Já <em>"o paciente não reage ao medicamento"</em> exige contexto clínico: "reagir" aqui é termo técnico, não comportamento social.</p>
        <h3>Erros comuns</h3>
        <ul>
          <li>Assumir que o modelo "entende" palavras: ele processa tokens e relações estatísticas entre eles.</li>
          <li>Presumir que o sistema acessa conhecimento externo não fornecido no prompt ou presente no treinamento.</li>
          <li>Tratar a saída probabilística como consulta a um banco de fatos.</li>
        </ul>
        <h3>Recomendações</h3>
        <ul>
          <li>Forneça o contexto que um humano precisaria, sem pressupor conhecimento implícito.</li>
          <li>Evite depender de ironia, trocadilhos ou referências culturais não marcadas em instruções técnicas.</li>
          <li>Verifique como termos do seu domínio se fragmentam e são interpretados, usando o laboratório de tokenização.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'sec-new-4', number: '4', level: 1, title: 'Particularidades da língua portuguesa brasileira',
    content: (
      <div className="prose-content">
        <p>O português brasileiro combina propriedades morfológicas que aumentam a variedade de formas de palavra: verbos com paradigmas extensos, concordância nominal e verbal obrigatória, gênero gramatical em substantivos e adjetivos, acentuação gráfica e um vocabulário técnico híbrido de origem latina, grega e estrangeira.</p>
        <h3>Consequências para o processamento</h3>
        <p>Cada forma flexionada é uma sequência de caracteres diferente. Onde o inglês tem "analyze/analyzes/analyzed/analyzing", o português tem um paradigma verbal completo: "analisar, analisa, analisou, analisavam, analisarão, analisando, analisado, analisada...". Formas raras ou irregulares tendem a fragmentar mais no tokenizador, pois aparecem com menor frequência nos dados de treinamento.</p>
        <table>
          <thead><tr><th>Particularidade</th><th>Exemplo</th><th>Efeito potencial</th></tr></thead>
          <tbody>
            <tr><td>Flexão verbal extensa</td><td>"analisássemos", "analisarão"</td><td>Maior fragmentação em tokens para formas raras</td></tr>
            <tr><td>Concordância nominal</td><td>"resultados precisos" / "precisões exatas"</td><td>Variações morfológicas multiplicam formas</td></tr>
            <tr><td>Acentuação</td><td>"precisão", "inteligência"</td><td>Caracteres acentuados podem influir na fragmentação</td></tr>
            <tr><td>Contrações</td><td>"do", "da", "no", "na", "ao"</td><td>Unidades curtas frequentes, geralmente tokens próprios</td></tr>
            <tr><td>Empréstimos técnicos</td><td>"tokenização", "prompt", "machine learning"</td><td>Alternância entre transliteração e anglicismo</td></tr>
            <tr><td>Ambiguidade sintática</td><td>"Analise os resultados da agência no banco"</td><td>Interpretações dúplices dependem do contexto</td></tr>
          </tbody>
        </table>
        <h3>Exemplo prático: o mesmo conceito, formas diferentes</h3>
        <p>Compare: "a análise demonstrou" / "as análises demonstraram" / "analisando os dados". São três formas do mesmo verbo, com grafias e fragmentações potencialmente distintas. Em documentos longos, a variabilidade morfológica interfere em buscas, contagens de frequência e similaridade — e também na representação em tokens.</p>
        <h3>Erros comuns</h3>
        <ul>
          <li>Importar heurísticas do inglês (por exemplo, "toda palavra é um token") sem verificar no tokenizador real.</li>
          <li>Presumir que acentos são ignorados ou tratados como no inglês.</li>
          <li>Ignorar que formas verbais raras podem se fragmentar mais e custar mais.</li>
        </ul>
        <h3>Recomendações</h3>
        <ul>
          <li>Teste termos do seu domínio no laboratório de tokenização antes de otimizar prompts.</li>
          <li>Prefira formas lexicais recorrentes quando a precisão não exigir infrequência.</li>
          <li>Documente as particularidades encontradas no dicionário terminológico do seu projeto.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'sec-new-8', number: '8', level: 1, title: 'Arquitetura de prompts profissionais',
    content: (
      <div className="prose-content">
        <p>O capítulo 7 apresenta os componentes da engenharia de prompts. Este capítulo trata da arquitetura: como organizar esses componentes em instruções reais, comparar abordagens e evitar falhas recorrentes.</p>
        <h3>Padrões de organização</h3>
        <table>
          <thead><tr><th>Padrão</th><th>Estrutura</th><th>Melhor uso</th></tr></thead>
          <tbody>
            <tr><td>Seções rotuladas</td><td>Blocos com cabeçalhos (IDENTIDADE, OBJETIVO, RESTRIÇÕES...)</td><td>Tarefas complexas, multi-etapa, com requisitos many</td></tr>
            <tr><td>Parágrafo denso</td><td>Uma instrução fluida e compacta</td><td>Tarefas simples e bem conhecidas</td></tr>
            <tr><td>Exemplar único (one-shot)</td><td>Um exemplo do par entrada → saída</td><td>Alinhar formato e nível de detalhe</td></tr>
            <tr><td>Multi-exemplar (few-shot)</td><td>Vários exemplos representativos</td><td>Padrões difíceis de descrever em palavras</td></tr>
            <tr><td>Instrução + dados separados</td><td>Instruções fixas; conteúdo variável delimitado</td><td>Processar conteúdo externo com segurança (reduz injeção de prompt)</td></tr>
          </tbody>
        </table>
        <h3>Comparação entre abordagens</h3>
        <p>Para a tarefa "resumir um contrato", uma instrução em parágrafo denso ("Resuma este contrato em 5 pontos") é suficiente e econômica. Já um parecer jurídico exige seções rotuladas: identidade funcional (especialista em contratos), contexto (jurisdição, tipo de contrato), terminologia (diferença entre responsabilidade e responsabilização), restrições (não inventar cláusulas; diferenciar fato de hipótese), formato (tabela + fundamentação) e validação (conferir citações).</p>
        <p>O padrão mais econômico não é sempre o melhor: o critério é o custo por resultado validado (capítulo 11), não o tamanho do prompt.</p>
        <h3>Informações frequentemente ausentes</h3>
        <ul>
          <li>Audiência da resposta (tecnico? leigo? jurídico?).</li>
          <li>Nível de detalhe desejado e extensão máxima.</li>
          <li>O que fazer diante de dados ausentes (perguntar? declarar lacuna?).</li>
          <li>Critério de sucesso verificável da resposta.</li>
        </ul>
        <h3>Erros comuns</h3>
        <ul>
          <li>Empilhar instruções conflitantes sem prioridade explícita.</li>
          <li>Misturar dados externos e instruções no mesmo bloco, facilitando injeção de prompt.</li>
          <li>Colar templates prontos sem adaptar terminologia ao domínio.</li>
        </ul>
        <h3>Recomendações</h3>
        <ul>
          <li>Comece simples; adicione estrutura apenas quando a tarefa exigir.</li>
          <li>Versione e reutilize templates validados em vez de reconstruir do zero.</li>
          <li>Use o laboratório de engenharia de prompts para pontuar a estrutura e comparar versões.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'sec-new-9', number: '9', level: 1, title: 'Ambiguidade linguística e erros de interpretação',
    content: (
      <div className="prose-content">
        <p>Ambiguidade é a propriedade de uma expressão admitir mais de uma interpretação. Em conversas humanas, contexto, entonação e conhecimento compartilhado resolvem quase tudo. Em instruções para máquinas, o contexto fornecido é tudo o que o modelo tem — e a ambiguidade não resolvida vira variação indesejada na saída.</p>
        <h3>Tipos de ambiguidade</h3>
        <table>
          <thead><tr><th>Tipo</th><th>Exemplo</th><th>Interpretações</th></tr></thead>
          <tbody>
            <tr><td>Lexical</td><td>"banco"</td><td>Assento × instituição financeira × área de dados</td></tr>
            <tr><td>Sintática</td><td>"Analise os relatórios dos gerentes"</td><td>Relatórios que os gerentes produziram × relatórios sobre os gerentes</td></tr>
            <tr><td>Escopal</td><td>"Todos os relatórios não foram revisados"</td><td>Nenhum foi × nem todos foram</td></tr>
            <tr><td>Referencial (anáfora)</td><td>"Envie o contrato para o cliente depois de revisá-lo"</td><td>Revisar o contrato × revisar o cliente (improvável, mas a estrutura permite)</td></tr>
            <tr><td>Moda/registro</td><td>"Preciso disso urgente"</td><td>Prioridade × prazo — sem data, "urgente" é indeterminado</td></tr>
          </tbody>
        </table>
        <h3>Como a ambiguidade se transforma em erro</h3>
        <p>Uma instrução ambígua não produz necessariamente uma recusa: produz <strong>uma escolha implícita do modelo</strong> entre as interpretações possíveis. O usuário pode nem perceber que houve escolha, até validar o resultado. O pior caso é a ambiguidade que coincide com a expectativa em uma execução e diverge na seguinte — a instabilidade é mais cara que o erro óbvio, porque falha silenciosamente.</p>
        <h3>Técnicas de desambiguação</h3>
        <ul>
          <li><strong>Substituição lexical:</strong> trocar a palavra ambígua por um termo técnico definido ("banco de dados" em vez de "banco", quando for o caso).</li>
          <li><strong>Reestruturação sintática:</strong> "Analise os relatórios produzidos pelos gerentes" elimina a dupla leitura.</li>
          <li><strong>Definição operacional:</strong> "urgente = resposta em até 2 horas" converte imprecisão em critério verificável.</li>
          <li><strong>Exemplo de contraexemplo:</strong> "não inclua cláusulas: X não conta como relatório".</li>
        </ul>
        <h3>Erros comuns e comparação</h3>
        <blockquote>Preciso de uma análise precisa dos dados da empresa.</blockquote>
        <p>Esta instrução é ambígua em três camadas: objeto ("dados" quais?), critério ("precisa" = exata? completa? estatisticamente precisa?) e formato. Uma versão desambiguada:</p>
        <blockquote>Analise as planilhas anexadas (receita e despesa, 2024). Calcule margem bruta e líquida com duas casas decimais, indique os três meses com maior variação e apresente o resultado em tabela.</blockquote>
        <h3>Recomendações</h3>
        <ul>
          <li>Leia seu prompt procurando palavras com mais de um sentido no seu domínio.</li>
          <li>Resolva ambiguidades por definição, não por julgo: declare o critério de interpretação.</li>
          <li>Use o laboratório de precisão semântica para examinar termos ambíguos do seu vocabulário técnico.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'sec-new-10', number: '10', level: 1, title: 'Tradução automática e equivalência semântica',
    content: (
      <div className="prose-content">
        <p>Traduzir não é substituir palavras de um dicionário por outro. Equivalência semântica é a preservação do significado — incluindo pressupostos, registro e valor de verdade — entre idiomas. A tradução automática moderna é boa em fluência e pode falhar em fidelidade conceitual, justamente onde a engenharia idiomática atua.</p>
        <h3>Por que traduções fluentes podem estar erradas</h3>
        <table>
          <thead><tr><th>Fenômeno</th><th>Exemplo</th><th>Risco</th></tr></thead>
          <tbody>
            <tr><td>Falso cognato</td><td>EN "actually" × PT "atualmente"</td><td>Erro lógico sutil na tradução</td></tr>
            <tr><td>Termo técnico polissêmico</td><td>EN "accuracy" × PT "precisão"/"exatidão"</td><td>Inversão conceitual em estatística</td></tr>
            <tr><td>Termo jurídico sem equivalente</td><td>PT "responsabilização" × EN "accountability"</td><td>Perda de nuance processual</td></tr>
            <tr><td>Expressão idiomática</td><td>PT "quebrar um galho" × EN "to make do"</td><td>Tradução literal absurda ("break a branch")</td></tr>
            <tr><td>Variação dialectal</td><td>ES "coger" — aceitável em alguns países, tabu em outros</td><td>Embaraço ou ofensa involuntária</td></tr>
          </tbody>
        </table>
        <h3>Tradução intermediária em pipelines de IA</h3>
        <p>Quando um fluxo de trabalho traduz o prompt do usuário, envia ao modelo e traduz a resposta de volta, cada etapa pode introduzir distorção acumulada. O resultado final pode ser fluente, coerente — e responder a uma pergunta ligeiramente diferente da feita. A verificação exige controle terminológico: um dicionário do projeto que fixe como cada termo técnico deve ser traduzido e por quê.</p>
        <h3>Exemplo prático de controle terminológico</h3>
        <p>Em estatística, o par inglês accuracy/precision deve mapear para exatidão/precisão — não "corretude"/"precisão" ou qualquer paráfrase. Fixar esse mapeamento em documentação interna evita que membros do time (ou pipelines automáticos) invertam os conceitos.</p>
        <h3>Erros comuns</h3>
        <ul>
          <li>Avaliar tradução por fluência ("parece bom") em vez de fidelidade conceitual.</li>
          <li>Traduzir documentos jurídicos ou técnicos sem glossário controlado.</li>
          <li>Presumir que o modelo que respondeu em português "pensou em português" — internamente, representações podem mesclar idiomas.</li>
        </ul>
        <h3>Recomendações</h3>
        <ul>
          <li>Mantenha glossário bilíngue dos termos críticos do domínio (a biblioteca terminológica desta plataforma é um ponto de partida).</li>
          <li>Para decisões críticas, peça ao modelo que explique a escolha terminológica, e verifique com fonte independente.</li>
          <li>Use o laboratório de traduções para examinar falsos cognatos antes de publicar conteúdo multilíngue.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'sec-new-13', number: '13', level: 1, title: 'Context window e gerenciamento de contexto',
    content: (
      <div className="prose-content">
        <p>A janela de contexto é a quantidade máxima de tokens que um modelo pode considerar em uma interação: o prompt do sistema, o histórico da conversa, os documentos anexados e a resposta em geração, tudo somado. Ela é um recurso escasso, e sua administração é uma competência de engenharia.</p>
        <h3>O que ocupa a janela</h3>
        <ul>
          <li>Instruções permanentes (system prompt).</li>
          <li>Histórico acumulado da conversa.</li>
          <li>Documentos e dados fornecidos.</li>
          <li>Ferramentas e suas descrições, quando aplicável.</li>
          <li>Tokens de resposta em geração.</li>
        </ul>
        <h3>Comportamentos quando a janela satura</h3>
        <p>Dependendo da implementação, a conversa pode rejeitar novas entradas, truncar o início, resumir silenciosamente o histórico ou simplesmente "esquecer" o que saiu da janela. O sintoma comum é a perda de contexto: o modelo passa a ignorar instruções que antes seguia — não por capricho, mas porque elas não estão mais visíveis para ele.</p>
        <h3>Estratégias de gerenciamento</h3>
        <table>
          <thead><tr><th>Estratégia</th><th>Mecanismo</th><th>Custo/benefício</th></tr></thead>
          <tbody>
            <tr><td>Recorte de histórico</td><td>Enviar apenas os N turnos recentes</td><td>Simples; perde referências antigas</td></tr>
            <tr><td>Resumo do histórico</td><td>Comprimir turnos antigos em um resumo</td><td>Preserva essência; custo de uma chamada extra</td></tr>
            <tr><td>Recuperação seletiva (RAG)</td><td>Enviar apenas trechos relevantes de documentos</td><td>Escala bem; exige indexação</td></tr>
            <tr><td>Cache de contexto</td><td>Reutilizar prefixos estáticos já processados</td><td>Reduz custo em serviços compatíveis (capítulo 12)</td></tr>
            <tr><td>Memória externa estruturada</td><td>Guardar fatos em arquivo/banco e injetar sob demanda</td><td>Controle total; exige arquitetura</td></tr>
          </tbody>
        </table>
        <h3>Erros comuns</h3>
        <ul>
          <li>Reenviar documentos inteiros a cada turno quando bastaria o trecho pertinente.</li>
          <li>Manter históricos longos "por precaução", pagando por tokens que não influenciam a resposta.</li>
          <li>Presumir memória infinita e atribuir a "defeito" o esquecimento causado pela saturação.</li>
        </ul>
        <h3>Recomendações</h3>
        <ul>
          <li>Projete a conversa pensando no orçamento de tokens: o que precisa estar visível a cada turno?</li>
          <li>Extraia e armazene decisões e restrições permanentes em instruções fixas, não no histórico.</li>
          <li>Meça: a relação entre palavras e tokens no seu idioma está no laboratório de tokenização.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'sec-new-15', number: '15', level: 1, title: 'Auditoria e validação de respostas geradas por IA',
    content: (
      <div className="prose-content">
        <p>Validação é o mecanismo que separa uma resposta convincente de um resultado tecnicamente confiável. Sem ela, a qualidade de um fluxo de trabalho com IA é desconhecida — e o custo do erro aparece depois, quando é mais caro.</p>
        <h3>Níveis de validação</h3>
        <ol>
          <li><strong>Validação estrutural:</strong> a resposta tem o formato solicitado? Os campos obrigatórios estão presentes?</li>
          <li><strong>Validação de aderência:</strong> a resposta atende ao que foi pedido, sem responder outra pergunta?</li>
          <li><strong>Validação factual:</strong> as afirmações verificáveis são verdadeiras? Há fontes rastreáveis?</li>
          <li><strong>Validação terminológica:</strong> os termos técnicos foram usados em seus significados definidos?</li>
          <li><strong>Validação de consistência:</strong> a resposta se contradiz internamente ou com dados fornecidos?</li>
        </ol>
        <h3>Técnicas práticas</h3>
        <table>
          <thead><tr><th>Técnica</th><th>Como funciona</th><th>Limitação</th></tr></thead>
          <tbody>
            <tr><td>Checklist de critérios</td><td>Verificar item a item os requisitos declarados no prompt</td><td>Manual; depende de critérios bem formulados</td></tr>
            <tr><td>Autoconsistência</td><td>Gerar a mesma resposta N vezes e comparar</td><td>Custo multiplicado; não detecta erro sistemático</td></tr>
            <tr><td>Verificação cruzada</td><td>Conferir afirmações em fonte independente</td><td>Nem toda afirmação é verificável</td></tr>
            <tr><td>Segunda opinião por modelo</td><td>Outro modelo (ou configuração) critica a resposta</td><td>Dois modelos podem errar juntos</td></tr>
            <tr><td>Testes automatizados</td><td>Scripts validam estrutura, valores e limites</td><td>Cobrem só o formalizável</td></tr>
          </tbody>
        </table>
        <h3>Registro de auditoria</h3>
        <p>Uma auditoria séria documenta: prompt, resposta, resultado esperado, critérios, veredito e classificação do erro quando houver (erro técnico, limitação arquitetural, erro de engenharia de prompt — ver capítulo 14). Sem registro, não há comparação entre versões de modelo nem melhoria mensurável.</p>
        <h3>Erros comuns</h3>
        <ul>
          <li>Validar só o primeiro resultado e presumir estabilidade nas execuções seguintes.</li>
          <li>Confundir fluência e confiança aparente com correção (o tom assertivo não é evidência).</li>
          <li>Tratar a auditoria heurística automatizada como compreensão semântica plena.</li>
        </ul>
        <h3>Recomendações</h3>
        <ul>
          <li>Defina os critérios de validação <em>antes</em> de enviar o prompt — eles fazem parte da engenharia.</li>
          <li>Use o módulo de auditoria desta plataforma para estrutura de avaliação heurística, e o observatório para registrar testes ao longo do tempo.</li>
          <li>Em decisões de alto impacto, exija validação humana independente.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'sec-new-20', number: '20', level: 1, title: 'Perspectivas futuras da comunicação entre humanos e máquinas',
    content: (
      <div className="prose-content">
        <p>A fronteira atual da interação humano–máquina é a linguagem natural: à primeira vista, o modo mais acessível já inventado. A análise deste livro mostra que essa acessibilidade é parcial — sob a superfície conversacional, há tokenização, fragmentação desigual entre idiomas, janelas de contexto, inferência probabilística e estruturas de custo que recompensam quem domina a engenharia da linguagem.</p>
        <h3>Tendências técnicas</h3>
        <ul>
          <li><strong>Tokenizadores multilíngues mais equilibrados:</strong> pesquisas recentes (por exemplo, em tokenização ótima para computação) buscam vocabulários que reduzam a disparidade de fragmentação entre idiomas — o que pode reduzir o "imposto linguístico" pago por falantes de português e outras línguas.</li>
          <li><strong>Contextos mais longos:</strong> janelas maiores reduzem perda de contexto, mas não eliminam o custo; gerenciar bem o contexto continua relevante.</li>
          <li><strong>Modelos com raciocínio estruturado:</strong> decomposição explícita de etapas pode melhorar verificabilidade, ao custo de tokens adicionais faturáveis.</li>
          <li><strong>Cache e compressão de contexto:</strong> mecanismos comerciais que barateiam prefixos reutilizados recompensam prompts bem arquitetados (capítulo 8).</li>
          <li><strong>Avaliação contínua:</strong> ferramentas de auditoria e monitoramento tendem a se integrar aos fluxos de trabalho, tornando a validação parte do pipeline, não uma etapa opcional.</li>
        </ul>
        <h3>Tendências regulatórias</h3>
        <p>O marco regulatório brasileiro está em formação (capítulo 19). A tendência observável — no Brasil e no exterior — é de exigências crescentes de transparência sobre decisões automatizadas, proteção de dados pessoais e responsabilidade por danos. Para quem constrói com IA, isso reforça a necessidade de documentação, registro de testes e controle terminológico.</p>
        <h3>A competência linguística como fator de equidade</h3>
        <p>Enquanto a qualidade das respostas depender da qualidade da formulação, usuários sem formação em engenharia de prompts pagarão mais — em tokens, tempo e retrabalho — pelo mesmo resultado. Iniciativas de letramento digital (como a Política Nacional de Educação Digital) e metodologias de eficiência idiomática (como a proposta IEIIA desta obra) apontam na mesma direção: reduzir a distância entre quem domina e quem não domina a linguagem técnica.</p>
        <h3>Recomendações finais para o leitor</h3>
        <ul>
          <li>Trate instruções como artefatos de engenharia: versionados, testados e documentados.</li>
          <li>Meça custo por resultado validado, não apenas consumo bruto.</li>
          <li>Registre evidências antes de concluir sobre causas — inclusive sobre falhas de fornecedores.</li>
          <li>Mantenha-se atento à evolução regulatória e às mudanças de comportamento entre versões de modelos.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'sec-1', number: '1', level: 1, title: 'Fundamentos da linguagem na inteligência artificial',
    content: (
      <div className="prose-content">
        <p>A linguagem humana é uma das principais interfaces de comunicação entre pessoas e sistemas de Inteligência Artificial. Entretanto, a interação entre linguagem natural e processamento computacional não é uma simples conversação entre dois interlocutores.</p>
        <p>Quando um usuário formula uma solicitação a um modelo de linguagem de grande escala (LLM — Large Language Model), ocorre uma sequência de operações computacionais envolvendo tokenização, representação numérica, processamento contextual, atenção, inferência probabilística e geração sequencial de conteúdo.</p>
        <p>Nesse processo, cada palavra, expressão, construção sintática, ambiguidade semântica e particularidade idiomática pode influenciar a maneira como o sistema interpreta a solicitação e constrói sua resposta.</p>
        <p>A qualidade do resultado não depende exclusivamente da capacidade do modelo. Depende também da qualidade linguística da entrada, da precisão conceitual, da estruturação das instruções, do contexto fornecido, das restrições estabelecidas e dos mecanismos de validação utilizados.</p>
        <blockquote>Quanto custa computacionalmente uma comunicação mal estruturada e quanto custa economicamente corrigir os erros produzidos por uma engenharia de prompts inadequada?</blockquote>
        <p>Essa questão deve ser examinada sob cinco perspectivas:</p>
        <ol>
          <li>Engenharia computacional e tokenização.</li>
          <li>Linguística, semântica e interpretação idiomática.</li>
          <li>Engenharia de prompts e precisão na geração.</li>
          <li>Economia de processamento e controle de custos.</li>
          <li>Responsabilidade jurídica, transparência e proteção dos usuários.</li>
        </ol>
        <p>A proposta desta enciclopédia é estabelecer uma metodologia na qual a linguagem deixa de ser apenas um instrumento de comunicação e passa a ser tratada como um componente de engenharia de sistemas inteligentes.</p>
      </div>
    ),
  },
  {
    id: 'sec-2', number: '3', level: 1, title: 'Tokenização: funcionamento, fragmentação e interpretação',
    content: (
      <div className="prose-content">
        <p>Um modelo de linguagem não interpreta necessariamente uma palavra como uma unidade indivisível.</p>
        <p>Antes de processar a solicitação, o texto passa por um mecanismo denominado <strong>tokenização</strong>.</p>
        <p>Um token pode representar:</p>
        <ul>
          <li>Uma palavra completa.</li>
          <li>Parte de uma palavra.</li>
          <li>Um conjunto de caracteres.</li>
          <li>Um sinal de pontuação.</li>
          <li>Um espaço associado a uma sequência textual.</li>
          <li>Uma combinação de elementos linguísticos.</li>
        </ul>
        <p>A quantidade de tokens não corresponde necessariamente à quantidade de palavras, letras ou caracteres.</p>
        <p>Por exemplo, uma palavra técnica extensa, um termo estrangeiro, uma abreviação ou uma expressão pouco frequente pode ser fragmentada em diferentes unidades.</p>
        <p>Isso é especialmente relevante em idiomas com características morfológicas e ortográficas distintas.</p>
        <h3>3.1. A influência do português brasileiro</h3>
        <p>O português apresenta particularidades que precisam ser consideradas na engenharia de prompts:</p>
        <ul>
          <li>Flexões verbais complexas.</li>
          <li>Concordância nominal e verbal.</li>
          <li>Variações de gênero e número.</li>
          <li>Acentuação gráfica.</li>
          <li>Contrações e preposições.</li>
          <li>Expressões idiomáticas regionais.</li>
          <li>Vocabulário técnico de origem latina, grega e estrangeira.</li>
          <li>Ambiguidades decorrentes da construção sintática.</li>
        </ul>
        <p>Uma expressão pode ser linguisticamente compreensível para uma pessoa, mas apresentar uma estrutura diferente daquela mais recorrente nos dados linguísticos utilizados durante o treinamento de determinado modelo.</p>
        <p>Isso pode afetar sua representação em tokens e, dependendo do contexto, a qualidade da interpretação.</p>
        <Callout tone="warning" title="Importante">
          Não existe uma regra universal segundo a qual o inglês sempre consome menos tokens do que o português. O resultado depende do tokenizador, do modelo, do texto e da frequência das sequências linguísticas. A comparação precisa ser experimental.
        </Callout>
      </div>
    ),
  },
  {
    id: 'sec-3', number: '5', level: 1, title: 'Comparação linguística entre português, inglês, espanhol, francês e alemão',
    content: (
      <div className="prose-content">
        <p>Um dos problemas mais relevantes no desenvolvimento de modelos multilíngues é a distribuição desigual da eficiência de tokenização entre idiomas.</p>
        <p>Modelos treinados com grandes volumes de conteúdo em inglês podem apresentar diferenças de representação quando processam português, espanhol, alemão, japonês, árabe ou outros idiomas.</p>
        <p>Essa questão não significa necessariamente que o modelo tenha menor capacidade de compreender determinado idioma. Significa que a arquitetura de representação textual pode apresentar diferentes níveis de fragmentação e eficiência.</p>
        <h3>5.1. Fragmentação lexical e custo computacional</h3>
        <p>Considere três situações:</p>
        <ul>
          <li>Uma palavra técnica reconhecida frequentemente pelo tokenizador.</li>
          <li>Uma palavra estrangeira pouco frequente.</li>
          <li>Uma palavra portuguesa com flexão, acentuação ou composição incomum.</li>
        </ul>
        <p>Essas situações podem resultar em quantidades diferentes de tokens.</p>
        <p>Quanto maior a sequência de tokens de entrada, maior poderá ser o consumo de processamento associado àquela solicitação, observadas as características da arquitetura e do serviço utilizado.</p>
        <p>A documentação técnica da Microsoft explica que os tokenizadores dividem palavras em unidades menores, associando cada unidade a um identificador numérico. A documentação da OpenAI também esclarece que o consumo depende do modelo, da codificação e do idioma.</p>
        <h3>5.2. O problema da tradução intermediária</h3>
        <p>Outro fenômeno importante é a tradução intermediária.</p>
        <p>Um usuário pode formular uma pergunta em português, enquanto o sistema utiliza representações multilíngues ou mecanismos internos de processamento que não correspondem a uma tradução literal.</p>
        <p>É necessário distinguir três operações:</p>
        <ol>
          <li><strong>Tradução linguística:</strong> conversão de uma expressão entre idiomas.</li>
          <li><strong>Representação semântica:</strong> identificação do significado e das relações conceituais.</li>
          <li><strong>Inferência contextual:</strong> utilização das informações disponíveis para construir uma resposta.</li>
        </ol>
        <p>Essas operações não são equivalentes.</p>
        <p>Uma tradução gramaticalmente correta pode ser semanticamente inadequada.</p>
        <p>Exemplo:</p>
        <ul>
          <li>Accuracy: exatidão.</li>
          <li>Precision: precisão.</li>
          <li>Reliability: confiabilidade.</li>
          <li>Validity: validade.</li>
        </ul>
        <p>Em contextos científicos, estatísticos, jurídicos e de engenharia, utilizar esses termos como sinônimos pode comprometer a interpretação do problema.</p>
        <p>O mesmo acontece com palavras como:</p>
        <ul>
          <li>Responsabilidade.</li>
          <li>Responsabilização.</li>
          <li>Imputabilidade.</li>
          <li>Obrigação.</li>
          <li>Dever jurídico.</li>
          <li>Capacidade.</li>
          <li>Competência.</li>
        </ul>
        <p>A tradução automática sem controle terminológico pode introduzir erros conceituais que não são facilmente identificados pelo usuário.</p>
        <h3>5.3. A economia linguística não significa escrever menos a qualquer custo</h3>
        <p>Existe uma diferença fundamental entre reduzir o tamanho de um prompt e aumentar sua eficiência.</p>
        <p>Um prompt excessivamente curto pode eliminar informações necessárias à compreensão da tarefa.</p>
        <p>Um prompt excessivamente extenso pode introduzir redundâncias, instruções conflitantes e informações irrelevantes.</p>
        <p>O objetivo correto é obter a maior quantidade de informação operacionalmente útil com a menor quantidade necessária de tokens.</p>
        <p>Podemos representar esse objetivo por uma função conceitual:</p>
        <span className={eq}>E_p = (I_u × A × C) / T</span>
        <p>Onde:</p>
        <ul>
          <li>E_p: eficiência do prompt.</li>
          <li>I_u: informação útil.</li>
          <li>A: adequação semântica.</li>
          <li>C: clareza das instruções.</li>
          <li>T: quantidade de tokens consumidos.</li>
        </ul>
        <Callout tone="warning" title="Atenção">
          Essa expressão é uma proposta de indicador metodológico, não uma fórmula científica universalmente validada. Seu propósito é demonstrar que a eficiência não pode ser medida exclusivamente pelo número de tokens.
        </Callout>
      </div>
    ),
  },
  {
    id: 'sec-4', number: '6', level: 1, title: 'Semântica, sintaxe, pragmática e contexto',
    content: (
      <div className="prose-content">
        <p>Um dos erros mais comuns na utilização de Inteligência Artificial é acreditar que o modelo compreenderá automaticamente a intenção exata do usuário.</p>
        <p>A linguagem natural é naturalmente ambígua.</p>
        <p>Uma mesma expressão pode possuir significados diferentes conforme o contexto, a área de conhecimento, a construção sintática e a intenção comunicativa.</p>
        <p>Na engenharia de prompts, isso exige um procedimento denominado <strong>desambiguação semântica</strong>.</p>
        <h3>6.1. Os cinco níveis de precisão linguística</h3>
        <ul>
          <li><strong>Nível 1 — Precisão lexical:</strong> seleção das palavras adequadas ao significado pretendido.</li>
          <li><strong>Nível 2 — Precisão sintática:</strong> organização das palavras e das relações gramaticais.</li>
          <li><strong>Nível 3 — Precisão semântica:</strong> eliminação de interpretações incompatíveis com a intenção.</li>
          <li><strong>Nível 4 — Precisão pragmática:</strong> identificação da finalidade, do destinatário e das circunstâncias.</li>
          <li><strong>Nível 5 — Precisão operacional:</strong> definição verificável do que o sistema deve efetivamente produzir.</li>
        </ul>
        <p>Um prompt tecnicamente eficiente precisa contemplar esses níveis.</p>
        <h3>6.2. Exemplo de engenharia semântica</h3>
        <p>Considere a solicitação:</p>
        <blockquote>Faça uma análise precisa da empresa.</blockquote>
        <p>Embora compreensível, essa instrução não define o objeto da análise, os critérios, as fontes ou o formato esperado.</p>
        <p>Uma versão tecnicamente estruturada seria:</p>
        <blockquote>Analise a empresa sob as perspectivas financeira, operacional e jurídica. Separe fatos comprovados, informações declaradas e hipóteses. Utilize fontes identificáveis, indique limitações documentais, não presuma informações ausentes e apresente as conclusões em uma tabela comparativa, acompanhada de fundamentação.</blockquote>
        <p>A segunda formulação fornece restrições, critérios e parâmetros de avaliação.</p>
        <p>O benefício não está apenas na redução de ambiguidades: está também na diminuição da necessidade de sucessivas correções.</p>
      </div>
    ),
  },
  {
    id: 'sec-5', number: '7', level: 1, title: 'Engenharia de prompts: arquitetura de uma instrução eficiente',
    content: (
      <div className="prose-content">
        <p>A engenharia de prompts é a disciplina prática de estruturar instruções para orientar o comportamento de modelos de linguagem e outros sistemas inteligentes.</p>
        <p>Ela envolve conhecimentos de:</p>
        <ul>
          <li>Processamento de linguagem natural (NLP).</li>
          <li>Linguística computacional.</li>
          <li>Semântica formal.</li>
          <li>Arquitetura de software.</li>
          <li>Engenharia de contexto.</li>
          <li>Representação de conhecimento.</li>
          <li>Lógica computacional.</li>
          <li>Avaliação de modelos.</li>
          <li>Testes e validação de resultados.</li>
        </ul>
        <h3>7.1. Anatomia de um prompt profissional</h3>
        <p>Um prompt robusto pode ser organizado em sete componentes:</p>
        <table>
          <thead><tr><th>Componente</th><th>Finalidade</th></tr></thead>
          <tbody>
            <tr><td>Identidade funcional</td><td>Define o papel operacional do sistema</td></tr>
            <tr><td>Objetivo</td><td>Determina o resultado esperado</td></tr>
            <tr><td>Contexto</td><td>Fornece informações necessárias</td></tr>
            <tr><td>Terminologia</td><td>Estabelece significados específicos</td></tr>
            <tr><td>Restrições</td><td>Define o que não pode ser feito</td></tr>
            <tr><td>Formato</td><td>Determina a estrutura da resposta</td></tr>
            <tr><td>Validação</td><td>Estabelece critérios de qualidade</td></tr>
          </tbody>
        </table>
        <h3>7.2. Modelo de construção</h3>
        <pre className="my-4 overflow-x-auto rounded-lg border border-white/10 bg-night-900/80 p-4 font-mono text-[13px] leading-relaxed text-cyan-100">{`IDENTIDADE FUNCIONAL:
Atue como especialista em [área técnica].

OBJETIVO:
Produza [resultado específico].

CONTEXTO:
Considere as seguintes informações:
[Dados relevantes]

TERMINOLOGIA:
Utilize os conceitos em seu significado técnico.
Não trate termos distintos como sinônimos.

METODOLOGIA:
Execute as etapas:
1. Identifique o problema.
2. Organize os dados.
3. Analise as informações.
4. Verifique inconsistências.
5. Formule as conclusões.

RESTRIÇÕES:
- Não invente informações.
- Não presuma dados ausentes.
- Diferencie fatos de hipóteses.
- Declare incertezas.
- Indique fontes quando necessário.

FORMATO:
[Relatório, tabela, código, parecer, artigo etc.]

VALIDAÇÃO:
Confira coerência, precisão terminológica,
consistência lógica e atendimento aos requisitos.`}</pre>
        <h3>7.3. Engenharia de contexto e instruções conflitantes</h3>
        <p>Um problema particularmente importante ocorre quando o usuário fornece instruções contraditórias.</p>
        <p>Exemplo:</p>
        <ul>
          <li>Produza um relatório extremamente detalhado.</li>
          <li>Utilize no máximo 100 palavras.</li>
          <li>Não omita nenhuma informação.</li>
          <li>Responda imediatamente.</li>
        </ul>
        <p>Essas instruções podem ser incompatíveis.</p>
        <p>Uma boa engenharia de prompts estabelece prioridades, identifica conflitos e determina qual requisito prevalece.</p>
        <p>Também é necessário distinguir:</p>
        <ul>
          <li>Instruções permanentes.</li>
          <li>Instruções específicas da tarefa.</li>
          <li>Informações contextuais.</li>
          <li>Dados fornecidos pelo usuário.</li>
          <li>Conteúdo externo que deve ser analisado, mas não obedecido como instrução.</li>
        </ul>
        <Callout tone="warning" title="Segurança">
          Esse último ponto é importante para a segurança contra ataques de injeção de prompt (prompt injection).
        </Callout>
      </div>
    ),
  },
  {
    id: 'sec-6', number: '12', level: 1, title: 'Custos de entrada, saída e processamento',
    content: (
      <div className="prose-content">
        <p>Um erro linguístico não aumenta automaticamente o preço de uma consulta. O impacto econômico surge quando a formulação inadequada provoca processamento adicional, respostas mais longas, novas chamadas, correções ou validações.</p>
        <p>Os principais fatores são:</p>
        <table>
          <thead><tr><th>Erro</th><th>Consequência potencial</th></tr></thead>
          <tbody>
            <tr><td>Instruções ambíguas</td><td>Respostas incompatíveis com a intenção</td></tr>
            <tr><td>Contexto incompleto</td><td>Solicitações complementares</td></tr>
            <tr><td>Redundância</td><td>Aumento de tokens de entrada</td></tr>
            <tr><td>Termos incorretos</td><td>Interpretação conceitual inadequada</td></tr>
            <tr><td>Tradução imprecisa</td><td>Perda de significado</td></tr>
            <tr><td>Instruções conflitantes</td><td>Necessidade de reformulação</td></tr>
            <tr><td>Ausência de critérios</td><td>Respostas inconsistentes</td></tr>
            <tr><td>Respostas excessivamente extensas</td><td>Maior consumo de saída</td></tr>
            <tr><td>Falta de validação</td><td>Retrabalho e novas chamadas</td></tr>
            <tr><td>Histórico desnecessário</td><td>Reprocessamento de contexto</td></tr>
          </tbody>
        </table>
        <h3>12.1. O custo invisível do retrabalho</h3>
        <p>Imagine um fluxo simplificado:</p>
        <ol>
          <li>Prompt inicial impreciso.</li>
          <li>Contexto insuficiente e terminologia ambígua.</li>
          <li>Resposta inadequada.</li>
          <li>Resultado diferente do esperado.</li>
          <li>Correção do prompt.</li>
          <li>Nova instrução, mais contexto e nova inferência.</li>
          <li>Custo acumulado: tokens de entrada + tokens de saída + chamadas adicionais.</li>
        </ol>
        <p>A repetição desse ciclo pode elevar significativamente o custo total de uma operação.</p>
        <p>Em serviços cobrados por utilização, a conta pode ser representada por:</p>
        <span className={eq}>C_total = Σ (i=1..n) ( T_e,i × P_e,i + T_s,i × P_s,i + T_r,i × P_r,i )</span>
        <p>Onde:</p>
        <ul>
          <li>T_e: tokens de entrada.</li>
          <li>T_s: tokens de saída.</li>
          <li>T_r: tokens de raciocínio faturáveis, quando aplicável.</li>
          <li>P: preço unitário correspondente.</li>
          <li>n: quantidade de chamadas.</li>
        </ul>
        <Callout tone="warning" title="Atenção">
          Os preços e as regras de cobrança dependem do fornecedor, do modelo, de eventuais mecanismos de cache e do plano contratado. Nem todos os sistemas cobram separadamente todos esses componentes.
        </Callout>
        <p>A documentação da OpenAI diferencia tokens de entrada, saída, cache e raciocínio, o que demonstra por que a simples contagem de palavras não é suficiente para calcular custos.</p>
      </div>
    ),
  },
  {
    id: 'sec-7', number: '16', level: 1, title: 'Engenharia Idiomática Aplicada à Inteligência Artificial (EIA-IA)',
    content: (
      <div className="prose-content">
        <p>A exploração idiomática consiste em estudar sistematicamente como as características de um idioma podem ser utilizadas para melhorar a comunicação com modelos computacionais.</p>
        <p>Não se trata simplesmente de traduzir palavras ou encontrar sinônimos.</p>
        <p>Trata-se de compreender como estruturas linguísticas, terminologia, relações semânticas e construções sintáticas podem produzir instruções mais precisas.</p>
        <p>Podemos organizar essa metodologia em oito campos.</p>
        <table>
          <thead><tr><th>Campo</th><th>Objeto de investigação</th></tr></thead>
          <tbody>
            <tr><td>Lexicologia computacional</td><td>Vocabulário e frequência lexical</td></tr>
            <tr><td>Morfologia computacional</td><td>Formação e fragmentação das palavras</td></tr>
            <tr><td>Sintaxe computacional</td><td>Organização das instruções</td></tr>
            <tr><td>Semântica computacional</td><td>Representação dos significados</td></tr>
            <tr><td>Pragmática computacional</td><td>Intenção e contexto</td></tr>
            <tr><td>Terminologia técnica</td><td>Padronização dos conceitos</td></tr>
            <tr><td>Tradução computacional</td><td>Preservação do significado entre idiomas</td></tr>
            <tr><td>Otimização de prompts</td><td>Eficiência e qualidade das instruções</td></tr>
          </tbody>
        </table>
        <h3>16.1. O conceito de engenharia idiomática</h3>
        <p>Propomos denominar <strong>Engenharia Idiomática Aplicada à Inteligência Artificial (EIA-IA)</strong> o conjunto de procedimentos que busca otimizar a interação entre linguagem humana e modelos computacionais.</p>
        <p>Seu objetivo é:</p>
        <ol>
          <li>Reduzir ambiguidades linguísticas.</li>
          <li>Padronizar a terminologia.</li>
          <li>Identificar expressões semanticamente inadequadas.</li>
          <li>Evitar traduções que alterem conceitos.</li>
          <li>Reduzir instruções redundantes.</li>
          <li>Preservar informações essenciais.</li>
          <li>Diminuir a necessidade de novas chamadas.</li>
          <li>Melhorar a precisão e a verificabilidade dos resultados.</li>
        </ol>
        <Callout tone="warning" title="Ressalva metodológica">
          Essa denominação constitui uma proposta metodológica para esta enciclopédia, e não uma disciplina acadêmica já reconhecida com essa denominação universal.
        </Callout>
        <h3>16.2. O dicionário de precisão idiomática</h3>
        <p>Uma das ferramentas mais importantes seria a criação de um vocabulário técnico controlado.</p>
        <table>
          <thead><tr><th>Expressão</th><th>Utilização recomendada</th></tr></thead>
          <tbody>
            <tr><td>Precisão</td><td>Proximidade entre resultados e valor de referência, conforme a disciplina</td></tr>
            <tr><td>Exatidão</td><td>Proximidade do resultado em relação ao valor verdadeiro ou de referência</td></tr>
            <tr><td>Eficiência</td><td>Relação entre recursos empregados e resultados</td></tr>
            <tr><td>Eficácia</td><td>Capacidade de alcançar o objetivo</td></tr>
            <tr><td>Confiabilidade</td><td>Consistência e confiança justificável no desempenho</td></tr>
            <tr><td>Inferência</td><td>Processo de obtenção de conclusões a partir de informações</td></tr>
            <tr><td>Alucinação</td><td>Geração de informação sem suporte factual adequado</td></tr>
            <tr><td>Contexto</td><td>Conjunto de informações relevantes à interpretação</td></tr>
            <tr><td>Tokenização</td><td>Conversão do texto em unidades computacionais</td></tr>
            <tr><td>Desambiguação</td><td>Redução de interpretações possíveis</td></tr>
          </tbody>
        </table>
        <p>A padronização é especialmente importante quando o usuário trabalha com programação, física, engenharia, direito, medicina, estatística ou pesquisa científica.</p>
        <h3>16.3. A importância da terminologia negativa</h3>
        <p>Também é necessário estabelecer o que um conceito <em>não</em> significa. Por exemplo:</p>
        <ul>
          <li>Probabilidade não significa certeza.</li>
          <li>Correlação não significa causalidade.</li>
          <li>Simulação não significa comprovação experimental.</li>
          <li>Tradução não significa equivalência conceitual absoluta.</li>
          <li>Geração de código não significa validação de software.</li>
          <li>Resposta convincente não significa resposta verdadeira.</li>
        </ul>
        <p>Esse procedimento reduz erros de interpretação e impede que o modelo transforme uma hipótese em afirmação aparentemente comprovada.</p>
      </div>
    ),
  },
  {
    id: 'sec-8', number: '11', level: 1, title: 'Economia de tokens: como reduzir custos sem sacrificar a qualidade',
    content: (
      <div className="prose-content">
        <p>A otimização precisa considerar três dimensões distintas:</p>
        <ul>
          <li><strong>Economia de entrada:</strong> reduzir o contexto desnecessário.</li>
          <li><strong>Economia de processamento:</strong> evitar chamadas repetidas, operações redundantes e tarefas mal delimitadas.</li>
          <li><strong>Economia de saída:</strong> solicitar respostas proporcionais à necessidade real.</li>
        </ul>
        <h3>11.1. Estratégias técnicas</h3>
        <table>
          <thead><tr><th>Estratégia</th><th>Benefício</th></tr></thead>
          <tbody>
            <tr><td>Dicionário terminológico</td><td>Evita explicações repetitivas</td></tr>
            <tr><td>Contexto estruturado</td><td>Reduz ambiguidades</td></tr>
            <tr><td>Instruções reutilizáveis</td><td>Evita reconstrução de prompts</td></tr>
            <tr><td>Delimitação da tarefa</td><td>Reduz respostas dispersas</td></tr>
            <tr><td>Respostas por etapas</td><td>Permite controlar a extensão</td></tr>
            <tr><td>Cache de contexto</td><td>Pode reduzir custos em serviços compatíveis</td></tr>
            <tr><td>Validação automatizada</td><td>Identifica erros antes de novas operações</td></tr>
            <tr><td>Limite de saída</td><td>Evita respostas desnecessariamente extensas</td></tr>
            <tr><td>Recuperação seletiva de dados</td><td>Evita enviar documentos inteiros sem necessidade</td></tr>
            <tr><td>Memória contextual controlada</td><td>Reduz repetição de informações relevantes</td></tr>
          </tbody>
        </table>
        <h3>11.2. Exemplo econômico comparativo</h3>
        <p>Considere um experimento hipotético, com valores ilustrativos:</p>
        <table>
          <thead><tr><th>Método A</th><th>Método B</th></tr></thead>
          <tbody>
            <tr><td>4 chamadas sucessivas</td><td>1 chamada estruturada</td></tr>
            <tr><td>4.800 tokens acumulados</td><td>1.500 tokens acumulados</td></tr>
          </tbody>
        </table>
        <p>Economia hipotética de 68,75%.</p>
        <Callout tone="warning" title="Limitações">
          O exemplo demonstra o potencial da estruturação adequada, mas não constitui resultado experimental nem garantia de redução semelhante em outros modelos. A comparação só seria válida se ambos os métodos produzissem resultados equivalentes em qualidade, abrangência e confiabilidade.
        </Callout>
        <h3>11.3. Um indicador mais importante: custo por resultado correto</h3>
        <p>Proponho que a eficiência seja avaliada pelo custo necessário para produzir um resultado que satisfaça critérios objetivos.</p>
        <span className={eq}>C_r = C_total / N_resultados válidos</span>
        <p>Onde:</p>
        <ul>
          <li>C_r: custo por resultado válido.</li>
          <li>C_total: custo total da operação.</li>
          <li>N: quantidade de resultados aprovados na validação.</li>
        </ul>
        <p>Essa métrica é mais relevante do que simplesmente medir quantos tokens foram economizados.</p>
        <p>Um sistema que utiliza poucos tokens, mas produz respostas incorretas, pode ser economicamente pior do que outro que utiliza mais processamento e entrega resultados confiáveis.</p>
      </div>
    ),
  },
  {
    id: 'sec-9', number: '14', level: 1, title: 'Alucinações, inconsistências e confiabilidade: erros acidentais ou obsolescência programada?',
    content: (
      <div className="prose-content">
        <p>Esta é uma das questões mais importantes da investigação.</p>
        <p>É necessário separar fenômenos que frequentemente são confundidos.</p>
        <h3>14.1. Erros técnicos genuínos</h3>
        <p>Modelos de linguagem podem apresentar:</p>
        <ul>
          <li>Alucinações.</li>
          <li>Perda de contexto.</li>
          <li>Ambiguidade.</li>
          <li>Traduções inadequadas.</li>
          <li>Respostas contraditórias.</li>
          <li>Falhas de recuperação de informações.</li>
          <li>Erros matemáticos.</li>
          <li>Geração de código incorreto.</li>
          <li>Interpretações inadequadas de instruções.</li>
        </ul>
        <p>Essas falhas podem decorrer da arquitetura, dos dados de treinamento, das limitações do contexto, da inferência probabilística, do tokenizador ou da forma como a aplicação integra o modelo.</p>
        <h3>14.2. Problemas de projeto e incentivos econômicos</h3>
        <p>Outra questão é a arquitetura comercial dos serviços. Existem diferentes mecanismos que precisam ser examinados:</p>
        <ol>
          <li>Limites de utilização.</li>
          <li>Planos com capacidades distintas.</li>
          <li>Cobrança por tokens.</li>
          <li>Roteamento entre modelos.</li>
          <li>Limitação de recursos computacionais.</li>
          <li>Atualizações que alteram o comportamento.</li>
          <li>Respostas condicionadas por políticas de segurança.</li>
          <li>Recursos avançados disponibilizados mediante contratação.</li>
        </ol>
        <p>Essas características podem afetar a experiência do usuário e o custo operacional.</p>
        <Callout tone="warning" title="Distinção essencial">
          Entretanto, não se pode concluir automaticamente que uma resposta errada foi produzida deliberadamente para aumentar o faturamento.
        </Callout>
        <h3>14.3. Obsolescência programada e inteligência artificial</h3>
        <p>A expressão tecnicamente correta para a hipótese mencionada é <strong>obsolescência programada</strong>.</p>
        <p>Na indústria tradicional, o conceito está associado a estratégias de concepção ou comercialização que antecipam a perda de utilidade de um produto ou estimulam sua substituição.</p>
        <p>No setor de IA, podemos investigar hipóteses análogas:</p>
        <ul>
          <li>Redução deliberada da qualidade de versões anteriores.</li>
          <li>Descontinuação artificial de funcionalidades.</li>
          <li>Dependência excessiva de serviços proprietários.</li>
          <li>Incompatibilidade deliberada entre versões.</li>
          <li>Limitações comerciais que induzam migração para planos superiores.</li>
          <li>Falta de transparência sobre alterações de desempenho.</li>
        </ul>
        <blockquote>Falha não é prova de intenção.</blockquote>
        <p>A ocorrência de erros frequentes não demonstra, por si só, que eles foram programados para gerar novas cobranças.</p>
        <p>Hipótese de abuso comercial exige evidências.</p>
        <p>Seriam necessários elementos técnicos, documentais, contratuais ou estatísticos que demonstrassem uma estratégia deliberada, sua implementação e os efeitos produzidos.</p>
        <h3>14.4. Como investigar cientificamente essa hipótese?</h3>
        <p>Proponho um protocolo de auditoria comparativa:</p>
        <table>
          <thead><tr><th>Teste</th><th>O que investigar</th></tr></thead>
          <tbody>
            <tr><td>Repetibilidade</td><td>O mesmo prompt produz resultados equivalentes?</td></tr>
            <tr><td>Estabilidade</td><td>A qualidade muda após atualizações?</td></tr>
            <tr><td>Multilinguismo</td><td>O português apresenta maior taxa de erro?</td></tr>
            <tr><td>Custo</td><td>Solicitações equivalentes apresentam custos diferentes?</td></tr>
            <tr><td>Roteamento</td><td>O sistema altera o modelo utilizado?</td></tr>
            <tr><td>Reprodutibilidade</td><td>É possível repetir e verificar o resultado?</td></tr>
            <tr><td>Transparência</td><td>O fornecedor informa alterações relevantes?</td></tr>
            <tr><td>Desempenho</td><td>A qualidade cai sem justificativa técnica identificável?</td></tr>
          </tbody>
        </table>
        <p>O estudo deve registrar versão do modelo, tokenizador quando disponível, temperatura, parâmetros, idioma, número de chamadas, custos, resultados e critérios de avaliação.</p>
        <p>A investigação deve comparar amostras suficientemente grandes, evitando conclusões baseadas em episódios isolados.</p>
      </div>
    ),
  },
  {
    id: 'sec-10', number: '18', level: 1, title: 'Responsabilidade dos usuários e fornecedores de IA',
    content: (
      <div className="prose-content">
        <p>Outro equívoco recorrente é atribuir todos os erros ao usuário por não saber formular prompts.</p>
        <p>A engenharia de prompts é uma competência útil, mas não pode funcionar como justificativa universal para falhas do sistema.</p>
        <p>Há uma divisão de responsabilidades:</p>
        <p><strong>Usuário:</strong></p>
        <ul>
          <li>Fornecer informações adequadas.</li>
          <li>Definir objetivos.</li>
          <li>Informar restrições relevantes.</li>
          <li>Conferir resultados em situações críticas.</li>
        </ul>
        <p><strong>Desenvolvedor e fornecedor:</strong></p>
        <ul>
          <li>Projetar sistemas seguros.</li>
          <li>Informar limitações relevantes.</li>
          <li>Implementar mecanismos de proteção.</li>
          <li>Disponibilizar informações adequadas sobre o serviço.</li>
          <li>Corrigir defeitos dentro de suas obrigações.</li>
          <li>Respeitar os direitos dos usuários e titulares de dados.</li>
        </ul>
        <p>A complexidade técnica de um modelo não elimina a responsabilidade jurídica dos agentes envolvidos, quando presentes os respectivos pressupostos legais.</p>
      </div>
    ),
  },
  {
    id: 'sec-11', number: '19', level: 1, title: 'Legislação brasileira aplicável à inteligência artificial',
    content: (
      <div className="prose-content">
        <p>A engenharia de linguagem e a utilização de Inteligência Artificial não estão fora do alcance do ordenamento jurídico brasileiro.</p>
        <p>Embora ainda exista um processo de desenvolvimento legislativo específico para regular a IA, diversas normas já disciplinam aspectos relacionados à prestação dos serviços, proteção de dados, direitos autorais, transparência, responsabilidade civil, relações de consumo e liberdade de informação.</p>
        <Callout tone="warning" title="Ressalva jurídica">
          Não existe uma única lei que regule integralmente todos os aspectos da engenharia de prompts, tokenização e geração de conteúdo. A incidência de cada norma depende da atividade, da finalidade, dos agentes envolvidos e dos danos eventualmente produzidos.
        </Callout>
        <h3>19.1. Constituição Federal de 1988</h3>
        <p>A Constituição estabelece os fundamentos jurídicos para a proteção dos direitos dos usuários e para o desenvolvimento tecnológico.</p>
        <p>Dispositivos particularmente relevantes:</p>
        <ul>
          <li>Art. 1º, III: dignidade da pessoa humana.</li>
          <li>Art. 3º: objetivos fundamentais da República, incluindo a redução das desigualdades.</li>
          <li>Art. 5º, IV e IX: liberdade de manifestação do pensamento e liberdade de expressão intelectual, artística, científica e de comunicação.</li>
          <li>Art. 5º, V e X: direito de resposta, indenização e proteção da intimidade, vida privada, honra e imagem.</li>
          <li>Art. 5º, XIV: acesso à informação.</li>
          <li>Art. 5º, XXXII: dever estatal de promover a defesa do consumidor.</li>
          <li>Art. 5º, XXXIII: direito de receber informações dos órgãos públicos.</li>
          <li>Art. 5º, LXXIX: direito fundamental à proteção dos dados pessoais.</li>
          <li>Art. 13: língua portuguesa como idioma oficial.</li>
          <li>Art. 170, IV e V: livre concorrência e defesa do consumidor.</li>
        </ul>
        <p>A Constituição estabelece, assim, uma estrutura de proteção que precisa ser considerada na concepção e exploração econômica de sistemas inteligentes.</p>
        <h3>19.2. Lei nº 13.709/2018 — Lei Geral de Proteção de Dados Pessoais (LGPD)</h3>
        <p>A LGPD é particularmente importante quando sistemas de IA coletam, armazenam, processam ou utilizam informações pessoais.</p>
        <table>
          <thead><tr><th>Artigo</th><th>Matéria</th></tr></thead>
          <tbody>
            <tr><td>Art. 1º</td><td>Proteção dos direitos fundamentais relacionados aos dados pessoais</td></tr>
            <tr><td>Art. 6º</td><td>Princípios do tratamento de dados</td></tr>
            <tr><td>Art. 7º</td><td>Bases legais para tratamento</td></tr>
            <tr><td>Art. 9º</td><td>Transparência sobre o tratamento</td></tr>
            <tr><td>Art. 18</td><td>Direitos dos titulares</td></tr>
            <tr><td>Art. 20</td><td>Revisão de decisões tomadas unicamente com base em tratamento automatizado de dados pessoais</td></tr>
            <tr><td>Art. 37</td><td>Registro das operações de tratamento</td></tr>
            <tr><td>Art. 42</td><td>Responsabilidade e reparação de danos</td></tr>
            <tr><td>Art. 46</td><td>Segurança dos dados pessoais</td></tr>
          </tbody>
        </table>
        <p>O art. 6º merece atenção especial porque estabelece princípios como finalidade, adequação, necessidade, qualidade dos dados, transparência, prevenção e responsabilização.</p>
        <p>Esses princípios são relevantes para aplicações de IA que trabalham com informações pessoais, especialmente quando a imprecisão dos dados pode afetar decisões sobre indivíduos.</p>
        <p>O art. 20, por sua vez, é relevante para decisões automatizadas que afetem interesses dos titulares, nos limites de sua previsão legal. Não significa que qualquer resposta gerada por um chatbot esteja automaticamente sujeita a esse dispositivo.</p>
        <h3>19.3. Lei nº 8.078/1990 — Código de Defesa do Consumidor</h3>
        <p>O CDC é fundamental para examinar a relação entre usuários e fornecedores de serviços de Inteligência Artificial quando configurada uma relação de consumo.</p>
        <p>Dispositivos relevantes:</p>
        <ul>
          <li>Art. 4º: política nacional das relações de consumo.</li>
          <li>Art. 6º, III: direito à informação adequada e clara.</li>
          <li>Art. 6º, IV: proteção contra publicidade enganosa e práticas comerciais abusivas.</li>
          <li>Art. 6º, VI: prevenção e reparação de danos.</li>
          <li>Art. 14: responsabilidade do fornecedor por defeitos na prestação de serviços e informações insuficientes ou inadequadas.</li>
          <li>Art. 20: responsabilidade por vícios de qualidade dos serviços.</li>
          <li>Art. 30: vinculação da oferta suficientemente precisa.</li>
          <li>Art. 31: informações corretas, claras, precisas e ostensivas.</li>
          <li>Art. 37: proibição de publicidade enganosa ou abusiva.</li>
          <li>Art. 39: práticas abusivas.</li>
          <li>Art. 40: orçamento prévio em serviços abrangidos pelo dispositivo.</li>
          <li>Art. 46: conhecimento prévio do conteúdo contratual.</li>
          <li>Art. 51: nulidade de cláusulas abusivas nas hipóteses legais.</li>
        </ul>
        <p>Uma questão merece especial atenção: se um serviço é comercializado mediante promessa de determinadas funcionalidades, capacidades ou níveis de desempenho, a oferta e as condições efetivamente contratadas precisam ser examinadas.</p>
        <p>Uma divergência entre a publicidade, as características anunciadas e o serviço entregue pode, conforme as circunstâncias, configurar questão de direito do consumidor.</p>
        <p>Da mesma maneira, uma cobrança de tokens não pode ser considerada irregular simplesmente porque houve uma resposta equivocada. É necessário verificar a informação contratual, a medição do consumo, o funcionamento do serviço e a existência de eventual defeito ou prática abusiva.</p>
        <h3>19.4. Lei nº 10.406/2002 — Código Civil</h3>
        <p>O Código Civil oferece fundamentos importantes para a responsabilidade decorrente de condutas ilícitas e relações contratuais.</p>
        <ul>
          <li>Art. 186: ato ilícito por ação ou omissão, negligência ou imprudência que viole direito e cause dano.</li>
          <li>Art. 187: abuso de direito.</li>
          <li>Art. 389: consequências do inadimplemento das obrigações.</li>
          <li>Art. 421: função social do contrato.</li>
          <li>Art. 422: probidade e boa-fé objetiva.</li>
          <li>Art. 423: interpretação favorável ao aderente diante de cláusulas ambíguas ou contraditórias em contratos de adesão.</li>
          <li>Art. 927: obrigação de reparar danos decorrentes de ato ilícito, observadas as hipóteses legais de responsabilidade independentemente de culpa.</li>
        </ul>
        <p>Esses dispositivos permitem examinar situações envolvendo falhas contratuais, práticas abusivas, omissões relevantes e danos decorrentes de serviços digitais.</p>
        <h3>19.5. Lei nº 12.965/2014 — Marco Civil da Internet</h3>
        <p>O Marco Civil estabelece princípios, garantias, direitos e deveres para o uso da internet no Brasil.</p>
        <p>Dispositivos importantes:</p>
        <ul>
          <li>Art. 2º: direitos humanos, desenvolvimento da personalidade, cidadania, pluralidade e diversidade.</li>
          <li>Art. 3º: princípios para a disciplina do uso da internet.</li>
          <li>Art. 7º: direitos dos usuários.</li>
          <li>Art. 10: proteção dos registros, dados pessoais e comunicações.</li>
          <li>Art. 19: regime de responsabilização de provedores de aplicações por conteúdo de terceiros, observadas as disposições legais e a jurisprudência aplicável.</li>
        </ul>
        <p>O Marco Civil deve ser interpretado em conjunto com a LGPD, o CDC e as demais normas pertinentes.</p>
        <p>Também merece atenção a regulamentação superveniente de 2026, especialmente os Decretos nº 12.975 e nº 12.976, mencionados na atualização institucional da ANPD.</p>
        <h3>19.6. Lei nº 9.610/1998 — Lei de Direitos Autorais</h3>
        <p>A geração de conteúdos por IA levanta questões relevantes sobre autoria, titularidade, reprodução, adaptação e utilização de obras protegidas.</p>
        <p>Dispositivos relevantes:</p>
        <ul>
          <li>Art. 7º: obras intelectuais protegidas.</li>
          <li>Art. 8º: hipóteses não protegidas por direitos autorais.</li>
          <li>Art. 11: autoria da obra intelectual atribuída à pessoa física criadora.</li>
          <li>Art. 22: direitos morais e patrimoniais do autor.</li>
          <li>Art. 24: direitos morais.</li>
          <li>Art. 28: direito exclusivo de utilização da obra.</li>
          <li>Art. 29: necessidade de autorização prévia e expressa nas modalidades de utilização abrangidas pela lei.</li>
        </ul>
        <p>É importante não confundir a proteção de uma obra com a propriedade sobre uma ideia, método ou conceito técnico.</p>
        <p>A legislação protege a expressão intelectual nos termos legais, mas não concede exclusividade geral sobre ideias abstratas, métodos matemáticos ou procedimentos como tais.</p>
        <p>No campo da IA, também é necessário distinguir a autoria humana de uma obra, a utilização de material protegido no desenvolvimento de sistemas e as questões ainda controvertidas sobre a titularidade de resultados gerados autonomamente.</p>
        <h3>19.7. Lei nº 9.609/1998 — Lei do Software</h3>
        <p>É pertinente quando a IA integra programas de computador, plataformas, sistemas proprietários, bibliotecas ou ferramentas de engenharia.</p>
        <p>A lei disciplina a proteção da propriedade intelectual de programas de computador, sua comercialização e outros aspectos relacionados.</p>
        <p>Ela deve ser considerada conjuntamente com a Lei nº 9.610/1998, nos limites de sua aplicação.</p>
        <h3>19.8. Lei nº 14.129/2021 — Governo Digital</h3>
        <p>É relevante quando a utilização de IA ocorre no âmbito da administração pública, especialmente em iniciativas de transformação digital, eficiência administrativa, prestação de serviços públicos e simplificação de procedimentos.</p>
        <p>Sua incidência não deve ser generalizada para todos os serviços privados de IA.</p>
        <h3>19.9. Lei nº 14.533/2023 — Política Nacional de Educação Digital</h3>
        <p>Essa norma merece destaque pela relação entre educação digital, capacitação tecnológica, inclusão e desenvolvimento de competências.</p>
        <p>A alfabetização digital e o letramento tecnológico são essenciais para que os cidadãos compreendam as limitações, os riscos e as possibilidades dos sistemas inteligentes.</p>
        <p>A engenharia de prompts também pode ser estudada como uma competência de letramento digital avançado.</p>
        <h3>19.10. O Marco Legal da Inteligência Artificial: PL nº 2.338/2023</h3>
        <p>O Projeto de Lei nº 2.338/2023 merece tratamento específico.</p>
        <p>O Senado aprovou a proposta e a encaminhou à Câmara dos Deputados em março de 2025. Na consulta legislativa disponível, a proposta consta em tramitação na Câmara, não devendo ser apresentada como lei federal já sancionada.</p>
        <p>O projeto busca estabelecer normas gerais para o desenvolvimento, o fomento e o uso ético e responsável da Inteligência Artificial, com atenção à proteção de direitos fundamentais e à centralidade da pessoa humana.</p>
        <p>Sua tramitação deve ser acompanhada porque poderá modificar significativamente o cenário regulatório brasileiro.</p>
        <h3>19.11. Quadro de incidência jurídica</h3>
        <table>
          <thead><tr><th>Área investigada</th><th>Principal fundamento</th></tr></thead>
          <tbody>
            <tr><td>Proteção de dados em IA</td><td>LGPD</td></tr>
            <tr><td>Cobrança e prestação do serviço</td><td>CDC e Código Civil</td></tr>
            <tr><td>Transparência comercial</td><td>CDC</td></tr>
            <tr><td>Segurança e privacidade digital</td><td>LGPD e Marco Civil</td></tr>
            <tr><td>Responsabilidade por danos</td><td>CDC e Código Civil</td></tr>
            <tr><td>Obras e conteúdos protegidos</td><td>Lei de Direitos Autorais</td></tr>
            <tr><td>Software e plataformas</td><td>Lei do Software</td></tr>
            <tr><td>Direitos fundamentais</td><td>Constituição Federal</td></tr>
            <tr><td>IA na administração pública</td><td>Lei do Governo Digital</td></tr>
            <tr><td>Educação e capacitação digital</td><td>Política Nacional de Educação Digital</td></tr>
          </tbody>
        </table>
        <Callout tone="warning" title="Alcance">
          Essa relação reúne as principais normas pertinentes à investigação. Não representa uma enumeração absolutamente exaustiva: legislação penal, normas setoriais, regras tributárias, contratos, regulamentação administrativa e tratados internacionais poderão incidir conforme o caso concreto.
        </Callout>
      </div>
    ),
  },
  {
    id: 'sec-12', number: '21', level: 1, title: 'Conclusões: a linguagem como fator econômico, tecnológico e jurídico',
    content: (
      <div className="prose-content">
        <p>A Inteligência Artificial não deve ser compreendida exclusivamente como uma tecnologia de geração de respostas.</p>
        <p>Ela representa uma infraestrutura computacional que transforma linguagem em representações numéricas, processa relações probabilísticas e produz conteúdos a partir de parâmetros, dados, contexto e instruções.</p>
        <p>Nesse cenário, a qualidade linguística passa a ter consequências técnicas e econômicas.</p>
        <p>Um usuário que desconhece a estrutura dos prompts pode precisar realizar sucessivas tentativas até obter um resultado satisfatório. Essas tentativas podem representar consumo adicional de tokens, tempo, processamento e recursos financeiros.</p>
        <p>Por outro lado, um usuário que domina a engenharia de linguagem consegue estruturar instruções mais objetivas, controlar a terminologia, reduzir ambiguidades e estabelecer critérios de validação.</p>
        <p>Entretanto, não podemos transferir integralmente ao usuário a responsabilidade por limitações arquiteturais, erros de processamento ou deficiências de um serviço comercializado.</p>
        <p>A eficiência de um sistema inteligente precisa ser avaliada tanto pela qualidade das respostas quanto pela quantidade de recursos necessários para produzi-las.</p>
      </div>
    ),
  },
  {
    id: 'sec-13', number: '22', level: 1, title: 'As dez diretrizes da Engenharia Idiomática de IA',
    content: (
      <div className="prose-content">
        <p>Propomos estabelecer os seguintes princípios:</p>
        <ol>
          <li><strong>Precisão lexical:</strong> utilizar palavras compatíveis com o conceito pretendido.</li>
          <li><strong>Precisão semântica:</strong> evitar interpretações contraditórias.</li>
          <li><strong>Precisão sintática:</strong> estruturar instruções de maneira lógica.</li>
          <li><strong>Precisão contextual:</strong> fornecer apenas o contexto necessário.</li>
          <li><strong>Precisão terminológica:</strong> manter consistência entre conceitos técnicos.</li>
          <li><strong>Eficiência de tokenização:</strong> observar a fragmentação e o consumo textual.</li>
          <li><strong>Economia operacional:</strong> evitar chamadas desnecessárias.</li>
          <li><strong>Validação científica:</strong> conferir a veracidade dos resultados.</li>
          <li><strong>Transparência econômica:</strong> compreender as regras de cobrança.</li>
          <li><strong>Responsabilidade jurídica:</strong> respeitar os direitos dos usuários e dos titulares de informações.</li>
        </ol>
      </div>
    ),
  },
  {
    id: 'sec-14', number: '17', level: 1, title: 'Índice de Eficiência Idiomática em Inteligência Artificial (IEIIA)',
    content: (
      <div className="prose-content">
        <p>A partir desta investigação, proponho desenvolver um indicador experimental denominado:</p>
        <blockquote>IEIIA — Índice de Eficiência Idiomática em Inteligência Artificial: um sistema de avaliação destinado a medir a relação entre qualidade linguística, consumo computacional, precisão semântica e confiabilidade dos resultados.</blockquote>
        <p><strong>Variáveis de avaliação:</strong></p>
        <ul>
          <li>Quantidade de tokens.</li>
          <li>Número de chamadas.</li>
          <li>Taxa de respostas corretas.</li>
          <li>Taxa de ambiguidades.</li>
          <li>Taxa de retrabalho.</li>
          <li>Consistência terminológica.</li>
          <li>Fidelidade das traduções.</li>
          <li>Custo por resultado validado.</li>
        </ul>
        <p>A pesquisa poderá comparar português brasileiro, inglês e espanhol utilizando tarefas semanticamente equivalentes.</p>
        <p>O objetivo será verificar experimentalmente:</p>
        <ul>
          <li>Qual idioma apresenta menor fragmentação para cada modelo?</li>
          <li>Quais termos técnicos apresentam maior incidência de erros?</li>
          <li>Quais estruturas de prompt produzem respostas mais precisas?</li>
          <li>Quanto custa corrigir uma instrução mal formulada?</li>
          <li>A redução de tokens mantém a qualidade?</li>
          <li>Existem diferenças de desempenho entre versões de um mesmo modelo?</li>
          <li>As diferenças de cobrança são justificáveis pelas características técnicas?</li>
        </ul>
        <p>A metodologia deverá utilizar conjuntos de testes controlados, múltiplas repetições, avaliação independente e documentação dos resultados.</p>
      </div>
    ),
  },
  {
    id: 'sec-15', number: '23', level: 1, title: 'Consideração final',
    content: (
      <div className="prose-content">
        <p>A questão central não é simplesmente aprender a conversar com uma Inteligência Artificial.</p>
        <p>É aprender a construir instruções computacionalmente eficientes, linguisticamente precisas e tecnicamente verificáveis.</p>
        <p>A engenharia de prompts não deve ser reduzida a uma coleção de comandos mágicos. Ela precisa evoluir para uma metodologia multidisciplinar, fundamentada em linguística, computação, matemática, economia e direito.</p>
        <p>A exploração idiomática pode contribuir para diminuir o desperdício computacional, ampliar o acesso às tecnologias e reduzir a desigualdade entre usuários que dominam a linguagem técnica e aqueles que ainda não possuem essa formação.</p>
        <p>Por fim, é necessário preservar uma distinção fundamental: eficiência não significa apenas gastar menos; significa produzir mais qualidade, com menor desperdício e sem comprometer a confiabilidade.</p>
        <blockquote>A linguagem é a interface. A semântica é a estrutura do significado. O prompt é a especificação da tarefa. A tokenização é a representação computacional. E a validação é o mecanismo que separa uma resposta convincente de um resultado tecnicamente confiável.</blockquote>
      </div>
    ),
  },
];

editorialSections.sort((a, b) => Number(a.number) - Number(b.number));

export const references = [
  { id: 1, label: 'OpenAI — Understanding and counting tokens', url: 'https://help.openai.com/en/articles/4936856-understanding-and-counting-tokens' },
  { id: 2, label: 'Microsoft Learn — Conceitos básicos dos modelos de linguagem', url: 'https://learn.microsoft.com/pt-br/agent-framework/journey/llm-fundamentals' },
  { id: 3, label: 'Meta AI — Compute Optimal Tokenization (2026)', url: 'https://ai.meta.com/research/publications/compute-optimal-tokenization/' },
  { id: 4, label: 'Retrofitting Large Language Models with Dynamic Tokenization (ACL 2025)', url: 'https://aclanthology.org/2025.acl-long.1444/' },
  { id: 5, label: 'Constituição Federal de 1988 — Planalto', url: 'https://www4.planalto.gov.br/legislacao/legis-federal/constituicao' },
  { id: 6, label: 'Lei Geral de Proteção de Dados — Câmara dos Deputados', url: 'https://www2.camara.leg.br/legin/fed/lei/2018/lei-13709-14-agosto-2018-787077-normaatualizada-pl.html' },
  { id: 7, label: 'Código de Defesa do Consumidor — Planalto', url: 'https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm' },
  { id: 8, label: 'Código Civil — Planalto', url: 'https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm' },
  { id: 9, label: 'Marco Civil da Internet — Planalto', url: 'https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2014/lei/l12965.htm' },
  { id: 10, label: 'Lei de Direitos Autorais — Câmara dos Deputados', url: 'https://www2.camara.leg.br/legin/fed/lei/1998/lei-9610-19-fevereiro-1998-365399-normaatualizada-pl.html' },
  { id: 11, label: 'PL 2.338/2023 — Marco Legal da Inteligência Artificial — Senado Federal', url: 'https://www25.senado.leg.br/web/atividade/materias/-/materia/157233' },
];
