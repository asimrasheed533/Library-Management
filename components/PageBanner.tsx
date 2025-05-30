import Image from "next/image";
import React from "react";
import "@/style/home.scss";
export default function PageBanner({ title }: { title: string }) {
  return (
    <>
      <div className="banner__page__container">
        <Image
          className="banner__page__container__overlay__img"
          width={2000}
          height={400}
          src="https://res.cloudinary.com/dsxbqyjwo/image/upload/v1746016072/2575_vjen3c.jpg"
          alt="library"
        />

        <div className="banner__page__container__text">{title}</div>
      </div>
    </>
  );
}
