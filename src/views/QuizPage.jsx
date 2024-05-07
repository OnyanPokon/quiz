/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-plusplus */
import React, { useEffect, useState } from 'react';
import {
  HiCheck, HiPlus, HiTrash, HiX,
} from 'react-icons/hi';
import { Modal } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

function QuizPage() {
  function generateRandomId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let result = '';
    for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [quizData, setQuizData] = useState({
    id_kuis: '',
    topik_kuis: '',
    pertanyaan: [],
  });
  const [topik, setTopik] = useState('');
  const [question, setQuestion] = useState('');
  const [answerA, setAnswerA] = useState('');
  const [answerB, setAnswerB] = useState('');
  const [answerC, setAnswerC] = useState('');
  const [answerD, setAnswerD] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleAddQuestion = () => {
    const newQuestion = {
      id: quizData.pertanyaan.length + 1,
      pertanyaan: question,
      jawaban_a: answerA,
      jawaban_b: answerB,
      jawaban_c: answerC,
      jawaban_d: answerD,
      jawaban_benar: correctAnswer,
    };
    setQuizData((prevState) => ({
      ...prevState,
      pertanyaan: [...prevState.pertanyaan, newQuestion],
    }));
    setQuestion('');
    setAnswerA('');
    setAnswerB('');
    setAnswerC('');
    setAnswerD('');
    setCorrectAnswer('');
  };

  useEffect(() => {
    const randomId = generateRandomId();
    setQuizData((prevState) => ({
      ...prevState,
      id_kuis: randomId,
    }));
  }, []);

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = [...quizData.pertanyaan];
    updatedQuestions.splice(index, 1);
    setQuizData((prevState) => ({
      ...prevState,
      pertanyaan: updatedQuestions,
    }));
  };

  const handleSaveQuiz = async () => {
    if (topik.trim() === '') {
      console.error('Topik kuis tidak boleh kosong');
      return;
    }

    setIsSaving(true);

    const updatedQuizData = {
      ...quizData,
      topik_kuis: topik,
    };

    console.log('Mencoba menyimpan kuis:', updatedQuizData);
    try {
      const db = await new Promise((resolve, reject) => {
        const request = window.indexedDB.open('quizDB', 1);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);

        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains('quizzes')) { // Pastikan toko objek belum ada sebelum membuatnya
            db.createObjectStore('quizzes', { keyPath: 'id_kuis' });
          }
        };
      });

      const transaction = db.transaction(['quizzes'], 'readwrite');
      const objectStore = transaction.objectStore('quizzes');

      const addRequest = objectStore.add(updatedQuizData);

      addRequest.onsuccess = function (event) {
        console.log('Data kuis berhasil disimpan:', updatedQuizData);
        setIsSaving(false);
      };

      addRequest.onerror = function (event) {
        console.error('Error saat menambahkan data kuis:', event.target.error);
        setIsSaving(false);
      };
    } catch (error) {
      console.error('Error saat membuka database:', error);
      setIsSaving(false);
    }
  };

  return (
    <main className="bg-[#f2f2f2] relative">
      <section className="max-w-screen-lg mx-auto min-h-screen flex flex-col py-24 px-4 z-20">
        <h1 className="font-extrabold text-4xl lg:text-6xl col-span-12 text-center mb-12 text-color-primary-500">OpenQuiz</h1>
        <div className="p-6 bg-white rounded-xl grid grid-cols-12 gap-4 shadow-md border border-slate-200">
          <p className="col-span-12 font-bold text-lg">Detil Kuis</p>
          <div className="mb-5 col-span-12 lg:col-span-6">
            <label htmlFor="topik" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Topik Kuis</label>
            <input
              type="text"
              id="topik"
              onChange={(e) => setTopik(e.target.value)}
              placeholder="Topik Kuis"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-color-primary-500 focus:border-color-primary-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-color-primary-500 dark:focus:border-color-primary-500"
              required
            />
          </div>
          <div className="mb-5 col-span-12 lg:col-span-6">
            <label htmlFor="topik" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kode Unik</label>
            <input
              type="text"
              id="topik"
              placeholder=""
              value={quizData.id_kuis}
              disabled
              className="bg-gray-50 border border-gray-300 text-slate-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
        </div>
        <div className="w-full flex justify-between items-center mt-4 px-4">
          <p className="text-lg font-bold">
            {quizData.pertanyaan.length}
            {' '}
            Pertanyaan
          </p>
          <button
            type="button"
            onClick={() => setOpenModal(true)}
            className="px-5 py-2.5 text-sm font-medium  inline-flex  items-center  text-color-primary-500 bg-white border border-color-primary-500 hover:bg-color-primary-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-color-primary-300 rounded-full text-center"
          >
            <HiPlus className="me-2" />
            Tambah
          </button>
        </div>
        {quizData.pertanyaan.map((item, index) => (
          <div key={index} className="p-6 bg-white rounded-xl flex flex-col gap-y-4 mt-4 shadow-md border border-slate-200">
            <div className="w-full inline-flex justify-between items-center">
              <p className="font-semibold">
                Pertanyaan No.
                {index + 1}
              </p>
              <HiTrash className="cursor-pointer" onClick={() => handleDeleteQuestion(index)} />
            </div>
            <p className="mt-4">{item.pertanyaan}</p>
            Pilihan Jawaban
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6 inline-flex items-center gap-x-2 ">
                {item.jawaban_benar === 'A' ? (
                  <>
                    <HiCheck className="text-color-success-500" />
                    {item.jawaban_a}
                  </>
                ) : (
                  <>
                    <HiX className="text-color-danger-500" />
                    {item.jawaban_a}
                  </>
                )}
              </div>
              <div className="col-span-6 inline-flex items-center gap-x-2 ">
                {item.jawaban_benar === 'B' ? (
                  <>
                    <HiCheck className="text-color-success-500" />
                    {item.jawaban_b}
                  </>
                ) : (
                  <>
                    <HiX className="text-color-danger-500" />
                    {item.jawaban_b}
                  </>
                )}
              </div>
              <div className="col-span-6 inline-flex items-center gap-x-2 ">
                {item.jawaban_benar === 'C' ? (
                  <>
                    <HiCheck className="text-color-success-500" />
                    {item.jawaban_c}
                  </>
                ) : (
                  <>
                    <HiX className="text-color-danger-500" />
                    {item.jawaban_c}
                  </>
                )}
              </div>
              <div className="col-span-6 inline-flex items-center gap-x-2 ">
                {item.jawaban_benar === 'D' ? (
                  <>
                    <HiCheck className="text-color-success-500" />
                    {item.jawaban_d}
                  </>
                ) : (
                  <>
                    <HiX className="text-color-danger-500" />
                    {item.jawaban_d}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
        <Modal show={openModal} onClose={() => setOpenModal(false)} size="3xl">
          <Modal.Header>Buat Kuis</Modal.Header>
          <Modal.Body>
            <form action="" className="grid grid-cols-12 gap-4">
              <div className="mb-3 col-span-12">
                <label htmlFor="topik" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pertanyaan</label>
                <textarea
                  type="text"
                  id="topik"
                  rows={4}
                  placeholder="Pertanyaan..."
                  onChange={(e) => setQuestion(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-color-primary-500 focus:border-color-primary-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-color-primary-500 dark:focus:border-color-primary-500"
                  required
                />
              </div>
              <div className="mb-3 lg:col-span-6 col-span-12">
                <label htmlFor="topik" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jawaban A</label>
                <input
                  type="text"
                  id="topik"
                  placeholder="Pilihan Jawaban A"
                  onChange={(e) => setAnswerA(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-color-primary-500 focus:border-color-primary-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-color-primary-500 dark:focus:border-color-primary-500"
                  required
                />
              </div>
              <div className="mb-3 lg:col-span-6 col-span-12">
                <label htmlFor="topik" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jawaban B</label>
                <input
                  type="text"
                  id="topik"
                  placeholder="Pilihan Jawaban B"
                  onChange={(e) => setAnswerB(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-color-primary-500 focus:border-color-primary-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-color-primary-500 dark:focus:border-color-primary-500"
                  required
                />
              </div>
              <div className="mb-3 lg:col-span-6 col-span-12">
                <label htmlFor="topik" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jawaban C</label>
                <input
                  type="text"
                  id="topik"
                  placeholder="Pilihan Jawaban C"
                  onChange={(e) => setAnswerC(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-color-primary-500 focus:border-color-primary-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-color-primary-500 dark:focus:border-color-primary-500"
                  required
                />
              </div>
              <div className="mb-3 lg:col-span-6 col-span-12">
                <label htmlFor="topik" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jawaban D</label>
                <input
                  type="text"
                  id="topik"
                  placeholder="Pilihan Jawaban D"
                  onChange={(e) => setAnswerD(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-color-primary-500 focus:border-color-primary-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-color-primary-500 dark:focus:border-color-primary-500"
                  required
                />
              </div>
              <div className="mb-3 col-span-12">
                <label htmlFor="topik" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jawaban Benar</label>
                <select
                  type="text"
                  id="correctAnswer"
                  value={correctAnswer}
                  placeholder="Pilih Jawaban Yang Benar"
                  onChange={(e) => setCorrectAnswer(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-color-primary-500 focus:border-color-primary-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-color-primary-500 dark:focus:border-color-primary-500"
                  required
                >
                  <option value="">Pilih Jawaban Benar</option>
                  <option value="A">Jawaban A</option>
                  <option value="B">Jawaban B</option>
                  <option value="C">Jawaban C</option>
                  <option value="D">Jawaban D</option>
                </select>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              onClick={() => {
                handleAddQuestion();
                setOpenModal(false);
              }}
              className="px-5 py-2.5 rounded-full text-sm md:text-base font-medium text-white bg-color-primary-500 hover:bg-color-primary-600 focus:ring-4 focus:outline-none focus:ring-color-primary-300 text-center"
            >
              Buat Kuis
            </button>
          </Modal.Footer>
        </Modal>
        <div className="flex items-center gap-x-4 mt-8">
          <button
            type="button"
            onClick={() => {
              handleSaveQuiz();
              navigate('/list_kuis');
            }}
            disabled={quizData.pertanyaan.length === 0 || isSaving}
            className={`w-full  px-5 py-2.5 rounded-full text-sm md:text-base font-medium text-white ${quizData.pertanyaan.length !== 0 ? 'bg-color-primary-500 ' : 'bg-color-primary-300 '} bg-color-primary-500 hover:bg-color-primary-600 focus:ring-4 focus:outline-none focus:ring-color-primary-300 text-center`}
          >
            {isSaving ? 'Menyimpan...' : 'Simpan Kuis'}
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

export default QuizPage;
