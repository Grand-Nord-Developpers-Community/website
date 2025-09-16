export interface Member {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  region: string;
  domain: string;
  photoUrl?: string | null;
  bio: string;
  linkedin?: string | null;
  github?: string | null;
  twitter?: string | null;
  instagram?: string | null;
  website?: string | null;
  facebook?: string | null;
  languages: string[];
  isLeader: boolean;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SocialLink {
  platform: string;
  url: string;
}
