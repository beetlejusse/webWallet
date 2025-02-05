import { useState } from 'react'
import { generateMnemonic } from 'bip39';
import { SolWallet } from './components/SolWallet';
import { EthWallet } from './components/EthWallet';

function App() {
  const [mnemonic, setMnemonic] = useState("");

  async function createSeedPhrase(){
    const newMnemonic = await generateMnemonic();
    setMnemonic(newMnemonic);
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(mnemonic);
    alert("Seed phrase copied!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-black text-white">
      
      <h1 className="text-4xl font-bold mb-6 text-center">Crypto Wallet Generator</h1>
      
      <button 
        className="px-6 py-3 mb-6 text-lg bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-lg shadow-lg"
        onClick={createSeedPhrase}
      >
        Generate Seed Phrase
      </button>

      {mnemonic && (
        <div className="relative w-96 p-6 text-lg bg-white/10 backdrop-blur-md rounded-xl border border-gray-700 text-center">
          <p className="break-words">{mnemonic}</p>
          <button 
            className="absolute bottom-2 right-2 px-3 py-1 bg-gray-800 hover:bg-gray-700 text-sm rounded-md"
            onClick={copyToClipboard}
          >
            Copy
          </button>
        </div>
      )}

      <div className="flex gap-6 mt-8">
        <SolWallet mnemonic={mnemonic} />
        <EthWallet mnemonic={mnemonic} />
      </div>
      
    </div>
  )
}

export default App;
