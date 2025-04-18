import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PostsList from '@/components/post/PostsList';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { mockPosts } from '@/components/post/PostsList';
import { useAuth } from '@/contexts/AuthContext';
import { Sparkles } from 'lucide-react';
import Typewriter from '@/components/ui/typewriter';
import { useIsMobile, useIsTablet } from '@/hooks/use-mobile';

const Home: React.FC = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  
  const suggestedUsers = [...new Map(mockPosts.map(post => 
    [post.username, { username: post.username, image: post.userImage }]
  )).values()].slice(0, 5);

  const welcomeTexts = [
    "Bem-vindo ao KROWD!",
    "Compartilhe suas histórias...",
    "Conecte-se com amigos...",
    "Inspire novas ideias...",
    "Faça parte da comunidade...",
  ];

  const displayedUsers = isMobile ? suggestedUsers.slice(0, 3) : suggestedUsers;

  return (
    <MainLayout>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8 max-w-7xl mx-auto">
        {/* Welcome Typewriter Banner */}
        <div className="lg:col-span-12 mb-2">
          <Card className="glass-card overflow-hidden">
            <CardContent className="p-3 md:p-4 flex items-center justify-center">
              <h2 className="text-lg md:text-xl lg:text-2xl font-medium text-center">
                <Typewriter 
                  texts={welcomeTexts} 
                  className="text-[#1EAEDB] font-bold"
                  speed={50}
                  delay={1500}
                />
              </h2>
            </CardContent>
          </Card>
        </div>
        
        {/* Main content - Posts */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-4">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h1 className="text-xl md:text-2xl font-bold flex items-center">
              <Sparkles className="text-primary mr-2 h-5 w-5" />
              Your Feed
            </h1>
          </div>
          <PostsList />
        </div>
        
        {/* Sidebar - User and Suggestions (hidden on mobile, shown as horizontal cards) */}
        {isMobile && (
          <div className="mb-4">
            <Card className="glass-card mb-4 overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-3 ring-4 ring-primary/20">
                    <AvatarImage src={user?.profileImage} alt={user?.name} />
                    <AvatarFallback className="text-lg">{user?.name?.[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{user?.username}</p>
                    <p className="text-sm text-muted-foreground">{user?.name}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex overflow-x-auto pb-2 scrollbar-thin space-x-3 snap-x">
              {displayedUsers.map((user, index) => (
                <div key={index} className="flex-shrink-0 w-60 snap-start">
                  <Card className="glass-card h-full">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={user.image} alt={user.username} />
                            <AvatarFallback>{user.username[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{user.username}</p>
                            <p className="text-xs text-muted-foreground">Suggested for you</p>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost" className="text-primary h-8 text-xs">
                          Follow
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Tablet layout for sidebar - Horizontal cards */}
        {isTablet && !isMobile && (
          <div className="lg:col-span-5 xl:col-span-4 space-y-4">
            <Card className="glass-card mb-4 overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Avatar className="h-14 w-14 mr-4 ring-4 ring-primary/20">
                    <AvatarImage src={user?.profileImage} alt={user?.name} />
                    <AvatarFallback className="text-lg">{user?.name?.[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-lg">{user?.username}</p>
                    <p className="text-muted-foreground">{user?.name}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Suggested for you</h3>
                  <Button variant="ghost" size="sm" className="text-primary font-medium">
                    See All
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {suggestedUsers.map((user, index) => (
                    <div key={index} className="flex items-center justify-between group">
                      <div className="flex items-center">
                        <Avatar className="h-9 w-9 mr-2">
                          <AvatarImage src={user.image} alt={user.username} />
                          <AvatarFallback>{user.username[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{user.username}</p>
                          <p className="text-xs text-muted-foreground">Suggested for you</p>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost" className="text-primary font-medium text-sm">
                        Follow
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* Desktop sidebar - Original layout */}
        <div className="hidden lg:block lg:col-span-5 xl:col-span-4">
          <div className="sticky top-6">
            {/* User Profile */}
            <Card className="glass-card mb-6 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <Avatar className="h-14 w-14 mr-4 ring-4 ring-primary/20">
                    <AvatarImage src={user?.profileImage} alt={user?.name} />
                    <AvatarFallback className="text-lg">{user?.name?.[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-lg">{user?.username}</p>
                    <p className="text-muted-foreground">{user?.name}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-center mt-6">
                  <div className="rounded-xl p-3 bg-muted/50">
                    <p className="font-semibold">{mockPosts.length}</p>
                    <p className="text-xs text-muted-foreground">Posts</p>
                  </div>
                  <div className="rounded-xl p-3 bg-muted/50">
                    <p className="font-semibold">421</p>
                    <p className="text-xs text-muted-foreground">Followers</p>
                  </div>
                  <div className="rounded-xl p-3 bg-muted/50">
                    <p className="font-semibold">265</p>
                    <p className="text-xs text-muted-foreground">Following</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Suggestions */}
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Suggested for you</h3>
                  <Button variant="ghost" size="sm" className="text-primary font-medium">
                    See All
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {suggestedUsers.map((user, index) => (
                    <div key={index} className="flex items-center justify-between group">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src={user.image} alt={user.username} />
                          <AvatarFallback>{user.username[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{user.username}</p>
                          <p className="text-xs text-muted-foreground">Suggested for you</p>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost" className="text-primary font-medium text-sm">
                        Follow
                      </Button>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 text-xs text-muted-foreground">
                  <p className="mb-4">
                    © 2025 VerseHub Inc.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a href="#" className="hover:text-primary">About</a>
                    <a href="#" className="hover:text-primary">Help</a>
                    <a href="#" className="hover:text-primary">Press</a>
                    <a href="#" className="hover:text-primary">API</a>
                    <a href="#" className="hover:text-primary">Privacy</a>
                    <a href="#" className="hover:text-primary">Terms</a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
