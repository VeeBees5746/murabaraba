import React from "react";

const PlayerPanel: React.FC = () => (
  <div className="flex gap-8 items-center justify-center font-semibold text-xl">
    <div className="flex flex-col items-center">
      <span className="text-orange-500">Player 1</span>
    </div>
    <span className="text-2xl">VS</span>
    <div className="flex flex-col items-center">
      <span className="text-blue-600">Player 2</span>
    </div>
  </div>
);

export default PlayerPanel;
