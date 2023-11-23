import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { User, Question, SignIn, SignOut, Trophy } from "phosphor-react";
import { NavLinkItem } from "./NavLinkItem";
import quizLogo from "../assets/logo.png";
import "./Header.css";

interface NavLink {
  to: string;
  icon: JSX.Element;
  text: string;
  isActive: boolean;
}

const routeToLinksMap: Record<string, NavLink[]> = {
  "/": [
    { to: "/", icon: <SignIn />, text: "Login", isActive: false },
    { to: "/register", icon: <User />, text: "Register", isActive: false },
  ],
  "/register": [
    { to: "/", icon: <SignIn />, text: "Login", isActive: false },
    {
      to: "/register",
      icon: <User weight="fill" />,
      text: "Register",
      isActive: true,
    },
  ],
  "/quiz": [
    { to: "/quiz", icon: <Question />, text: "Quiz", isActive: true },
    { to: "/ranking", icon: <Trophy />, text: "Ranking", isActive: false },
    { to: "/", icon: <SignOut />, text: "Logout", isActive: false },
  ],
  "/ranking": [
    { to: "/quiz", icon: <Question />, text: "Quiz", isActive: false },
    {
      to: "/ranking",
      icon: <Trophy weight="fill" />,
      text: "Ranking",
      isActive: true,
    },
    { to: "/", icon: <SignOut />, text: "Logout", isActive: false },
  ],
};

export function Header() {
  const [currentPath, setCurrentPath] = useState("");
  const location = useLocation();

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  const currentLinks = routeToLinksMap[currentPath] || [];

  return (
    <header className="header">
      <div className="header-logo-title">
        <img className="logo" src={quizLogo} alt="Quiz logo" />
        <h1 className="title">PokeQuiz</h1>
      </div>
      <nav className="header-nav">
        {currentLinks.map((link, index) => (
          <NavLinkItem
            key={index}
            to={link.to}
            icon={link.icon}
            text={link.text}
            isActive={link.isActive}
          />
        ))}
      </nav>
    </header>
  );
}
