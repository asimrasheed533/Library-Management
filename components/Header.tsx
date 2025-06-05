"use client";
import "@/style/header.scss";

import React, { useEffect, useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logoLib from "@/public/logoLib.png";
import axios from "axios";
import MoonLoader from "react-spinners/MoonLoader";

export default function Header({ token }: { token: string | null }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  function checkNavOpen() {
    if (window.innerWidth <= 950) {
      setIsOpenMenu(false);
    } else {
      setIsOpenMenu(true);
    }
  }
  useEffect(() => {
    checkNavOpen();

    window.addEventListener("resize", checkNavOpen);
  }, []);

  return (
    <>
      <ClickAwayListener
        onClickAway={() => {
          if (window.innerWidth <= 950) {
            setIsOpenMenu(false);
          }
        }}
      >
        <div className="nav__bar__container">
          {isOpenMenu ? (
            <div className="nav__entry">
              <Link
                href="/"
                className={`nav__entry__item ${
                  pathname === "/" ? "active" : ""
                }`}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`nav__entry__item ${
                  pathname === "/about" ? "active" : ""
                }`}
              >
                About
              </Link>

              <Link
                href="/contact"
                className={`nav__entry__item ${
                  pathname === "/contact" ? "active" : ""
                }`}
              >
                Contact
              </Link>
              <div className="menu__close__warper">
                <div className="menu__close__title">Library</div>
                <div
                  onClick={() => setIsOpenMenu(false)}
                  className="menu__close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-x"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </div>
              </div>
            </div>
          ) : null}
          <button
            onClick={() => setIsOpenMenu(!isOpenMenu)}
            className="header__container__menu__icon"
          >
            <svg
              width="24"
              height="22"
              viewBox="0 0 14 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line y1="0.5" x2="7" y2="0.5" stroke="#C4C4C4" />
              <line y1="3.5" x2="11" y2="3.5" stroke="#C4C4C4" />
              <line y1="6.5" x2="14" y2="6.5" stroke="#C4C4C4" />
            </svg>
          </button>
          <button onClick={() => router.push("/")} className="nav__log">
            <Image
              width={100}
              height={100}
              className="nav__log__image"
              src={logoLib}
              alt="logo"
            />
          </button>
          <div className="nav__register">
            {token ? (
              <>
                <div className="nav__register__btns">
                  <button
                    onClick={async () => {
                      try {
                        setLoading(true);
                        await axios("/api/logout", { method: "POST" });
                        router.refresh();
                      } catch (err) {
                        console.error("Logout failed:", err);
                      } finally {
                        setLoading(false);
                      }
                    }}
                    className="nav__register__button"
                  >
                    {loading ? (
                      <MoonLoader color="white" loading={true} size={20} />
                    ) : (
                      "Logout"
                    )}
                  </button>
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={async () => {
                    try {
                      setLoading(true);
                      router.push("/signIn");
                    } finally {
                      setLoading(false);
                    }
                  }}
                  className="nav__register__button"
                >
                  {loading ? (
                    <MoonLoader color="white" loading={loading} size={20} />
                  ) : null}
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </ClickAwayListener>
    </>
  );
}
