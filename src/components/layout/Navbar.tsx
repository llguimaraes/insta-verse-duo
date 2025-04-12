
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, PlusSquare, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col h-screen border-r bg-card/60 backdrop-blur-sm w-[70px] lg:w-[240px] py-6 shadow-sm">
        <div className="px-4 mb-8">
          <NavLink to="/" className="text-xl font-bold brand-text-gradient hidden lg:block">
            VerseHub
          </NavLink>
          <NavLink to="/" className="text-xl font-bold brand-text-gradient lg:hidden flex justify-center">
            VH
          </NavLink>
        </div>
        
        {/* Navigation Items */}
        <nav className="flex flex-col flex-1 px-2 space-y-1">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `flex items-center p-3 rounded-xl transition-all ${
                isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`
            }
          >
            <Home className="h-5 w-5" />
            <span className="ml-3 hidden lg:block">Home</span>
          </NavLink>
          
          <NavLink 
            to="/search" 
            className={({ isActive }) => 
              `flex items-center p-3 rounded-xl transition-all ${
                isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`
            }
          >
            <Search className="h-5 w-5" />
            <span className="ml-3 hidden lg:block">Explore</span>
          </NavLink>
          
          {user?.isAdmin && (
            <NavLink 
              to="/create" 
              className={({ isActive }) => 
                `flex items-center p-3 rounded-xl transition-all ${
                  isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`
              }
            >
              <PlusSquare className="h-5 w-5" />
              <span className="ml-3 hidden lg:block">Create</span>
            </NavLink>
          )}
          
          <NavLink 
            to="/profile" 
            className={({ isActive }) => 
              `flex items-center p-3 rounded-xl transition-all ${
                isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`
            }
          >
            <User className="h-5 w-5" />
            <span className="ml-3 hidden lg:block">Profile</span>
          </NavLink>
        </nav>
        
        {/* User Profile & Logout */}
        <div className="px-3 mt-auto">
          <Separator className="my-4" />
          <div className="flex items-center mb-4 lg:px-1">
            <Avatar className="h-8 w-8 mr-2 ring-2 ring-primary/20">
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
            className="w-full flex items-center justify-center lg:justify-start"
            onClick={logout}
          >
            <LogOut className="h-4 w-4 lg:mr-2" />
            <span className="hidden lg:block">Logout</span>
          </Button>
        </div>
      </div>
      
      {/* Mobile Top Nav */}
      <div className="fixed top-0 left-0 right-0 bg-card/80 backdrop-blur-md border-b z-50 md:hidden">
        <div className="flex justify-between items-center px-4 py-3">
          <NavLink to="/" className="text-xl font-bold brand-text-gradient">
            VerseHub
          </NavLink>
          <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="bg-card p-4 shadow-lg animate-in slide-in-from-top">
            <nav className="flex flex-col space-y-4">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `flex items-center p-3 rounded-lg ${isActive ? 'bg-primary/10 text-primary' : 'text-foreground'}`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                <Home className="h-5 w-5 mr-3" />
                <span>Home</span>
              </NavLink>
              
              <NavLink 
                to="/search" 
                className={({ isActive }) => 
                  `flex items-center p-3 rounded-lg ${isActive ? 'bg-primary/10 text-primary' : 'text-foreground'}`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                <Search className="h-5 w-5 mr-3" />
                <span>Explore</span>
              </NavLink>
              
              {user?.isAdmin && (
                <NavLink 
                  to="/create" 
                  className={({ isActive }) => 
                    `flex items-center p-3 rounded-lg ${isActive ? 'bg-primary/10 text-primary' : 'text-foreground'}`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <PlusSquare className="h-5 w-5 mr-3" />
                  <span>Create</span>
                </NavLink>
              )}
              
              <NavLink 
                to="/profile" 
                className={({ isActive }) => 
                  `flex items-center p-3 rounded-lg ${isActive ? 'bg-primary/10 text-primary' : 'text-foreground'}`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="h-5 w-5 mr-3" />
                <span>Profile</span>
              </NavLink>
              
              <Separator />
              
              <Button
                variant="outline"
                className="w-full flex items-center justify-start p-3 h-auto"
                onClick={logout}
              >
                <LogOut className="h-5 w-5 mr-3" />
                <span>Logout</span>
              </Button>
            </nav>
          </div>
        )}
      </div>
      
      {/* Mobile Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-md border-t p-2 md:hidden z-40">
        <div className="flex justify-around items-center">
          <NavLink to="/" className={({ isActive }) => 
            `p-2 rounded-xl ${isActive ? 'text-primary' : 'text-muted-foreground'}`
          }>
            <Home className="h-6 w-6" />
          </NavLink>
          
          <NavLink to="/search" className={({ isActive }) => 
            `p-2 rounded-xl ${isActive ? 'text-primary' : 'text-muted-foreground'}`
          }>
            <Search className="h-6 w-6" />
          </NavLink>
          
          {user?.isAdmin && (
            <NavLink to="/create" className={({ isActive }) => 
              `p-2 rounded-xl ${isActive ? 'text-primary' : 'text-muted-foreground'}`
            }>
              <div className="bg-primary rounded-lg p-2">
                <PlusSquare className="h-5 w-5 text-white" />
              </div>
            </NavLink>
          )}
          
          <NavLink to="/profile" className={({ isActive }) => 
            `p-2 rounded-xl ${isActive ? 'text-primary' : 'text-muted-foreground'}`
          }>
            <Avatar className="h-6 w-6 ring-2 ring-primary/20">
              <AvatarImage src={user?.profileImage} alt={user?.name} />
              <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
            </Avatar>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Navbar;
