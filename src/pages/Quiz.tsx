import { useState, useEffect } from "react";
import { Card } from "../components/Card";
import "./Quiz.css";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, auth } from "../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

interface Pokemon {
  pokemonName: string;
  pokemonImageUrl: string;
}

export function Quiz() {
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon | null>(null);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [showNextQuestion, setShowNextQuestion] = useState<boolean>(false);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [user] = useAuthState(auth);

  async function fetchPokemon() {
    const randomPokemonId = Math.floor(Math.random() * 151) + 1;
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${randomPokemonId}`
    );
    const data = await response.json();
    const pokemonName = data.name;
    const pokemonImageUrl =
      data.sprites.other["official-artwork"].front_default;
    return { pokemonName, pokemonImageUrl };
  }

  async function getPokemons() {
    const randomPokemons = new Set<Pokemon>();

    while (randomPokemons.size < 4) {
      const pokemon = await fetchPokemon();

      if (randomPokemons.size === 0) {
        setCurrentPokemon(pokemon);
      }
      randomPokemons.add(pokemon);
    }
    setPokemons(Array.from(randomPokemons).sort(() => Math.random() - 0.5));
    setShowNextQuestion(false);
  }

  useEffect(() => {
    getPokemons();
  }, [showNextQuestion]);

  async function handleOptionClick(selectedOption: string) {
    if (selectedOption === currentPokemon?.pokemonName) {
      setIsCorrect(selectedOption === currentPokemon?.pokemonName);

      const usersCollection = collection(db, "users");
      const userSnap = await getDocs(
        query(usersCollection, where("uid", "==", user?.uid))
      );
      const userDoc = userSnap.docs[0];
      const userData = userDoc.data();
      await updateDoc(doc(db, "users", userDoc.id), {
        hits: userData.hits + 1,
      });
    }
    setShowFeedback(true);
  }

  return (
    <div className="container-quiz">
      <div className="title">
        <h2>Who is this Pokemon?</h2>
      </div>
      <div className="pokemon">
        {currentPokemon && <Card image_url={currentPokemon.pokemonImageUrl} />}
      </div>
      {!showFeedback && (
        <div className="options">
          {pokemons.map((option, index) => (
            <button
              key={index}
              className="option"
              onClick={() => handleOptionClick(option.pokemonName)}
              disabled={showFeedback}
            >
              {option.pokemonName[0].toUpperCase() +
                option.pokemonName.slice(1)}
            </button>
          ))}
        </div>
      )}
      {showFeedback && (
        <div className="options">
          <span className={`feedback ${isCorrect ? "correct" : "incorrect"}`}>
            {isCorrect ? "Resposta Correta!" : "Resposta Incorreta!"}
          </span>
          <button
            className="option"
            onClick={() => (setShowNextQuestion(true), setShowFeedback(false))}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
}
