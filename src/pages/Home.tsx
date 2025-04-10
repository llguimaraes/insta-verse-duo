
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PostsList from '@/components/post/PostsList';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockPosts } from '@/components/post/PostsList';
import { useAuth } from '@/contexts/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();
  
  // Take first 5 users for suggestions (from mockPosts to avoid duplication)
  const suggestedUsers = [...new Map(mockPosts.map(post => 
    [post.username, { username: post.username, image: post.userImage }]
  )).values()].slice(0, 5);

  return (
    <MainLayout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Main content - Posts */}
        <div className="lg:col-span-2">
          <PostsList />
        </div>
        
        {/* Sidebar - User and Suggestions */}
        <div className="hidden lg:block">
          <div className="sticky top-6">
            {/* User Profile */}
            <div className="flex items-center mb-6">
              <Avatar className="h-12 w-12 mr-3 border-2 border-white shadow-sm">
                <AvatarImage src={user?.profileImage} alt={user?.name} />
                <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{user?.username}</p>
                <p className="text-sm text-muted-foreground">{user?.name}</p>
              </div>
            </div>
            
            {/* Suggestions */}
            <Card className="bg-card/50 backdrop-blur-sm border">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Sugestões para você</h3>
                  <button className="text-xs font-semibold">Ver tudo</button>
                </div>
                
                <div className="space-y-4">
                  {suggestedUsers.map((user, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={user.image} alt={user.username} />
                          <AvatarFallback>{user.username[0]}</AvatarFallback>
                        </Avatar>
                        <div className="text-sm">
                          <p className="font-medium">{user.username}</p>
                          <p className="text-xs text-muted-foreground">Sugerido para você</p>
                        </div>
                      </div>
                      <button className="text-xs font-semibold text-primary">Seguir</button>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-xs text-muted-foreground">
                  <p className="mb-4">
                    © 2025 InstaVerse do Brasil LTDA
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <a href="#" className="hover:underline">Sobre</a>
                    <a href="#" className="hover:underline">Ajuda</a>
                    <a href="#" className="hover:underline">Imprensa</a>
                    <a href="#" className="hover:underline">API</a>
                    <a href="#" className="hover:underline">Privacidade</a>
                    <a href="#" className="hover:underline">Termos</a>
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
