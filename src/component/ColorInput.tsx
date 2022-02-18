import { SyntheticEvent, useState } from "react";
import colorArray from "./Colors";
import chroma from "chroma-js";
import { StylesConfig } from "react-select";
import CreatableSelect from "react-select/creatable";
import { isJSDocUnknownTag } from "typescript";

export default function ColorInput() {
  const [inputedColor, setInputedColor] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);

  const hexRegex: RegExp = /^#([0-9a-f]{3}){1,2}$/i;

  const dot = (color = "transparent") => ({
    alignItems: "center",
    display: "flex",

    ":before": {
      backgroundColor: color,
      borderRadius: 10,
      content: '" "',
      display: "block",
      marginRight: 8,
      height: 10,
      width: 10,
    },
  });

  const colourStyles: StylesConfig<any, true> = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color ?? inputedColor);
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? data.color
          : isFocused
          ? color.alpha(0.1).css()
          : undefined,
        color: isDisabled
          ? "#ccc"
          : isSelected
          ? chroma.contrast(color, "white") > 2
            ? "white"
            : "black"
          : data.color,
        cursor: isDisabled ? "not-allowed" : "default",

        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : color.alpha(0.3).css()
            : undefined,
        },
      };
    },
    input: (styles) => ({ ...styles, ...dot() }),
    placeholder: (styles) => ({ ...styles, ...dot("#ccc") }),
    singleValue: (styles, { data }) => ({
      ...styles,
      ...dot(data.color ?? inputedColor),
    }),
  };

  const handleChange = (selectedColor: any) => {
    console.log(selectedColor);
    setSelectedColor(selectedColor);
    document.body.style.backgroundColor =
      selectedColor.color ?? selectedColor.value;
  };
  const handleInputChange = (input: string) => {
    setInputedColor(input);
  };

  const checkNewOption = (input: string) => {
    return hexRegex.test(input);
  };

  return (
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700"
      >
        Background Color
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="flex">
          <CreatableSelect
            defaultValue={colorArray[144]}
            onChange={handleChange}
            options={colorArray}
            onInputChange={handleInputChange}
            styles={colourStyles}
            isSearchable
            formatCreateLabel={(userInput) => `Add ${userInput}`}
            isValidNewOption={checkNewOption}
          />
        </div>
      </div>
    </div>
  );
}
