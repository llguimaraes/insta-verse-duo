
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, PlusSquare, User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="md:border-r md:min-h-screen md:w-[80px] lg:w-[240px] py-4 bg-background flex md:flex-col justify-between">
      <div className="w-full md:h-full flex md:flex-col items-center">
        {/* Logo */}
        <div className="hidden md:flex justify-start lg:justify-center py-4 lg:px-4 w-full">
          <NavLink to="/" className="text-xl font-bold instagram-text-gradient hidden lg:block">
            InstaVerse
          </NavLink>
          <NavLink to="/" className="text-xl font-bold instagram-text-gradient lg:hidden">
            IV
          </NavLink>
        </div>
        
        <Separator className="hidden md:block" />
        
        {/* Navigation Items */}
        <nav className="flex md:flex-col items-center justify-around w-full md:mt-6 md:space-y-4 px-4">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `flex items-center p-2 w-full rounded-md ${
                isActive ? 'bg-accent/10 text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`
            }
          >
            <Home className="h-6 w-6" />
            <span className="ml-2 hidden lg:block">Início</span>
          </NavLink>
          
          <NavLink 
            to="/search" 
            className={({ isActive }) => 
              `flex items-center p-2 w-full rounded-md ${
                isActive ? 'bg-accent/10 text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`
            }
          >
            <Search className="h-6 w-6" />
            <span className="ml-2 hidden lg:block">Pesquisar</span>
          </NavLink>
          
          {user?.isAdmin && (
            <NavLink 
              to="/create" 
              className={({ isActive }) => 
                `flex items-center p-2 w-full rounded-md ${
                  isActive ? 'bg-accent/10 text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`
              }
            >
              <PlusSquare className="h-6 w-6" />
              <span className="ml-2 hidden lg:block">Criar</span>
            </NavLink>
          )}
          
          <NavLink 
            to="/profile" 
            className={({ isActive }) => 
              `flex items-center p-2 w-full rounded-md ${
                isActive ? 'bg-accent/10 text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`
            }
          >
            <User className="h-6 w-6" />
            <span className="ml-2 hidden lg:block">Perfil</span>
          </NavLink>
        </nav>
      </div>
      
      {/* User Profile & Logout */}
      <div className="hidden md:flex flex-col w-full p-4 mt-auto">
        <Separator className="mb-4" />
        <div className="flex items-center mb-4">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src={user?.profileImage} alt={user?.name} />
            <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
          </Avatar>
          <div className="hidden lg:block">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-muted-foreground">@{user?.username}</p>
          </div>
        </div>
        <Button
          variant="outline"
          className="flex items-center justify-center lg:justify-start w-full"
          onClick={logout}
        >
          <LogOut className="h-4 w-4 lg:mr-2" />
          <span className="hidden lg:block">Sair</span>
        </Button>
      </div>
      
      {/* Mobile Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-2 md:hidden z-10">
        <div className="flex justify-around items-center">
          <NavLink to="/" className={({ isActive }) => 
            `p-2 rounded-md ${isActive ? 'text-primary' : 'text-muted-foreground'}`
          }>
            <Home className="h-6 w-6" />
          </NavLink>
          
          <NavLink to="/search" className={({ isActive }) => 
            `p-2 rounded-md ${isActive ? 'text-primary' : 'text-muted-foreground'}`
          }>
            <Search className="h-6 w-6" />
          </NavLink>
          
          {user?.isAdmin && (
            <NavLink to="/create" className={({ isActive }) => 
              `p-2 rounded-md ${isActive ? 'text-primary' : 'text-muted-foreground'}`
            }>
              <PlusSquare className="h-6 w-6" />
            </NavLink>
          )}
          
          <NavLink to="/profile" className={({ isActive }) => 
            `p-2 rounded-md ${isActive ? 'text-primary' : 'text-muted-foreground'}`
          }>
            <Avatar className="h-6 w-6">
              <AvatarImage src={user?.profileImage} alt={user?.name} />
              <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
            </Avatar>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
