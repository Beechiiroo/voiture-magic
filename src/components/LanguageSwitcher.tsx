
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTranslation, availableLanguages } from "@/hooks/use-translation";
import { toast } from "@/hooks/use-toast";

const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useTranslation();

  const changeLanguage = (lang: typeof availableLanguages[0]) => {
    setLanguage(lang);
    toast({
      title: t("languageChanged"),
      description: t("languageChangedTo", { language: lang.name }),
      variant: "success"
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800">
          <Globe size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {availableLanguages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => changeLanguage(lang)}
            className="flex items-center gap-2"
          >
            <span className="text-base mr-1 transition-transform hover:scale-125 inline-block">
              {lang.flag}
            </span>
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
