"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  useAccount,
  useConnectModal,
  useNetwork,
  useProvider,
} from "@web3modal/react";
import { BigNumber, providers, utils } from "ethers";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import BoxFrame from "../../../../common/components/BoxFrame";
import Button from "../../../../common/components/Button";
import Container from "../../../../common/components/Container";
import H1 from "../../../../common/components/H1";
import LableInput from "../../../../common/components/LableInput";
import Select from "../../../../common/components/Select";
import {
  LimitOrderBuilder,
  LimitOrderProtocolFacade,
  Web3ProviderConnector,
} from "@1inch/limit-order-protocol";
import { getPaymentTokens } from "../../../../features/Collection/PaymentToken/services/payment-token.service";
import { getNft } from "../../../../features/Nft/services/nft.service";
import { getTxMessage } from "../../../../common/utils/tx";
import Web3 from "web3";
import { createOrder } from "../../../../features/Marketplace/services/marketplace.service";

type Props = {
  params: {
    id: string;
  };
};

type FormValues = {
  makerAssetAddress: string;
  takerAssetAddress: string;
  makerAddress: string;
  takerAddress: string;
  makerAmount: string;
  takerAmount: string;
};

const NftItemOfferPage = (props: Props) => {
  const {
    params: { id: nftId },
  } = props;
  const { data: nft } = useQuery(["nft", "tokenId", nftId], getNft, {
    enabled: !!nftId,
  });

  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, setValue } = useForm<FormValues>();
  const { account } = useAccount();
  const { network } = useNetwork();
  const [orderData, setOrderData] = useState<any>(null);
  const { open } = useConnectModal();

  useEffect(() => {
    if (nft?.tokenId) {
      setValue(
        "makerAssetAddress",
        process.env.NEXT_PUBLIC_CONTRACT_TOKEN_ADDRESS!
      );
      setValue(
        "takerAssetAddress",
        process.env.NEXT_PUBLIC_CONTRACT_NFT_ADDRESS!
      );
      setValue("makerAddress", account.address);
      setValue("takerAddress", nft.owner);
      setValue("takerAmount", "1");
      setValue("makerAmount", "1");
    }
  }, [nft, account, setValue]);

  const onSubmit = useCallback(
    async (data: FormValues) => {
      if (!account.isConnected) {
        return open();
      }
      if (!nft || !network?.chain?.id) {
        return;
      }
      data.makerAmount = utils.parseEther(data.makerAmount).toString();

      const web3 = new Web3(window.ethereum as any);
      const connector = new Web3ProviderConnector(web3);
      const today = new Date();
      today.setMonth(today.getMonth() + 1);

      const limitOrderBuilder = new LimitOrderBuilder(
        process.env.NEXT_PUBLIC_CONTRACT_NFT_ADDRESS!,
        network.chain.id,
        connector
      );

      const limitOrderProtocolFacade = new LimitOrderProtocolFacade(
        process.env.NEXT_PUBLIC_CONTRACT_NFT_ADDRESS!,
        connector
      );

      const RFQorder = limitOrderBuilder.buildRFQOrder({
        id: 1,
        expiresInTimestamp: Math.floor(today.getTime() / 1000),
        ...data,
      });

      console.log(RFQorder);
      setOrderData(RFQorder);
    },
    [network?.chain?.id, nft, open, account]
  );

  if (!nft) {
    return null;
  }

  return (
    <Container className="grid gap-20 py-20 lg:grid-cols-3">
      <BoxFrame>
        <div className="py-[52px] px-[39px] space-y-[34px]">
          <Image
            src={`/api/imageProxy?imageUrl=https://${nft.tokenURI}.ipfs.w3s.link/`}
            className="object-cover w-full aspect-square"
            alt="Gallery"
            width={256}
            height={256}
          />
          <div>
            <H1>
              {nft.tokenName} #{nft.tokenId}
            </H1>
            <div className="flex items-center justify-between mt-3">
              <span className="text-[24px] text-[#6B7280] font-bold">
                Power
              </span>
              <span className="font-bold text-[32px] text-white">
                {nft.tokenPower}
              </span>
            </div>
          </div>
        </div>
      </BoxFrame>
      <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-2">
        <H1>List NFT</H1>
        <BoxFrame className="p-16 mt-4 space-y-5">
          <LableInput
            label="NFT"
            value={`${nft.tokenName} #${nft.tokenId}`}
            disabled
          />
          <LableInput label="Token Amount" {...register("makerAmount")} />
          <div>
            <Button type="submit" className="mt-5" isLoading={isLoading}>
              {account.isConnected ? "Request Offer" : "Connect Wallet"}
            </Button>
          </div>
        </BoxFrame>
        {orderData && (
          <BoxFrame className="mt-5 p-5">
            <pre className="text-white">
              {JSON.stringify(orderData, null, 4)}
            </pre>
          </BoxFrame>
        )}
      </form>
    </Container>
  );
};

export default NftItemOfferPage;
