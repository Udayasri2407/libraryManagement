import React from 'react';
import { X, CheckCircle, Clock, Package, BookOpen } from 'lucide-react';
import { BorrowedBook } from '../types';
import { format } from 'date-fns';

interface OrderTrackingModalProps {
  borrowedBook: BorrowedBook;
  onClose: () => void;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  borrowedBook,
  onClose,
}) => {
  const steps = [
    { 
      title: 'Order Placed',
      icon: CheckCircle,
      completed: true,
      date: borrowedBook.borrowDate
    },
    { 
      title: 'Processing',
      icon: Clock,
      completed: borrowedBook.status !== 'pending',
      date: borrowedBook.status !== 'pending' ? 
        new Date(new Date(borrowedBook.borrowDate).getTime() + 1000 * 60 * 60).toISOString() : 
        undefined
    },
    { 
      title: 'Out for Delivery',
      icon: Package,
      completed: borrowedBook.status === 'delivered',
      date: borrowedBook.status === 'delivered' ? 
        new Date(new Date(borrowedBook.borrowDate).getTime() + 2000 * 60 * 60).toISOString() : 
        undefined
    },
    { 
      title: 'Delivered',
      icon: BookOpen,
      completed: borrowedBook.status === 'delivered',
      date: borrowedBook.status === 'delivered' ? 
        new Date(new Date(borrowedBook.borrowDate).getTime() + 3000 * 60 * 60).toISOString() : 
        undefined
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Order Tracking</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-8">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            return (
              <div key={step.title} className="relative">
                {index !== steps.length - 1 && (
                  <div
                    className={`absolute left-6 top-8 w-0.5 h-12 ${
                      step.completed ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  />
                )}
                <div className="flex items-center">
                  <div
                    className={`rounded-full p-2 ${
                      step.completed ? 'bg-green-500 text-white' : 'bg-gray-200'
                    }`}
                  >
                    <StepIcon className="w-4 h-4" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">{step.title}</p>
                    {step.date && (
                      <p className="text-sm text-gray-500">
                        {format(new Date(step.date), 'PPp')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};