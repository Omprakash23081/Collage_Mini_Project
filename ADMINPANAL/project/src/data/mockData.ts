import { User, DashboardStats, Achievement, Service, Video, Skill, Tool, Testimonial, Message, Profile } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    role: 'Admin',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    createdAt: '2024-01-15',
    status: 'Active'
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    role: 'Editor',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    createdAt: '2024-01-20',
    status: 'Active'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'Viewer',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    createdAt: '2024-02-01',
    status: 'Inactive'
  }
];

export const dashboardStats: DashboardStats = {
  totalVisitors: 15420,
  totalProjects: 28,
  totalClients: 67,
  totalAchievements: 12
};

export const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Best Developer Award 2024',
    description: 'Recognized as the outstanding developer of the year',
    date: '2024-12-01',
    category: 'Awards'
  },
  {
    id: '2',
    title: 'Top Freelancer',
    description: 'Achieved top freelancer status on multiple platforms',
    date: '2024-11-15',
    category: 'Recognition'
  }
];

export const mockServices: Service[] = [
  {
    id: '1',
    title: 'Web Development',
    description: 'Full-stack web application development',
    price: '$2,500',
    status: 'Active',
    category: 'Development'
  },
  {
    id: '2',
    title: 'UI/UX Design',
    description: 'Modern and responsive design solutions',
    price: '$1,800',
    status: 'Active',
    category: 'Design'
  }
];

export const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Portfolio Showcase 2024',
    description: 'A comprehensive showcase of my latest projects',
    link: 'https://youtube.com/watch?v=example1',
    thumbnail: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    views: 1250,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: 'Development Process',
    description: 'Behind the scenes of my development workflow',
    link: 'https://youtube.com/watch?v=example2',
    thumbnail: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
    views: 850,
    createdAt: '2024-02-01'
  }
];

export const mockSkills: Skill[] = [
  { id: '1', name: 'React', percentage: 95, category: 'Frontend' },
  { id: '2', name: 'Node.js', percentage: 88, category: 'Backend' },
  { id: '3', name: 'TypeScript', percentage: 92, category: 'Language' },
  { id: '4', name: 'Python', percentage: 85, category: 'Language' }
];

export const mockTools: Tool[] = [
  { id: '1', name: 'VS Code', category: 'Editor', icon: 'Code' },
  { id: '2', name: 'Figma', category: 'Design', icon: 'Figma' },
  { id: '3', name: 'Docker', category: 'DevOps', icon: 'Container' },
  { id: '4', name: 'Git', category: 'Version Control', icon: 'GitBranch' }
];

export const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    clientName: 'Emily Davis',
    clientCompany: 'Tech Solutions Inc.',
    rating: 5,
    feedback: 'Outstanding work! The project was delivered on time and exceeded our expectations.',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    createdAt: '2024-01-20'
  },
  {
    id: '2',
    clientName: 'Robert Chen',
    clientCompany: 'Creative Agency',
    rating: 5,
    feedback: 'Professional, reliable, and incredibly talented. Highly recommend!',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    createdAt: '2024-02-05'
  }
];

export const mockMessages: Message[] = [
  {
    id: '1',
    name: 'Alex Thompson',
    email: 'alex@startup.com',
    subject: 'New Project Inquiry',
    message: 'Hi! I\'m interested in discussing a new web development project. Could we schedule a call?',
    isRead: false,
    createdAt: '2024-12-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Lisa Rodriguez',
    email: 'lisa@company.com',
    subject: 'Collaboration Opportunity',
    message: 'We have an exciting collaboration opportunity that might interest you. Let\'s connect!',
    isRead: true,
    createdAt: '2024-12-14T14:20:00Z'
  }
];

export const mockProfile: Profile = {
  name: 'John Doe',
  bio: 'Full-stack developer with 5+ years of experience in creating modern web applications.',
  avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
  socialLinks: {
    linkedin: 'https://linkedin.com/in/johndoe',
    github: 'https://github.com/johndoe',
    twitter: 'https://twitter.com/johndoe',
    website: 'https://johndoe.dev'
  }
};

export const chartData = {
  visitors: [
    { name: 'Mon', visitors: 400 },
    { name: 'Tue', visitors: 300 },
    { name: 'Wed', visitors: 500 },
    { name: 'Thu', visitors: 450 },
    { name: 'Fri', visitors: 600 },
    { name: 'Sat', visitors: 350 },
    { name: 'Sun', visitors: 280 }
  ],
  engagement: [
    { name: 'About', value: 35 },
    { name: 'Projects', value: 25 },
    { name: 'Services', value: 20 },
    { name: 'Contact', value: 20 }
  ]
};