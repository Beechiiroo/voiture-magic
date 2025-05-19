
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Settings, LogOut } from "lucide-react";
import { useUser } from '@/context/UserContext';
import { useTranslation } from '@/hooks/use-translation';

const UserMenu = () => {
  const { user, logout } = useUser();
  const { t } = useTranslation();
  
  if (!user) return null;
  
  const initials = user.name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
    
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 border-2 border-white dark:border-gray-800">
            {user.avatar ? (
              <AvatarImage 
                src={user.avatar} 
                alt={user.name} 
                className="object-cover"
              />
            ) : null}
            <AvatarFallback className="bg-rental-100 text-rental-600">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
            <span className="mt-1 inline-flex items-center rounded-full bg-rental-100 dark:bg-rental-900 px-2.5 py-0.5 text-xs font-medium text-rental-800 dark:text-rental-300">
              {user.role === 'admin' ? t('admin') : t('user')}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link to="/profile">
          <DropdownMenuItem className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>{t('profile')}</span>
          </DropdownMenuItem>
        </Link>
        <Link to="/settings">
          <DropdownMenuItem className="cursor-pointer">
            <Settings className="mr-2 h-4 w-4" />
            <span>{t('settings')}</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-600 dark:text-red-400 focus:bg-red-50 dark:focus:bg-red-950">
          <LogOut className="mr-2 h-4 w-4" />
          <span>{t('logout')}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
