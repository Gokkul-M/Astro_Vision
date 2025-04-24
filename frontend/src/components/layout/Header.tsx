
import { Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const [notifications] = useState(3);

  return (
    <div className="h-16 border-b flex items-center justify-between px-6">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <div className="flex items-center gap-x-4">
        <div className="relative">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5 text-muted-foreground" />
          </Button>
          {notifications > 0 && (
            <div className="absolute -top-1 -right-1 h-5 w-5 bg-astral-red rounded-full flex items-center justify-center">
              <span className="text-[10px] font-medium text-white">{notifications}</span>
            </div>
          )}
        </div>
        <Avatar className="h-9 w-9">
          <AvatarFallback className="bg-astral-purple/10 text-astral-purple">
            <User className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
