'use client';

import React, { useState, useEffect } from 'react';

const ITEMS = [
  { id: 'crown', name: '👑', bg: 'bg-yellow-400/90 border-yellow-200 text-yellow-950' },
  { id: 'shield', name: '🛡️', bg: 'bg-blue-500/90 border-blue-200 text-blue-950' },
  { id: 'leaf', name: '🍃', bg: 'bg-emerald-500/90 border-emerald-200 text-emerald-950' },
  { id: 'book', name: '📕', bg: 'bg-red-500/90 border-red-200 text-red-950' },
  { id: 'box', name: '📦', bg: 'bg-amber-700/90 border-amber-400 text-amber-100' }
];

export default function Match3Game() {
  const [board, setBoard] = useState<any[][]>([]);
  const [moves, setMoves] = useState(27);
  const [target, setTarget] = useState(25);

  useEffect(() => {
    // 8x8 ග්‍රිඩ් එක සකස් කිරීම (පින්තූරයේ ඇති ආකාරයට පහළ කොටස්වලට ලී පෙට්ටි වැටෙන සේ)
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
      className="relative flex flex-col items-center justify-between min-h-screen py-2 px-4 bg-cover bg-center bg-no-repeat overflow-hidden select-none"
      style={{ backgroundImage: `url('/game-bg.png')` }}
    >
      {/* ඉහළින් පෙනෙන Target, King සහ Moves පුවරුව (පින්තූරයේ ඉහළ කොටසට සමානව) */}
      <div className="flex justify-between items-center w-full max-w-[280px] bg-blue-900/95 backdrop-blur-md p-1.5 rounded-xl border-2 border-amber-400 shadow-xl mt-1 z-10">
        <div className="flex flex-col items-center bg-blue-950 px-2.5 py-0.5 rounded-lg border border-amber-400">
          <span className="text-[8px] text-amber-300 font-extrabold uppercase">Target</span>
          <span className="text-sm font-black text-amber-400">{target}</span>
        </div>
        
        <div className="text-center">
          <div className="w-8 h-8 bg-gradient-to-br from-amber-300 to-amber-500 rounded-lg flex items-center justify-center text-lg shadow-md mx-auto border border-amber-200">
            👑
          </div>
        </div>

        <div className="flex flex-col items-center bg-blue-950 px-2.5 py-0.5 rounded-lg border border-amber-400">
          <span className="text-[8px] text-amber-300 font-extrabold uppercase">Moves</span>
          <span className="text-sm font-black text-amber-400">{moves}</span>
        </div>
      </div>

      {/* පින්තූරයේ ඇති ග්‍රිඩ් කොටු මතට කෙළින්ම වැටෙන පරිදි සකස් කළ ග්‍රිඩ් පුවරුව */}
      <div className="my-auto z-10 p-1">
        <div className="grid grid-cols-8 gap-[3px] sm:gap-1 bg-transparent">
          {board.length > 0 ? (
            board.map((row, rowIndex) => 
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`w-8 h-8 sm:w-11 sm:h-11 rounded-lg flex items-center justify-center text-base sm:text-xl shadow-md border-[1.5px] ${cell.bg} cursor-pointer active:scale-95 transition-transform`}
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
      <div className="mb-2 z-10">
        <button className="px-5 py-1.5 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-blue-950 font-black rounded-lg shadow-xl transition-all border border-amber-200 uppercase tracking-wider text-[11px]">
          Restart
        </button>
      </div>
    </div>
  );
}
