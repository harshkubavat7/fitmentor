import React from 'react';
import { DollarSign, TrendingUp, PieChart, CreditCard } from 'lucide-react';

const Finance = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Financial Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Total Earnings</h2>
            <DollarSign className="text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-800">$245,000</p>
          <p className="text-sm text-gray-500 mt-1">This Season</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Sponsorships</h2>
            <TrendingUp className="text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-800">$85,000</p>
          <p className="text-sm text-gray-500 mt-1">Active Deals</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Expenses</h2>
            <CreditCard className="text-red-600" />
          </div>
          <p className="text-3xl font-bold text-gray-800">$32,450</p>
          <p className="text-sm text-gray-500 mt-1">This Month</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Net Savings</h2>
            <PieChart className="text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-gray-800">$127,550</p>
          <p className="text-sm text-gray-500 mt-1">Total</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
          <div className="space-y-4">
            {[
              { desc: 'Training Equipment', amount: -1200, date: 'Mar 15, 2024', type: 'expense' },
              { desc: 'Nike Sponsorship', amount: 15000, date: 'Mar 12, 2024', type: 'income' },
              { desc: 'Physical Therapy', amount: -350, date: 'Mar 10, 2024', type: 'expense' },
              { desc: 'Tournament Winnings', amount: 5000, date: 'Mar 5, 2024', type: 'income' },
            ].map((transaction) => (
              <div key={transaction.desc} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{transaction.desc}</p>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
                <span className={`font-medium ${
                  transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Active Sponsorships</h2>
          <div className="space-y-4">
            {[
              { brand: 'Nike', type: 'Apparel', value: '$50,000', expires: 'Dec 2024' },
              { brand: 'Gatorade', type: 'Beverage', value: '$25,000', expires: 'Aug 2024' },
              { brand: 'Under Armour', type: 'Equipment', value: '$10,000', expires: 'Oct 2024' },
            ].map((sponsor) => (
              <div key={sponsor.brand} className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800">{sponsor.brand}</h3>
                    <p className="text-sm text-gray-500">{sponsor.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">{sponsor.value}</p>
                    <p className="text-xs text-gray-500">Expires: {sponsor.expires}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finance;