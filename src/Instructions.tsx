import React from "react";

const Instructions: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-8 shadow-xl max-w-md">
      <h2 className="text-2xl font-bold text-orange-600 mb-4">How to Play Murabaraba</h2>
      <ul className="list-disc space-y-2 pl-6 text-gray-700 text-base">
        <li>Murabaraba is a two-player strategy board game.</li>
        <li>Players take turns placing their 12 pieces on the intersections of the board.</li>
        <li>After all pieces are placed, players move their pieces to adjacent empty spots.</li>
        <li>Forming a row of three (a 'mill') allows you to remove an opponent's piece.</li>
        <li>When a player has only three pieces left, they may 'fly' to any vacant spot.</li>
        <li>The game ends when a player is reduced to two pieces or cannot make a move.</li>
      </ul>
      <button
        className="mt-6 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  </div>
);

export default Instructions;
