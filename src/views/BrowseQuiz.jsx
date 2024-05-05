import React from 'react';

function BrowseQuiz() {
  return (
    <main className="bg-[#f2f2f2]">
      <section className="min-h-screen max-w-screen-lg mx-auto flex flex-col justify-center items-center px-4">
        <div className="w-full flex flex-col items-center justify-center gap-y-12">
          <h1 className="font-extrabold text-4xl lg:text-6xl">OpenQuiz</h1>
          <form className="max-w-md w-full mx-auto">
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative ">
              <input
                type="search"
                id="default-search"
                className="block w-full p-6 rounded-full text-lg text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Masukan Kode Kuis"
                required
              />
              <button type="submit" className="text-white absolute end-2.5 bottom-3 bg-color-primary-500 hover:bg-color-primary-600 focus:ring-4 focus:outline-none focus:ring-color-primary-300 font-medium text-sm px-6 py-4 rounded-full ">Masuk</button>
            </div>
          </form>
        </div>
        <div className="grid grid-cols-12 gap-4 mt-12">
          <div className="p-6 bg-white rounded-xl col-span-12 lg:col-span-4  flex flex-col justify-between">
            <div className="flex flex-col gap-y-4 mb-4">
              <span className="px-4 py-2 rounded-full bg-slate-200 text-sm font-bold w-fit">Quiz</span>
              <p className="text-lg font-semibold ">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, quia?</p>
            </div>
            <span className="text-slate-500 font-semibold">7 Pertanyaan</span>
          </div>
          <div className="p-6 bg-white rounded-xl col-span-12 lg:col-span-4  flex flex-col justify-between">
            <div className="flex flex-col gap-y-4 mb-4">
              <span className="px-4 py-2 rounded-full bg-slate-200 text-sm font-bold w-fit">Quiz</span>
              <p className="text-lg font-semibold ">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, quia?</p>
            </div>
            <span className="text-slate-500 font-semibold">7 Pertanyaan</span>
          </div>
          <div className="p-6 bg-white rounded-xl col-span-12 lg:col-span-4  flex flex-col justify-between">
            <div className="flex flex-col gap-y-4 mb-4">
              <span className="px-4 py-2 rounded-full bg-slate-200 text-sm font-bold w-fit">Quiz</span>
              <p className="text-lg font-semibold ">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, quia?</p>
            </div>
            <span className="text-slate-500 font-semibold">7 Pertanyaan</span>
          </div>

        </div>
      </section>
    </main>
  );
}

export default BrowseQuiz;
