'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import AlbumCard from '@/components/AlbumCard';
import CategoryFilter from '@/components/CategoryFilter';
import { getAlbumsByCategory } from '@/lib/albums';
import styles from './page.module.css';

function GalleryContent() {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get('category') || 'all';
    const [activeCategory, setActiveCategory] = useState(initialCategory);
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        setAlbums(getAlbumsByCategory(activeCategory));
    }, [activeCategory]);

    return (
        <>
            {/* Header */}
            <section className={styles.header}>
                <div className={styles.headerBackground}>
                    <div className={styles.gradientOrb}></div>
                </div>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className={styles.headerContent}
                    >
                        <h1>Our Gallery</h1>
                        <p>Explore our collection of beautiful moments</p>
                    </motion.div>
                </div>
            </section>

            {/* Filter & Albums */}
            <section className={`section ${styles.gallerySection}`}>
                <div className="container">
                    {/* Category Filter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <CategoryFilter
                            activeCategory={activeCategory}
                            onCategoryChange={setActiveCategory}
                        />
                    </motion.div>

                    {/* Albums Grid */}
                    {albums.length > 0 ? (
                        <div className={styles.albumsGrid}>
                            {albums.map((album, index) => (
                                <AlbumCard key={album.id} album={album} index={index} />
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={styles.emptyState}
                        >
                            <span className={styles.emptyIcon}>📷</span>
                            <h3>No albums yet</h3>
                            <p>We're working on adding amazing content. Check back soon!</p>
                        </motion.div>
                    )}
                </div>
            </section>
        </>
    );
}

export default function GalleryPage() {
    return (
        <div className={styles.page}>
            <Suspense fallback={
                <div className={styles.loading}>
                    <div className={styles.spinner}></div>
                </div>
            }>
                <GalleryContent />
            </Suspense>
        </div>
    );
}
