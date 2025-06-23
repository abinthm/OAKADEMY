import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const usePageTitle = (title?: string) => {
  const location = useLocation();
  const baseTitle = 'Oakademy';

  useEffect(() => {
    // Get the current path segments
    const pathSegments = location.pathname.split('/').filter(Boolean);
    
    // Default title if no specific title is provided
    let pageTitle = baseTitle;
    
    if (title) {
      // If a specific title is provided, use it
      pageTitle = `${title} | ${baseTitle}`;
    } else if (pathSegments.length > 0) {
      // Otherwise, generate title from path
      const lastSegment = pathSegments[pathSegments.length - 1];
      const formattedSegment = lastSegment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      pageTitle = `${formattedSegment} | ${baseTitle}`;
    }

    // Update the document title
    document.title = pageTitle;
  }, [location.pathname, title]);
};

export default usePageTitle; 