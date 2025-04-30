"use client";
import "@/style/dashboard.scss";
import Input from "@/components/Input";
import PictureInput from "@/components/PictureInput";
export default function AddCategories() {
  return (
    <>
      <div className="product__container">
        <form
          action={() => {}}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <PictureInput label="Category Image" onChange={() => {}} />
          <div className="input__row">
            <Input label="Category Name" type="text" name="name" />
            <button
              type="submit"
              className="listing__page__header__actions__button"
            ></button>
          </div>
        </form>
      </div>
    </>
  );
}
