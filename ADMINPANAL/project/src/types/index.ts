export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  avatar: string;
  createdAt: string;
  status: 'Active' | 'Inactive';
}

export interface DashboardStats {
  totalVisitors: number;
  totalProjects: number;
  totalClients: number;
  totalAchievements: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  status: 'Active' | 'Inactive';
  category: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  link: string;
  thumbnail: string;
  views: number;
  createdAt: string;
}

export interface Skill {
  id: string;
  name: string;
  percentage: number;
  category: string;
}

export interface Tool {
  id: string;
  name: string;
  category: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  clientCompany: string;
  rating: number;
  feedback: string;
  avatar: string;
  createdAt: string;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface Profile {
  name: string;
  bio: string;
  avatar: string;
  socialLinks: {
    linkedin: string;
    github: string;
    twitter: string;
    website: string;
  };
}