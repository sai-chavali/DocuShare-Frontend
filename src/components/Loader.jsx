import React, { useEffect, useState } from 'react';
import { BallTriangle } from 'react-loader-spinner';

const Loader = () => {
  const [loaderSize, setLoaderSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      // Calculate the desired size based on screen dimensions or any other logic
      const desiredWidth = Math.min(screenWidth * 0.2, 100); // Adjust the percentage or fixed value as needed
      const desiredHeight = Math.min(screenHeight * 0.2, 100); // Adjust the percentage or fixed value as needed

      setLoaderSize({ width: desiredWidth, height: desiredHeight });
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="loader" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <BallTriangle
        color="#00BFFF"
        width={loaderSize.width}
        height={loaderSize.height}
      />
    </div>
  );
};

export default Loader;
