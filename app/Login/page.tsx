"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Login() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async () => {

    try {

      await axios.post(
        "/api/login",
        {
          email,
          password,
        }
      );

      alert("Login Successful");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="authContainer">

      <h1>Login</h1>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <button onClick={handleLogin}>
        Login
      </button>

      <p>
        Don't have an account?

        <Link href="/signup">
          Signup
        </Link>
      </p>

    </div>
  );
}