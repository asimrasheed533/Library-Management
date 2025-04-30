"use client";

import { useEffect, useState } from "react";

import { ITextArea } from "@/interfaces";
import "@/style/input.scss";
export default function TextArea({
  help,
  example,
  label,
  id,
  error,
  type,
  defaultOptions,
  prefix,
  isRtl,
  ...props
}: ITextArea) {
  const [value, setValue] = useState(props?.value ? props?.value : "");

  useEffect(() => {
    setValue(props?.value ? props?.value : "");
  }, [props]);

  const [isSecure, setIsSecure] = useState(true);

  return (
    <div className="container__main__content__details__main__input">
      <label
        htmlFor={id}
        className="container__main__content__details__main__input__label"
      >
        {label}
      </label>
      <div className="container__main__content__details__main__input__field__wrapper__textarea">
        <textarea
          id={id}
          name={id}
          value={value}
          autoComplete="off"
          aria-autocomplete="none"
          className={`container__main__content__details__main__input__field__textarea${
            value?.length > 0 ? " has__value" : ""
          }`}
          placeholder={type === "time" ? "HH:MM" : props?.placeholder}
          {...props}
        />
      </div>
      {error && (
        <div className="container__main__content__details__main__input__error">
          {error}
        </div>
      )}
    </div>
  );
}
