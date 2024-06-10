import { Input } from "@material-tailwind/react";
import { useState } from "react";

function InputText({
  labelTitle,
  type,
  containerStyle,
  defaultValue,
  placeholder,
  updateFormValue,
  updateType,
  required = false,
  min,
}) {
  const [value, setValue] = useState(defaultValue);

  const updateInputValue = (val) => {
    // Ensure the value is at least the minimum value if it's a number
    if (type === "number" && min !== undefined) {
      val = Math.max(min, parseInt(val, 10));
    }
    setValue(val);
    updateFormValue({ updateType, value: val });
  };

  return (
    <div className={`form-control w-full ${containerStyle}`}>
      <Input
        type={type || "text"}
        label={labelTitle}
        variant="outlined"
        size="lg"
        value={value}
        placeholder={placeholder || ""}
        onChange={(e) => updateInputValue(e.target.value)}
        required={required}
      />
    </div>
  );
}

export default InputText;
