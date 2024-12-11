import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/Button';
import { Book } from '../types';
import { generatePaymentReceipt } from '../utils/generatePDF';

interface PaymentModalProps {
  book: Book;
  onClose: () => void;
  onSuccess: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ book, onClose, onSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const rentalPrice = 199; // ₹199 for 14 days

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      const receipt = {
        id: `RCP${Date.now()}`,
        bookId: book.id,
        userId: 1, // This would come from auth context in a real app
        amount: rentalPrice,
        date: new Date().toISOString(),
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'success' as const,
      };

      generatePaymentReceipt(book, receipt);
      setIsProcessing(false);
      onSuccess();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Rent Book</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="border-b pb-4">
            <h4 className="font-medium">{book.title}</h4>
            <p className="text-gray-600">by {book.author}</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Rental Period</span>
              <span>14 days</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total Amount</span>
              <span>₹{rentalPrice}</span>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">
              By proceeding with the payment, you agree to return the book within 14 days.
              Late returns will incur additional charges.
            </p>
          </div>

          <Button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full"
          >
            {isProcessing ? 'Processing...' : `Pay ₹${rentalPrice}`}
          </Button>
        </div>
      </div>
    </div>
  );
};