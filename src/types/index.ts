// types/index.ts

export interface Photo {
  id: string;
  title: string;
  description: string;
  src: string;
  thumbnailSrc: string;
  category: PhotoCategory;
  tags: string[];
  photographer: Photographer;
  location: string;
  dateTaken: string;
  likes: number;
  views: number;
  width: number;
  height: number;
  cameraSettings?: CameraSettings;
  collectionIds: string[];
}

export type PhotoCategory =
  | "red-moon"
  | "full-moon"
  | "eclipse"
  | "nature"
  | "night-sky"
  | "sunrise-sunset"
  | "storms"
  | "forests"
  | "oceans"
  | "mountains"
  | "auroras";

export interface Photographer {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  location: string;
  instagram?: string;
  website?: string;
}

export interface Collection {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  photoIds: string[];
  tags: string[];
  createdAt: string;
  featured: boolean;
}

export interface CameraSettings {
  camera: string;
  lens: string;
  iso: number;
  aperture: string;
  shutterSpeed: string;
  focalLength: string;
}
