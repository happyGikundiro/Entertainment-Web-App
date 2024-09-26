interface ThumbnailSize {
    small: string;
    large?: string;
    medium?: string;
  }
  
  interface Thumbnail {
    trending?: ThumbnailSize;
    regular: ThumbnailSize;
  }
  
 export interface Movie {
    id: string;
    title: string;
    thumbnail: Thumbnail;
    year: number;
    category: string;
    rating: string;
    isBookmarked: boolean;
    isTrending: boolean;
  }