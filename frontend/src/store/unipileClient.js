import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UnipileClient } from "unipile-node-sdk"
import { ALL_KEYS, ALL_URL } from '../constants';

const unipileClient = new UnipileClient(ALL_URL.UNIPILE_URL, ALL_KEYS.UNIPILE_API_KEY);

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: ALL_URL.UNIPILE_URL }),
  endpoints: (builder) => ({

    getAllMessagesFromChat: builder.query({
      queryFn: async ({ chat_id }) => {
        try {
          const response = await unipileClient.messaging.getAllMessagesFromChat({ chat_id });
          return { data: response.items.reverse() };
        } catch (error) {
          return { error: error.message };
        }
      },
    }),
    getAllChats: builder.query({
      queryFn: async ({ account_type }) => {  
        try {
          const url = `https://api9.unipile.com:13961/api/v1/chats?account_type=${account_type}`;
          const response = await fetch(url, {
            method: 'GET',
            headers: { 'X-API-KEY': ALL_KEYS.UNIPILE_API_KEY }
          });
          const data = await response.json();
          
          // response.items kontrolü yapılması gerekebilir
          if (data && data.items) {
            return { data: data.items }; // Dönen veriyi kullan
          } else {
            return { data: [] }; // items yoksa boş bir array dön
          }
        } catch (error) {
          return { error: error.message }; // Hata mesajını döndür
        }
      },
    }),
    getChat: builder.query({
      queryFn: async ({ chat_id }) => {
        try {
          const response = await unipileClient.messaging.getChat(chat_id);
          return { data: response };
        } catch (error) {
          return { error: error.message };
        }
      },
    }),


  }),
  keepUnusedDataFor: 30,
  refetchOnMountOrArgChange: 5
});

export const { 
    useGetAllMessagesFromChatQuery,
    useGetAllChatsQuery,
    useGetChatQuery,

} = apiSlice;