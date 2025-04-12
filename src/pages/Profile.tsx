
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Grid3X3, Bookmark, Settings, Users, ExternalLink, Heart, MessageCircle } from 'lucide-react';
import { mockPosts } from '@/components/post/PostsList';
import Typewriter from '@/components/ui/typewriter';

const Profile: React.FC = () => {
  const { user } = useAuth();

  const bioTexts = user?.isAdmin 
    ? ["Building amazing experiences at VerseHub", "Creating digital connections", "Sharing stories that matter"]
    : ["Exploring the VerseHub platform", "Discovering new content", "Connecting with creators"];

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <Card className="glass-card mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <Avatar className="h-28 w-28 md:h-36 md:w-36 ring-4 ring-primary/20">
                <AvatarImage src={user?.profileImage} alt={user?.name} />
                <AvatarFallback className="text-3xl">{user?.name?.[0]}</AvatarFallback>
              </Avatar>
              
              <div className="flex flex-col space-y-6 flex-1">
                <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold">{user?.username}</h1>
                    <p className="text-muted-foreground">
                      {user?.isAdmin ? "Administrator" : "Guest User"}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="rounded-xl">
                      Edit Profile
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl">
                      <Settings className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 md:grid-cols-4 gap-4 text-center md:text-left">
                  <div className="bg-muted/50 p-3 rounded-xl">
                    <p className="font-semibold">{mockPosts.length}</p>
                    <p className="text-xs text-muted-foreground">Posts</p>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-xl">
                    <p className="font-semibold">421</p>
                    <p className="text-xs text-muted-foreground">Followers</p>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-xl">
                    <p className="font-semibold">265</p>
                    <p className="text-xs text-muted-foreground">Following</p>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-xl hidden md:block">
                    <p className="font-semibold">18.5K</p>
                    <p className="text-xs text-muted-foreground">Likes</p>
                  </div>
                </div>
                
                <div className="text-center md:text-left">
                  <p className="font-semibold">{user?.name}</p>
                  <p className="text-sm">
                    <Typewriter 
                      texts={bioTexts} 
                      className="text-primary font-medium"
                      speed={60}
                      delay={2000}
                    />
                  </p>
                  <a href="#" className="text-primary text-sm flex items-center mt-1 justify-center md:justify-start">
                    versehub.com <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Profile Tabs & Content */}
        <Tabs defaultValue="posts" className="mb-8">
          <TabsList className="w-full grid grid-cols-3 mb-8 bg-muted/50 p-1 rounded-xl">
            <TabsTrigger value="posts" className="rounded-lg data-[state=active]:bg-background data-[state=active]:text-primary flex items-center py-3">
              <Grid3X3 className="h-4 w-4 mr-2" />
              <span>Posts</span>
            </TabsTrigger>
            <TabsTrigger value="saved" className="rounded-lg data-[state=active]:bg-background data-[state=active]:text-primary flex items-center py-3">
              <Bookmark className="h-4 w-4 mr-2" />
              <span>Saved</span>
            </TabsTrigger>
            <TabsTrigger value="tagged" className="rounded-lg data-[state=active]:bg-background data-[state=active]:text-primary flex items-center py-3">
              <Users className="h-4 w-4 mr-2" />
              <span>Tagged</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {mockPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden card-lift glass-card cursor-pointer">
                  <CardContent className="p-0">
                    <div className="aspect-square w-full relative group">
                      <img 
                        src={post.image} 
                        alt={post.caption} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex items-center space-x-4 text-white">
                          <div className="flex items-center">
                            <Heart className="h-5 w-5 mr-2 fill-white" />
                            <span>{post.likes}</span>
                          </div>
                          <div className="flex items-center">
                            <MessageCircle className="h-5 w-5 mr-2 fill-white" />
                            <span>{post.comments}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="saved">
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Bookmark className="h-16 w-16 mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold">Saved Items</h3>
              <p className="text-muted-foreground max-w-md mt-2">
                Save photos and videos that you want to see again. No one is notified, and only you can see what you've saved.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="tagged">
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Users className="h-16 w-16 mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold">Tagged Posts</h3>
              <p className="text-muted-foreground max-w-md mt-2">
                When people tag you in photos and videos, they'll appear here.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Profile;
