import React, { useState, useEffect } from 'react';

export function useScroll() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Nettoyage de l'écouteur d'événement lorsque le composant est démonté
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrolled;
}
