import './App.css'
import { Button } from "./components/ui/button"
import {
  Download,
  Upload,
  CreditCard,
  ArrowRightLeft,
} from "lucide-react"
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "./components/ui/tabs"


function App() {

  function truncateAddress(address: string) {
    if (address.length < 12) {
      return address
    }
    return `${address.slice(0, 8)}...${address.slice(-8)}`
  }

  const address: string = "0xa0Fbd3aF697890530652023e1273b6064D1981eF"
  
  return (
    <>
      <div className="lg:container lg:mx-auto py-8 w-screen">
        <div className="flex flex-col gap-y-8 items-center justify-center">
          <div className="flex flex-col gap-y-4 items-center justify-center">
            <h1 className="text-xl">{truncateAddress(address)}</h1>
            <div className="flex flex-col gap-y-0.5 items-center justify-center">
              <p className="text-sm">Total portfolio value</p>
              <h2 className="text-lg">$146.10</h2>
            </div>
            <div className="flex flex-row gap-x-4">
              <div className="flex flex-col items-center gap-1">
                <Button>
                  <Upload />
                </Button>
                <p className="text-sm">Send</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Button>
                  <Download />
                </Button>
                <p className="text-sm">Receive</p>                
              </div>
              <div className="flex flex-col items-center gap-1">
                <Button>
                  <CreditCard />
                </Button>
                <p className="text-sm">Buy</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Button>
                  <ArrowRightLeft />
                </Button>
                <p className="text-sm">Swap</p>
              </div>
            </div>
          </div>
          <Tabs defaultValue="coins" className="w-5/6 max-w-xl">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="coins">Coins</TabsTrigger>
              <TabsTrigger value="nfts">NFTs</TabsTrigger>
            </TabsList>
            <TabsContent value="coins" className="flex flex-col gap-y-2">
              <div className="flex flex-row justify-between">
                <img src="./src/assets/coin-logo.png"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex flex-col gap-x-2">
                  <p className="text-sm">ETH</p>
                  <div className="flex flex-row gap-x-1">
                    <p className="text-sm">$1,820.26</p>
                    <p className="text-sm text-green-500">+2.3%</p>
                  </div>
                </div>
                <div className="ml-auto">
                  <p className="text-sm text-right">0.3106</p>
                  <p className="text-sm text-right">$565.40</p>
                </div>
              </div>
              <div className="flex flex-row justify-between">
                <img src="./src/assets/coin-logo.png"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex flex-col gap-x-2">
                  <p className="text-sm">ETH</p>
                  <div className="flex flex-row gap-x-1">
                    <p className="text-sm">$1,820.26</p>
                    <p className="text-sm text-green-500">+2.3%</p>
                  </div>
                </div>
                <div className="ml-auto">
                  <p className="text-sm text-right">0.3106</p>
                  <p className="text-sm text-right">$565.40</p>
                </div>
              </div>
              <div className="flex flex-row justify-between">
                <img src="./src/assets/coin-logo.png"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex flex-col gap-x-2">
                  <p className="text-sm">ETH</p>
                  <div className="flex flex-row gap-x-1">
                    <p className="text-sm">$1,820.26</p>
                    <p className="text-sm text-green-500">+2.3%</p>
                  </div>
                </div>
                <div className="ml-auto">
                  <p className="text-sm text-right">0.3106</p>
                  <p className="text-sm text-right">$565.40</p>
                </div>
              </div>
              <div className="flex flex-row justify-between">
                <img src="./src/assets/coin-logo.png"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex flex-col gap-x-2">
                  <p className="text-sm">ETH</p>
                  <div className="flex flex-row gap-x-1">
                    <p className="text-sm">$1,820.26</p>
                    <p className="text-sm text-green-500">+2.3%</p>
                  </div>
                </div>
                <div className="ml-auto">
                  <p className="text-sm text-right">0.3106</p>
                  <p className="text-sm text-right">$565.40</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="nfts" className="grid grid-cols-2 gap-4">
              <img src="./src/assets/coin-logo.png"
                className="w-lg h-lg rounded-lg border-solid border border-zinc-700"
              />
              <img src="./src/assets/coin-logo.png"
                className="w-lg h-lg rounded-lg border-solid border border-zinc-700"
              />
              <img src="./src/assets/coin-logo.png"
                className="w-lg h-lg rounded-lg border-solid border border-zinc-700"
              />
            </TabsContent>
          </Tabs>
        </div>

      </div>
    </>
  )
}

export default App
