import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Book, Clock, RotateCcw, FileText } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { OrderTrackingModal } from '../components/OrderTrackingModal';
import { BorrowedBook } from '../types';
import { format } from 'date-fns';

const mockBorrowedBooks: BorrowedBook[] = [
  {
    id: 1,
    bookId: 1,
    userId: 1,
    borrowDate: '2024-03-01',
    dueDate: '2024-03-15',
    status: 'delivered',
    paymentId: 'PAY123',
    amount: 199
  },
  {
    id: 2,
    bookId: 2,
    userId: 1,
    borrowDate: '2024-03-05',
    dueDate: '2024-03-19',
    status: 'pending',
    paymentId: 'PAY124',
    amount: 199
  },
];

export const Dashboard: React.FC = () => {
  const [selectedBook, setSelectedBook] = useState<BorrowedBook | null>(null);
  
  const { data: borrowedBooks = mockBorrowedBooks } = useQuery({
    queryKey: ['borrowed-books'],
    queryFn: () => Promise.resolve(mockBorrowedBooks),
  });

  const downloadReceipt = (book: BorrowedBook) => {
    // In a real app, this would fetch the receipt from the server
    console.log('Downloading receipt for book:', book.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
        <p className="mt-2 text-gray-600">Manage your borrowed books and account settings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Book className="h-8 w-8 text-indigo-600" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Total Borrowed</h3>
              <p className="text-2xl font-bold">{borrowedBooks.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Due Soon</h3>
              <p className="text-2xl font-bold">1</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <RotateCcw className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Returned</h3>
              <p className="text-2xl font-bold">5</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold">Currently Borrowed Books</h2>
        </div>
        <div className="divide-y">
          {borrowedBooks.map((borrowed) => (
            <div key={borrowed.id} className="p-6 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Book Title #{borrowed.bookId}</h3>
                <p className="text-sm text-gray-600">
                  Borrowed: {format(new Date(borrowed.borrowDate), 'PPP')}
                </p>
                <p className="text-sm text-gray-600">
                  Due: {format(new Date(borrowed.dueDate), 'PPP')}
                </p>
                <p className={`text-sm ${
                  borrowed.status === 'delivered' ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  Status: {borrowed.status.charAt(0).toUpperCase() + borrowed.status.slice(1)}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedBook(borrowed)}
                >
                  Track Order
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => downloadReceipt(borrowed)}
                  className="flex items-center"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Receipt
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedBook && (
        <OrderTrackingModal
          borrowedBook={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}
    </div>
  );
};