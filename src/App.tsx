import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { Wordmark, WaveMark } from "./components/Brand";
import { BriefingDialog } from "./components/BriefingDialog";
import { Demo } from "./components/Demo";
import { Dialog } from "./components/Dialog";
import { Icon, SolutionIllustration } from "./components/Icons";
import { faqItems, solutions, type SolutionId } from "./data/content";

const navigation = [
  { label: "Solu\u00e7\u00f5es", href: "#solucoes" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Nosso jeito", href: "#nosso-jeito" },
  { label: "D\u00favidas", href: "#duvidas" },
];

function Header({ onStart }: { onStart: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    function closeOutside(event: PointerEvent) {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) setMenuOpen(false);
    }
    function closeOnEscape(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") { setMenuOpen(false); menuButtonRef.current?.focus(); }
    }
    const desktop = window.matchMedia("(min-width: 901px)");
    const onResize = () => { if (desktop.matches) setMenuOpen(false); };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    desktop.addEventListener("change", onResize);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
      desktop.removeEventListener("change", onResize);
    };
  }, [menuOpen]);

  return (
    <header className="site-header" ref={headerRef}>
      <div className="content-shell header-inner">
        <a href="#inicio" className="brand-link" aria-label={"Flowy, voltar ao in\u00edcio"}><Wordmark decorative /></a>
        <nav className="desktop-navigation" aria-label={"Navega\u00e7\u00e3o principal"}>
          {navigation.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
        </nav>
        <button className="button header-cta" onClick={onStart}>Vamos come&ccedil;ar<Icon name="arrow-up-right" size={17} /></button>
        <button id="mobile-menu-toggle" ref={menuButtonRef} className="mobile-menu-button icon-button" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}>
          <Icon name={menuOpen ? "close" : "menu"} size={25} />
        </button>
      </div>
      <nav id="mobile-navigation" className="mobile-navigation" aria-label={"Navega\u00e7\u00e3o principal no celular"} hidden={!menuOpen}>
        {navigation.map((item) => <a href={item.href} key={item.href} onClick={() => setMenuOpen(false)}>{item.label}<Icon name="arrow-up-right" size={18} /></a>)}
        <button className="button button-primary" onClick={() => { setMenuOpen(false); onStart(); }}>Preparar meu briefing<Icon name="arrow-up-right" size={18} /></button>
      </nav>
    </header>
  );
}

function FAQ() {
  const [openItem, setOpenItem] = useState<number | null>(0);
  return (
    <div className="faq-list">
      {faqItems.map((item, index) => {
        const isOpen = openItem === index;
        return (
          <div className={`faq-item ${isOpen ? "faq-item-open" : ""}`} key={item.question}>
            <h3>
              <button id={`faq-question-${index}`} aria-expanded={isOpen} aria-controls={`faq-answer-${index}`} onClick={() => setOpenItem(isOpen ? null : index)}>
                {item.question}<Icon name="plus" size={19} />
              </button>
            </h3>
            <div id={`faq-answer-${index}`} className="faq-answer" role="region" aria-labelledby={`faq-question-${index}`} hidden={!isOpen}><p>{item.answer}</p></div>
          </div>
        );
      })}
    </div>
  );
}

function useScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("is-revealed"); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -24px 0px" });
    elements.forEach((element) => { element.classList.add("reveal-ready"); observer.observe(element); });
    return () => { observer.disconnect(); elements.forEach((element) => element.classList.remove("reveal-ready")); };
  }, []);
}

type ActiveDialog = { kind: "briefing"; service?: SolutionId } | { kind: "privacy" } | null;

export default function App() {
  const [selectedDemo, setSelectedDemo] = useState<SolutionId>("conversa");
  const [dialog, setDialog] = useState<ActiveDialog>(null);
  const openBriefing = useCallback((service?: SolutionId) => setDialog({ kind: "briefing", service }), []);
  const closeDialog = useCallback(() => setDialog(null), []);
  useScrollReveal();

  function handleTabKey(event: KeyboardEvent<HTMLButtonElement>, currentIndex: number) {
    let next = currentIndex;
    if (event.key === "ArrowRight") next = (currentIndex + 1) % solutions.length;
    else if (event.key === "ArrowLeft") next = (currentIndex + solutions.length - 1) % solutions.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = solutions.length - 1;
    else return;
    event.preventDefault();
    setSelectedDemo(solutions[next].id);
    document.getElementById(`solution-tab-${solutions[next].id}`)?.focus();
  }

  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conte&uacute;do</a>
      <Header onStart={() => openBriefing()} />

      <main id="conteudo" tabIndex={-1}>
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <img className="hero-image" src="/images/flowy-landscape.jpg" alt={"Paisagem ilustrativa de uma ba\u00eda tranquila, com montanhas verde-\u00e1gua e a luz suave do amanhecer."} fetchPriority="high" width="1536" height="1024" />
          <div className="hero-wash" aria-hidden="true" />
          <div className="content-shell hero-content">
            <div className="hero-copy">
              <div className="eyebrow hero-eyebrow"><span className="tiny-star" aria-hidden="true" />TECNOLOGIA COM JEITO DE GENTE</div>
              <h1 id="hero-title">Mais tempo.<br /><span className="hero-last-line">Mais <Wordmark className="hero-wordmark" decorative /><span className="sr-only">Flowy.</span></span></h1>
              <p className="hero-description">Bots de WhatsApp, automa&ccedil;&otilde;es e agentes com personalidade. Para o seu neg&oacute;cio fluir, sem perder o seu jeito.</p>
              <div className="hero-actions">
                <button className="button button-primary" onClick={() => openBriefing()}>Encontre o seu flow<Icon name="arrow-up-right" size={19} /></button>
                <a href="#solucoes" className="text-link hero-secondary">Conhe&ccedil;a as solu&ccedil;&otilde;es<Icon name="arrow-down" size={16} /></a>
              </div>
            </div>
          </div>
        </section>

        <section className="solutions-section section-space" id="solucoes" aria-labelledby="solutions-title">
          <div className="content-shell">
            <div className="section-heading split-heading" data-reveal>
              <div><span className="eyebrow">PEQUENAS ROTINAS. GRANDES POSSIBILIDADES.</span><h2 id="solutions-title">O que pode fluir<br /><em>melhor por a&iacute;?</em></h2></div>
              <p>Para quem trabalha por conta, tem uma pequena equipe ou um neg&oacute;cio em crescimento. O flow se adapta ao seu momento.</p>
            </div>
            <div className="solutions-grid">
              {solutions.map((solution, index) => (
                <article className="solution-item" key={solution.id} data-reveal style={{ "--reveal-delay": `${index * 70}ms` } as CSSProperties}>
                  <div className="solution-top"><span className="solution-number">{solution.number}</span><SolutionIllustration id={solution.id} /></div>
                  <h3>{solution.name}</h3>
                  <span className="solution-category">{solution.category}</span>
                  <p className="solution-description">{solution.description}</p>
                  <a className="text-link solution-link" href="#na-pratica" onClick={() => setSelectedDemo(solution.id)} aria-label={`Ver ${solution.name} na pr\u00e1tica`}>Ver na pr&aacute;tica<Icon name="arrow-up-right" size={17} /></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="demo-section section-space" id="na-pratica" aria-labelledby="demo-title">
          <div className="content-shell">
            <div className="section-heading split-heading" data-reveal>
              <div><span className="eyebrow">MENOS ABSTRATO. MAIS NA PR&Aacute;TICA.</span><h2 id="demo-title">Parece tecnologia.<br /><em>Soa como voc&ecirc;.</em></h2></div>
              <p>Um gostinho do que &eacute; poss&iacute;vel. Explore os exemplos e imagine o que faria sentido na sua rotina.</p>
            </div>
            <div className="demo-tabs" role="tablist" aria-label={"Exemplos das solu\u00e7\u00f5es"}>
              {solutions.map((solution, index) => (
                <button role="tab" key={solution.id} id={`solution-tab-${solution.id}`} aria-selected={selectedDemo === solution.id} aria-controls="solution-demo-panel" tabIndex={selectedDemo === solution.id ? 0 : -1} className={selectedDemo === solution.id ? "demo-tab-active" : ""} onClick={() => setSelectedDemo(solution.id)} onKeyDown={(event) => handleTabKey(event, index)}>
                  <span className="tab-number">{solution.number}</span>
                  {solution.id === "conversa" ? "Bots de WhatsApp" : solution.id === "rotina" ? "Automa\u00e7\u00f5es" : "Equipes de agentes"}
                  <Icon name="arrow-up-right" size={17} />
                </button>
              ))}
            </div>
            <div id="solution-demo-panel" role="tabpanel" aria-labelledby={`solution-tab-${selectedDemo}`} tabIndex={0}>
              <Demo selected={selectedDemo} onStart={openBriefing} />
            </div>
          </div>
        </section>

        <section className="process-section section-space" id="como-funciona" aria-labelledby="process-title">
          <div className="content-shell">
            <div className="section-heading centered-heading" data-reveal>
              <span className="eyebrow">UM PASSO DE CADA VEZ</span>
              <h2 id="process-title">Todo flow tem <em>um come&ccedil;o.</em></h2>
              <p>Voc&ecirc; n&atilde;o precisa ter todas as respostas.<br />S&oacute; um ponto de partida.</p>
            </div>
            <ol className="process-grid">
              <li data-reveal><span className="process-number">01<span /></span><div><h3>Come&ccedil;a com voc&ecirc;.</h3><p>Pense na tarefa que mais toma seu tempo. Uma situa&ccedil;&atilde;o real do dia a dia j&aacute; ajuda a dar forma &agrave; ideia.</p></div></li>
              <li data-reveal style={{ "--reveal-delay": "70ms" } as CSSProperties}><span className="process-number">02<span /></span><div><h3>Encontra um caminho.</h3><p>Conhe&ccedil;a as solu&ccedil;&otilde;es e escolha um ponto de partida: atendimento, tarefas da rotina ou uma equipe de agentes.</p></div></li>
              <li data-reveal style={{ "--reveal-delay": "140ms" } as CSSProperties}><span className="process-number">03<span /></span><div><h3>Vira um pr&oacute;ximo passo.</h3><p>Prepare seu briefing. Ele organiza suas necessidades para alinhar possibilidades, escopo e investimento.</p></div></li>
            </ol>
            <div className="process-action"><button className="text-link" onClick={() => openBriefing()}>Come&ccedil;ar pelo meu neg&oacute;cio<Icon name="arrow-up-right" size={18} /></button></div>
          </div>
        </section>

        <section className="our-way-section" id="nosso-jeito" aria-labelledby="way-title">
          <div className="content-shell our-way-layout">
            <div className="way-art" data-reveal><WaveMark /></div>
            <div className="way-copy" data-reveal>
              <span className="eyebrow">O NOSSO JEITO DE FAZER FLUIR</span>
              <h2 id="way-title">Automatizar tarefas.<br /><em>N&atilde;o o seu jeito.</em></h2>
              <p>Seu neg&oacute;cio tem uma voz, uma hist&oacute;ria e uma forma de cuidar. A tecnologia deve acompanhar isso. N&atilde;o apagar.</p>
              <span className="way-signature">Mais humano. Mais seu. Mais flow.</span>
            </div>
          </div>
        </section>

        <section className="faq-section section-space" id="duvidas" aria-labelledby="faq-title">
          <div className="content-shell faq-layout">
            <div className="section-heading faq-heading" data-reveal><span className="eyebrow">SEM TECNIQU&Ecirc;S</span><h2 id="faq-title">Pode perguntar.<br /><em>A gente descomplica.</em></h2><p>Algumas respostas para voc&ecirc; dar<br className="desktop-break" /> o primeiro passo com mais clareza.</p></div>
            <FAQ />
          </div>
        </section>

        <section className="contact-section" id="comecar" aria-labelledby="contact-title">
          <WaveMark className="contact-wave" />
          <div className="content-shell contact-content" data-reveal>
            <span className="eyebrow">ESPA&Ccedil;O PARA O QUE IMPORTA</span>
            <h2 id="contact-title">O seu pr&oacute;ximo flow<br /><em>come&ccedil;a aqui.</em></h2>
            <p>Sua ideia n&atilde;o precisa estar pronta.<br />Um exemplo da rotina j&aacute; basta.</p>
            <button className="button button-primary" onClick={() => openBriefing()}>Preparar meu briefing<Icon name="arrow-up-right" size={19} /></button>
            <span className="contact-note">Voc&ecirc; copia ou baixa seu resumo. Nenhum dado &eacute; enviado.</span>
            <span className="contact-limitation">Contato direto e WhatsApp ainda n&atilde;o configurados.</span>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="content-shell">
          <div className="footer-top">
            <div className="footer-brand"><a href="#inicio" className="brand-link" aria-label={"Flowy, voltar ao in\u00edcio"}><Wordmark decorative /></a><p>Tecnologia com jeito de gente.</p></div>
            <nav aria-label={"Navega\u00e7\u00e3o do rodap\u00e9"}>{navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
            <a href="#inicio" className="back-to-top icon-button" aria-label={"Voltar ao in\u00edcio"}><Icon name="arrow-down" size={20} /></a>
          </div>
          <div className="footer-bottom"><span>&copy; {new Date().getFullYear()} Flowy. Feito para fluir.</span><span className="footer-origin">Brasil &middot; Portugu&ecirc;s</span><button onClick={() => setDialog({ kind: "privacy" })}>Privacidade<Icon name="arrow-up-right" size={13} /></button></div>
        </div>
      </footer>

      {dialog?.kind === "briefing" && <BriefingDialog onClose={closeDialog} initialService={dialog.service} />}
      {dialog?.kind === "privacy" && (
        <Dialog onClose={closeDialog} labelledBy="privacy-title" className="privacy-dialog">
          <span className="eyebrow">TRANSPAR&Ecirc;NCIA, SEM RODEIOS</span>
          <h2 id="privacy-title">Sobre os<br /><em>seus dados.</em></h2>
          <p>O briefing &eacute; montado localmente no seu navegador. Os dados digitados <strong>n&atilde;o s&atilde;o enviados &agrave; Flowy</strong> e n&atilde;o ficam salvos neste site. Ao fechar a janela ou recarregar a p&aacute;gina, o rascunho &eacute; descartado.</p>
          <p>Quando voc&ecirc; copia ou baixa o resumo, decide onde guardar e com quem compartilhar. Evite incluir senhas, dados sens&iacute;veis ou informa&ccedil;&otilde;es de clientes.</p>
          <p>As demonstra&ccedil;&otilde;es s&atilde;o simula&ccedil;&otilde;es locais. N&atilde;o conectam WhatsApp, sistemas ou agentes reais. N&atilde;o h&aacute; cookies de rastreamento ou ferramentas de an&aacute;lise implementados nesta p&aacute;gina.</p>
          <button className="button button-primary" onClick={closeDialog}>Tudo claro<Icon name="check" size={17} /></button>
        </Dialog>
      )}
    </>
  );
}
