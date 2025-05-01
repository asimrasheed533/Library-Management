"use client";
import { useRouter } from "next/navigation";
import "@/style/signin.scss";
import Link from "next/link";
import loginImg from "@/public/loginImg.png";
import Image from "next/image";
import Input from "@/components/Input";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/login", {
        email,
        password,
      });

      if (res.data.error) {
        toast.error(res.data.error);
        return;
      }
      toast.success("Logged in successfully");

      router.replace("/");
    } catch (e) {
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="create__container">
      <div className="create__container__img">
        <Image
          className="create__container__img__image"
          src={loginImg}
          alt="library"
        />
      </div>
      <form onSubmit={handleSubmit} className="create__container__from__warper">
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
          <Input
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
          />
        </div>
        <div className="input__row__login">
          <Input
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
          />
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
