import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BrowseQuiz() {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate(); // Initialize useHistory
  const [search, setSearch] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function fetchQuizzes() {
      try {
        const db = await new Promise((resolve, reject) => {
          const request = window.indexedDB.open('quizDB', 1);

          request.onsuccess = () => resolve(request.result);
          request.onerror = () => reject(request.error);
        });

        const transaction = db.transaction(['quizzes'], 'readonly');
        const objectStore = transaction.objectStore('quizzes');
        const getAllRequest = objectStore.getAll();

        getAllRequest.onsuccess = function (event) {
          setQuizzes(event.target.result);
        };

        getAllRequest.onerror = function (event) {
          console.error('Error fetching quizzes:', event.target.error);
        };
      } catch (error) {
        console.error('Error opening database:', error);
      }
    }

    fetchQuizzes();
  }, []);

  const handlePlayQuiz = (id) => {
    navigate(`/play_kuis/${id}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const quiz = quizzes.find((q) => q.id_kuis === search);
    if (quiz) {
      handlePlayQuiz(quiz.id_kuis);
    } else {
      setErrorMessage(`Quiz tidak ditemukan dengan ID: ${search}`);
    }
  };

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
      <main className="bg-[#f2f2f2]">
        <section className="min-h-screen max-w-screen-lg mx-auto flex flex-col justify-center items-center px-4 py-24">
          <div className="w-full flex flex-col items-center justify-center gap-y-6">
            <h1 className="font-extrabold text-4xl lg:text-5xl text-color-primary-500">OpenQuiz</h1>
            <form className="max-w-md w-full mx-auto" onSubmit={handleSubmit}>
              <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
              <div className="relative ">
                <input
                  type="search"
                  id="default-search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="block w-full p-6 rounded-full text-lg text-gray-900 border border-gray-300 bg-gray-50 focus:ring-color-primary-500 focus:border-color-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-color-primary-500 dark:focus:border-color-primary-500"
                  placeholder="Masukan Kode Kuis"
                  required
                />
                <button type="submit" className="text-white absolute end-2.5 bottom-3 bg-color-primary-500 hover:bg-color-primary-600 focus:ring-4 focus:outline-none focus:ring-color-primary-300 font-medium text-sm px-6 py-4 rounded-full ">Masuk</button>
              </div>
            </form>
            {errorMessage && (
            <p className="text-red-500">{errorMessage}</p>
            )}
          </div>
          <div className="grid grid-cols-12 gap-4 mt-12">
            {quizzes.map((quiz) => (
              <div key={quiz.id_kuis} className="min-w-80 p-6 bg-white rounded-xl col-span-12 lg:col-span-4  flex flex-col justify-between">
                <div className="flex flex-col gap-y-4 mb-4">
                  <span className="px-4 py-2 rounded-full bg-slate-200 text-sm font-bold w-fit">Quiz</span>
                  <p className="text-lg font-semibold ">{quiz.topik_kuis}</p>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handlePlayQuiz(quiz.id_kuis)}
                    className="w-fit px-5 py-2.5 rounded-full text-sm md:text-base font-medium text-white bg-color-primary-500 hover:bg-color-primary-600 focus:ring-4 focus:outline-none focus:ring-color-primary-300 text-center"
                  >
                    Main
                  </button>
                  <span className="text-slate-500 font-semibold">
                    {quiz.pertanyaan.length}
                    {' '}
                    Pertanyaan
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

export default BrowseQuiz;
