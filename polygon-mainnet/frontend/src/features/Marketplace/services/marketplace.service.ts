import { LimitOrderData } from "@1inch/limit-order-protocol";
import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";

const requester = axios.create({
  baseURL: process.env.NEXT_PUBLIC_1INCH_API_URL,
});

type Cxt = [string, Record<string, any>];

export const getOrders = (queryContext: QueryFunctionContext<Cxt>) => {
  return requester.get("/limit-order/all", {
    params: {
      page: 1,
      limit: Number.MAX_SAFE_INTEGER,
      statuses: "[1]",
      sortBy: "createDateTime",
      makerAsset: process.env.NEXT_PUBLIC_CONTRACT_NFT_ADDRESS,
      ...queryContext.queryKey[1],
    },
  });
};

type Payload = {
  orderHash: string;
  signature: string;
  data: LimitOrderData;
};
export const createOrder = (payload: Payload) => {
  return requester.post("/limit-order", payload);
};
