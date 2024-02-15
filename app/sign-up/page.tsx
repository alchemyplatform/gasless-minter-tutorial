"use client";
import { useAuth } from "@common/AuthProvider";
import Loader from "@common/utils/Loader";
import simpleFactoryAbi from "@common/utils/SimpleAccountFactory.json";
import { publicClient } from "@common/utils/client";
import * as secp from "@noble/secp256k1";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import userbase from "userbase-js";
import "../globals.css";

export default function SignupForm() {
  const { user, login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user?.isLoggedIn) {
      router.push("/");
    }
  }, []);

  const handleSignup = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const privKey = secp.utils.randomPrivateKey();
      const privKeyHex = secp.etc.bytesToHex(privKey);

      const data = {
        pk: privKeyHex,
      };

      const response1 = await fetch("/api/get-signer/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response1.json();
      const ownerAddress = responseData.data; // access the signer object

      const userScwAddress: string = (await publicClient.readContract({
        address: "0x9406Cc6185a346906296840746125a0E44976454", // simple factory addr
        abi: simpleFactoryAbi,
        functionName: "getAddress",
        args: [ownerAddress, 0],
      })) as string;

      const response2 = await userbase.signUp({
        username,
        password,
        rememberMe: "local",
        profile: {
          scwAddress: userScwAddress,
          pk: privKeyHex,
        },
      });

      const userInfo = {
        username: username,
        isLoggedIn: true,
        userId: response2.userId,
        scwAddress: userScwAddress,
      };

      login(userInfo);
      router.push("/?signup=success");
    } catch (error: any) {
      setIsLoading(false);
      setError(error.message);
      console.error(error);
    }
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <div className="w-full max-w-sm">
            <form
              className="bg-white rounded px-8 pt-6 pb-8 mb-24 font-mono"
              onSubmit={handleSignup}
            >
              <label
                className="block text-center text-gray-700 font-bold mb-2 text-xl"
                htmlFor="username"
              >
                Sign Up 👋
              </label>
              <div className="divider"></div>
              <div className="mb-4 text-xl">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={(e) => setUsername(e.target.value)}
                  id="username"
                  type="text"
                  placeholder="Username"
                />
              </div>
              <div className="mb-6 text-xl">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-red-500 mb-4">{error}</p>}{" "}
              <div className="flex items-center justify-end">
                <button className="btn text-black">Sign Up</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
