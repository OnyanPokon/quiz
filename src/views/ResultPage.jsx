/* eslint-disable react/prop-types */
import React from 'react';
import { useNavigate } from 'react-router-dom';

function ResultPage({ correct, incorrect, total }) {
  const navigate = useNavigate();
  const accuracy = ((correct / total) * 100).toFixed(2);
  return (
    <main className="bg-[#f2f2f2]">
      <section className="max-w-screen-md h-screen mx-auto flex justify-center items-center flex-col gap-y-4 w-full">
        <div className="w-full p-6 bg-white rounded-xl border border-slate-200 shadow-md">
          <h1 className="text-lg font-semibold mb-4">
            {' '}
            Akurasi :
            {accuracy}
            %
          </h1>
          <div className="w-full bg-color-danger-500 rounded-full h-2.5">
            <div className="bg-color-info-500 h-2.5 rounded-full" style={{ width: `${accuracy}%` }} />
          </div>
        </div>
        <div className="w-full p-6 bg-white rounded-xl border border-slate-200 shadow-md grid grid-cols-12 gap-4">
          <div className="col-span-6 p-6 flex flex-col items-center justify-center bg-color-info-100 rounded-lg text-color-info-500 font-bold">
            <span className="text-2xl">{correct}</span>
            <p className="text-lg">Benar</p>
          </div>
          <div className="col-span-6 p-6 flex flex-col justify-center items-center bg-color-danger-100 rounded-lg text-color-danger-500 font-bold">
            <span className="text-2xl">{incorrect}</span>
            <p className="text-lg">Salah</p>
          </div>
          <div className="col-span-12 p-6 flex flex-col items-center justify-center bg-gray-300 rounded-lg text-gray-700 font-bold">
            <span className="text-2xl">{total}</span>
            <p className="text-lg">Total Soal</p>
          </div>
        </div>
        <div className="flex items-center w-full gap-x-4">
          <button
            type="button"
            onClick={() => navigate('/browse_kuis')}
            className="w-full px-5 py-2.5 rounded-full text-sm md:text-base font-medium text-white  bg-color-primary-500 hover:bg-color-primary-600 focus:ring-4 focus:outline-none focus:ring-color-primary-300 text-center"
          >
            Main Lagi
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-full px-5 py-2.5 rounded-full text-sm md:text-base font-medium text-white  bg-color-info-500 hover:bg-color-info-600 focus:ring-4 focus:outline-none focus:ring-color-info-300 text-center"
          >
            Kembali
          </button>
        </div>

      </section>
    </main>
  );
}

export default ResultPage;
