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
}) {
  const [value, setValue] = useState(defaultValue);

  const updateInputValue = (val) => {
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
