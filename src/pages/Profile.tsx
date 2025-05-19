
import React, { useState } from 'react';
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";
import { useUser } from '@/context/UserContext';
import { useTranslation } from '@/hooks/use-translation';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const profileSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Adresse e-mail invalide" }),
  avatar: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const Profile = () => {
  const { user, updateProfile } = useUser();
  const { t } = useTranslation();
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || '');
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      avatar: user?.avatar || '',
    },
  });
  
  const onSubmit = (values: ProfileFormValues) => {
    updateProfile({
      name: values.name,
      email: values.email,
      avatar: values.avatar,
    });
    
    toast({
      title: t('profileUpdatedTitle'),
      description: t('profileUpdatedDesc'),
    });
  };
  
  // Generate avatar from name
  const generateAvatar = () => {
    const name = form.getValues('name');
    const initials = name.split(' ').map(part => part[0]).join('').substring(0, 2);
    const newAvatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${initials}&backgroundColor=6366f1`;
    
    form.setValue('avatar', newAvatarUrl);
    setAvatarPreview(newAvatarUrl);
  };
  
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const avatar = e.target.value;
    form.setValue('avatar', avatar);
    setAvatarPreview(avatar);
  };
  
  const initials = user?.name
    ?.split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2) || '';
    
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <motion.div 
          className="max-w-3xl w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20 border-4 border-white dark:border-gray-800 shadow-md">
                  {avatarPreview ? (
                    <AvatarImage 
                      src={avatarPreview} 
                      alt={user?.name || ''} 
                      className="object-cover"
                    />
                  ) : null}
                  <AvatarFallback className="text-2xl bg-rental-100 text-rental-600">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">{t('profileTitle')}</CardTitle>
                  <CardDescription>{t('profileSubtitle')}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('name')}</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('email')}</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="avatar"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t('avatar')}</FormLabel>
                        <div className="flex items-center space-x-2">
                          <FormControl>
                            <div className="flex-grow">
                              <Input 
                                placeholder="https://example.com/avatar.jpg" 
                                {...field} 
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleAvatarChange(e);
                                }}
                              />
                            </div>
                          </FormControl>
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={generateAvatar}
                          >
                            {t('generateAvatar')}
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full bg-rental-600 hover:bg-rental-700">
                    {t('saveChanges')}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <p className="text-sm text-muted-foreground">
                {t('profilePrivacyNotice')}
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
