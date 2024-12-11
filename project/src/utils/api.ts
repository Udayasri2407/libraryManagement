import axios from 'axios';
import { Book, User, BorrowedBook } from '../types';
import { mockBooks } from './mockData';

const api = axios.create({
  baseURL: '/api',
});

export const getBooks = async (): Promise<Book[]> => {
  // For development, return mock data
  return Promise.resolve(mockBooks);
};

export const borrowBook = async (bookId: number, userId: number): Promise<BorrowedBook> => {
  const { data } = await api.post('/borrow', { bookId, userId });
  return data;
};

export const returnBook = async (borrowId: number): Promise<void> => {
  await api.post(`/return/${borrowId}`);
};