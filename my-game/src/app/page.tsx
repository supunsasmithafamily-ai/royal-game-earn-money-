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
    <div 
      className="flex flex-col items-center justify-between min-h-screen p-4 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/game-bg.png')` }}
    >
      {/* ඉහළින් පෙනෙන රාජකීය Target සහ Moves පුවරුව */}
      <div className="flex justify-between items-center w-full max-w-sm bg-blue-900/80 backdrop-blur-md p-3 rounded-2xl border-2 border-amber-400 shadow-2xl mt-2">
        <div className="flex flex-col items-center bg-blue-950 px-3 py-1.5 rounded-xl border border-amber-400">
          <span className="text-[10px] text-amber-300 font-extrabold uppercase tracking-wider">Target</span>
          <span className="text-lg font-black text-amber-400">{target}</span>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-300 to-amber-500 rounded-xl flex items-center justify-center text-2xl shadow-lg mx-auto border-2 border-amber-200">
            👑
          </div>
        </div>

        <div className="flex flex-col items-center bg-blue-950 px-3 py-1.5 rounded-xl border border-amber-400">
          <span className="text-[10px] text-amber-300 font-extrabold uppercase tracking-wider">Moves</span>
          <span className="text-lg font-black text-amber-400">{moves}</span>
        </div>
      </div>

      {/* ප්‍රධාන ක්‍රීඩා ග්‍රිඩ් පුවරුව */}
      <div className="bg-amber-950/40 p-3 rounded-3xl border-4 border-amber-500/80 shadow-2xl backdrop-blur-sm my-auto">
        <div className="grid grid-cols-8 gap-1.5">
          {board.length > 0 ? (
            board.map((row, rowIndex) => 
              row.map((cell, colIndex) => (
                <button
                  key={`${rowIndex}-${colIndex}`}
                  className="w-9 h-9 md:w-11 md:h-11 bg-amber-800/90 hover:bg-amber-700 rounded-xl flex items-center justify-center text-xl transition-all transform active:scale-95 shadow-inner border border-amber-400/60"
                >
                  {cell}
                </button>
              ))
            )
          ) : (
            <div className="col-span-8 text-center py-10 text-amber-300 font-bold">Loading...</div>
          )}
        </div>
      </div>

      {/* පහළ මෙනු පාලක */}
      <div className="mb-4">
        <button className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-blue-950 font-black rounded-xl shadow-xl transition-all border border-amber-200 uppercase tracking-wider text-sm">
          Restart Game
        </button>
      </div>
    </div>
  );
}
