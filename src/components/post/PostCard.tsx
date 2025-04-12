
import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

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
  const [isLikeAnimating, setIsLikeAnimating] = useState(false);
  const { toast } = useToast();

  const handleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
      setIsLikeAnimating(true);
      setTimeout(() => setIsLikeAnimating(false), 500);
    }
    setLiked(!liked);
  };

  const handleDoubleTapLike = () => {
    if (!liked) {
      setLikesCount(likesCount + 1);
      setLiked(true);
      setIsLikeAnimating(true);
      setTimeout(() => setIsLikeAnimating(false), 500);
    }
  };

  const handleSave = () => {
    setSaved(!saved);
    toast({
      title: saved ? "Post removed" : "Post saved",
      description: saved ? "Post removed from your collection" : "Post saved to your collection",
    });
  };

  const handleComment = () => {
    toast({
      title: "Comments",
      description: "Comment feature coming soon",
    });
  };

  const handleShare = () => {
    toast({
      title: "Share",
      description: "Share feature coming soon",
    });
  };

  return (
    <Card className="mb-8 overflow-hidden rounded-2xl glass-card post-card-hover">
      <CardHeader className="p-4 flex flex-row items-center space-y-0">
        <div className="flex items-center flex-1">
          <Avatar className="h-10 w-10 mr-3 ring-2 ring-primary/20">
            <AvatarImage src={post.userImage} alt={post.username} />
            <AvatarFallback>{post.username[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{post.username}</p>
            <p className="text-xs text-muted-foreground">{post.timestamp}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </CardHeader>
      
      <CardContent className="p-0">
        <div 
          className="aspect-square relative bg-muted overflow-hidden"
          onDoubleClick={handleDoubleTapLike}
        >
          <img
            src={post.image}
            alt={post.caption}
            className="object-cover w-full h-full transition-all duration-500 hover:scale-105"
          />
          {isLikeAnimating && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Heart className="h-24 w-24 text-white filter drop-shadow-lg animate-heart-pulse fill-primary" />
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col items-start p-4">
        <div className="flex items-center justify-between w-full mb-3">
          <div className="flex space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-9 w-9 rounded-full hover:bg-primary/10" 
              onClick={handleLike}
            >
              <Heart 
                className={`h-5 w-5 ${liked ? 'fill-primary text-primary' : ''}`} 
                fill={liked ? "currentColor" : "none"}
              />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-9 w-9 rounded-full hover:bg-primary/10" 
              onClick={handleComment}
            >
              <MessageCircle className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-9 w-9 rounded-full hover:bg-primary/10" 
              onClick={handleShare}
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9 rounded-full hover:bg-primary/10" 
            onClick={handleSave}
          >
            <Bookmark 
              className={`h-5 w-5 ${saved ? 'fill-accent text-accent' : ''}`} 
              fill={saved ? "currentColor" : "none"}
            />
          </Button>
        </div>
        
        <div className="space-y-2 w-full">
          <p className="font-medium">{likesCount.toLocaleString()} likes</p>
          <Collapsible className="w-full">
            <div className="text-sm">
              <span className="font-medium">{post.username}</span>{" "}
              <span className="inline-block">
                {post.caption.length > 120 ? (
                  <>
                    {post.caption.substring(0, 120)}
                    <CollapsibleTrigger asChild>
                      <button className="text-muted-foreground font-medium ml-1">
                        ... more
                      </button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      {post.caption.substring(120)}
                    </CollapsibleContent>
                  </>
                ) : (
                  post.caption
                )}
              </span>
            </div>
          </Collapsible>
          {post.comments > 0 && (
            <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
              View all {post.comments} comments
            </button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
