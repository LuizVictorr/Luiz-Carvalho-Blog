// components/PostDetails.js
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import firebase from '../firebase';
import styles from './css/PostDetails.module.css'

const renderMarkdownContent = (content) => {
  return (
      <ReactMarkdown
        className={styles.markdown}
        components={{
          p: ({ node, children, ...props }) => <p {...props} style={{ marginBottom: '10px' }}>{children}</p>,
          h1: ({ node, children, ...props }) => <h1 {...props}>{children}</h1>,
          h2: ({ node, children, ...props }) => <h2 {...props}>{children}</h2>,
          h3: ({ node, children, ...props }) => <h3 {...props}>{children}</h3>,
          h4: ({ node, children, ...props }) => <h4 {...props}>{children}</h4>,
          h5: ({ node, children, ...props }) => <h5 {...props}>{children}</h5>,
          h6: ({ node, children, ...props }) => <h6 {...props}>{children}</h6>,
          strong: ({ node, children, ...props }) => <strong {...props}>{children}</strong>,
          em: ({ node, children, ...props }) => <em {...props}>{children}</em>,
          code: ({ node, children, ...props }) => <code {...props}>{children}</code>,
          math: ({ value }) => <BlockMath>{value}</BlockMath>,
          inlineMath: ({ value }) => <InlineMath>{value}</InlineMath>,
        }}
      >
        {content}
      </ReactMarkdown>
  );
};

const PostDetails = () => {
  const router = useRouter();
  const { postId } = router.query;
  const [post, setPost] = useState(null);
  const [recommendedPosts, setRecommendedPosts] = useState([]);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        if (postId) {
          const response = await firebase.ref(`posts/${postId}`).once('value');
          const postData = response.val();

          if (postData) {
            setPost(postData);

            // Buscar todas as categorias do post atual
            const postCategories = postData.categories || [];

            // Buscar todos os posts
            const allPostsSnapshot = await firebase.ref('posts').once('value');
            const allPostsData = allPostsSnapshot.val() || {};

            // Filtrar posts recomendados
            const recommendedPostsData = Object.keys(allPostsData)
              .map((postId) => ({ id: postId, ...allPostsData[postId] }))
              .filter((recommendedPost) => {
                // Excluir o post atual e verificar se há pelo menos uma categoria em comum
                const recommendedCategories = recommendedPost.categories || [];
                return recommendedPost.id !== postId && recommendedCategories.some((category) => postCategories.includes(category));
              })
              .slice(0, 4); // Limitar a 4 posts recomendados

            setRecommendedPosts(recommendedPostsData.reverse()); // Inverter a ordem para exibir os mais recentes primeiro
          } else {
            console.error('Post não encontrado');
          }
        }
      } catch (error) {
        console.error('Erro ao recuperar detalhes do post:', error);
      }
    };

    fetchPostDetails();
  }, [postId]);

  const handleBack = () => {
    router.push('/'); // Redireciona para a página inicial (PostList)
  };

  if (!post) {
    return <div>Carregando...</div>;
  }

  return (
    <div className={styles.container}>
            <div className={styles.card}>
      <div className={styles.introduction}>
      <h1 className={styles.title}>{post.title}</h1>
      <p className={styles.date}>{post.date}</p>
      {/* Adicione a exibição das categorias */}
      <p className={styles.categories}>Categorias: {post.categories ? post.categories.join(', ') : '-'}</p>
      {/* Renderize o conteúdo do post usando Markdown ou outra lógica necessária */}
      </div>
      <div className={styles.divider}></div>
      <div className={styles.markdown}>{renderMarkdownContent(post.content)}</div>
  
      {/* Botão de volta para a lista de posts */}
      <button className={styles.backButton} onClick={handleBack}>
        Voltar para a Lista de Posts
      </button>
      </div>
  
      {/* Seção de Posts Recomendados */}
      <div className={styles.recommended}>
      <h2 className={styles.recommendedPosts}>Posts Recomendados</h2>
      <ul className={styles.postList}>
  {recommendedPosts.map((recommendedPost) => (
    <li key={recommendedPost.id} className={styles.postCard}>
      {/* Use recommendedPost, não post */}
      <img src={recommendedPost.images} alt="ImagemUrl" />
      <div>
        <h1>{recommendedPost.title}</h1>
        <span>{recommendedPost.date}</span>
        <br />
        <button className={styles.verMaisButton}>
          {/* Use recommendedPost.id, não post.id */}
          <Link href={`/post/${recommendedPost.id}`} className={styles.link}>
            Ver mais
          </Link>
        </button>
      </div>
    </li>
  ))}
</ul>
      </div>
    </div>
  );
};

export default PostDetails;
