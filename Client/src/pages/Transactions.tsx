import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, IndianRupee } from 'lucide-react';
import axios from 'axios';
import { format } from 'date-fns';

interface Transaction {
  _id: string;
  room: {
    title: string;
    location: {
      lat: number;
      lng: number;
    };
    images: string[];
    price: number;
  };
  amount: number;
  status: string;
  paymentDate: string;
  paymentId: string;
  orderId: string;
}

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await api.get('/transactions');
        setTransactions(response.data);
      } catch (error: any) {
        setError(error.response?.data?.message || 'Failed to fetch transactions');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          <p className="text-xl">Error loading transactions</p>
          <p className="mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Transactions</h1>
      
      {transactions.length === 0 ? (
        <div className="text-center text-gray-600">
          <p>No transactions found</p>
        </div>
      ) : (
        <div className="space-y-6">
          {transactions.map((transaction) => (
            <div
              key={transaction._id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex space-x-4">
                    <img
                      src={transaction.room.images[0]}
                      alt={transaction.room.title}
                      className="w-32 h-24 object-cover rounded-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/150?text=No+Image';
                      }}
                    />
                    <div>
                      <h3 className="text-xl font-semibold">{transaction.room.title}</h3>
                      <div className="flex items-center text-gray-600 mt-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>
                          {transaction.room.location.lat}, {transaction.room.location.lng}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600 mt-2">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>
                          {format(new Date(transaction.paymentDate), 'PPP')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end text-xl font-bold text-indigo-600">
                      <IndianRupee className="h-5 w-5" />
                      {transaction.amount}
                    </div>
                    <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                      transaction.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : transaction.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                    <div className="mt-2 text-sm text-gray-500">
                      <div>Order ID: {transaction.orderId}</div>
                      <div>Payment ID: {transaction.paymentId}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Transactions;
