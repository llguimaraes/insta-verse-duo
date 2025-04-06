
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import CreatePostForm from '@/components/post/CreatePostForm';

const CreatePost: React.FC = () => {
  return (
    <MainLayout>
      <CreatePostForm />
    </MainLayout>
  );
};

export default CreatePost;
