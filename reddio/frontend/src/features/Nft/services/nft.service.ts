import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";


type Nft = {
  token_id: string;
  asset_id: string;
  asset_name: string;
  asset_type: string;
  contract_address: string;
  display_value: string;
  record_type: string;
  sequence_id: string;
  stark_key: string;
  status: string;
  time: string;
};


export const getNft = async (queryContext: QueryFunctionContext): Promise<Nft> => {
  return axios.get('https://api-dev.reddio.com/v1/record', {
    params: {
      stark_key: '0x6e3b63a64de2e0d6db1a126aabbdf1b1f46f8bb5eebcaae0a63d127d2b5be30',
      sequence_id: queryContext.queryKey[1]
    }
  }).then(res => res.data.data[0])
};

export const fetchNft = async (sequence_id: string): Promise<Nft> => {
  return axios.get('https://api-dev.reddio.com/v1/record', {
    params: {
      stark_key: '0x6e3b63a64de2e0d6db1a126aabbdf1b1f46f8bb5eebcaae0a63d127d2b5be30',
      sequence_id
    }
  }).then(res => res.data.data[0])
};
