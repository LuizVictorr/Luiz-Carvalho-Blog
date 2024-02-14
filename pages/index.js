// pages/index.js
import React from 'react';
import PostList from '@/components/PostList';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Home = () => {
  return (
    <div>
      <Header />
      <PostList />
      <Footer/>
    </div>
  );
};

export default Home;
