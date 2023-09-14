import { NextRequest, NextResponse } from "next/server";

const { Alchemy, Network } = require("alchemy-sdk");

const settings = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_SEPOLIA,
};

const alchemy = new Alchemy(settings);

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { address } = body;
  const nfts = await alchemy.nft.getNftsForOwner(address);

  console.log(nfts);

  return NextResponse.json({
    data: nfts,
  });
}
