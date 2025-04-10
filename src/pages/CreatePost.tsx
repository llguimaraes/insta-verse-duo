
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import CreatePostForm from '@/components/post/CreatePostForm';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const CreatePost: React.FC = () => {
  const { user } = useAuth();
  
  // Redirect non-admin users
  if (!user?.isAdmin) {
    return <Navigate to="/" />;
  }
  
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6 instagram-text-gradient">Criar nova publicação</h1>
        <CreatePostForm />
      </div>
    </MainLayout>
  );
};

export default CreatePost;
