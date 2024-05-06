/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ResultPage from './ResultPage';

function PlayQuiz() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const db = await new Promise((resolve, reject) => {
          const request = window.indexedDB.open('quizDB', 1);

          request.onsuccess = () => resolve(request.result);
          request.onerror = () => reject(request.error);
        });

        const transaction = db.transaction(['quizzes'], 'readonly');
        const objectStore = transaction.objectStore('quizzes');
        const getRequest = objectStore.get(id); // Mengambil data berdasarkan ID kuis

        getRequest.onsuccess = function (event) {
          setQuiz(event.target.result);
        };

        getRequest.onerror = function (event) {
          console.error('Error fetching quiz:', event.target.error);
        };
      } catch (error) {
        console.error('Error opening database:', error);
      }
    }

    if (id) {
      fetchQuiz();
    }
  }, [id]);

  const handleAnswer = (answer) => {
    const currentQuestion = quiz.pertanyaan[currentQuestionIndex];
    const isCorrect = currentQuestion.jawaban_benar === answer;
    setAnswers([...answers, { question: currentQuestion, answer, isCorrect }]);
    if (isCorrect) {
      setCorrectCount(correctCount + 1);
    } else {
      setIncorrectCount(incorrectCount + 1);
    }
    // Move to next question
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  if (currentQuestionIndex >= quiz.pertanyaan.length) {
    // Render result screen
    return (
    // <div>
    //   <h2>Result</h2>
    //   <p>
    //     Correct Answers:
    //     {correctCount}
    //   </p>
    //   <p>
    //     Incorrect Answers:
    //     {incorrectCount}
    //   </p>
    //   {/* You can display more information or navigate to another screen */}
    // </div>
      <ResultPage
        correct={correctCount}
        incorrect={incorrectCount}
        total={quiz.pertanyaan.length}
      />
    );
  }
  const currentQuestion = quiz.pertanyaan[currentQuestionIndex];

  return (
    <main className="bg-[#f2f2f2]">
      <section className="min-h-screen max-w-screen-lg mx-auto flex flex-col justify-center items-center px-4 w-full">
        <div className="p-6 bg-white rounded-xl flex flex-col gap-y-4 mt-4 w-full">
          <div className="w-full inline-flex justify-between items-center">
            <p className="font-semibold">
              Pertanyaan No.
              {currentQuestionIndex + 1}
            </p>
          </div>
          <p className="mt-4">{currentQuestion.pertanyaan}</p>
          Pilih Jawaban
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6 inline-flex items-center gap-x-2 font-semibold">
              <button
                className="w-12 h-12 flex items-center rounded-lg justify-center border border-slate-600"
                onClick={() => handleAnswer('A')}
              >
                A
              </button>
              {currentQuestion.jawaban_a}
            </div>
            <div className="col-span-6 inline-flex items-center gap-x-2 font-semibold">
              <button
                className="w-12 h-12 flex items-center rounded-lg justify-center border border-slate-600"
                onClick={() => handleAnswer('B')}
              >
                B
              </button>
              {currentQuestion.jawaban_b}
            </div>
            <div className="col-span-6 inline-flex items-center gap-x-2 font-semibold">
              <button
                className="w-12 h-12 flex items-center rounded-lg justify-center border border-slate-600"
                onClick={() => handleAnswer('C')}
              >
                C
              </button>
              {currentQuestion.jawaban_c}
            </div>
            <div className="col-span-6 inline-flex items-center gap-x-2 font-semibold">
              <button
                className="w-12 h-12 flex items-center rounded-lg justify-center border border-slate-600"
                onClick={() => handleAnswer('D')}
              >
                D
              </button>
              {currentQuestion.jawaban_d}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default PlayQuiz;
