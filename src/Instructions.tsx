import React from 'react';

interface InstructionsProps {
  onClose: () => void;
}

const Instructions: React.FC<InstructionsProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-amber-800 mb-4">How to Play Murabaraba</h2>
        
        <div className="space-y-4 text-gray-700">
          <div>
            <h3 className="font-bold text-lg mb-2">Objective</h3>
            <p>Reduce your opponent to 2 pieces or block all their moves to win.</p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-2">Game Phases</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li><strong>Placing Phase:</strong> Take turns placing your 12 pieces on any empty intersection.</li>
              <li><strong>Moving Phase:</strong> Move your pieces to adjacent empty intersections.</li>
              <li><strong>Flying Phase:</strong> When you have only 3 pieces left, you can move to any empty intersection.</li>
            </ol>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-2">Mills</h3>
            <p>Form a line of 3 pieces (horizontally or vertically) to create a "mill". When you form a mill, you can remove one of your opponent's pieces that is not part of a mill.</p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-2">Players</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span>Blue Player</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span>Red Player</span>
              </div>
            </div>
          </div>
        </div>
        
        <button
          onClick={onClose}
          className="mt-6 px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
        >
          Start Playing
        </button>
      </div>
    </div>
  );
};

export default Instructions;