import React, { useState } from 'react';
import { Book } from '../types';
import { Button } from './ui/Button';
import { PaymentModal } from './PaymentModal';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface BookCardProps {
  book: Book;
  onBorrow?: (bookId: number) => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onBorrow }) => {
  const [showPayment, setShowPayment] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleBorrowClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    if (onBorrow) {
      onBorrow(book.id);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900">{book.title}</h3>
          <p className="text-sm text-gray-600">by {book.author}</p>
          <p className="text-sm text-gray-500 mt-2">{book.description}</p>
          <div className="mt-4 flex justify-between items-center">
            <span className={`text-sm ${book.available ? 'text-green-600' : 'text-red-600'}`}>
              {book.available ? 'Available' : 'Borrowed'}
            </span>
            {book.available && (
              <Button
                variant="primary"
                size="sm"
                onClick={handleBorrowClick}
              >
                Rent Book
              </Button>
            )}
          </div>
        </div>
      </div>

      {showPayment && (
        <PaymentModal
          book={book}
          onClose={() => setShowPayment(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </>
  );
};