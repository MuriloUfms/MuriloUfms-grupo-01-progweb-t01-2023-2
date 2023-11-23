import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../services/firebase";
import "./Auth.css";

export function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const nav = useNavigate();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    await createUserWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        const user = userCredential?.user;
        if (user) {
          await addDoc(collection(db, "users"), {
            uid: user.uid,
            username: username,
            hits: 0,
          });
          alert("Cadastro realizado com sucesso!");
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
        <h2>Cadastre-se</h2>
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
            type="text"
            placeholder="Username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
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
          <button type="submit">Cadastrar</button>
          <Link className="link" to="/">
            Já possui uma conta? Faça login!
          </Link>
        </form>
      </div>
    </div>
  );
}
