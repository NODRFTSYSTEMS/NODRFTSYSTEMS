interface ProcessStepProps {
  number: string;
  title: string;
  body: string;
}

export function ProcessStep({ number, title, body }: ProcessStepProps) {
  return (
    <div className="nd-step">
      <span className="nd-step-num" aria-hidden="true">
        {number}
      </span>
      <div>
        <div className="nd-step-title">{title}</div>
        <div className="nd-step-body">{body}</div>
      </div>
    </div>
  );
}
