'use client';

import React, { useState, useEffect } from 'react';

const ITEMS = ['👑', '🛡️', '🍃', '📖'];

export default function Match3Game() {
  const [board, setBoard] = useState<string[][]>([]);
  const [moves, setMoves] = useState(27);
  const [target, setTarget] = useState(36);

  useEffect(() => {
    const initialBoard = Array(8).fill(null).map(() => 
      Array(8).fill(null).map(() => ITEMS[Math.floor(Math.random() * ITEMS.length)])
    );
    setBoard(initialBoard);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-sky-400 via-blue-600 to-blue-900 text-white p-4">
      {/* ඉහළින් පෙනෙන රාජකීය Target සහ Moves පුවරුව */}
      <div className="flex justify-between items-center w-full max-w-md bg-gradient-to-r from-blue-900/90 to-indigo-900/90 p-4 rounded-2xl mb-4 border-2 border-amber-400 shadow-2xl">
        <div className="flex flex-col items-center bg-blue-950 px-4 py-2 rounded-xl border border-amber-400 shadow-inner">
          <span className="text-xs text-amber-300 font-extrabold uppercase tracking-wider">Target</span>
          <span className="text-xl font-black text-amber-400">{target}</span>
        </div>
        
        <div className="text-center">
          <div className="w-14 h-14 bg-gradient-to-br from-amber-300 to-amber-500 rounded-2xl flex items-center justify-center text-3xl shadow-lg mx-auto border-2 border-amber-200">
            👑
          </div>
        </div>

        <div className="flex flex-col items-center bg-blue-950 px-4 py-2 rounded-xl border border-amber-400 shadow-inner">
          <span className="text-xs text-amber-300 font-extrabold uppercase tracking-wider">Moves</span>
          <span className="text-xl font-black text-amber-400">{moves}</span>
        </div>
      </div>

      {/* ප්‍රධාන ක්‍රීඩා ග්‍රිඩ් පුවරුව (Royal Board Style) */}
      <div className="bg-gradient-to-b from-blue-950/80 to-blue-900/90 p-4 rounded-3xl border-4 border-amber-400 shadow-2xl backdrop-blur-md">
        <div className="grid grid-cols-8 gap-2">
          {board.length > 0 ? (
            board.map((row, rowIndex) => 
              row.map((cell, colIndex) => (
                <button
                  key={`${rowIndex}-${colIndex}`}
                  className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-b from-blue-800 to-blue-900 hover:from-blue-700 hover:to-blue-800 rounded-xl flex items-center justify-center text-2xl transition-all transform active:scale-95 shadow-md border-2 border-amber-500/50"
                >
                  {cell}
                </button>
              ))
            )
          ) : (
            <div className="col-span-8 text-center py-10 text-amber-300 font-bold">Loading Royal Game...</div>
          )}
        </div>
      </div>

      {/* පහළ මෙනු පාලක */}
      <div className="flex gap-4 mt-6">
        <button className="px-8 py-3 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-blue-950 font-black rounded-2xl shadow-xl transition-all border border-amber-200 uppercase tracking-wider">
          Restart Game
        </button>
      </div>
    </div>
  );
}
