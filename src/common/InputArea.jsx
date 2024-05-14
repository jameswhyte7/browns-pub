import { Textarea } from "@material-tailwind/react";
import { useState } from "react";

function InputArea({
  labelTitle,
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
      <Textarea
        label={labelTitle}
        variant="outlined"
        size="md"
        value={value}
        placeholder={placeholder || ""}
        onChange={(e) => updateInputValue(e.target.value)}
        required={required}
      />
    </div>
  );
}

export default InputArea;
