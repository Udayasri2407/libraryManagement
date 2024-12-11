import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Users, Clock } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Home: React.FC = () => {
  return (
    <div className="relative">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80")',
          filter: 'brightness(0.5)'
        }}
      />
      <div className="relative z-10 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-4">
              Welcome to LibraryHub
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Your gateway to knowledge and discovery
            </p>
            <Link to="/books">
              <Button size="lg" className="font-semibold">
                Browse Books
              </Button>
            </Link>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6">
              <Book className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Extensive Collection</h3>
              <p className="text-gray-600">
                Access thousands of books across various genres and topics
              </p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6">
              <Users className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Easy Management</h3>
              <p className="text-gray-600">
                Track your borrowed books and manage returns effortlessly
              </p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6">
              <Clock className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">24/7 Access</h3>
              <p className="text-gray-600">
                Browse and manage your library account anytime, anywhere
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};