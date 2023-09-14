"use client";
import GaslessMinter from "@common/GaslessMinter";
import WalletDisplay from "@common/WalletDisplay";
import "./globals.css";

import { useAuth } from "@common/AuthProvider";
import { useRouter } from "next/navigation";
import { AvatarGenerator } from "random-avatar-generator";
import { useState } from "react";
import userbase from "userbase-js";

export default function Home() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [walletViewActive, setWalletViewActive] = useState(true);
  const generator = new AvatarGenerator();

  function handleLogout() {
    try {
      userbase
        .signOut()
        .then(() => {
          // user logged out
          console.log("User logged out!");
          logout();
          router.push("/");
        })
        .catch((e: any) => console.error(e));
    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <div>
      {user?.isLoggedIn ? (
        <div className="font-mono text-2xl mt-8">
          <div className="flex items-center justify-center">
            <div className="avatar">
              <div className="rounded-full ml-12">
                <img src={generator.generateRandomAvatar(user?.userId)} />
              </div>
            </div>
            <div className="flex flex-col ml-6 gap-2">
              <div className="text-black">
                <b>User:</b> {user?.username}
              </div>
              <div className="text-black">
                <b>SCW :</b>{" "}
                <a
                  className="link link-secondary"
                  href={`https://sepolia.etherscan.io/address/${user?.scwAddress}`}
                  target="_blank"
                >
                  {user?.scwAddress}
                </a>
              </div>
              <div className="text-black">
                {user?.isLoggedIn ? (
                  <div className="btn btn-outline" onClick={handleLogout}>
                    <a>Log out</a>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="tabs items-center flex justify-center mb-[-25px]">
            <a
              className={`tab tab-lg tab-lifted text-2xl ${
                walletViewActive ? "tab-active text-white" : ""
              }`}
              onClick={() => setWalletViewActive(!walletViewActive)}
            >
              Your Wallet
            </a>
            <a
              className={`tab tab-lg tab-lifted text-2xl ${
                walletViewActive ? "" : "tab-active text-white"
              }`}
              onClick={() => setWalletViewActive(!walletViewActive)}
            >
              Mint an NFT
            </a>
          </div>
          <div className="divider mx-16 mb-8"></div>
          {walletViewActive ? <WalletDisplay /> : <GaslessMinter />}
        </div>
      ) : (
        <div>
          <div className="text-black flex flex-col items-center justify-center mt-36 mx-8 text-4xl font-mono">
            Please log in to continue! 👀
            <button
              onClick={() => router.push("/login")}
              className="btn mt-6 text-white"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
