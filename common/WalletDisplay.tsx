import { useAuth } from "@common/AuthProvider";
import Loader from "@common/utils/Loader";
import { useEffect, useState } from "react";

interface Nft {
  contract: object;
  tokenId: string;
  tokenType: string;
  title: string;
  description: string;
  media: object;
}

interface Data {
  ownedNfts: Nft[];
  length: number;
}

export default function WalletDisplay() {
  const { user } = useAuth();
  const [ownedNftsArray, setOwnedNftsArray] = useState<Data | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUserNfts();
  }, []);

  function truncateDescription(description: string, wordCount: number) {
    const words = description.split(" ");
    if (words.length > wordCount) {
      const truncatedWords = words.slice(0, wordCount);
      return `${truncatedWords.join(" ")} ...`;
    }
    return description;
  }

  async function fetchUserNfts() {
    setIsLoading(true);
    try {
      const data = { address: user?.scwAddress };
      const response = await fetch("/api/get-user-nfts/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const messageResponse = await response.json();
      console.log(messageResponse.data.ownedNfts);
      setOwnedNftsArray(messageResponse.data.ownedNfts);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching NFTs:", error);
    }
  }

  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center mt-[-350px]">
          <Loader />
        </div>
      ) : ownedNftsArray && ownedNftsArray.length >= 1 ? (
        <div className="flex flex-col items-cente">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-12 mb-6">
            {ownedNftsArray &&
              Array.isArray(ownedNftsArray) &&
              ownedNftsArray.map((nft, index) => (
                <div
                  key={index}
                  className="rounded-lg shadow-xl max-w-[250px] max-h-[600px] overflow-hidden"
                >
                  <figure>
                    <img
                      src={
                        nft.tokenUri.gateway
                          ? nft.tokenUri.gateway
                          : nft.tokenUri.raw
                      }
                      alt="user nft image"
                      className="w-full max-h-[300px]"
                    />
                  </figure>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{nft.title}</h2>
                    <p className="">
                      {truncateDescription(nft.description, 25)}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col items-center justify-center mx-8 mt-32 text-black">
            Your smart contract wallet does not own any NFTs yet! 🤯
            <div className="flex mt-4">
              Mint one by selecting the <b>&nbsp;Mint an NFT&nbsp;</b> tab. ⬆️
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
