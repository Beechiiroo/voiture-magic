
import React from "react";
import { Calendar, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useTranslation } from "@/hooks/use-translation";

interface BookingCardProps {
  price: number;
  available: boolean;
}

const BookingCard: React.FC<BookingCardProps> = ({ price, available }) => {
  const { t } = useTranslation();
  
  return (
    <div className="sticky top-24 bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-rental-900 dark:text-rental-100">
            {price}€ <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{t("pricePerDay")}</span>
          </div>
          
          {available ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
              {t("available")}
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-1.5"></span>
              {t("unavailable")}
            </span>
          )}
        </div>
      </div>
      
      <Separator className="my-6" />
      
      <h3 className="text-lg font-medium mb-4">{t("selectDates")}</h3>
      
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 gap-4">
          <CalendarComponent
            mode="range"
            numberOfMonths={1}
            className="rounded border dark:border-gray-700"
            selected={{
              from: new Date(),
              to: new Date(new Date().setDate(new Date().getDate() + 3))
            }}
            disabled={{ before: new Date() }}
            classNames={{
              day_selected: "bg-rental-600 text-white hover:bg-rental-600 hover:text-white",
              day_today: "bg-rental-50 text-rental-900",
              day_range_middle: "bg-rental-100 text-rental-900 dark:bg-rental-900 dark:text-rental-100",
            }}
          />
        </div>
      </div>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-700 dark:text-gray-300">{t("totalPrice")}</span>
          <span className="font-bold">360€</span>
        </div>
        
        <Separator />
        
        <div>
          <h4 className="font-medium mb-3">{t("included")}</h4>
          <ul className="space-y-2">
            <li className="flex items-center">
              <Check className="w-5 h-5 text-green-500 mr-2" />
              <span>{t("insurance")}</span>
            </li>
            <li className="flex items-center">
              <Check className="w-5 h-5 text-green-500 mr-2" />
              <span>{t("unlimitedMileage")}</span>
            </li>
            <li className="flex items-center">
              <X className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-gray-500 dark:text-gray-400">{t("additionalDriver")}</span>
            </li>
          </ul>
        </div>
      </div>
      
      <Button className="w-full bg-rental-600 hover:bg-rental-700" disabled={!available}>
        {available ? t("bookThisVehicle") : t("unavailable")}
      </Button>
    </div>
  );
};

export default BookingCard;
