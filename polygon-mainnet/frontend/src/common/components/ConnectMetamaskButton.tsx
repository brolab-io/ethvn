"use client";
import { Popover } from "@headlessui/react";
import { useAccount, useConnectModal, useDisconnect, useNetwork } from "@web3modal/react";
import Link from "next/link";
import { useCallback } from "react";
import web3Config from "../configs/web3Config";
import Button from "./Button";

const ConnectMetamaskButton = () => {
  const { open } = useConnectModal();
  const { isReady, account } = useAccount();
  const { network } = useNetwork();
  const disconnect = useDisconnect();
  const expectedChainId = web3Config.ethereum!.chains![0].id;

  const isCorrectNetwork = network?.chain?.id === expectedChainId;

  const handleConnect = useCallback(() => {
    open();
  }, [open]);

  if (!isReady) {
    return (
      <Button outlined disabled onClick={handleConnect}>
        Authenticating...
      </Button>
    );
  }

  if (!account.address || !isCorrectNetwork) {
    console.log("account.address", account.address);
    return (
      <Button outlined onClick={handleConnect}>
        Connect Wallet
      </Button>
    );
  }

  return (
    <Popover className="relative">
      <Popover.Button className="outline-none">
        <div className="border-primary border-2 text-white uppercase font-bold hover:-translate-y-0.5 transition-transform px-8 py-3">
          {account.address.slice(0, 6)}...{account.address.slice(-4)}
        </div>
      </Popover.Button>

      <Popover.Panel className="absolute right-0 z-10 p-2 rounded-md bg-white/90">
        <ul className="flex flex-col gap-2 cursor-pointer text-primary min-w-fit">
          <li className="px-3 py-2 text-center text-white rounded-md bg-primary">
            Signed in as {account.address.slice(0, 6)}...{account.address.slice(-4)}
          </li>
          <li className="px-3 py-2 hover:bg-gray-50">
            <Link href={"/my-nfts"}>My Nfts</Link>
          </li>
          <li
            className="p-1 px-3 text-red-500 border-t-2 hover:bg-gray-50 border-t-gray-100"
            onClick={disconnect}
          >
            Disconnect
          </li>
        </ul>
      </Popover.Panel>
    </Popover>
  );
};

export default ConnectMetamaskButton;
