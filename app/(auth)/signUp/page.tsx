"use client";
import "@/style/signin.scss";
import Link from "next/link";
import loginImg from "@/public/loginImg.png";
import Image from "next/image";
import Input from "@/components/Input";
export default function SignUp() {
  return (
    <>
      <div className="create__container">
        <div className="create__container__img">
          <Image
            width={1000}
            height={100}
            className="create__container__img__image"
            src={loginImg}
            alt="library"
          />
        </div>
        <form action={() => {}} className="create__container__from__warper">
          <div className="create__container__from__heading">Welcome Back!</div>
          <div className="create__container__from__sub__heading">
            Already have an account?
            <span>
              <Link href="/signIn" className="create__container__link">
                Sign In
              </Link>
            </span>
          </div>
          <div className="input__row__login">
            <Input label="Full Name" type="text" name="name" />
          </div>
          <div className="input__row__login">
            <Input label="Email" type="text" name="email" />
          </div>
          <div className="input__row__login">
            <Input label="Password" type="password" name="password" />
          </div>
          <div className="input__row__login">
            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
            />
          </div>
          <div
            className="signin__submit__btn"
            style={{
              marginBottom: "20px",
            }}
          >
            <button type="submit" className="forgot__account__button">
              Create Account
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
