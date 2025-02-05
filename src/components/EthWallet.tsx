import { useState } from "react"
import { mnemonicToSeed } from "bip39"
import { Wallet, HDNodeWallet } from "ethers"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, Plus, Copy } from "lucide-react"
import { toast } from "sonner"

export const EthWallet = ({ mnemonic }: { mnemonic: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [addresses, setAddresses] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const createETHWallet = async () => {
    setIsLoading(true)
    try {
      const seed = await mnemonicToSeed(mnemonic)
      const derivationPath = `m/44'/60'/${currentIndex}'/0'`
      const hdNode = HDNodeWallet.fromSeed(seed)
      const child = hdNode.derivePath(derivationPath)
      const privateKey = child.privateKey
      const wallet = new Wallet(privateKey)
      setCurrentIndex(currentIndex + 1)
      setAddresses([...addresses, wallet.address])
      toast.success("New Ethereum wallet created successfully!")
    } catch (error) {
      console.error("Error creating wallet:", error)
      toast.error("Failed to create new wallet. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (address: string) => {
    navigator.clipboard.writeText(address)
    toast.success("Ethereum address copied to clipboard!")
  }

  return (
    <Card className="w-full max-w-md bg-gray-800 text-gray-100 border-gray-700">
      <CardHeader>
        <CardTitle className="text-gray-100">Ethereum Wallet</CardTitle>
        <CardDescription className="text-gray-400">Create and manage your Ethereum wallets</CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          onClick={createETHWallet}
          className="w-full mb-4 bg-blue-600 hover:bg-blue-700 text-white"
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
          Add Ethereum Wallet
        </Button>
        {addresses.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-400">Your Wallets</h3>
            {addresses.map((address, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-700 rounded-md">
                <p className="text-sm font-mono truncate text-gray-200">{address}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(address)}
                  className="text-gray-300 hover:text-white hover:bg-gray-600"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

