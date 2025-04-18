import React from 'react';
import PostCard, { Post } from './PostCard';

export const mockPosts: Post[] = [
  {
    id: '1',
    username: 'fotografia_oficial',
    userImage: '/placeholder.svg',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
    caption: 'Tecnologia e criatividade formam a melhor combinação!',
    likes: 234,
    comments: 42,
    timestamp: 'Há 2 horas',
  },
  {
    id: '2',
    username: 'viagens_mundo',
    userImage: '/placeholder.svg',
    image: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23',
    caption: 'Natureza selvagem em sua forma mais pura. #natureza #viagem',
    likes: 542,
    comments: 78,
    timestamp: 'Há 5 horas',
  },
  {
    id: '3',
    username: 'pets_adoraveis',
    userImage: '/placeholder.svg',
    image: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1',
    caption: 'Quem resiste a esses olhinhos? 😍 #gatos #animais #fofura',
    likes: 876,
    comments: 123,
    timestamp: 'Há 1 dia',
  },
  {
    id: '4',
    username: 'fotografia_oficial',
    userImage: '/placeholder.svg',
    image: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a',
    caption: 'Às vezes a solidão é o único caminho para encontrar a si mesmo. #paz',
    likes: 321,
    comments: 29,
    timestamp: 'Há 2 dias',
  },
];

interface PostsListProps {
  posts?: Post[];
}

const PostsList: React.FC<PostsListProps> = ({ posts = mockPosts }) => {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostsList;
