import { Stethoscope } from 'lucide-react';

export default function Logo() {
  return (
    <a className="logo" href="#/" aria-label="DoctorSahab Talk AI home">
      <span className="logo-mark"><Stethoscope size={21} strokeWidth={2.4} /></span>
      <span className="logo-text"><b>DoctorSahab</b><strong>Talk AI</strong></span>
    </a>
  );
}
