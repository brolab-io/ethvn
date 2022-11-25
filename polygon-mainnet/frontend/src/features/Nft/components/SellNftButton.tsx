"use client";

import { useAccount } from "@web3modal/react";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";
import Button from "../../../common/components/Button";
import { fetchMarketNft, fetchNft } from "../services/nft.service";

type Props = {
  nft:
    | Awaited<ReturnType<typeof fetchNft>>
    | Awaited<ReturnType<typeof fetchMarketNft>>;
} & ComponentProps<typeof Button>;
const SellNFTButton = ({ nft, ...props }: Props) => {
  const { account } = useAccount();
  const pathname = usePathname();
  const isOwner = account.address.toLowerCase() === nft.owner;
  if (isOwner) {
    return null;
  }
  if ("marketId" in nft && nft.marketId) {
    return (
      <Button href={`/marketplace/${nft.marketId}`} {...props}>
        View on Marketplace
      </Button>
    );
  }

  return (
    <Button href={`${pathname}/offer`} {...props}>
      Offer NFT
    </Button>
  );
};

export default SellNFTButton;
