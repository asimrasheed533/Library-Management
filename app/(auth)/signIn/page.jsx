"use client";
import { useRouter } from "next/navigation";
import "@/style/signin.scss";
import Link from "next/link";
import loginImg from "@/public/loginImg.png";
import Image from "next/image";
import Input from "@/components/Input";

export default function SignIn() {
  const router = useRouter();

  return (
    <div className="create__container">
      <div className="create__container__img">
        <Image
          className="create__container__img__image"
          src={loginImg}
          alt="library"
        />
      </div>
      <form action={() => {}} className="create__container__from__warper">
        <div className="create__container__from__heading">Welcome Back!</div>
        <div className="create__container__from__sub__heading">
          Don't have an account?{" "}
          <span>
            <Link href="/signUp" className="create__container__link">
              Sign Up
            </Link>
          </span>
        </div>
        <div className="input__row__login">
          <Input label="Email" type="email" name="email" />
        </div>
        <div className="input__row__login">
          <Input label="Password" type="password" name="password" />
        </div>
        <div
          className="signin__submit__btn"
          style={{
            marginBottom: "20px",
          }}
        >
          <button type="submit" className="forgot__account__button">
            LogIn
          </button>
        </div>
      </form>
    </div>
  );
}
