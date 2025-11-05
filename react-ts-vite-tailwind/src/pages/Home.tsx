import React from 'react';
import Header from '../components/Header';

const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <main className="p-4">
        <h2 className="text-xl font-semibold mb-4">Home Page</h2>
        <p className="text-gray-700">This is the home page of our React + TypeScript + Tailwind application.</p>
      </main>
    </div>
  );
};

export default Home;
