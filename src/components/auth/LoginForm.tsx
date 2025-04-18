
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(username, password);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center mb-4">
          <img 
            src="/lovable-uploads/415c1c69-fb4a-49f5-9a81-a1b64ff6a1ce.png" 
            alt="KROWD" 
            className="h-24 w-24 object-contain" 
          />
        </div>
        <CardTitle className="text-2xl font-bold text-[#1EAEDB]">KROWD</CardTitle>
        <CardDescription>
          Entre com suas credenciais para acessar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              id="username"
              placeholder="Nome de usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="border-primary/20 focus:border-primary"
            />
          </div>
          <div className="space-y-2">
            <Input
              id="password"
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border-primary/20 focus:border-primary"
            />
          </div>
          <div className="pt-2">
            <Button
              className="w-full krowd-gradient text-white hover:opacity-90 transition-opacity"
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="text-center text-sm">
        <div className="w-full text-center text-muted-foreground">
          <p>Credenciais para teste:</p>
          <p>Admin: admin / admin123</p>
          <p>Convidado: guest / guest123</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
