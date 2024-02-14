// components/PostList.js
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import firebase from '../firebase';;
import styles from './css/PostList.module.css'

import { FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 16;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const snapshot = await firebase.ref('posts').once('value');
        const postList = [];

        snapshot.forEach((childSnapshot) => {
          const postData = childSnapshot.val();
          postList.push({ id: childSnapshot.key, ...postData });
        });

        setPosts(postList);
      } catch (error) {
        console.error('Erro ao carregar posts:', error);
      }
    };

    fetchPosts();
  }, []);

  // Calcular o índice inicial e final dos posts exibidos na página atual
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Calcular o número total de páginas
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Função para mudar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Opções para o dropdown de categorias
  const categoryOptions = Array.from(new Set(posts.flatMap((post) => post.categories))).map(
    (category) => ({
      value: category,
      label: category,
    })
  );

  return (
    <div>
      <div className={styles.introduction}>
      <h1 className={styles.title}>Blog - Luiz Carvalho</h1>
      <p className={styles.description}>
        Seja bem vindo, aqui podemos considerar um espaço vibrante onde exploramos 
        as fronteiras fascinantes da ciência, mergulhamos nas últimas 
        inovações tecnológicas, desvendamos os segredos do mundo dos 
        negócios, deciframos as estratégias eficazes 
        de marketing e evoluimos junto ao universo da produtividade.
         Aqui você descubre insights, análises e histórias que transcendem fronteiras, impulsionando a 
        inovação e o progresso. Portanto Junte-se a nós nesta jornada intelectual, aplicando conhecimentos para 
        aprimorar sua vida pessoal e profissional. 
      </p>
      <span>
        Vamos explorar juntos o emocionante território dessas áreas 
        interconectadas!
      </span>
      </div>

      <div className={styles.container}>
      <div className={styles.postListContainer}>
      <div className={styles.filterContainer}>
        <h1>Filtros</h1>
        <div>
  <div className={styles.searchContainer}>
    <input
      type="text"
      placeholder="Pesquisar por título"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className={styles.searchInput}
    />
    <FaSearch className={styles.searchIcon} />
  </div>
  {/* Dropdown para categorias */}
  <select
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
    className={styles.categoryDropdown}
  >
    <option value="">Todas as Categorias</option>
    {/* Adicione as opções com base nas categorias disponíveis nos posts */}
    {categoryOptions.map((category) => (
      <option key={category.value} value={category.value}>
        {category.label}
      </option>
    ))}
  </select>
</div>
</div>
      <ul className={styles.postList}>
        {/* Filtrar posts com base no título e categoria selecionada */}
        {posts
  .filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === '' || (post.categories && post.categories.includes(selectedCategory)))
  )
  .slice(indexOfFirstPost, indexOfLastPost)
          .map((post) => (
            <li key={post.id} className={styles.postCard}>
              <img src={post.images} alt="ImagemUrl" />
              <div>
              <h1>{post.title}</h1>
              <span>{post.date}</span>
              <p>{post.content.slice(0,100)}...</p>
              <br/>
              <button 
              className={styles.verMaisButton}>
          <Link href={`/post/${post.id}`} className={styles.link}>
            Ver mais
          </Link>
        </button>
              </div>
            </li>
          ))}
      </ul>
      {/* Adicionar botões de paginação com "..." para representar mais páginas */}
      <div className={styles.paginationContainer}>
  <button
    onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
    disabled={currentPage === 1}
  >
    <FaChevronLeft />
  </button>
  <span>
    Página {currentPage} de {totalPages}
  </span>
  <button
    onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
    disabled={currentPage === totalPages}
  >
    <FaChevronRight />
  </button>
</div>
    </div>
    </div>
    </div>
    
  );
};

export default PostList;
