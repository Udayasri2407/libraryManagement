import { Book } from '../types';

export const mockBooks: Book[] = [
  {
    id: 1,
    title: "The Art of Programming",
    author: "John Smith",
    isbn: "978-0123456789",
    category: "Computer Science",
    coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=300&q=80",
    description: "A comprehensive guide to programming principles and practices.",
    available: true
  },
  {
    id: 2,
    title: "Data Structures Explained",
    author: "Jane Doe",
    isbn: "978-9876543210",
    category: "Computer Science",
    coverImage: "https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&w=300&q=80",
    description: "In-depth exploration of fundamental data structures.",
    available: true
  },
  {
    id: 3,
    title: "Web Development Mastery",
    author: "David Wilson",
    isbn: "978-5432109876",
    category: "Web Development",
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80",
    description: "Master modern web development techniques and tools.",
    available: false
  }
];