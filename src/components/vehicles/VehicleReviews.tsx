
import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

interface Review {
  id: string;
  user: string;
  avatar: string;
  date: string;
  rating: number;
  comment: string;
}

interface VehicleReviewsProps {
  reviews: Review[];
  user: any; // Using any for user object for simplicity
}

const VehicleReviews: React.FC<VehicleReviewsProps> = ({ reviews, user }) => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-rental-900 dark:text-rental-100">
          {t("reviews")} ({reviews.length})
        </h2>
        
        {user && (
          <Button className="bg-rental-600 hover:bg-rental-700">
            {t("leaveAReview")}
          </Button>
        )}
      </div>
      
      {!user && (
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
          {t("loginToReview")}
        </div>
      )}
      
      {reviews.map((review) => (
        <div key={review.id} className="mb-6 last:mb-0">
          <div className="flex items-start">
            <Avatar className="h-10 w-10">
              <AvatarImage src={review.avatar} alt={review.user} />
              <AvatarFallback>{review.user.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="ml-4 flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{review.user}</p>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${
                          i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                        }`} 
                      />
                    ))}
                  </div>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
              </div>
              <p className="mt-3 text-gray-700 dark:text-gray-300">{review.comment}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VehicleReviews;
