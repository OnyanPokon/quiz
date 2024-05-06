import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();
  return (
    <>
      <header className="bg-color-primary-500 p-2 lg:p-4 fixed w-full px-4">
        <nav className="max-w-screen-xl mx-auto flex justify-between items-center">
          <div>
            <span className="text-lg font-bold text-white">OpenQuiz</span>
          </div>
          <div>
            <button
              type="button"
              onClick={() => navigate('/buat_kuis')}
              className="px-4 py-2 text-sm font-medium text-center inline-flex items-center bg-white border border-color-primary-500 text-color-primary-500 rounded-full hover:bg-transparent hover:border hover:border-white hover:text-white transition-colors"
            >
              Buat Kuis
            </button>
          </div>
        </nav>
      </header>
      <main>
        <section className="h-screen max-w-screen-xl flex mx-auto flex-col lg:flex-row px-8 lg:px-12 gap-y-6 items-center justify-center pt-10">
          <div className="w-full">
            <h1 className="text-3xl lg:text-5xl font-extrabold w-full">
              Tantang Dirimu!, Temukan Kekuatan Belajarmu di Dunia Quiz
            </h1>
            <p className="text-sm mt-4 ">
              Buat kuis anda sendiri dan ajak teman - teman anda bermain bersma.
              nikmati keseruan belajar dengan cara yang baru
            </p>
            <div className="mt-4 inline-flex gap-x-2">
              <button
                type="button"
                onClick={() => navigate('/buat_kuis')}
                className="px-5 py-2.5 md:px-6 md:py-3.5 rounded-full text-sm md:text-base font-medium text-white bg-color-primary-500 hover:bg-color-primary-600 focus:ring-4 focus:outline-none focus:ring-color-primary-300 text-center"
              >
                Buat Kuis Baru
              </button>
              <button
                type="button"
                onClick={() => navigate('/browse_kuis')}
                className="px-5 py-2.5 md:px-6 md:py-3.5 rounded-full text-sm md:text-base font-medium text-color-primary-500 bg-white border border-color-primary-500 hover:bg-color-primary-500 hover:text-white transition-colors duration-300 focus:ring-4 focus:outline-none focus:ring-color-primary-300 text-center"
              >
                Ikut Kuis
              </button>
            </div>
          </div>
          <div className="mt-4 w-full">
            <img src="/ilustration/1 SCENE.png" alt="" className="w-full" />
          </div>
        </section>
      </main>
    </>

  );
}

export default LandingPage;
