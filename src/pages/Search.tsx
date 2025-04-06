
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search as SearchIcon } from 'lucide-react';
import { mockPosts } from '@/components/post/PostsList';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock search results based on query
  const filteredPosts = mockPosts.filter(post => 
    post.username.toLowerCase().includes(searchQuery.toLowerCase()) || 
    post.caption.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            placeholder="Buscar usuários, hashtags ou posts..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {searchQuery ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPosts.map(post => (
              <Card key={post.id} className="overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
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
        ) : (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Sugestões para você</h2>
            {mockPosts.map(post => (
              <div key={post.id} className="flex items-center p-2 hover:bg-muted/50 rounded-md cursor-pointer">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={post.userImage} alt={post.username} />
                  <AvatarFallback>{post.username[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{post.username}</p>
                  <p className="text-sm text-muted-foreground">
                    {post.caption.length > 50 
                      ? post.caption.substring(0, 50) + '...'
                      : post.caption
                    }
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Search;
