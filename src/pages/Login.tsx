import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../services/firebase";

import "./Auth.css";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const nav = useNavigate();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    await signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential?.user;
        if (user) {
          alert("Login realizado com sucesso!");
          nav("/quiz", { replace: true });
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  return (
    <div className="container-auth">
      <div className="title">
        <h2>Login</h2>
      </div>
      <div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <button type="submit">LOGIN</button>
          <Link className="link" to="/register">
            Não possui uma conta? Cadastre-se!
          </Link>
        </form>
      </div>
    </div>
  );
}
