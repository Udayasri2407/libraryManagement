import React, { useState } from 'react';
import { Book, FileText, Download, X } from 'lucide-react';

const resources = {
  books: [
    {
      id: 1,
      title: "Advanced Mathematics",
      type: "Textbook",
      format: "PDF",
      size: "15MB",
      image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=300&q=80",
      url: "/books/advanced-mathematics.pdf",
      preview: "https://docs.google.com/viewer?embedded=true&url=example.com/advanced-mathematics.pdf"
    },
    {
      id: 2,
      title: "Computer Science Fundamentals",
      type: "Reference",
      format: "PDF",
      size: "12MB",
      image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=300&q=80",
      url: "/books/cs-fundamentals.pdf",
      preview: "https://docs.google.com/viewer?embedded=true&url=example.com/cs-fundamentals.pdf"
    }
  ],
  articles: [
    {
      id: 1,
      title: "Modern Programming Paradigms",
      author: "Dr. Jane Smith",
      date: "2024-03-15",
      readTime: "10 min",
      url: "/articles/programming-paradigms.pdf",
      preview: "https://docs.google.com/viewer?embedded=true&url=example.com/programming-paradigms.pdf"
    },
    {
      id: 2,
      title: "The Future of Quantum Computing",
      author: "Prof. John Doe",
      date: "2024-03-10",
      readTime: "15 min",
      url: "/articles/quantum-computing.pdf",
      preview: "https://docs.google.com/viewer?embedded=true&url=example.com/quantum-computing.pdf"
    }
  ]
};

export default function Resources() {
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleDownload = (url: string) => {
    // In a real application, this would trigger the actual download
    console.log('Downloading:', url);
  };

  const ViewerModal = ({ item, onClose }: { item: any; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-xl font-semibold">{item.title}</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-1 p-4">
          <iframe
            src={item.preview}
            className="w-full h-full border-0"
            title={item.title}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-12">Learning Resources</h1>
      
      {/* E-Books Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 flex items-center">
          <Book className="mr-2" />
          E-Books
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.books.map((book) => (
            <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src={book.image} 
                alt={book.title} 
                className="w-full h-48 object-cover cursor-pointer"
                onClick={() => setSelectedItem(book)}
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{book.title}</h3>
                <div className="flex justify-between text-sm text-gray-600 mb-4">
                  <span>{book.type}</span>
                  <span>{book.format} • {book.size}</span>
                </div>
                <button 
                  onClick={() => handleDownload(book.url)}
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 flex items-center justify-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Articles Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 flex items-center">
          <FileText className="mr-2" />
          Academic Articles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources.articles.map((article) => (
            <div key={article.id} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-lg mb-2 cursor-pointer hover:text-indigo-600"
                  onClick={() => setSelectedItem(article)}>
                {article.title}
              </h3>
              <div className="text-sm text-gray-600 mb-4">
                <p>By {article.author}</p>
                <p>Published on {new Date(article.date).toLocaleDateString()}</p>
                <p>{article.readTime} read</p>
              </div>
              <button 
                onClick={() => handleDownload(article.url)}
                className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 flex items-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Article
              </button>
            </div>
          ))}
        </div>
      </section>

      {selectedItem && (
        <ViewerModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}