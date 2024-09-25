import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import backgroundImage from '../assets/chat-background.jpg'

const FirstPage = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] bg-gray-100" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Welcome to VibeTalks</h1>
        <div className="flex gap-6">
          <Link to="/register">
            <button className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Register
            </button>
          </Link>
          <Link to="/email">
            <button className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
              Login
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default FirstPage;
