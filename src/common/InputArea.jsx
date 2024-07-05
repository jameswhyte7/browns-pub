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

      <Textarea
        label={labelTitle}
        variant="outlined"
        size="md"
        value={value}
        placeholder={placeholder || ""}
        onChange={(e) => updateInputValue(e.target.value)}
        required={required}
      />
    
  );
}

export default InputArea;
