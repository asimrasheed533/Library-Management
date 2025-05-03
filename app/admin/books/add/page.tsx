"use client";
import "@/style/dashboard.scss";

import Input from "@/components/Input";
import TextArea from "@/components/TextArea";

export default function ProductAdd() {
  return (
    <>
      <div className="product__container">
        <div className="input__row">
          {/* <PictureInput label="Book Image" onChange={() => {}} /> */}
          <Input label="Book Name" type="text" name="name" />
          <Input label="Author Name" type="text" name="name" />
        </div>
        <div className="input__row">
          <TextArea label="Description" />
        </div>
        <div className="save__button">
          <button
            type="submit"
            className="listing__page__header__actions__button"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
}
