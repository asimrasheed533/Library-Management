"use client";
import { ISelect } from "@/interfaces";
import ReactSelect from "react-select";
import { useState } from "react";
import "@/style/input.scss";
const Select = ({
  placeholder,
  options,
  value,
  onChange,
  label,
  isMulti,
  disabled,
}: ISelect) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(!!value);

  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      fontSize: "12px",
      minHeight: "50px",
      borderRadius: "12px",
      borderColor:
        state.isFocused && !value ? "var(--white)" : "var(--whiteShadow)",
      backgroundColor: "var(--lightBlue)",
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: "var(--white)",
      zIndex: 9999,
    }),
    singleValue: (base: any) => ({
      ...base,
      color: "var(--blue)",
    }),
    menuList: (base: any) => ({
      ...base,
      color: "var(--blue)",
    }),
    placeholder: (base: any, state: any) => ({
      ...base,
      color:
        state.isFocused || value ? "var(--whiteShadow)" : "var(--whiteShadow)",
    }),
    option: (base: any) => ({
      ...base,
      fontSize: "12px",
    }),
  };

  const customTheme = (theme: any) => ({
    ...theme,
    colors: {
      ...theme.colors,
      primary25: "var(--white)",
      primary: "var(--white)",
    },
  });

  return (
    <div className="container__main__content__details__select">
      <div
        className={`container__main__content__details__select__label ${
          isFocused || value ? "active" : ""
        }`}
      >
        {label}
      </div>
      <ReactSelect
        placeholder={placeholder}
        options={options}
        value={value}
        onChange={onChange}
        isMulti={isMulti}
        onFocus={handleFocus}
        onBlur={handleBlur}
        styles={customStyles}
        theme={customTheme}
        isDisabled={disabled}
      />
    </div>
  );
};

export default Select;
