import { Navbar, Welcome, Footer, Services, Transactions } from "./components";
import "@rainbow-me/rainbowkit/styles.css";

import {
  apiProvider,
  configureChains,
  getDefaultWallets,
  RainbowKitProvider,
  midnightTheme,
} from "@rainbow-me/rainbowkit";
import { chain, createClient, WagmiProvider } from "wagmi";

const { chains, provider } = configureChains(
  [chain.ropsten, chain.mainnet, chain.optimism, chain.arbitrum],
  [
    apiProvider.infura("1117e415d3a548c08946fb713e5ed328"),
    apiProvider.fallback(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "BongCrypto",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const App = () => {
  return (
    <WagmiProvider client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={midnightTheme()}>
        <div className="min-h-screen bg-slate-300">
          <div className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
            <Navbar />
            <Welcome />
          </div>
          <Services />
          <Transactions />
          <Footer />
        </div>
      </RainbowKitProvider>
    </WagmiProvider>
  );
};

export default App;
