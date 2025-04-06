
import React, { useState } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export interface Post {
  id: string;
  username: string;
  userImage: string;
  image: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: string;
}

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const { toast } = useToast();

  const handleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setLiked(!liked);
  };

  const handleSave = () => {
    setSaved(!saved);
    toast({
      title: saved ? "Post removido" : "Post salvo",
      description: saved ? "Post removido dos salvos" : "Post salvo na sua coleção",
    });
  };

  const handleComment = () => {
    toast({
      title: "Comentários",
      description: "Funcionalidade de comentários em desenvolvimento",
    });
  };

  const handleShare = () => {
    toast({
      title: "Compartilhar",
      description: "Funcionalidade de compartilhamento em desenvolvimento",
    });
  };

  return (
    <Card className="mb-6 border rounded-md overflow-hidden max-w-xl mx-auto">
      <CardHeader className="p-4 flex flex-row items-center space-y-0">
        <div className="flex items-center flex-1">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src={post.userImage} alt={post.username} />
            <AvatarFallback>{post.username[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{post.username}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="aspect-square relative bg-muted">
          <img
            src={post.image}
            alt={post.caption}
            className="object-cover w-full h-full"
          />
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col items-start p-4">
        <div className="flex items-center justify-between w-full mb-2">
          <div className="flex space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 p-0" 
              onClick={handleLike}
            >
              <Heart 
                className={`h-6 w-6 ${liked ? 'fill-red-500 text-red-500' : ''}`} 
                fill={liked ? "currentColor" : "none"}
              />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 p-0" 
              onClick={handleComment}
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 p-0" 
              onClick={handleShare}
            >
              <Send className="h-6 w-6" />
            </Button>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 p-0 ml-auto" 
            onClick={handleSave}
          >
            <Bookmark 
              className="h-6 w-6" 
              fill={saved ? "currentColor" : "none"}
            />
          </Button>
        </div>
        
        <div className="space-y-1 w-full">
          <p className="text-sm font-medium">{likesCount} curtidas</p>
          <div className="text-sm">
            <span className="font-medium">{post.username}</span>{" "}
            <span>{post.caption}</span>
          </div>
          <p className="text-xs text-muted-foreground">
            {post.comments > 0 && `Ver todos os ${post.comments} comentários`}
          </p>
          <p className="text-xs text-muted-foreground">{post.timestamp}</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
