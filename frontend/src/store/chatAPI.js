import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const chatApi = createApi({
    reducerPath: 'chatApi',
    baseQuery: fetchBaseQuery({
      baseUrl: 'https://api9.unipile.com:13947/api/v1', 
      prepareHeaders: (headers) => {
        headers.set('accept', 'application/json');
        headers.set('X-API-KEY', '/z6kMXv3.dodhzU0jvFH0ParP7Z7ttRmg+9y+lB7LNDcmlaqIEl0=')
        return headers;
      },
    }),
    endpoints: (builder) => ({
      sendMessage: builder.mutation({
        query: ({ formData, chatID }) => ({
          url: `chats/${chatID}/messages/`,
          method: 'POST',
          body: formData,
        }),
      }),
      getAttachment: builder.query({
        query: ({ messageId, attachmentId }) => ({
          url: `${messageId}/attachments/${attachmentId}`,
          method: 'GET',
          responseHandler: async (response) => {
            console.log(response);
            
            return response.blob().then((blob) => URL.createObjectURL(blob));
          },
        }),
      }),
    }),
  });
  export const { useSendMessageMutation, useGetAttachmentQuery } = chatApi;