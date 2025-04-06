
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Image as ImageIcon, Upload } from 'lucide-react';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate inputs
    if (!imageUrl || !caption) {
      toast({
        title: "Erro ao criar post",
        description: "Por favor, preencha todos os campos",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Mock post creation
    setTimeout(() => {
      toast({
        title: "Post criado",
        description: "Seu post foi criado com sucesso",
      });
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Criar novo post</CardTitle>
        <CardDescription>
          Compartilhe uma foto nova com seus seguidores
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">URL da imagem</label>
            <Input
              placeholder="https://exemplo.com/imagem.jpg"
              value={imageUrl}
              onChange={handleImageChange}
            />
            <p className="text-xs text-muted-foreground">
              Cole a URL de uma imagem online para compartilhá-la
            </p>
          </div>

          {previewUrl ? (
            <div className="aspect-square relative overflow-hidden rounded-md border">
              <img
                src={previewUrl}
                alt="Preview"
                className="object-cover w-full h-full"
                onError={() => setPreviewUrl('')}
              />
            </div>
          ) : (
            <div className="aspect-square flex items-center justify-center rounded-md border bg-muted">
              <div className="flex flex-col items-center text-muted-foreground">
                <ImageIcon className="h-16 w-16 mb-2" />
                <p>Prévia da imagem</p>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">Legenda</label>
            <Textarea
              placeholder="Escreva uma legenda para seu post..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={3}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full instagram-gradient"
            disabled={isLoading}
          >
            {isLoading ? (
              <span>Publicando...</span>
            ) : (
              <span className="flex items-center">
                <Upload className="mr-2 h-4 w-4" /> Publicar
              </span>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreatePostForm;
