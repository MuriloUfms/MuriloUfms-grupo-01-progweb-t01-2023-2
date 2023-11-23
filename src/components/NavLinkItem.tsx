import React, { ReactElement } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";

interface NavLinkItemProps {
  to: string;
  icon?: ReactElement;
  text: string;
  isActive: boolean;
}

export function NavLinkItem({ to, icon, text, isActive }: NavLinkItemProps) {
  const nav = useNavigate();

  async function handleClick() {
    if (text === "Logout") {
      auth.signOut().then(() => {
        nav("/");
      });
      alert("Logout realizado com sucesso!");
    }
  }

  return (
    <NavLink to={to} className={isActive ? "active" : ""} onClick={handleClick}>
      {icon &&
        React.cloneElement(icon, { weight: isActive ? "fill" : "regular" })}
      {text}
    </NavLink>
  );
}
