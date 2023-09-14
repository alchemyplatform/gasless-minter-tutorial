"use client";
import { AuthProvider } from "@common/AuthProvider";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { WagmiConfig, createConfig, sepolia } from "wagmi";

const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    alchemyId: process.env.ALCHEMY_API_KEY,
    walletConnectProjectId: process.env.CONNECT_KIT_PROJECT_ID!,
    chains: [sepolia],

    // Required
    appName: "My Gasless NFT Minter",
  })
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <WagmiConfig config={config}>
          <ConnectKitProvider mode="dark">
            <body>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  minHeight: "105vh",
                }}
              >
                <div style={{ flexGrow: 1 }}>{children}</div>
              </div>
            </body>
          </ConnectKitProvider>
        </WagmiConfig>
      </AuthProvider>
    </html>
  );
}
