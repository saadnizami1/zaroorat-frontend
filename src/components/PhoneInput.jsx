import { toLocalPkPhone } from "../utils/pakistan";
import "../css/PhoneInput.css";

/**
 * Pakistan phone input with a fixed +92 prefix.
 * `value` is the 10-digit national number (no leading 0). onChange returns the
 * cleaned local digits so callers can submit `+92` + value.
 */
const PhoneInput = ({ value = "", onChange, required = false, id, invalid = false }) => {
  return (
    <div className={`phone-input ${invalid ? "is-invalid" : ""}`}>
      <span className="phone-prefix">+92</span>
      <input
        id={id}
        type="tel"
        inputMode="numeric"
        autoComplete="tel"
        placeholder="3XX XXXXXXX"
        value={value}
        required={required}
        onChange={(e) => onChange(toLocalPkPhone(e.target.value))}
      />
    </div>
  );
};

export default PhoneInput;
