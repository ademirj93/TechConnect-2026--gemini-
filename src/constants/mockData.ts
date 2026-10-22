import { ScheduleItem, Speaker } from "../types";

export const EVENT_INFO = {
  name: "TechConnect 2026",
  slogan: "Conectando ideias, transformando o futuro",
  date: "20 de novembro de 2026",
  location: "Centro de Convenções TechConnect",
  aboutParagraphs: [
    "O TechConnect 2026 é o principal ponto de encontro para profissionais, pesquisadores, estudantes e entusiastas que estão moldando a próxima geração da tecnologia. Durante um dia inteiro de imersão, conectamos mentes criativas para debater soluções reais voltadas à transformação digital da sociedade e da indústria.",
    "Nesta edição, o evento destaca a convergência entre Inteligência Artificial Generativa, Engenharia de Software Moderna, Computação em Nuvem e Inovação Sustentável. Por meio de palestras magnas e painéis técnicos, você terá acesso às tendências que definirão o mercado tecnológico nos próximos anos.",
  ],
  highlights: [
    { label: "Trilhas de Conteúdo", value: "IA, Inovação & Dev" },
    { label: "Formato do Evento", value: "Presencial & Imersivo" },
    { label: "Público-Alvo", value: "Estudantes e Profissionais" },
  ],
};

export const SCHEDULE_DATA: ScheduleItem[] = [
  {
    id: "act-1",
    time: "09:00 - 10:30",
    title:
      "Keynote de Abertura: A Revolução dos Agentes de Inteligência Artificial",
    description:
      "Uma análise aprofundada sobre como modelos fundacionais e agentes autônomos estão redefinindo a engenharia de software, a tomada de decisão corporativa e a interação humano-computador.",
    track: "Palco Principal • Inteligência Artificial",
  },
  {
    id: "act-2",
    time: "11:00 - 12:30",
    title:
      "Arquiteturas Multiplataforma com React Native e TypeScript em Escala",
    description:
      "Boas práticas de engenharia front-end para construir aplicações web e mobile de alta performance a partir de uma base de código unificada, escalável e fortemente tipada.",
    track: "Trilha Desenvolvimento • Front-End",
  },
  {
    id: "act-3",
    time: "14:00 - 15:30",
    title: "Ecossistemas de Inovação Aberta e Tecnologias Emergentes",
    description:
      "Como universidades, startups e grandes centros de pesquisa estão colaborando para acelerar a transferência tecnológica do ambiente acadêmico para o setor produtivo.",
    track: "Trilha Inovação • Ecossistemas",
  },
  {
    id: "act-4",
    time: "16:00 - 17:30",
    title: "IA Ética, Segurança Cibernética e o Futuro do Trabalho Tecnológico",
    description:
      "Painel de encerramento dedicado aos desafios de governança algorítmica, proteção de dados em sistemas inteligentes e as competências essenciais para os profissionais de 2030.",
    track: "Palco Principal • Painel de Encerramento",
  },
];

export const SPEAKERS_DATA: Speaker[] = [
  {
    id: "spk-1",
    name: "Dra. Helena Vasconcelos",
    specialty: "Pesquisadora em Inteligência Artificial e Deep Learning",
    role: "Diretora de Pesquisa em IA no Instituto Nexus",
    initials: "HV",
    accentColor: "purple",
  },
  {
    id: "spk-2",
    name: "Carlos Eduardo Mendes",
    specialty: "Arquitetura de Software e Desenvolvimento Multiplataforma",
    role: "Staff Frontend Engineer na CloudNova Tech",
    initials: "CM",
    accentColor: "blue",
  },
  {
    id: "spk-3",
    name: "Profa. Me. Sofia Alencar",
    specialty: "Inovação Tecnológica e Interação Humano-Computador",
    role: "Líder de Inovação e Design de Experiência no LabFuturo",
    initials: "SA",
    accentColor: "purple",
  },
  {
    id: "spk-4",
    name: "Rafael Albuquerque",
    specialty: "Engenharia de Dados, MLOps e Segurança em Nuvem",
    role: "Arquiteto Principal de Soluções Cognitivas",
    initials: "RA",
    accentColor: "blue",
  },
];
