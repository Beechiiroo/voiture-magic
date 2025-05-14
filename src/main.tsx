
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Fonction pour appliquer le thème avant le rendu
const initializeTheme = () => {
  const storedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  
  if (storedTheme === "dark" || (storedTheme === "system" && systemPrefersDark) || (!storedTheme && systemPrefersDark)) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

// Appliquer le thème avant le rendu initial
initializeTheme();

createRoot(document.getElementById("root")!).render(<App />);
