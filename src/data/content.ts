export type SolutionId = "conversa" | "rotina" | "companhia";
export type InterestId = SolutionId | "explorar";

export const solutions: {
  id: SolutionId;
  number: string;
  name: string;
  category: string;
  description: string;
}[] = [
  {
    id: "conversa",
    number: "01",
    name: "Flow Conversa",
    category: "Bots para WhatsApp",
    description:
      "Um bot com o seu jeito para responder d\u00favidas, orientar clientes e abrir espa\u00e7o para a sua equipe.",
  },
  {
    id: "rotina",
    number: "02",
    name: "Flow Rotina",
    category: "Automa\u00e7\u00f5es para o seu neg\u00f3cio",
    description:
      "Menos copiar e colar. Mais tarefas conectadas, informa\u00e7\u00f5es organizadas e processos que fazem sentido.",
  },
  {
    id: "companhia",
    number: "03",
    name: "Flow Companhia",
    category: "Equipes de agentes digitais",
    description:
      "Cada agente com uma fun\u00e7\u00e3o e uma personalidade. Uma equipe digital que fala a l\u00edngua da sua marca.",
  },
];

export const interestLabels: Record<InterestId, string> = {
  conversa: "Bots para WhatsApp",
  rotina: "Automa\u00e7\u00f5es de rotina",
  companhia: "Equipes de agentes digitais",
  explorar: "Ainda quero descobrir",
};

export const faqItems = [
  {
    question: "Preciso entender de tecnologia?",
    answer:
      "N\u00e3o precisa saber programar para dar o primeiro passo. Comece contando como voc\u00ea trabalha hoje e o que gostaria de simplificar. Aqui, a ideia \u00e9 entender a necessidade antes de escolher a tecnologia.",
  },
  {
    question: "Faz sentido para um neg\u00f3cio pequeno?",
    answer:
      "Sim. As solu\u00e7\u00f5es podem ser pensadas para quem trabalha sozinho, pequenas equipes e opera\u00e7\u00f5es maiores. O ponto de partida \u00e9 o que seu neg\u00f3cio precisa, n\u00e3o o seu tamanho.",
  },
  {
    question: "Um bot substitui o atendimento humano?",
    answer:
      "N\u00e3o precisa substituir. Ele pode cuidar de perguntas frequentes e tarefas definidas, enquanto conversas delicadas e decis\u00f5es importantes continuam com uma pessoa. Esses limites fazem parte do desenho de cada projeto.",
  },
  {
    question: "D\u00e1 para conectar as ferramentas que j\u00e1 uso?",
    answer:
      "Depende das ferramentas, dos acessos e das possibilidades de integra\u00e7\u00e3o. Anote no briefing quais sistemas voc\u00ea usa, para que a viabilidade possa ser avaliada. Este site n\u00e3o faz nenhuma conex\u00e3o com seus sistemas.",
  },
  {
    question: "E o investimento, como funciona?",
    answer:
      "O investimento precisa considerar o escopo, as ferramentas e as necessidades de cada projeto. N\u00e3o h\u00e1 uma tabela de pre\u00e7os publicada aqui. Preparar um briefing ajuda a organizar o que precisa ser definido, sem compromisso de compra.",
  },
  {
    question: "Como dou o pr\u00f3ximo passo?",
    answer:
      "Voc\u00ea pode montar um briefing nesta p\u00e1gina e copiar ou baixar o resumo. O contato direto, incluindo o WhatsApp oficial, ainda n\u00e3o est\u00e1 configurado. Nenhum dado do briefing \u00e9 enviado \u00e0 Flowy.",
  },
];