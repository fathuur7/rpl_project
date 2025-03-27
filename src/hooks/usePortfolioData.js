import { useState, useCallback, useEffect } from 'react';

export default function usePortfolioData() {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [featuredSlides, setFeaturedSlides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [error, setError] = useState(null);

  const fetchPortfolioData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Gunakan path relatif atau absolute sesuai struktur project
      const response = await fetch('/data/data.json', {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      console.log('Raw data fetched:', data); // Tambahkan log untuk debugging

      if (Array.isArray(data)) {
        const updatedData = data.map((item, index) => ({
          id: index + 1,
          ...item,
        }));

        console.log('Updated data:', updatedData); // Log updated data

        setPortfolioItems(updatedData);

        if (updatedData.length > 0) {
          const featured = updatedData.slice(0, 15).map((item) => ({
            title: item.title || 'Untitled',
            description: item.category || '',
            image: item.image_url || '/placeholder-image.jpg',
          }));

          console.log('Featured slides:', featured); // Log featured slides

          setFeaturedSlides(featured);
        }
      } else {
        console.warn('Fetched data is not an array');
        setPortfolioItems([]);
        setFeaturedSlides([]);
      }
    } catch (error) {
      console.error('Error fetching portfolio data:', error);
      setError(error);
      setPortfolioItems([]);
      setFeaturedSlides([]);
    } finally {
      setIsLoading(false);
      setIsInitialRender(false);
    }
  }, []);

  useEffect(() => {
    fetchPortfolioData();
  }, [fetchPortfolioData]);

  return {
    portfolioItems,
    featuredSlides,
    isLoading,
    isInitialRender,
    error,
    refetchPortfolioData: fetchPortfolioData,
  };
}