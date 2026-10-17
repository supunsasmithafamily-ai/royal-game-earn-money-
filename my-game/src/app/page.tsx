'use client';

import React, { useState, useEffect } from 'react';

const ITEMS = [
  { id: 'crown', name: '👑', bg: 'bg-yellow-400/95 border-yellow-200 text-yellow-950' },
  { id: 'shield', name: '🛡️', bg: 'bg-blue-500/95 border-blue-200 text-blue-950' },
  { id: 'leaf', name: '🍃', bg: 'bg-emerald-500/95 border-emerald-200 text-emerald-950' },
  { id: 'book', name: '📕', bg: 'bg-red-500/95 border-red-200 text-red-950' },
  { id: 'box', name: '📦', bg: 'bg-amber-700/95 border-amber-400 text-amber-100' }
];

export default function Match3Game() {
  const [board, setBoard] = useState<any[][]>([]);
  const [moves, setMoves] = useState(27);
  const [target, setTarget] = useState(25);

  useEffect(() => {
    const initialBoard = Array(8).fill(null).map((_, r) => 
      Array(8).fill(null).map((_, c) => {
        if (r >= 4 && c >= 2 && c <= 5) {
          return ITEMS[4]; // Box (ලී පෙට්ටිය)
        }
        return ITEMS[Math.floor(Math.random() * 4)];
      })
    );
    setBoard(initialBoard);
  }, []);

  return (
    <div 
      className="relative flex flex-col items-center justify-between min-h-screen py-1 px-4 bg-cover bg-center bg-no-repeat overflow-hidden select-none"
      style={{ backgroundImage: `url('/game-bg.png')` }}
    >
      {/* ඉහළින් පෙනෙන Target, King සහ Moves පුවරුව */}
      <div className="flex justify-between items-center w-full max-w-[260px] bg-blue-900/95 backdrop-blur-md p-1 rounded-xl border-2 border-amber-400 shadow-xl mt-1 z-10">
        <div className="flex flex-col items-center bg-blue-950 px-2 py-0.5 rounded-lg border border-amber-400">
          <span className="text-[7px] text-amber-300 font-extrabold uppercase">Target</span>
          <span className="text-xs font-black text-amber-400">{target}</span>
        </div>
        
        <div className="text-center">
          <div className="w-7 h-7 bg-gradient-to-br from-amber-300 to-amber-500 rounded-md flex items-center justify-center text-sm shadow-md mx-auto border border-amber-200">
            👑
          </div>
        </div>

        <div className="flex flex-col items-center bg-blue-950 px-2 py-0.5 rounded-lg border border-amber-400">
          <span className="text-[7px] text-amber-300 font-extrabold uppercase">Moves</span>
          <span className="text-xs font-black text-amber-400">{moves}</span>
        </div>
      </div>

      {/* පසුබිම් පින්තූරයේ රාමුවට හරියටම ගැළපෙන පරිදි සකස් කළ ග්‍රිඩ් පුවරුව */}
      <div className="mt-[75px] mb-auto z-10 p-1">
        <div className="grid grid-cols-8 gap-[2px] sm:gap-1 bg-transparent">
          {board.length > 0 ? (
            board.map((row, rowIndex) => 
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-md flex items-center justify-center text-base sm:text-lg shadow-md border-[1px] ${cell.bg} cursor-pointer active:scale-95 transition-transform`}
                >
                  <span className="drop-shadow">{cell.name}</span>
                </div>
              ))
            )
          ) : (
            <div className="col-span-8 text-center py-6 text-amber-300 font-bold text-xs">Loading...</div>
          )}
        </div>
      </div>

      {/* පහළ මෙනු පාලක බොත්තම */}
      <div className="mb-3 z-10">
        <button className="px-6 py-2 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-blue-950 font-black rounded-xl shadow-xl transition-all border border-amber-200 uppercase tracking-wider text-xs">
          Restart
        </button>
      </div>
    </div>
  );
}
