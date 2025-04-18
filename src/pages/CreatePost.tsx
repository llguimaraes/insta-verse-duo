
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import CreatePostForm from '@/components/post/CreatePostForm';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const CreatePost: React.FC = () => {
  const { user } = useAuth();
  
  if (!user?.isAdmin) {
    return <Navigate to="/" />;
  }
  
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 brand-text-gradient">Criar nova postagem</h1>
        <CreatePostForm />
      </div>
    </MainLayout>
  );
};

export default CreatePost;
