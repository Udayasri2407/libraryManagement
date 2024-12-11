export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  category: string;
  coverImage: string;
  description: string;
  available: boolean;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface BorrowedBook {
  id: number;
  bookId: number;
  userId: number;
  borrowDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'pending' | 'delivered' | 'returned';
  paymentId: string;
  amount: number;
}

export interface PaymentReceipt {
  id: string;
  bookId: number;
  userId: number;
  amount: number;
  date: string;
  dueDate: string;
  status: 'success' | 'failed';
}