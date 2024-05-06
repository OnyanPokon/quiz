/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { HiTrash } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

function ListQuiz() {
  const [quizzes, setQuizzes] = useState([]);

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

  const navigate = useNavigate();

  const handleDeleteQuiz = async (id) => {
    try {
      const db = await new Promise((resolve, reject) => {
        const request = window.indexedDB.open('quizDB', 1);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });

      const transaction = db.transaction(['quizzes'], 'readwrite');
      const objectStore = transaction.objectStore('quizzes');
      const deleteRequest = objectStore.delete(id);

      deleteRequest.onsuccess = function (event) {
        console.log('Quiz deleted successfully');
        // Remove the deleted quiz from state
        setQuizzes((prevQuizzes) => prevQuizzes.filter((quiz) => quiz.id_kuis !== id));
      };

      deleteRequest.onerror = function (event) {
        console.error('Error deleting quiz:', event.target.error);
      };
    } catch (error) {
      console.error('Error opening database:', error);
    }
  };

  return (
    <main className="bg-[#f2f2f2]">
      <section className="min-h-screen max-w-screen-lg flex flex-col justify-center items-center mx-auto px-4 py-24">
        <div className="col-span-12 flex justify-center items-center">
          <h1 className="font-extrabold text-4xl lg:text-6xl mb-12 text-color-primary-500">OpenQuiz</h1>
        </div>
        <div className="grid grid-cols-12 gap-4">
          {quizzes.map((quiz) => (
            <div key={quiz.id_kuis} className="p-6 min-w-80 bg-white rounded-xl col-span-12 lg:col-span-4  flex flex-col justify-between">
              <div className="flex flex-col gap-y-4 mb-4">
                <div className="flex justify-between items-center ">
                  <span className="px-4 py-2 rounded-full bg-slate-200 text-sm font-bold w-fit">Quiz</span>
                  <HiTrash className="cursor-pointer" onClick={() => handleDeleteQuiz(quiz.id_kuis)} />
                </div>
                <p className="text-lg font-semibold ">{quiz.topik_kuis}</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-semibold">
                  {quiz.pertanyaan.length}
                  {' '}
                  Pertanyaan

                </span>
                <span className="font-bold text-slate-500">
                  {quiz.id_kuis}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div>
          <button
            type="button"
            onClick={() => navigate('/browse_kuis')}
            className="w-full lg:w-fit mt-4 px-5 py-2.5 rounded-full text-sm md:text-base font-medium text-white  bg-color-primary-500 hover:bg-color-primary-600 focus:ring-4 focus:outline-none focus:ring-color-primary-300 text-center"
          >
            Main Kuis
          </button>
        </div>
      </section>
    </main>
  );
}

export default ListQuiz;
