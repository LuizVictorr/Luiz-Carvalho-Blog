// components/Header.js
import React from 'react';
import Link from 'next/link';
import styles from './css/Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
        <div className={styles.container}>
            <div className={styles.block}>
                <div className={styles.logoContainer}>
                    <Link href="/">
                        <img src="/logo.png" alt="Logo do Blog" className={styles.logo} />
                    </Link>
                </div>
                <div className={styles.title}>
                    <h1>Official Blog</h1>
                </div>
            </div>
            <nav className={styles.nav}>
                <Link href="/home">Home</Link>
                <Link href="/courses">Cursos</Link>
                <Link href="/story">Loja</Link>
                <Link href="/application">Aplicações</Link>
            </nav>
        </div>
    </header>
  );
};

export default Header;
