
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PostsList from '@/components/post/PostsList';

const Home: React.FC = () => {
  return (
    <MainLayout>
      <div className="max-w-xl mx-auto">
        <PostsList />
      </div>
    </MainLayout>
  );
};

export default Home;
