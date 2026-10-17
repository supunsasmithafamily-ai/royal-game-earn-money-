'use client';

import React, { useState, useEffect } from 'react';

// රාජකීය ක්‍රීඩාවේ ඇති නිශ්චිත අයිතම සහ ඒවායේ වර්ණ/හැඩතල
const ITEMS = [
  { id: 'crown', name: '👑', bg: 'bg-gradient-to-br from-yellow-300 to-amber-500 border-yellow-200 shadow-yellow-500/50' },
  { id: 'shield', name: '🛡️', bg: 'bg-gradient-to-br from-blue-400 to-blue-600 border-blue-300 shadow-blue-500/50' },
  { id: 'leaf', name: '🍃', bg: 'bg-gradient-to-br from-green-400 to-emerald-600 border-green-300 shadow-green-500/50' },
  { id: 'book', name: '📕', bg: 'bg-gradient-to-br from-red-500 to-rose-700 border-red-300 shadow-red-500/50' },
  { id: 'box', name: '📦', bg: 'bg-gradient-to-br from-amber-600 to-yellow-800 border-amber-500 shadow-amber-900/50' }
];

export default function Match3Game() {
  const [board, setBoard] = useState<any[][]>([]);
  const [moves, setMoves] = useState(27);
  const [target, setTarget] = useState(25);

  useEffect(() => {
    // 8x8 ග්‍රිඩ් එක සඳහා අහඹු ලෙස අයිතම පිරවීම
    const initialBoard = Array(8).fill(null).map((_, r) => 
      Array(8).fill(null).map((_, c) => {
        // පහළ කොටස්වලට ලී පෙට්ටි (box) වැටෙන සේ පින්තූරයේ හැඩයට සමාන කිරීම
        if (r >= 5 && c >= 2 && c <= 5) {
          return ITEMS[4]; // Box
        }
        return ITEMS[Math.floor(Math.random() * 4)];
      })
    );
    setBoard(initialBoard);
  }, []);

  return (
    <div 
      className="flex flex-col items-center justify-between min-h-screen py-2 px-4 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url('/game-bg.png')` }}
    >
      {/* ඉහළින් පෙනෙන රාජකීය Target, King සහ Moves පුවරුව */}
      <div className="flex justify-between items-center w-full max-w-xs bg-blue-900/90 backdrop-blur-md p-2 rounded-xl border-2 border-amber-400 shadow-2xl">
        <div className="flex flex-col items-center bg-blue-950 px-3 py-1 rounded-lg border border-amber-400">
          <span className="text-[9px] text-amber-300 font-extrabold uppercase">Target</span>
          <span className="text-base font-black text-amber-400">{target}</span>
        </div>
        
        <div className="text-center">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-300 to-amber-500 rounded-lg flex items-center justify-center text-xl shadow-md mx-auto border border-amber-200">
            👑
          </div>
        </div>

        <div className="flex flex-col items-center bg-blue-950 px-3 py-1 rounded-lg border border-amber-400">
          <span className="text-[9px] text-amber-300 font-extrabold uppercase">Moves</span>
          <span className="text-base font-black text-amber-400">{moves}</span>
        </div>
      </div>

      {/* ප්‍රධාන ක්‍රීඩා ග්‍රිඩ් පුවරුව */}
      <div className="bg-amber-950/70 p-2.5 rounded-2xl border-4 border-amber-500 shadow-2xl backdrop-blur-sm my-auto">
        <div className="grid grid-cols-8 gap-1">
          {board.length > 0 ? (
            board.map((row, rowIndex) => 
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-lg transition-all transform active:scale-95 shadow-lg border-2 ${cell.bg} cursor-pointer hover:brightness-110`}
                >
                  <span className="drop-shadow-md">{cell.name}</span>
                </div>
              ))
            )
          ) : (
            <div className="col-span-8 text-center py-6 text-amber-300 font-bold text-sm">Loading Game...</div>
          )}
        </div>
      </div>

      {/* පහළ මෙනු පාලක බොත්තම් */}
      <div className="flex gap-2 mb-2">
        <button className="px-5 py-2 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-blue-950 font-black rounded-xl shadow-xl transition-all border border-amber-200 uppercase tracking-wider text-xs">
          Restart
        </button>
      </div>
    </div>
  );
}
