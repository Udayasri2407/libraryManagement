import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Code, Beaker, Calculator } from 'lucide-react';

const categories = [
  {
    id: 1,
    title: "Computer Science",
    icon: Code,
    count: 150,
    slug: "computer-science"
  },
  {
    id: 2,
    title: "Literature",
    icon: BookOpen,
    count: 200,
    slug: "literature"
  },
  {
    id: 3,
    title: "Science",
    icon: Beaker,
    count: 180,
    slug: "science"
  },
  {
    id: 4,
    title: "Mathematics",
    icon: Calculator,
    count: 120,
    slug: "mathematics"
  }
];

export function BookCategories() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">Browse by Category</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <div
              key={category.id}
              onClick={() => navigate(`/categories/${category.slug}`)}
              className="bg-white/90 backdrop-blur-sm rounded-lg p-6 text-center cursor-pointer transform transition duration-300 hover:scale-105"
            >
              <Icon className="w-12 h-12 mx-auto mb-4 text-indigo-600" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{category.title}</h3>
              <p className="text-gray-600">{category.count} Books</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BookCategories;