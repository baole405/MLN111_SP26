"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface PlayerContextType {
  playerName: string;
  setPlayerName: (name: string) => void;
  totalScore: number;
  addScore: (points: number) => void;
  resetScore: () => void;
  isNameSet: boolean;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [playerName, setPlayerNameState] = useState("");
  const [totalScore, setTotalScore] = useState(0);
  const [isNameSet, setIsNameSet] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedName = localStorage.getItem("playerName");
    const savedScore = localStorage.getItem("totalScore");

    if (savedName) {
      setPlayerNameState(savedName);
      setIsNameSet(true);
    }
    if (savedScore) {
      setTotalScore(parseInt(savedScore, 10));
    }
  }, []);

  // Save to localStorage when changed
  useEffect(() => {
    if (playerName) {
      localStorage.setItem("playerName", playerName);
    }
    localStorage.setItem("totalScore", totalScore.toString());
  }, [playerName, totalScore]);

  const setPlayerName = (name: string) => {
    setPlayerNameState(name);
    setIsNameSet(true);
    localStorage.setItem("playerName", name);
  };

  const addScore = (points: number) => {
    setTotalScore((prev) => {
      const newScore = prev + points;
      localStorage.setItem("totalScore", newScore.toString());
      return newScore;
    });
  };

  const resetScore = () => {
    setTotalScore(0);
    localStorage.setItem("totalScore", "0");
  };

  return (
    <PlayerContext.Provider
      value={{
        playerName,
        setPlayerName,
        totalScore,
        addScore,
        resetScore,
        isNameSet,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
}
