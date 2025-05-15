
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "@/hooks/use-translation";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z.string().email(),
});

export default function ForgotPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const { t } = useTranslation();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // In a real application, this would call an API to send a password reset email
      console.log("Sending password reset email to:", values.email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsEmailSent(true);
      toast({
        title: t("passwordResetEmailSent"),
        description: t("passwordResetInstructions", { email: values.email }),
        variant: "success",
      });
    } catch (error) {
      toast({
        title: t("passwordResetError"),
        description: t("passwordResetErrorMessage"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">{t("forgotPassword")}</h1>
            {!isEmailSent ? (
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {t("forgotPasswordDescription")}
              </p>
            ) : (
              <p className="text-green-600 dark:text-green-400 mt-2">
                {t("passwordResetEmailSentDescription")}
              </p>
            )}
          </div>

          {!isEmailSent ? (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("email")}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <Input
                            {...field}
                            placeholder="email@example.com"
                            className="pl-10"
                            type="email"
                          />
                        </div>
                      </FormControl>
                      <FormDescription>{t("passwordResetEmailInfo")}</FormDescription>
                    </FormItem>
                  )}
                />

                <div className="flex flex-col space-y-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-rental-600 hover:bg-rental-700" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t("sending") : t("sendResetLink")}
                  </Button>
                  <div className="text-center">
                    <a 
                      href="/login" 
                      className="text-rental-600 hover:text-rental-700 text-sm font-medium"
                    >
                      {t("backToLogin")}
                    </a>
                  </div>
                </div>
              </form>
            </Form>
          ) : (
            <div className="flex flex-col space-y-4">
              <Button 
                onClick={() => setIsEmailSent(false)} 
                variant="outline" 
                className="w-full"
              >
                {t("tryAnotherEmail")}
              </Button>
              <div className="text-center">
                <a 
                  href="/login" 
                  className="text-rental-600 hover:text-rental-700 text-sm font-medium"
                >
                  {t("backToLogin")}
                </a>
              </div>
            </div>
          )}
        </motion.div>
      </div>
      <Footer />
    </>
  );
}
