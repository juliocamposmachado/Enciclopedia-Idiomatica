import { Linkedin, Globe, MessageCircle, User, Building2, ExternalLink } from 'lucide-react';
import { PageHeader } from '@/components/Shared';
import { Callout } from '@/components/Callout';

const officialLinks = [
  {
    id: 'linkedin', label: 'LinkedIn — Julio Cesar Campos Machado', url: 'https://br.linkedin.com/in/juliocamposmachado',
    display: 'br.linkedin.com/in/juliocamposmachado', icon: <Linkedin size={16} className="text-cyan-400" />,
  },
  {
    id: 'likelook', label: 'Like Look Solutions — site institucional', url: 'https://likelook.wixsite.com/solutions',
    display: 'likelook.wixsite.com/solutions', icon: <Globe size={16} className="text-violet-400" />,
  },
  {
    id: 'whatsapp', label: 'WhatsApp — contato', url: 'https://wa.me/5511970603441',
    display: '+55 11 97060-3441', icon: <MessageCircle size={16} className="text-emerald-400" />,
  },
];

export function CreditsPage() {
  return (
    <div>
      <PageHeader
        icon={<User size={20} />}
        title="Créditos e contato"
        subtitle="Idealização, identidade institucional e canais oficiais de contato do projeto."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="panel p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300"><User size={22} /></div>
            <div>
              <p className="text-lg font-bold text-white">Julio Cesar Campos Machado</p>
              <p className="text-[13px] text-slate-400">Idealizador do projeto</p>
            </div>
          </div>
          <p className="text-[13px] leading-relaxed text-slate-300">
            Idealizador da Enciclopédia Idiomática da Inteligência Artificial.
          </p>
        </div>

        <div className="panel p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-400/10 text-violet-300"><Building2 size={22} /></div>
            <div>
              <p className="text-lg font-bold text-white">Like Look Solutions</p>
              <p className="text-[13px] text-slate-400">Organização e iniciativa</p>
            </div>
          </div>
          <p className="text-[13px] leading-relaxed text-slate-300">
            Organização responsável pela iniciativa e estruturação institucional do projeto — pesquisa, organização, sistematização e divulgação de conhecimentos sobre linguagem, IA, engenharia de prompts, precisão semântica, eficiência computacional e economia de tokens.
          </p>
        </div>
      </div>

      <h2 className="mb-4 mt-8 border-l-2 border-cyan-400 pl-3 text-lg font-semibold text-white">Links oficiais</h2>
      <div className="space-y-3">
        {officialLinks.map((l) => (
          <a
            key={l.id}
            href={l.url}
            target="_blank"
            rel="noopener noreferrer"
            className="panel panel-hover flex items-center gap-4 p-4"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5">{l.icon}</span>
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-medium text-white">{l.label}</p>
              <p className="truncate text-[12px] text-slate-500">{l.display}</p>
            </div>
            <ExternalLink size={15} className="shrink-0 text-slate-500" />
          </a>
        ))}
      </div>

      <Callout tone="info" title="Texto institucional">
        A Enciclopédia Idiomática da Inteligência Artificial é um projeto idealizado por Julio Cesar Campos Machado, com iniciativa institucional da Like Look Solutions. Seu propósito é contribuir para a compreensão da relação entre linguagem humana, inteligência artificial, engenharia de prompts, precisão semântica e eficiência computacional, promovendo o conhecimento, a pesquisa e o uso mais consciente das tecnologias de inteligência artificial.
      </Callout>
    </div>
  );
}
