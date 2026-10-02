import { useRef, useState, type FormEvent } from "react";
import { interestLabels, type InterestId, type SolutionId } from "../data/content";
import { Dialog } from "./Dialog";
import { Icon } from "./Icons";

const interestOptions: { value: InterestId; title: string; detail: string }[] = [
  { value: "conversa", title: "Atendimento", detail: "Bots para WhatsApp" },
  { value: "rotina", title: "Minha rotina", detail: "Tarefas e processos" },
  { value: "companhia", title: "Uma equipe digital", detail: "Agentes com personalidade" },
  { value: "explorar", title: "Ainda n\u00e3o sei", detail: "Quero descobrir" },
];

export function BriefingDialog({ onClose, initialService }: { onClose: () => void; initialService?: SolutionId }) {
  const [stage, setStage] = useState<"form" | "result">("form");
  const [business, setBusiness] = useState("");
  const [size, setSize] = useState("");
  const [interest, setInterest] = useState<InterestId>(initialService ?? "explorar");
  const [goal, setGoal] = useState("");
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");
  const goalRef = useRef<HTMLTextAreaElement>(null);
  const resultRef = useRef<HTMLTextAreaElement>(null);
  const resultHeadingRef = useRef<HTMLHeadingElement>(null);

  const briefing = [
    "FLOWY | Meu briefing",
    "",
    `Neg\u00f3cio ou projeto: ${business.trim() || "Ainda n\u00e3o informado"}`,
    `Como trabalho hoje: ${size || "Ainda n\u00e3o informado"}`,
    `Meu interesse: ${interestLabels[interest]}`,
    "",
    "O que eu gostaria de deixar mais leve:",
    goal.trim(),
    "",
    "Pr\u00f3ximo passo: alinhar possibilidades, escopo, ferramentas e investimento pelo canal oficial, quando dispon\u00edvel.",
    "",
    "Resumo preparado localmente no site da Flowy. N\u00e3o foi enviado e n\u00e3o representa um or\u00e7amento.",
  ].join("\n");

  function submit(event: FormEvent) {
    event.preventDefault();
    if (goal.trim().length < 10) {
      setError("Conte um pouco mais sobre sua necessidade, com pelo menos 10 caracteres.");
      goalRef.current?.focus();
      return;
    }
    setError("");
    setStage("result");
    window.requestAnimationFrame(() => resultHeadingRef.current?.focus());
  }

  async function copyBriefing() {
    let copied = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(briefing);
        copied = true;
      }
    } catch {
      // The selectable preview is also a fallback when clipboard permission is denied.
    }
    if (!copied) {
      resultRef.current?.focus();
      resultRef.current?.select();
      try { copied = document.execCommand("copy"); } catch { copied = false; }
    }
    setFeedback(copied ? "Briefing copiado. Agora voc\u00ea pode guardar seu resumo." : "Seu resumo est\u00e1 selecionado. Use a op\u00e7\u00e3o de copiar do seu dispositivo ou baixe o arquivo.");
  }

  function downloadBriefing() {
    const blob = new Blob([`\ufeff${briefing}`], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "meu-briefing-flowy.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setFeedback("Arquivo preparado para download. Nenhum dado foi enviado.");
  }

  return (
    <Dialog onClose={onClose} labelledBy="briefing-title" describedBy="briefing-description" className="briefing-dialog">
      <span className="eyebrow">SEU PRIMEIRO PASSO</span>
      {stage === "form" ? (
        <>
          <h2 id="briefing-title">Vamos encontrar<br />seu <em>flow.</em></h2>
          <p id="briefing-description" className="dialog-description">Conte o que pesa na rotina. Voc&ecirc; n&atilde;o precisa saber o nome da solu&ccedil;&atilde;o.</p>
          <div className="local-notice"><Icon name="lock" size={17} /><p>O contato direto ainda n&atilde;o est&aacute; configurado. Este resumo fica com voc&ecirc; e <strong>n&atilde;o &eacute; enviado &agrave; Flowy.</strong></p></div>
          <form className="briefing-form" onSubmit={submit} noValidate>
            <div className="form-two-columns">
              <div className="form-field">
                <label htmlFor="briefing-business">Seu neg&oacute;cio <span>(opcional)</span></label>
                <input id="briefing-business" value={business} onChange={(event) => setBusiness(event.target.value)} placeholder="Nome ou tipo de atividade" maxLength={100} autoComplete="organization" autoFocus />
              </div>
              <div className="form-field">
                <label htmlFor="briefing-size">Como voc&ecirc; trabalha?</label>
                <select id="briefing-size" value={size} onChange={(event) => setSize(event.target.value)}>
                  <option value="">Prefiro n&atilde;o informar</option>
                  <option value="Trabalho sozinho(a)">Trabalho sozinho(a)</option>
                  <option value="Tenho uma pequena equipe">Tenho uma pequena equipe</option>
                  <option value={"Minha equipe est\u00e1 crescendo"}>Minha equipe est&aacute; crescendo</option>
                  <option value={"Tenho uma opera\u00e7\u00e3o maior"}>Tenho uma opera&ccedil;&atilde;o maior</option>
                </select>
              </div>
            </div>
            <fieldset className="interest-picker">
              <legend>Por onde voc&ecirc; gostaria de come&ccedil;ar?</legend>
              <div className="interest-options">
                {interestOptions.map((option) => (
                  <label key={option.value} className={interest === option.value ? "interest-selected" : ""}>
                    <input type="radio" name="briefing-interest" value={option.value} checked={interest === option.value} onChange={() => setInterest(option.value)} />
                    <span><strong>{option.title}</strong><small>{option.detail}</small></span>
                    <span className="interest-radio" aria-hidden="true" />
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="form-field">
              <label htmlFor="briefing-goal">O que voc&ecirc; quer deixar mais leve? <span>(obrigat&oacute;rio)</span></label>
              <textarea ref={goalRef} id="briefing-goal" value={goal} onChange={(event) => { setGoal(event.target.value); if (error) setError(""); }} placeholder={"Ex.: respondo sempre \u00e0s mesmas perguntas no WhatsApp e preciso organizar meus pedidos."} rows={3} required minLength={10} maxLength={1500} aria-invalid={!!error} aria-describedby={error ? "briefing-error" : "briefing-goal-hint"} />
              {error ? <p className="field-error" id="briefing-error" role="alert">{error}</p> : <p className="field-hint" id="briefing-goal-hint">Um exemplo da sua rotina j&aacute; &eacute; um &oacute;timo come&ccedil;o.</p>}
            </div>
            <button className="button button-primary form-submit" type="submit">Montar meu briefing<Icon name="arrow-up-right" size={18} /></button>
            <p className="form-footnote">Sem cadastro. Ao fechar a janela, o rascunho &eacute; descartado.</p>
          </form>
        </>
      ) : (
        <div className="briefing-result-stage">
          <span className="result-check" aria-hidden="true"><Icon name="check" size={25} /></span>
          <h2 id="briefing-title" ref={resultHeadingRef} tabIndex={-1}>Seu pr&oacute;ximo passo,<br />mais <em>claro.</em></h2>
          <p id="briefing-description" className="dialog-description">Seu briefing est&aacute; pronto para copiar ou guardar. Ele n&atilde;o foi enviado, e n&atilde;o &eacute; um or&ccedil;amento.</p>
          <label className="sr-only" htmlFor="briefing-result">Seu briefing pronto</label>
          <textarea ref={resultRef} id="briefing-result" className="briefing-result" readOnly value={briefing} rows={10} />
          <div className="result-actions">
            <button className="button button-primary" onClick={copyBriefing}><Icon name="copy" size={18} />Copiar briefing</button>
            <button className="button button-outline" onClick={downloadBriefing}><Icon name="download" size={18} />Baixar arquivo</button>
          </div>
          <p className="result-feedback" role="status">{feedback || "Guarde para compartilhar quando o canal oficial estiver dispon\u00edvel."}</p>
          <button className="text-link edit-briefing" onClick={() => { setStage("form"); setFeedback(""); }}>Editar meu briefing<Icon name="reset" size={16} /></button>
        </div>
      )}
    </Dialog>
  );
}