import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search as SearchIcon, TrendingUp, User, Hash } from 'lucide-react';
import { mockPosts } from '@/components/post/PostsList';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredPosts = mockPosts.filter(post => 
    post.username.toLowerCase().includes(searchQuery.toLowerCase()) || 
    post.caption.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const extractHashtags = () => {
    const hashtagRegex = /#(\w+)/g;
    const hashtags = new Set<string>();
    
    mockPosts.forEach(post => {
      const matches = post.caption.match(hashtagRegex);
      if (matches) {
        matches.forEach(tag => hashtags.add(tag));
      }
    });
    
    return Array.from(hashtags).slice(0, 6);
  };

  const trendingHashtags = extractHashtags();

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 relative">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search for people, hashtags, or content..."
              className="pl-10 bg-card/50 backdrop-blur-sm py-6 text-lg rounded-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {searchQuery ? (
          <div className="space-y-8">
            <h2 className="text-xl font-semibold mb-4">Search Results for "{searchQuery}"</h2>
            
            <Tabs defaultValue="all" className="mb-8">
              <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-6 bg-muted/50 p-1 rounded-xl">
                <TabsTrigger value="all" className="rounded-lg data-[state=active]:bg-background data-[state=active]:text-primary">
                  All
                </TabsTrigger>
                <TabsTrigger value="people" className="rounded-lg data-[state=active]:bg-background data-[state=active]:text-primary">
                  People
                </TabsTrigger>
                <TabsTrigger value="posts" className="rounded-lg data-[state=active]:bg-background data-[state=active]:text-primary">
                  Posts
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPosts.map(post => (
                    <Card key={post.id} className="overflow-hidden cursor-pointer card-lift glass-card rounded-2xl">
                      <CardContent className="p-0">
                        <div className="aspect-square relative group">
                          <img 
                            src={post.image} 
                            alt={post.caption} 
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                            <div className="flex items-center text-white">
                              <Avatar className="h-8 w-8 mr-2 ring-2 ring-white/20">
                                <AvatarImage src={post.userImage} alt={post.username} />
                                <AvatarFallback>{post.username[0]}</AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{post.username}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="people">
                <div className="space-y-4">
                  {Array.from(new Set(filteredPosts.map(post => post.username))).map((username, index) => {
                    const post = filteredPosts.find(p => p.username === username);
                    return (
                      <Card key={index} className="glass-card rounded-xl">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Avatar className="h-12 w-12 mr-3">
                                <AvatarImage src={post?.userImage} alt={username} />
                                <AvatarFallback>{username[0]}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{username}</p>
                                <p className="text-sm text-muted-foreground truncate max-w-xs">
                                  {post?.caption.substring(0, 50)}...
                                </p>
                              </div>
                            </div>
                            <Button size="sm" variant="outline" className="rounded-xl">
                              Follow
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>
              
              <TabsContent value="posts">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPosts.map(post => (
                    <Card key={post.id} className="overflow-hidden cursor-pointer card-lift glass-card rounded-2xl">
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
            </Tabs>
          </div>
        ) : (
          <div className="space-y-12">
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                  Trending
                </h2>
                <Button variant="ghost" size="sm">See all</Button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {trendingHashtags.map((tag, index) => (
                  <Card key={index} className="overflow-hidden cursor-pointer card-lift glass-card rounded-xl">
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mr-3">
                          <Hash className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{tag}</p>
                          <p className="text-xs text-muted-foreground">{Math.floor(Math.random() * 1000) + 100} posts</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
            
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center">
                  <User className="mr-2 h-5 w-5 text-primary" />
                  Suggested for you
                </h2>
                <Button variant="ghost" size="sm">See all</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...new Map(mockPosts.map(post => 
                  [post.username, { username: post.username, image: post.userImage, caption: post.caption }]
                )).values()].map((user, index) => (
                  <Card key={index} className="glass-card rounded-xl">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Avatar className="h-12 w-12 mr-3">
                            <AvatarImage src={user.image} alt={user.username} />
                            <AvatarFallback>{user.username[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.username}</p>
                            <p className="text-sm text-muted-foreground truncate max-w-xs">
                              {user.caption.substring(0, 30)}...
                            </p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="rounded-xl">
                          Follow
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Search;
