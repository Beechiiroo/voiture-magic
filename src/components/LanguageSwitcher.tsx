
import { useState } from "react";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

// Types de langues disponibles
type Language = {
  code: string;
  name: string;
  flag: string;
};

// Liste des langues disponibles
const languages: Language[] = [
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "it", name: "Italiano", flag: "🇮🇹" }
];

const LanguageSwitcher = () => {
  const [language, setLanguage] = useState<Language>(languages[0]);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    // Dans une application réelle, nous changerions la langue ici
    // avec i18n ou une bibliothèque similaire
    console.log(`Langue changée pour: ${lang.name}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800">
          <Globe size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang)}
            className="flex items-center gap-2"
          >
            <span className="text-base mr-1">{lang.flag}</span>
            <span>{lang.name}</span>
            {language.code === lang.code && (
              <span className="w-2 h-2 rounded-full bg-green-500 ml-auto"></span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
