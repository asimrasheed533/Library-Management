"use client";
import "@/style/dashboard.scss";

import Input from "@/components/Input";
import Select from "@/components/Select";
import TextArea from "@/components/TextArea";

export default function ProductAdd() {
  return (
    <>
      <div className="product__container">
        <div className="input__row">
          <Input label="Product Name" type="text" name="name" />
          <Select label="Category" options={[]} />
        </div>
        <div className="input__row">
          <Input label="Quantity" type="text" name="quantity" />
          <Input label="Price " type="text" name="price" />
        </div>
        <div className="input__row">
          <Select label="Active" options={[]} />
        </div>
        <div className="input__row">
          <TextArea label="Description" />
        </div>
      </div>
    </>
  );
}
