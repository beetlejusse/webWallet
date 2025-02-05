import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl"
import { mnemonicToSeed } from "bip39";
import { useState } from "react";

export function SolWallet({ mnemonic }: { mnemonic: string }){

    const [currentIndex, setCurrentIndex] = useState(0);
    const [publicKeys, setPublicKeys] = useState<Keypair['publicKey'][]>([]);

    async function createwallet(){
        const seed = await mnemonicToSeed(mnemonic)
        const path = `m/44'/501'/${currentIndex}'/0'`;
        const derivedSeed = derivePath(path, seed.toString("hex")).key;
        const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
        const keypair = Keypair.fromSecretKey(secret);
        setCurrentIndex(currentIndex + 1);
        setPublicKeys([...publicKeys, keypair.publicKey]);
        console.log(secret)
        console.log("private key",keypair.secretKey)
    }

    return(
        <div className="flex flex-col items-center">
            <div className="text-3xl px-4 font-bold">SOL WALLET</div>
            <button onClick={createwallet} >Add Sol Wallet</button>
            {
                publicKeys.map((key, index) => (
                    <div key={index} className='flex flex-row items-center'>
                        <p>{key.toBase58()}</p>
                        <button onClick={() => navigator.clipboard.writeText(key.toBase58())}>Copy</button>
                    </div>
                ))
            }
        </div>
    )
}