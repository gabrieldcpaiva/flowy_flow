import { useEffect, useRef, useState, type FormEvent } from "react";
import type { SolutionId } from "../data/content";
import { Icon } from "./Icons";

type Message = { id: number; role: "assistant" | "user"; text: string };

const initialMessages: Message[] = [
  { id: 0, role: "user", text: "Oi! O que a Flowy pode fazer por mim?" },
  {
    id: 1,
    role: "assistant",
    text: "Oi! Vamos deixar seu dia mais leve? Me conta: o que mais toma seu tempo hoje?",
  },
];

function getDemoReply(message: string) {
  const normalized = message.toLocaleLowerCase("pt-BR").normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  if (/pessoa|humano|atendente/.test(normalized)) {
    return "Tem conversa que pede uma pessoa, e tudo bem. O bot pode abrir esse caminho. Neste exemplo, n\u00e3o h\u00e1 um atendente conectado.";
  }
  if (/preco|valor|investimento|custo|orcamento/.test(normalized)) {
    return "Cada projeto tem suas necessidades. O briefing ajuda a definir o escopo e o investimento. N\u00e3o temos pre\u00e7os publicados nesta p\u00e1gina.";
  }
  if (/rotina|pedido|planilha|tarefa|organiza|agenda/.test(normalized)) {
    return "Vamos come\u00e7ar por uma tarefa que se repete: organizar pedidos, reunir informa\u00e7\u00f5es ou preparar avisos para sua equipe. Qual delas pesa mais por a\u00ed?";
  }
  if (/agente|equipe|personalidade/.test(normalized)) {
    return "Agentes digitais podem ter fun\u00e7\u00f5es diferentes e um jeito de conversar pr\u00f3prio. Na aba Equipes de agentes, voc\u00ea pode experimentar alguns exemplos.";
  }
  if (/atend|whatsapp|cliente|resposta|duvida/.test(normalized)) {
    return "Um bom come\u00e7o s\u00e3o as perguntas que seus clientes sempre fazem. O bot pode responder no seu tom e encaminhar o que precisa de uma pessoa.";
  }
  if (/oi|ola|bom dia|boa tarde/.test(normalized)) {
    return "Oi, que bom ter voc\u00ea por aqui! Quer explorar atendimento, tarefas da rotina ou agentes digitais?";
  }
  return "Este \u00e9 um exemplo com respostas prontas, n\u00e3o um bot conectado. Experimente perguntar sobre atendimento, rotina ou agentes. Em um projeto real, as respostas precisam refletir o seu neg\u00f3cio.";
}

function ChatDemo() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);
  const nextId = useRef(2);

  useEffect(() => () => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages, pending]);

  function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || pending) return;
    const userMessage: Message = { id: nextId.current++, role: "user", text: trimmed };
    setMessages((previous) => [...previous.slice(-5), userMessage]);
    setInput("");
    setPending(true);
    timerRef.current = window.setTimeout(() => {
      const reply: Message = { id: nextId.current++, role: "assistant", text: getDemoReply(trimmed) };
      setMessages((previous) => [...previous, reply]);
      setPending(false);
      timerRef.current = null;
    }, 450);
  }

  function reset() {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    timerRef.current = null;
    setMessages(initialMessages);
    setPending(false);
    setInput("");
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    sendMessage(input);
  }

  return (
    <div>
      <div className="chat-demo interaction-surface">
        <div className="chat-header">
          <span className="chat-avatar" aria-hidden="true">f</span>
          <div>
            <strong>Flow Conversa</strong>
            <span>Exemplo interativo</span>
          </div>
          <button className="icon-button chat-reset" onClick={reset} aria-label={"Recome\u00e7ar demonstra\u00e7\u00e3o de conversa"} title={"Recome\u00e7ar exemplo"}>
            <Icon name="reset" size={18} />
          </button>
        </div>
        <div className="chat-messages" ref={listRef} role="log" aria-live="polite" aria-relevant="additions" aria-label="Conversa de exemplo">
          <span className="chat-date">Uma conversa mais leve</span>
          {messages.map((message) => (
            <div key={message.id} className={`chat-bubble chat-bubble-${message.role}`}>
              <span className="sr-only">{message.role === "user" ? "Voc\u00ea: " : "Flow Conversa: "}</span>
              {message.text}
            </div>
          ))}
          {pending && (
            <div className="chat-bubble chat-bubble-assistant typing-indicator">
              <span className="sr-only">Preparando a resposta de exemplo</span>
              <i /><i /><i />
            </div>
          )}
        </div>
        <div className="chat-choices" role="group" aria-label={"Sugest\u00f5es de mensagem"}>
          {["Atendimento", "Minha rotina", "Falar com uma pessoa"].map((choice) => (
            <button key={choice} onClick={() => sendMessage(choice)} disabled={pending}>{choice}</button>
          ))}
        </div>
        <form className="chat-input-form" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="demo-message">Sua mensagem de exemplo</label>
          <input id="demo-message" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Experimente uma mensagem..." autoComplete="off" maxLength={300} />
          <button type="submit" className="chat-send icon-button" disabled={!input.trim() || pending} aria-label={"Enviar mensagem na demonstra\u00e7\u00e3o"}>
            <Icon name="send" size={18} />
          </button>
        </form>
      </div>
      <p className="demo-disclaimer">Demonstra&ccedil;&atilde;o com respostas prontas. Nenhuma mensagem &eacute; enviada.</p>
    </div>
  );
}

const workflowScenarios = {
  pedidos: [
    { title: "Um novo pedido chega", detail: "O fluxo recebe as informa\u00e7\u00f5es do pedido." },
    { title: "Tudo encontra seu lugar", detail: "Os dados s\u00e3o organizados em uma lista." },
    { title: "A equipe fica por dentro", detail: "Um aviso \u00e9 preparado para o respons\u00e1vel." },
  ],
  agenda: [
    { title: "Um cliente pede um hor\u00e1rio", detail: "As informa\u00e7\u00f5es do agendamento chegam." },
    { title: "Os detalhes ficam juntos", detail: "Nome, servi\u00e7o e hor\u00e1rio s\u00e3o reunidos." },
    { title: "Um lembrete ganha forma", detail: "O fluxo prepara um lembrete de exemplo." },
  ],
};

function WorkflowDemo() {
  const [scenario, setScenario] = useState<keyof typeof workflowScenarios>("pedidos");
  const [progress, setProgress] = useState(0);
  const timers = useRef<number[]>([]);
  const running = progress > 0 && progress < 4;

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  function start() {
    timers.current.forEach(window.clearTimeout);
    setProgress(1);
    timers.current = [2, 3, 4].map((step, index) => window.setTimeout(() => setProgress(step), (index + 1) * 700));
  }

  return (
    <div>
      <div className="workflow-demo interaction-surface">
        <div className="interaction-heading"><span className="interaction-dot" />Flow Rotina<span className="interaction-heading-note">Exemplo</span></div>
        <label className="workflow-label" htmlFor="workflow-scenario">Uma tarefa do dia a dia</label>
        <select id="workflow-scenario" value={scenario} disabled={running} onChange={(event) => { setScenario(event.target.value as keyof typeof workflowScenarios); setProgress(0); }}>
          <option value="pedidos">Organizar novos pedidos</option>
          <option value="agenda">Organizar agendamentos</option>
        </select>
        <ol className="workflow-steps" aria-busy={running}>
          {workflowScenarios[scenario].map((step, index) => {
            const done = progress > index + 1;
            const active = progress === index + 1;
            return (
              <li key={`${scenario}-${index}`} className={`${done ? "step-done" : ""} ${active ? "step-active" : ""}`}>
                <span className="workflow-step-number">{done ? <Icon name="check" size={16} /> : index + 1}</span>
                <div><strong>{step.title}</strong><p>{step.detail}</p></div>
                {active && <span className="step-spinner" aria-hidden="true" />}
              </li>
            );
          })}
        </ol>
        <button className="button button-primary workflow-run" onClick={start} disabled={running}>
          {running ? "Experimentando..." : progress === 4 ? "Experimentar de novo" : "Experimentar fluxo"}
          <Icon name={progress === 4 ? "reset" : "play"} size={16} />
        </button>
        <p className="workflow-status" role="status">{progress === 4 ? "Pronto! As tr\u00eas etapas se conectaram neste exemplo." : running ? `Etapa ${progress} de 3 na simula\u00e7\u00e3o.` : "Toque no bot\u00e3o para ver as etapas se conectarem."}</p>
      </div>
      <p className="demo-disclaimer">Simula&ccedil;&atilde;o local. Nenhuma ferramenta ou sistema &eacute; acessado.</p>
    </div>
  );
}

type Tone = "acolhedor" | "direto" | "leve";
const agents = [
  {
    name: "Lia",
    initial: "L",
    job: "Recebe e orienta clientes",
    quotes: {
      acolhedor: "Oi, que bom ter voc\u00ea aqui! Me conta o que precisa. Vamos encontrar um caminho juntos.",
      direto: "Ol\u00e1! Como posso ajudar? Posso explicar os servi\u00e7os ou orientar seu pr\u00f3ximo passo.",
      leve: "Oi! Chegou no lugar certo. Qual \u00e9 a miss\u00e3o de hoje?",
    },
  },
  {
    name: "Nico",
    initial: "N",
    job: "Ajuda a organizar a rotina",
    quotes: {
      acolhedor: "Vamos colocar tudo no seu lugar, com calma. Qual tarefa voc\u00ea quer organizar primeiro?",
      direto: "Vamos organizar as tarefas. Me diga o que precisa ser feito e qual \u00e9 a prioridade.",
      leve: "Uma coisa de cada vez e a rotina respira. Por onde a gente come\u00e7a?",
    },
  },
  {
    name: "Sol",
    initial: "S",
    job: "Apoia as tarefas da equipe",
    quotes: {
      acolhedor: "Estou por aqui para ajudar sua equipe. O que podemos deixar mais simples hoje?",
      direto: "Me conte a tarefa da equipe. Vamos reunir as informa\u00e7\u00f5es necess\u00e1rias.",
      leve: "Vamos tirar uma pend\u00eancia do caminho? Me conta o que est\u00e1 precisando de uma m\u00e3ozinha.",
    },
  },
];

function TeamDemo() {
  const [tone, setTone] = useState<Tone>("acolhedor");
  const [activeAgent, setActiveAgent] = useState(0);

  return (
    <div>
      <div className="team-demo interaction-surface">
        <div className="interaction-heading"><span className="interaction-dot" />Flow Companhia<span className="interaction-heading-note">Exemplo</span></div>
        <fieldset className="tone-picker">
          <legend>Um jeito de conversar</legend>
          <div className="tone-options">
            {([{ value: "acolhedor", label: "Acolhedor" }, { value: "direto", label: "Direto" }, { value: "leve", label: "Leve" }] as const).map((item) => (
              <label key={item.value} className={tone === item.value ? "tone-active" : ""}>
                <input type="radio" name="agent-tone" value={item.value} checked={tone === item.value} onChange={() => setTone(item.value)} />
                {item.label}
              </label>
            ))}
          </div>
        </fieldset>
        <div className="agent-list">
          {agents.map((agent, index) => (
            <div className={`agent-item ${activeAgent === index ? "agent-active" : ""}`} key={agent.name}>
              <button onClick={() => setActiveAgent((current) => current === index ? -1 : index)} aria-expanded={activeAgent === index} aria-controls={`agent-quote-${index}`}>
                <span className={`agent-avatar agent-avatar-${index}`} aria-hidden="true">{agent.initial}</span>
                <span><strong>{agent.name}</strong><small>{agent.job}</small></span>
                <Icon name={activeAgent === index ? "chevron-down" : "plus"} size={18} />
              </button>
              <div id={`agent-quote-${index}`} hidden={activeAgent !== index} aria-live={activeAgent === index ? "polite" : "off"} aria-atomic="true">
                <p className="agent-quote" key={`${index}-${tone}`}>&ldquo;{agent.quotes[tone]}&rdquo;</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="demo-disclaimer">Agentes, nomes e falas fict&iacute;cios, s&oacute; para demonstrar possibilidades.</p>
    </div>
  );
}

const demoCopy: Record<SolutionId, { index: string; title: string; description: string; detail: string }> = {
  conversa: {
    index: "01 / FLOW CONVERSA",
    title: "Um oi que abre\npossibilidades.",
    description: "Seu cliente n\u00e3o precisa falar com um rob\u00f4 sem gra\u00e7a. Um bot pode ser claro, acolhedor e ter o jeito da sua marca.",
    detail: "Experimente a conversa ao lado. Escolha uma sugest\u00e3o ou escreva sua pr\u00f3pria mensagem.",
  },
  rotina: {
    index: "02 / FLOW ROTINA",
    title: "Cada tarefa no\nseu caminho.",
    description: "Quando as etapas se conectam, voc\u00ea n\u00e3o precisa carregar tudo na cabe\u00e7a. A automa\u00e7\u00e3o ajuda a organizar o que se repete.",
    detail: "Escolha uma situa\u00e7\u00e3o do dia a dia e veja um exemplo de fluxo, etapa por etapa.",
  },
  companhia: {
    index: "03 / FLOW COMPANHIA",
    title: "Uma equipe digital.\nNada impessoal.",
    description: "Agentes com pap\u00e9is diferentes e personalidades que fazem sentido para voc\u00ea. Tecnologia n\u00e3o precisa conversar sempre do mesmo jeito.",
    detail: "Mude o tom de voz e conhe\u00e7a os agentes de exemplo. O mesmo cuidado, em jeitos diferentes.",
  },
};

export function Demo({ selected, onStart }: { selected: SolutionId; onStart: (solution: SolutionId) => void }) {
  const copy = demoCopy[selected];
  return (
    <div className="demo-layout" key={selected}>
      <div className="demo-copy">
        <span className="eyebrow">{copy.index}</span>
        <h3>{copy.title}</h3>
        <p>{copy.description}</p>
        <p className="demo-instructions">{copy.detail}</p>
        <button className="text-link" onClick={() => onStart(selected)}>Quero um flow assim<Icon name="arrow-up-right" size={17} /></button>
      </div>
      <div className="demo-interaction">
        {selected === "conversa" && <ChatDemo />}
        {selected === "rotina" && <WorkflowDemo />}
        {selected === "companhia" && <TeamDemo />}
      </div>
    </div>
  );
}