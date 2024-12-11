import { jsPDF } from 'jspdf';
import { format } from 'date-fns';
import { Book, PaymentReceipt } from '../types';

export const generatePaymentReceipt = (book: Book, receipt: PaymentReceipt): void => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.text('LibraryHub - Payment Receipt', 20, 20);
  
  // Receipt Details
  doc.setFontSize(12);
  doc.text(`Receipt ID: ${receipt.id}`, 20, 40);
  doc.text(`Date: ${format(new Date(receipt.date), 'PPP')}`, 20, 50);
  doc.text(`Due Date: ${format(new Date(receipt.dueDate), 'PPP')}`, 20, 60);
  
  // Book Details
  doc.text('Book Details:', 20, 80);
  doc.text(`Title: ${book.title}`, 30, 90);
  doc.text(`Author: ${book.author}`, 30, 100);
  doc.text(`ISBN: ${book.isbn}`, 30, 110);
  
  // Payment Details
  doc.text('Payment Details:', 20, 130);
  doc.text(`Amount Paid: ₹${receipt.amount}`, 30, 140);
  doc.text(`Status: ${receipt.status}`, 30, 150);
  
  // Terms and Conditions
  doc.setFontSize(10);
  doc.text('Terms and Conditions:', 20, 180);
  doc.text('1. Please return the book by the due date to avoid late fees.', 20, 190);
  doc.text('2. Keep the book in good condition.', 20, 200);
  
  // Save the PDF
  doc.save(`receipt-${receipt.id}.pdf`);
};