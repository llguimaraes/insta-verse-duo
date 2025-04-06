
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Grid, Bookmark, Settings } from 'lucide-react';
import { mockPosts } from '@/components/post/PostsList';

const Profile: React.FC = () => {
  const { user } = useAuth();

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start mb-8 gap-6">
          <Avatar className="h-24 w-24 md:h-36 md:w-36">
            <AvatarImage src={user?.profileImage} alt={user?.name} />
            <AvatarFallback className="text-2xl">{user?.name?.[0]}</AvatarFallback>
          </Avatar>
          
          <div className="flex flex-col items-center md:items-start space-y-4 flex-1">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <h1 className="text-2xl font-bold">{user?.username}</h1>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Editar perfil
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Settings className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="flex space-x-8 text-center md:text-left">
              <div>
                <span className="font-semibold">{mockPosts.length}</span>{" "}
                <span className="text-muted-foreground">posts</span>
              </div>
              <div>
                <span className="font-semibold">421</span>{" "}
                <span className="text-muted-foreground">seguidores</span>
              </div>
              <div>
                <span className="font-semibold">265</span>{" "}
                <span className="text-muted-foreground">seguindo</span>
              </div>
            </div>
            
            <div className="text-center md:text-left">
              <p className="font-semibold">{user?.name}</p>
              <p className="text-sm text-muted-foreground">
                {user?.isAdmin 
                  ? "Administrador do InstaVerse" 
                  : "Usuário convidado do InstaVerse"}
              </p>
            </div>
          </div>
        </div>
        
        {/* Profile Tabs & Content */}
        <Tabs defaultValue="posts">
          <TabsList className="w-full grid grid-cols-2 mb-6">
            <TabsTrigger value="posts" className="flex items-center">
              <Grid className="h-4 w-4 mr-2" />
              <span>Posts</span>
            </TabsTrigger>
            <TabsTrigger value="saved" className="flex items-center">
              <Bookmark className="h-4 w-4 mr-2" />
              <span>Salvos</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts">
            <div className="grid grid-cols-3 gap-1">
              {mockPosts.map((post) => (
                <Card key={post.id} className="rounded-none overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                  <CardContent className="p-0">
                    <div className="aspect-square w-full">
                      <img 
                        src={post.image} 
                        alt={post.caption} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="saved">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Bookmark className="h-16 w-16 mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold">Itens salvos</h3>
              <p className="text-muted-foreground max-w-md mt-2">
                Salve fotos e vídeos que você quer ver novamente. Ninguém será notificado, e apenas você pode ver o que salvou.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Profile;
