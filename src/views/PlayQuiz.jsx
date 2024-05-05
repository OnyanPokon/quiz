/* eslint-disable react/button-has-type */
import React from 'react';

function PlayQuiz() {
  return (
    <main className="bg-[#f2f2f2]">
      <section className="min-h-screen max-w-screen-lg mx-auto flex flex-col justify-center items-center px-4">
        <div className="p-6 bg-white rounded-xl flex flex-col gap-y-4 mt-4">
          <div className="w-full inline-flex justify-between items-center">
            <p className="font-semibold">Pertanyaan No. 1</p>
          </div>
          <p className="mt-4">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae
            neque dolores eum iusto non obcaecati. Iusto, excepturi ipsum. Vitae, quibusdam.
          </p>
          Pilih Jawaban
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6 inline-flex items-center gap-x-2 font-semibold">
              <button className="w-12 h-12 flex items-center rounded-lg justify-center border border-slate-600">
                A
              </button>
              Jawaban 1
            </div>
            <div className="col-span-6 inline-flex items-center gap-x-2 font-semibold">
              <button className="w-12 h-12 flex items-center rounded-lg justify-center border border-slate-600">
                B
              </button>
              Jawaban 1
            </div>
            <div className="col-span-6 inline-flex items-center gap-x-2 font-semibold">
              <button className="w-12 h-12 flex items-center rounded-lg justify-center border border-slate-600">
                C
              </button>
              Jawaban 1
            </div>

            <div className="col-span-6 inline-flex items-center gap-x-2 font-semibold">
              <button className="w-12 h-12 flex items-center rounded-lg justify-center border border-slate-600">
                D
              </button>
              Jawaban 1
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default PlayQuiz;
