import { useEffect, useRef, type ReactNode } from "react";
import { Icon } from "./Icons";

export function Dialog({
  children,
  onClose,
  labelledBy,
  describedBy,
  className = "",
}: {
  children: ReactNode;
  onClose: () => void;
  labelledBy: string;
  describedBy?: string;
  className?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const backdropPointerDown = useRef(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    document.body.style.overflow = "hidden";
    if (dialog && !dialog.open) dialog.showModal();

    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && document.contains(previousFocus) && previousFocus.getClientRects().length > 0) {
        previousFocus.focus({ preventScroll: true });
      } else {
        document.getElementById("mobile-menu-toggle")?.focus({ preventScroll: true });
      }
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="app-dialog"
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onPointerDown={(event) => {
        backdropPointerDown.current = event.target === event.currentTarget;
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget && backdropPointerDown.current) onClose();
        backdropPointerDown.current = false;
      }}
    >
      <div className={`dialog-content ${className}`}>
        <button className="dialog-close icon-button" onClick={onClose} aria-label="Fechar janela">
          <Icon name="close" size={22} />
        </button>
        {children}
      </div>
    </dialog>
  );
}