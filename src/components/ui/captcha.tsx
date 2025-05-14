
import { useState, useEffect } from "react";
import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { RefreshCw } from "lucide-react";

interface CaptchaProps {
  onVerify: (verified: boolean) => void;
}

export const Captcha = ({ onVerify }: CaptchaProps) => {
  const [verified, setVerified] = useState(false);
  const [challenge, setChallenge] = useState({ num1: 0, num2: 0 });
  const [answer, setAnswer] = useState("");
  const [showChallenge, setShowChallenge] = useState(false);
  
  const generateChallenge = () => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    setChallenge({ num1, num2 });
    setAnswer("");
  };
  
  useEffect(() => {
    generateChallenge();
  }, []);
  
  const handleCheckboxChange = (checked: boolean) => {
    if (checked) {
      setShowChallenge(true);
    } else {
      setVerified(false);
      onVerify(false);
    }
  };
  
  const handleChallengeSubmit = () => {
    const isCorrect = parseInt(answer) === (challenge.num1 + challenge.num2);
    setVerified(isCorrect);
    setShowChallenge(!isCorrect);
    onVerify(isCorrect);
    if (!isCorrect) {
      generateChallenge();
    }
  };
  
  return (
    <div className="mt-4 p-3 border rounded-md bg-gray-50 dark:bg-gray-800">
      <div className="flex items-center gap-2">
        <Checkbox 
          id="captcha-verification" 
          checked={verified} 
          onCheckedChange={handleCheckboxChange}
        />
        <label htmlFor="captcha-verification" className="text-sm">
          Je ne suis pas un robot
        </label>
        {verified && (
          <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      
      {showChallenge && !verified && (
        <div className="mt-3">
          <div className="text-sm mb-2">Pour vérifier, résolvez ce calcul simple:</div>
          <div className="flex items-center gap-2 mb-2">
            <div className="font-semibold">{challenge.num1} + {challenge.num2} = ?</div>
            <input 
              type="text"
              className="w-16 px-2 py-1 border rounded" 
              value={answer} 
              onChange={(e) => setAnswer(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleChallengeSubmit();
                }
              }}
            />
            <Button 
              variant="outline"
              size="icon"
              onClick={generateChallenge}
              className="h-8 w-8"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
          <Button 
            size="sm" 
            onClick={handleChallengeSubmit}
            className="mt-1"
          >
            Vérifier
          </Button>
        </div>
      )}
    </div>
  );
};
