'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiArrowRight, HiLockClosed } from 'react-icons/hi';
import AlbumCard from '@/components/AlbumCard';
import { getAllAlbums } from '@/lib/albums';
import styles from './page.module.css';

const categories = [
  {
    id: 'events',
    name: 'Events',
    image: '/event.JPEG',
    description: 'Corporate events, parties & celebrations',
  },
  {
    id: 'graduations',
    name: 'Graduations',
    image: '/graduation.JPEG',
    description: 'Capture your academic milestones',
  },
  {
    id: 'weddings',
    name: 'Weddings',
    image: '/wedding.JPEG',
    description: 'Your special day, beautifully preserved',
  },
  {
    id: 'birthdays',
    name: 'Birthdays',
    image: '/birthday.JPG',
    description: 'Birthday celebrations & parties',
  },
];

const orbitImages = [
  { src: '/wedd.JPEG', alt: 'Wedding' },
  { src: '/F1.png', alt: 'Photo 1' },
  { src: '/graduation.JPEG', alt: 'Graduation' },
  { src: '/F2.png', alt: 'Photo 2' },
  { src: '/event.JPEG', alt: 'Event' },
  { src: '/F3.png', alt: 'Photo 3' },
  { src: '/birthday.JPG', alt: 'Birthday' },
  { src: '/F4.png', alt: 'Photo 4' },
];

export default function Home() {
  const albums = getAllAlbums();
  const featuredAlbums = albums.slice(0, 4);

  const [phase, setPhase] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [orbitRadius, setOrbitRadius] = useState(220);
  const [imageSize, setImageSize] = useState(84);

useEffect(() => {
    const updateSizes = () => {
      const w = window.innerWidth;
      if (w <= 360) {
        setOrbitRadius(140);    // was 110 — controls tiny screens
        setImageSize(44);       // controls image size on tiny screens
      } else if (w <= 480) {
        setOrbitRadius(160);    // was 130 — controls small mobile
        setImageSize(52);       // controls image size on small mobile
      } else if (w <= 768) {
        setOrbitRadius(190);    // was 160 — controls tablet
        setImageSize(62);       // controls image size on tablet
      } else {
        setOrbitRadius(260);    // was 220 — controls desktop
        setImageSize(84);       // controls image size on desktop
      }
    };

    updateSizes();
    setIsLoaded(true);

    window.addEventListener('resize', updateSizes);
    return () => window.removeEventListener('resize', updateSizes);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 1800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isLoaded]);

  const getOrbitPosition = (index, total, radius) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  };

  if (!isLoaded) {
    return (
      <div className={styles.loadingScreen}>
        <div className={styles.loadingSpinner}></div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        {/* Particles */}
        <div className={styles.particleField}>
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className={styles.particle}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
                width: `${2 + Math.random() * 3}px`,
                height: `${2 + Math.random() * 3}px`,
              }}
            />
          ))}
        </div>

        {/* Radial Glow */}
        <motion.div
          className={styles.radialGlow}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: phase >= 2 ? 0.5 : 0,
            scale: phase >= 2 ? 1 : 0,
          }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />

        {/* Center Stage */}
        <div className={styles.centerStage}>
          {/* FIZMO Text */}
          <motion.div
            className={styles.fizmoWrapper}
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 1 ? 1 : 0 }}
          >
            {/* Glitch layer 1 */}
            <motion.h1
              className={`${styles.fizmoText} ${styles.glitchLayer1}`}
              initial={{ opacity: 0, scale: 2, filter: 'blur(20px)' }}
              animate={{
                opacity: phase >= 1 ? [0, 0.8, 0, 0.5, 0] : 0,
                scale: phase >= 1 ? [2, 1.02, 1.05, 0.98, 1] : 2,
                filter: phase >= 1 ? ['blur(20px)', 'blur(0px)'] : 'blur(20px)',
                x: phase >= 1 ? [0, -3, 5, -2, 0] : 0,
              }}
              transition={{
                duration: 1.2,
                times: [0, 0.3, 0.5, 0.7, 1],
                ease: 'easeOut',
              }}
            >
              FIZMO
            </motion.h1>

            {/* Glitch layer 2 */}
            <motion.h1
              className={`${styles.fizmoText} ${styles.glitchLayer2}`}
              initial={{ opacity: 0, scale: 2, filter: 'blur(20px)' }}
              animate={{
                opacity: phase >= 1 ? [0, 0.6, 0, 0.4, 0] : 0,
                scale: phase >= 1 ? [2, 0.98, 1.03, 1.01, 1] : 2,
                filter: phase >= 1 ? ['blur(20px)', 'blur(0px)'] : 'blur(20px)',
                x: phase >= 1 ? [0, 4, -3, 2, 0] : 0,
              }}
              transition={{
                duration: 1.2,
                delay: 0.05,
                times: [0, 0.3, 0.5, 0.7, 1],
                ease: 'easeOut',
              }}
            >
              FIZMO
            </motion.h1>

            {/* Main text */}
            <motion.h1
              className={styles.fizmoText}
              initial={{ opacity: 0, scale: 2, filter: 'blur(20px)' }}
              animate={{
                opacity: phase >= 1 ? 1 : 0,
                scale: phase >= 1 ? 1 : 2,
                filter: phase >= 1 ? 'blur(0px)' : 'blur(20px)',
              }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              FIZMO
            </motion.h1>
          </motion.div>

          {/* Orbit Ring */}
          <motion.div
            className={styles.orbitRing}
            style={{
              width: orbitRadius * 2 + imageSize,
              height: orbitRadius * 2 + imageSize,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: phase >= 2 ? 0.15 : 0,
              scale: phase >= 2 ? 1 : 0,
            }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />

          {/* Spinning Orbit Wrapper */}
          <motion.div
            className={styles.orbitSpin}
            animate={{ rotate: 360 }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {orbitImages.map((img, index) => {
              const pos = getOrbitPosition(index, orbitImages.length, orbitRadius);
              const delay = 0.1 * index;

              return (
                <motion.div
                  key={index}
                  className={styles.orbitItem}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                  }}
                  initial={{
                    opacity: 0,
                    scale: 0,
                    x: -imageSize / 2,
                    y: -imageSize / 2,
                  }}
                  animate={{
                    opacity: phase >= 2 ? 1 : 0,
                    scale: phase >= 2 ? 1 : 0,
                    x: phase >= 2 ? pos.x - imageSize / 2 : -imageSize / 2,
                    y: phase >= 2 ? pos.y - imageSize / 2 : -imageSize / 2,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: delay,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                >
                  {/* Counter-rotate to keep images upright */}
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 40,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    <div
                      className={styles.imageFrame}
                      style={{
                        width: imageSize,
                        height: imageSize,
                      }}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className={styles.orbitImage}
                        onError={(e) => {
                          console.log('Image failed to load:', img.src);
                          e.target.style.background = '#333';
                        }}
                      />
                      <div className={styles.imageShine} />
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className={`section ${styles.categoriesSection}`}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={styles.sectionHeader}
          >
            <h2>Our Services</h2>
            <p>Specialized photography for every occasion</p>
          </motion.div>

          <div className={styles.categoriesGrid}>
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={`/gallery?category=${category.id}`}
                  className={styles.categoryCard}
                >
                  <div className={styles.categoryIcon}>
                    <img src={category.image} alt={category.name} className={styles.categoryImage} />
                  </div>
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                  <span className={styles.categoryLink}>
                    View Gallery <HiArrowRight />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Albums Section */}
      {featuredAlbums.length > 0 && (
        <section className={`section ${styles.albumsSection}`}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={styles.sectionHeaderWhite}
            >
              <h2>Recent Work</h2>
              <p>Browse through our latest photography sessions</p>
            </motion.div>

            <div className={styles.albumsGrid}>
              {featuredAlbums.map((album, index) => (
                <AlbumCard key={album.id} album={album} index={index} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className={styles.viewAllWrapper}
            >
              <Link href="/gallery" className="btn btn-secondary">
                View All Albums <HiArrowRight />
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={styles.ctaCard}
          >
            <h2>Ready to Capture Your Special Moments?</h2>
            <p>
              Let us tell your story through stunning photographs.
              Book your session today and create memories that last forever.
            </p>
            <div className={styles.ctaButtons}>
              <Link
                href="https://wa.me/94770168560"
                target="_blank"
                className="btn btn-primary"
              >
                Book via WhatsApp <HiArrowRight />
              </Link>
            </div>
            <Link href="/admin" className={styles.adminLink}>
              <HiLockClosed /> Admin Login
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}