import { withAlchemyGasManager } from "@alchemy/aa-alchemy";
import {
  LocalAccountSigner,
  SimpleSmartContractAccount,
  SmartAccountProvider,
  type SimpleSmartAccountOwner,
} from "@alchemy/aa-core";
import { NextRequest, NextResponse } from "next/server";
import { sepolia } from "viem/chains";

const ALCHEMY_API_URL = `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;

const ENTRYPOINT_ADDRESS = process.env
  .SEPOLIA_ENTRYPOINT_ADDRESS as `0x${string}`;
const SIMPLE_ACCOUNT_FACTORY_ADDRESS = process.env
  .SEPOLIA_SIMPLE_ACCOUNT_FACTORY_ADDRESS as `0x${string}`;

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { pk } = body;

  const owner: SimpleSmartAccountOwner =
    LocalAccountSigner.privateKeyToAccountSigner(`0x${pk}`);

  const chain = sepolia;
  const provider = new SmartAccountProvider(
    ALCHEMY_API_URL,
    ENTRYPOINT_ADDRESS,
    chain,
    undefined,
    {
      txMaxRetries: 10,
      txRetryIntervalMs: 5000,
    }
  );

  let signer = provider.connect(
    (rpcClient) =>
      new SimpleSmartContractAccount({
        entryPointAddress: ENTRYPOINT_ADDRESS,
        chain,
        owner,
        factoryAddress: SIMPLE_ACCOUNT_FACTORY_ADDRESS,
        rpcClient,
      })
  );

  // [OPTIONAL] Use Alchemy Gas Manager
  signer = withAlchemyGasManager(signer, {
    policyId: process.env.SEPOLIA_PAYMASTER_POLICY_ID!,
    entryPoint: ENTRYPOINT_ADDRESS,
  });

  const ownerAccount = signer.account;
  const ownerAddress = (ownerAccount as any).owner.owner.address;

  return NextResponse.json({ data: ownerAddress });
}
