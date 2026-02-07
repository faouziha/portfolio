import React, { useState, useEffect, useRef } from "react";

const DecryptText = ({ text, speed = 50, trigger = true }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
  const intervalRef = useRef(null);

  const startScramble = () => {
    let iteration = 0;
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text.split("").map((letter, index) => {
          if (index < iteration) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );

      if (iteration >= text.length) clearInterval(intervalRef.current);
      iteration += 1 / 3;
    }, speed);
  };

  useEffect(() => {
    if (trigger) startScramble();
    return () => clearInterval(intervalRef.current);
  }, [text, trigger]);

  return <span onLoad={startScramble}>{displayText}</span>;
};

export default DecryptText;