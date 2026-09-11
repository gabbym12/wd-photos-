export interface ExifData {
  camera: string;
  lens: string;
  focalLength: string;
  aperture: string;
  shutterSpeed: string;
  iso: number;
  dimensions: string;
}

export interface Photo {
  id: string;
  title: string;
  caption: string;
  url: string;
  albumId: string;
  albumTitle: string;
  category: 'weddings' | 'portraits' | 'landscapes' | 'architecture' | 'editorial' | 'client';
  orientation: 'portrait' | 'landscape' | 'square';
  date: string;
  location: string;
  photographer: string;
  featured?: boolean;
  isFavorite: boolean;
  rating?: number; // 0 to 5 stars
  clientStatus?: 'approved' | 'rejected' | 'pending';
  clientNotes?: string;
  exif: ExifData;
  tags: string[];
}

export interface Album {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  coverUrl: string;
  category: 'weddings' | 'portraits' | 'landscapes' | 'architecture' | 'editorial' | 'client';
  date: string;
  clientName?: string;
  location: string;
}

export type ViewLayout = 'masonry' | 'grid' | 'editorial';
