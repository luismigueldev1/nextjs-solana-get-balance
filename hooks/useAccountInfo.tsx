import { ChangeEvent, useState } from "react";
import { getAccountInfo } from "@/services/solana";
import { FormElement } from "@nextui-org/react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export function useAccountInfo() {
  const [addressInput, setAddressInput] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [balance, setBalance] = useState<number>();
  const [isExecutable, setIsExecutable] = useState<boolean>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const handleChange = (event: ChangeEvent<FormElement>) => {
    setAddressInput(event.target.value);
  };

  const handleClick = async () => {
    //Reset State before make a request
    setBalance(undefined);
    setError(undefined);
    setIsLoading(true);
    try {
      const value = await getAccountInfo(addressInput!);
      console.log(value);
      if (!value) {
        setError("No data found.");
      } else {
        setBalance(value.lamports / LAMPORTS_PER_SOL);
        setIsExecutable(value.executable);
        setAddress(addressInput);
      }

      setIsLoading(false);
    } catch (error) {
      setError((error as Error).message);
      setIsLoading(false);
    }
  };

  return {
    address,
    addressInput,
    balance,
    isExecutable,
    isLoading,
    error,
    handleChange,
    handleClick,
  };
}
