import React from 'react';

function Navbar() {
  return (
    <header className="bg-color-primary-500 p-2 fixed w-full px-4">
      <nav className="max-w-screen-xl mx-auto flex justify-between items-center">
        <div>
          <span className="text-lg font-bold text-white">OpenQuiz</span>
        </div>
        <div>
          <button type="button" className="px-4 py-2 text-sm font-medium text-center inline-flex items-center bg-white border border-color-primary-500 text-color-primary-500 rounded-full hover:bg-transparent hover:border hover:border-white hover:text-white transition-colors">
            Buat Kuis
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
