
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Image as ImageIcon, Upload, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const CreatePostForm: React.FC = () => {
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user?.isAdmin) {
    navigate('/');
    return null;
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
    setPreviewUrl(e.target.value);
  };

  const clearImage = () => {
    setImageUrl('');
    setPreviewUrl('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate inputs
    if (!imageUrl || !caption) {
      toast({
        title: "Error creating post",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Mock post creation
    setTimeout(() => {
      toast({
        title: "Post created",
        description: "Your post has been published successfully",
      });
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };

  return (
    <Card className="glass-card overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle>Create new post</CardTitle>
        <CardDescription>
          Share a new photo with your followers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Image URL</label>
            <div className="relative">
              <Input
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={handleImageChange}
                className="pr-10"
              />
              {imageUrl && (
                <button 
                  type="button" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-destructive"
                  onClick={clearImage}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Paste an image URL to share it with your followers
            </p>
          </div>

          {previewUrl ? (
            <div className="aspect-square relative overflow-hidden rounded-xl border">
              <img
                src={previewUrl}
                alt="Preview"
                className="object-cover w-full h-full"
                onError={() => setPreviewUrl('')}
              />
              <button
                type="button"
                className="absolute top-3 right-3 bg-background/70 backdrop-blur-sm p-2 rounded-full hover:bg-background/90 transition-colors"
                onClick={clearImage}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="aspect-square flex items-center justify-center rounded-xl border bg-muted/30 dashed">
              <div className="flex flex-col items-center text-muted-foreground">
                <ImageIcon className="h-16 w-16 mb-2" />
                <p>Image preview</p>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">Caption</label>
            <Textarea
              placeholder="Write a caption for your post..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={3}
              className="resize-none"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full brand-gradient"
            disabled={isLoading}
          >
            {isLoading ? (
              <span>Publishing...</span>
            ) : (
              <span className="flex items-center">
                <Upload className="mr-2 h-4 w-4" /> Publish
              </span>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreatePostForm;
