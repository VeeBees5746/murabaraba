import React from "react";
import MurabarabaBoard from "./MurabarabaBoard";
import PlayerPanel from "./PlayerPanel";
import Instructions from "./Instructions";

const App: React.FC = () => {
  const [showInstructions, setShowInstructions] = React.useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-orange-300 flex flex-col items-center justify-center font-sans">
      <header className="w-full text-center py-6 shadow-md bg-white">
        <h1 className="text-3xl font-bold text-orange-600 drop-shadow">Murabaraba</h1>
        <button
          className="mt-2 px-4 py-2 bg-orange-500 text-white rounded shadow hover:bg-orange-600 transition"
          onClick={() => setShowInstructions(true)}
        >
          How to Play
        </button>
      </header>
      <main className="flex flex-col items-center gap-8 mt-8">
        <PlayerPanel />
        <MurabarabaBoard />
      </main>
      {showInstructions && (
        <Instructions onClose={() => setShowInstructions(false)} />
      )}
    </div>
  );
};

export default App;
