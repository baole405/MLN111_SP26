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
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount (client-side only)
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

    // Mark as hydrated after reading localStorage
    setIsHydrated(true);
  }, []);

  // Save to localStorage when changed (client-side only)
  useEffect(() => {
    if (!isHydrated) return;

    if (playerName) {
      localStorage.setItem("playerName", playerName);
    }
    localStorage.setItem("totalScore", totalScore.toString());
  }, [playerName, totalScore, isHydrated]);

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

  // Prevent hydration mismatch by not rendering until client-side
  if (!isHydrated) {
    return (
      <PlayerContext.Provider
        value={{
          playerName: "",
          setPlayerName: () => {},
          totalScore: 0,
          addScore: () => {},
          resetScore: () => {},
          isNameSet: false,
        }}
      >
        {children}
      </PlayerContext.Provider>
    );
  }

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
