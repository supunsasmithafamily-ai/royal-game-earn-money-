'use client';

import React, { useState } from 'react';

// අයිතම වර්ග (කිරුළ, පලිහ, කොළ ආදී වශයෙන්)
const ITEMS = ['👑', '🛡️', '🍃', '📖'];

export default function Match3Game() {
  // 8x8 ග්‍රිඩ් එකක් මුලින් සකස් කරගැනීම
  const [board, setBoard] = useState<string[][]>(() => {
    return Array(8).fill(null).map(() => 
      Array(8).fill(null).map(() => ITEMS[Math.floor(Math.random() * ITEMS.length)])
    );
  });

  const [moves, setMoves] = useState(27);
  const [target, setTarget] = useState(36);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-4">
      {/* ඉහළින් පෙනෙන Target සහ Moves පුවරුව */}
      <div className="flex justify-between items-center w-full max-w-md bg-slate-800 p-4 rounded-xl mb-4 border border-amber-500 shadow-lg">
        <div className="flex flex-col items-center bg-slate-700 px-4 py-2 rounded-lg border border-amber-400">
          <span className="text-xs text-amber-300 font-bold uppercase">Target</span>
          <span className="text-xl font-extrabold text-amber-400">{target}</span>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-2xl shadow-md mx-auto mb-1">
            👑
          </div>
        </div>

        <div className="flex flex-col items-center bg-slate-700 px-4 py-2 rounded-lg border border-amber-400">
          <span className="text-xs text-amber-300 font-bold uppercase">Moves</span>
          <span className="text-xl font-extrabold text-amber-400">{moves}</span>
        </div>
      </div>

      {/* ප්‍රධාන ක්‍රීඩා ග්‍රිඩ් පුවරුව (8x8 Grid) */}
      <div className="bg-amber-900/60 p-3 rounded-2xl border-4 border-amber-600 shadow-2xl backdrop-blur-sm">
        <div className="grid grid-cols-8 gap-1.5">
          {board.map((row, rowIndex) => 
            row.map((cell, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                className="w-10 h-10 md:w-12 md:h-12 bg-amber-800/80 hover:bg-amber-700 rounded-lg flex items-center justify-center text-2xl transition-all transform active:scale-95 shadow-inner border border-amber-500/40"
              >
                {cell}
              </button>
            ))
          )}
        </div>
      </div>

      {/* පහළ මෙනු පාලක */}
      <div className="flex gap-4 mt-6">
        <button className="px-6 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl shadow-lg transition-all">
          Restart
        </button>
      </div>
    </div>
  );
}
