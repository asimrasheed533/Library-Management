"use client";
import "@/style/signin.scss";
import Link from "next/link";
import loginImg from "@/public/loginImg.png";
import Image from "next/image";
import Input from "@/components/Input";
import { FormEvent, useState, useTransition } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const [processing] = useTransition();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: any) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { name, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post("/api/register", {
        name,
        email,
        password,
      });
      setSuccess(res.data.message);
      router.replace("/signIn");
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    } catch (err) {
      setError((err as any).response?.data?.message || "Something went wrong.");
    }
  };

  return (
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
      <form onSubmit={handleSubmit} className="create__container__from__warper">
        <div className="create__container__from__heading">Welcome Back!</div>
        <div className="create__container__from__sub__heading">
          Already have an account?
          <span>
            <Link href="/signIn" className="create__container__link">
              Sign In
            </Link>
          </span>
        </div>

        {error && (
          <div
            style={{
              color: "#ff000090",
            }}
            className="error-message"
          >
            {error}
          </div>
        )}
        {success && (
          <div
            style={{
              color: "#008000",
            }}
            className="success-message"
          >
            {success}
          </div>
        )}

        <div className="input__row__login">
          <Input
            label="Full Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="input__row__login">
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="input__row__login">
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="input__row__login">
          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <div className="signin__submit__btn" style={{ marginBottom: "20px" }}>
          <button
            type="submit"
            className="forgot__account__button"
            disabled={processing}
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
}
