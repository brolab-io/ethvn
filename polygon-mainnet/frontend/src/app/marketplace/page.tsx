"use client";

import { useAccount, useNetwork } from "@web3modal/react";
import Container from "../../common/components/Container";
import NftList from "../../features/Nft/components/NftList";

const MarketplacePage = () => {
  const { account } = useAccount();
  const { network } = useNetwork();

  return (
    <Container className="py-10">
      <NftList isMarket />
    </Container>
  );
};

export default MarketplacePage;
