"use client";
import "@/style/signin.scss";
import Link from "next/link";
import loginImg from "@/public/loginImg.png";
import Image from "next/image";
import Input from "@/components/Input";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import MoonLoader from "react-spinners/MoonLoader";
import { toast } from "react-toastify";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: any) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("/api/register", {
        name,
        email,
        password,
      });

      router.replace("/signIn");
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    } catch (err) {
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
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
          <button type="submit" className="forgot__account__button">
            {loading ? (
              <MoonLoader color="white" loading={true} size={20} />
            ) : (
              "Create Account"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
