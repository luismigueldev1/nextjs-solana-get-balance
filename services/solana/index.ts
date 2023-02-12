import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  AccountInfo,
} from "@solana/web3.js";

export async function getAccountBalance(address: string): Promise<number> {
  const publicKey = new PublicKey(address);
  const connection = new Connection(clusterApiUrl("devnet"));
  const balance = await connection.getBalance(publicKey);
  return balance / LAMPORTS_PER_SOL;
}

export async function getAccountInfo(
  address: string
): Promise<AccountInfo<Buffer> | null> {
  const publicKey = new PublicKey(address);
  const connection = new Connection(clusterApiUrl("devnet"));
  return connection.getAccountInfo(publicKey);
}
