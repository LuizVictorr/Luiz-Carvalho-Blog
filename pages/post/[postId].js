// pages/post/[postId].js
import React from 'react';
import PostDetails from '../../components/PostDetails';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PostDetailsPage = () => {
  return (
    <div>
      <Header/>
      <PostDetails />
      <Footer/>
    </div>
  );
};

export default PostDetailsPage;
