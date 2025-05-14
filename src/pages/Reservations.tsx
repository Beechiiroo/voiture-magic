
import { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar as CalendarIcon, CheckCircle } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Schéma de validation pour le formulaire de réservation
const reservationSchema = z.object({
  pickupDate: z.date({
    required_error: "La date de prise en charge est requise",
  }),
  returnDate: z.date({
    required_error: "La date de retour est requise",
  }),
  pickupLocation: z.string().min(1, { message: "Le lieu de prise en charge est requis" }),
  returnLocation: z.string().min(1, { message: "Le lieu de retour est requis" }),
  carType: z.string().min(1, { message: "Veuillez sélectionner un type de véhicule" }),
  fullName: z.string().min(2, { message: "Le nom complet est requis" }),
  email: z.string().email({ message: "Adresse e-mail invalide" }),
  phone: z.string().regex(/^(\+33|0)[1-9](\d{2}){4}$/, { 
    message: "Numéro de téléphone invalide (format: +33123456789 ou 0123456789)" 
  }),
  insuranceOption: z.boolean().default(false),
  gpsOption: z.boolean().default(false),
  childSeatOption: z.boolean().default(false),
  additionalDriver: z.boolean().default(false),
}).refine(data => {
  return data.returnDate >= data.pickupDate;
}, {
  message: "La date de retour doit être postérieure ou égale à la date de prise en charge",
  path: ["returnDate"],
});

type ReservationFormValues = z.infer<typeof reservationSchema>;

const Reservations = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reservationComplete, setReservationComplete] = useState(false);
  const [reservationDetails, setReservationDetails] = useState<ReservationFormValues | null>(null);
  
  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      pickupDate: undefined,
      returnDate: undefined,
      pickupLocation: "",
      returnLocation: "",
      carType: "",
      fullName: "",
      email: "",
      phone: "",
      insuranceOption: false,
      gpsOption: false,
      childSeatOption: false,
      additionalDriver: false,
    },
  });
  
  // Fonction pour calculer le prix estimé
  const calculatePrice = () => {
    const values = form.getValues();
    let basePrice = 0;
    
    // Prix de base selon le type de voiture
    switch (values.carType) {
      case "economy":
        basePrice = 40;
        break;
      case "compact":
        basePrice = 60;
        break;
      case "sedan":
        basePrice = 80;
        break;
      case "suv":
        basePrice = 100;
        break;
      case "luxury":
        basePrice = 150;
        break;
      default:
        basePrice = 60;
    }
    
    // Calcul du nombre de jours
    const days = values.pickupDate && values.returnDate
      ? Math.max(1, Math.ceil((values.returnDate.getTime() - values.pickupDate.getTime()) / (1000 * 60 * 60 * 24)))
      : 1;
    
    // Prix de base pour la durée
    let totalPrice = basePrice * days;
    
    // Ajout des options
    if (values.insuranceOption) totalPrice += 15 * days;
    if (values.gpsOption) totalPrice += 5 * days;
    if (values.childSeatOption) totalPrice += 8 * days;
    if (values.additionalDriver) totalPrice += 10 * days;
    
    return { days, basePrice, totalPrice };
  };
  
  const { days = 1, basePrice = 0, totalPrice = 0 } = form.formState.isValid ? calculatePrice() : {};
  
  const onSubmit = (values: ReservationFormValues) => {
    setIsSubmitting(true);
    
    // Simulation d'API
    setTimeout(() => {
      setReservationDetails(values);
      setReservationComplete(true);
      setIsSubmitting(false);
      
      toast({
        title: "Réservation confirmée",
        description: "Votre réservation a été enregistrée avec succès.",
      });
    }, 1500);
  };
  
  const nextStep = () => {
    const fieldsToValidate = step === 1 
      ? ["pickupDate", "returnDate", "pickupLocation", "returnLocation", "carType"] 
      : ["fullName", "email", "phone"];
      
    form.trigger(fieldsToValidate as any).then(isValid => {
      if (isValid) setStep(step + 1);
    });
  };
  
  const prevStep = () => {
    setStep(step - 1);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      transition: {
        when: "afterChildren",
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  // Lieux populaires pour les dropdowns
  const popularLocations = [
    "Paris - Gare de Lyon",
    "Paris - Aéroport Charles de Gaulle",
    "Paris - Aéroport d'Orly",
    "Lyon - Gare Part-Dieu",
    "Marseille - Aéroport",
    "Nice - Aéroport",
    "Bordeaux - Gare Saint-Jean",
    "Toulouse - Aéroport",
    "Strasbourg - Gare Centrale"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-rental-600 py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.h1 
            className="text-4xl font-bold text-white mb-4 font-heading"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Réserver votre véhicule
          </motion.h1>
          <motion.p 
            className="text-xl text-rental-100 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Réservez en quelques clics et profitez de nos meilleurs tarifs
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto py-16 px-4">
        {!reservationComplete ? (
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <ol className="flex items-center w-full">
                <li className={`flex items-center ${step >= 1 ? 'text-rental-600' : 'text-gray-400'}`}>
                  <span className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? 'bg-rental-600 text-white' : 'bg-gray-100'}`}>1</span>
                  <span className="ml-2 text-sm font-medium">Détails</span>
                  <div className={`flex-1 h-0.5 mx-4 ${step >= 2 ? 'bg-rental-600' : 'bg-gray-200'}`}></div>
                </li>
                <li className={`flex items-center ${step >= 2 ? 'text-rental-600' : 'text-gray-400'}`}>
                  <span className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? 'bg-rental-600 text-white' : 'bg-gray-100'}`}>2</span>
                  <span className="ml-2 text-sm font-medium">Informations personnelles</span>
                  <div className={`flex-1 h-0.5 mx-4 ${step >= 3 ? 'bg-rental-600' : 'bg-gray-200'}`}></div>
                </li>
                <li className={`flex items-center ${step >= 3 ? 'text-rental-600' : 'text-gray-400'}`}>
                  <span className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 3 ? 'bg-rental-600 text-white' : 'bg-gray-100'}`}>3</span>
                  <span className="ml-2 text-sm font-medium">Confirmation</span>
                </li>
              </ol>
            </div>

            <motion.div
              className="bg-white p-8 rounded-xl shadow-lg"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              key={`step-${step}`}
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {step === 1 && (
                    <>
                      <motion.h2 
                        className="text-2xl font-bold mb-6 text-rental-900"
                        variants={itemVariants}
                      >
                        Détails de location
                      </motion.h2>

                      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="pickupDate"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Date de prise en charge</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP", { locale: fr })
                                      ) : (
                                        <span>Choisir une date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) => date < new Date()}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="returnDate"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Date de retour</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP", { locale: fr })
                                      ) : (
                                        <span>Choisir une date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) => {
                                      const pickupDate = form.getValues("pickupDate");
                                      return pickupDate && date < pickupDate;
                                    }}
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>

                      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="pickupLocation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Lieu de prise en charge</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Sélectionner un lieu" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {popularLocations.map((location) => (
                                    <SelectItem key={location} value={location}>
                                      {location}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="returnLocation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Lieu de retour</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Sélectionner un lieu" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {popularLocations.map((location) => (
                                    <SelectItem key={location} value={location}>
                                      {location}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <FormField
                          control={form.control}
                          name="carType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Type de véhicule</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Sélectionner un type de véhicule" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="economy">Économique</SelectItem>
                                  <SelectItem value="compact">Compacte</SelectItem>
                                  <SelectItem value="sedan">Berline</SelectItem>
                                  <SelectItem value="suv">SUV</SelectItem>
                                  <SelectItem value="luxury">Luxe</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <motion.h2 
                        className="text-2xl font-bold mb-6 text-rental-900"
                        variants={itemVariants}
                      >
                        Vos informations
                      </motion.h2>

                      <motion.div variants={itemVariants}>
                        <FormField
                          control={form.control}
                          name="fullName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nom complet</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>

                      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="votre@email.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Téléphone</FormLabel>
                              <FormControl>
                                <Input placeholder="+33 1 23 45 67 89" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <h3 className="text-lg font-medium mb-4 text-rental-900">Options supplémentaires</h3>
                        
                        <div className="space-y-4">
                          <FormField
                            control={form.control}
                            name="insuranceOption"
                            render={({ field }) => (
                              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                                <div>
                                  <FormLabel className="text-base">Assurance complète</FormLabel>
                                  <p className="text-sm text-muted-foreground">
                                    Protection tous risques avec franchise réduite
                                  </p>
                                </div>
                                <FormControl>
                                  <div className="flex items-center gap-4">
                                    <p className="font-medium">+15€/jour</p>
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </div>
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="gpsOption"
                            render={({ field }) => (
                              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                                <div>
                                  <FormLabel className="text-base">GPS</FormLabel>
                                  <p className="text-sm text-muted-foreground">
                                    Navigation GPS premium
                                  </p>
                                </div>
                                <FormControl>
                                  <div className="flex items-center gap-4">
                                    <p className="font-medium">+5€/jour</p>
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </div>
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="childSeatOption"
                            render={({ field }) => (
                              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                                <div>
                                  <FormLabel className="text-base">Siège enfant</FormLabel>
                                  <p className="text-sm text-muted-foreground">
                                    Siège auto pour enfant
                                  </p>
                                </div>
                                <FormControl>
                                  <div className="flex items-center gap-4">
                                    <p className="font-medium">+8€/jour</p>
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </div>
                                </FormControl>
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="additionalDriver"
                            render={({ field }) => (
                              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                                <div>
                                  <FormLabel className="text-base">Conducteur additionnel</FormLabel>
                                  <p className="text-sm text-muted-foreground">
                                    Ajouter un conducteur supplémentaire
                                  </p>
                                </div>
                                <FormControl>
                                  <div className="flex items-center gap-4">
                                    <p className="font-medium">+10€/jour</p>
                                    <Switch
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </div>
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </motion.div>
                    </>
                  )}
                  
                  {step === 3 && (
                    <>
                      <motion.h2 
                        className="text-2xl font-bold mb-6 text-rental-900"
                        variants={itemVariants}
                      >
                        Confirmation de réservation
                      </motion.h2>
                      
                      <motion.div 
                        className="bg-gray-50 rounded-lg p-6 mb-6"
                        variants={itemVariants}
                      >
                        <h3 className="font-bold text-lg mb-4">Récapitulatif de votre réservation</h3>
                        
                        <div className="space-y-4">
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-600">Durée de location:</span>
                            <span className="font-medium">{days} jour{days > 1 ? 's' : ''}</span>
                          </div>
                          
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-600">Prise en charge:</span>
                            <span className="font-medium">
                              {form.getValues("pickupLocation")}, {" "}
                              {form.getValues("pickupDate") 
                                ? format(form.getValues("pickupDate"), "PPP", { locale: fr })
                                : ""}
                            </span>
                          </div>
                          
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-600">Retour:</span>
                            <span className="font-medium">
                              {form.getValues("returnLocation")}, {" "}
                              {form.getValues("returnDate")
                                ? format(form.getValues("returnDate"), "PPP", { locale: fr })
                                : ""}
                            </span>
                          </div>
                          
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-600">Type de véhicule:</span>
                            <span className="font-medium capitalize">
                              {form.getValues("carType") === "economy" && "Économique"}
                              {form.getValues("carType") === "compact" && "Compacte"}
                              {form.getValues("carType") === "sedan" && "Berline"}
                              {form.getValues("carType") === "suv" && "SUV"}
                              {form.getValues("carType") === "luxury" && "Luxe"}
                            </span>
                          </div>
                          
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-600">Options:</span>
                            <span className="font-medium text-right">
                              {!form.getValues("insuranceOption") && 
                               !form.getValues("gpsOption") && 
                               !form.getValues("childSeatOption") && 
                               !form.getValues("additionalDriver") 
                                ? "Aucune" : ""}
                              {form.getValues("insuranceOption") && <div>Assurance complète</div>}
                              {form.getValues("gpsOption") && <div>GPS</div>}
                              {form.getValues("childSeatOption") && <div>Siège enfant</div>}
                              {form.getValues("additionalDriver") && <div>Conducteur additionnel</div>}
                            </span>
                          </div>
                        </div>
                        
                        <div className="mt-6 pt-4 border-t">
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Prix de base:</span>
                            <span>{basePrice}€ x {days} jour{days > 1 ? 's' : ''}</span>
                          </div>
                          
                          {form.getValues("insuranceOption") && (
                            <div className="flex justify-between mb-2">
                              <span className="text-gray-600">Assurance complète:</span>
                              <span>15€ x {days} jour{days > 1 ? 's' : ''}</span>
                            </div>
                          )}
                          
                          {form.getValues("gpsOption") && (
                            <div className="flex justify-between mb-2">
                              <span className="text-gray-600">GPS:</span>
                              <span>5€ x {days} jour{days > 1 ? 's' : ''}</span>
                            </div>
                          )}
                          
                          {form.getValues("childSeatOption") && (
                            <div className="flex justify-between mb-2">
                              <span className="text-gray-600">Siège enfant:</span>
                              <span>8€ x {days} jour{days > 1 ? 's' : ''}</span>
                            </div>
                          )}
                          
                          {form.getValues("additionalDriver") && (
                            <div className="flex justify-between mb-2">
                              <span className="text-gray-600">Conducteur additionnel:</span>
                              <span>10€ x {days} jour{days > 1 ? 's' : ''}</span>
                            </div>
                          )}
                          
                          <div className="flex justify-between mt-4 pt-2 border-t">
                            <span className="font-bold text-lg">Total:</span>
                            <span className="font-bold text-lg text-rental-700">{totalPrice}€</span>
                          </div>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="bg-rental-50 border border-rental-200 rounded-lg p-6"
                        variants={itemVariants}
                      >
                        <h3 className="font-bold mb-4">Informations importantes</h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <span className="text-rental-600 mr-2">•</span>
                            Une pièce d'identité et un permis de conduire valide seront demandés lors de la prise en charge.
                          </li>
                          <li className="flex items-start">
                            <span className="text-rental-600 mr-2">•</span>
                            Un dépôt de garantie vous sera demandé lors de la prise en charge du véhicule.
                          </li>
                          <li className="flex items-start">
                            <span className="text-rental-600 mr-2">•</span>
                            Vous pouvez annuler gratuitement jusqu'à 24 heures avant le début de votre location.
                          </li>
                        </ul>
                      </motion.div>
                    </>
                  )}
                  
                  <div className="flex justify-between mt-8">
                    {step > 1 && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={prevStep}
                      >
                        Précédent
                      </Button>
                    )}
                    
                    {step < 3 ? (
                      <Button 
                        type="button" 
                        className="ml-auto bg-rental-600 hover:bg-rental-700"
                        onClick={nextStep}
                      >
                        Continuer
                      </Button>
                    ) : (
                      <Button 
                        type="submit" 
                        className="ml-auto bg-rental-600 hover:bg-rental-700"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Traitement en cours..." : "Confirmer la réservation"}
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </motion.div>
          </div>
        ) : (
          <motion.div 
            className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <div className="bg-green-100 text-green-600 mx-auto rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-rental-900 mb-2">Réservation confirmée!</h2>
              <p className="text-gray-600">
                Votre réservation a été enregistrée avec succès. Un e-mail de confirmation vous a été envoyé.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-lg mb-4">Détails de la réservation</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Numéro de réservation:</span>
                  <span className="font-medium">RES-{Math.floor(Math.random() * 10000000)}</span>
                </div>
                
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Durée de location:</span>
                  <span className="font-medium">{days} jour{days > 1 ? 's' : ''}</span>
                </div>
                
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Prise en charge:</span>
                  <span className="font-medium">
                    {reservationDetails?.pickupLocation}, {" "}
                    {reservationDetails?.pickupDate 
                      ? format(reservationDetails.pickupDate, "PPP", { locale: fr })
                      : ""}
                  </span>
                </div>
                
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Retour:</span>
                  <span className="font-medium">
                    {reservationDetails?.returnLocation}, {" "}
                    {reservationDetails?.returnDate
                      ? format(reservationDetails.returnDate, "PPP", { locale: fr })
                      : ""}
                  </span>
                </div>
                
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600">Montant total:</span>
                  <span className="font-medium text-rental-700">{totalPrice}€</span>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Button 
                className="bg-rental-600 hover:bg-rental-700"
                onClick={() => window.location.href = '/'}
              >
                Retour à l'accueil
              </Button>
            </div>
          </motion.div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Reservations;
