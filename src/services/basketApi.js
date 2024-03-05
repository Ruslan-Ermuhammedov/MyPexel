import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const getToken = () => localStorage.getItem("token");

export const basketApi = createApi({
  reducerPath: "basketApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.mypexel.com/app/v1/",
  }),
  tagTypes: ["Basket"],
  endpoints: (builder) => ({
    basketImages: builder.query({
      query: (basketId = "") => ({
        url: `cart/${basketId}/`,
        method: "GET",
      }),
      providesTags: ["Basket"],
    }),
    // searchedItem:builder.query({
    //   query: (query="") => ({
    //         url: `search/?tags=${query}`,
    //         method: "GET",
    //       }),
    //       invalidatesTags: ["Basket"],
    // })

    // userDetail: builder.query({
    //   query: (userId) => ({
    //     url:`/users/${userId}`,
    //   }),
    //   providesTags: ["User"],
    // }),
    addBasket: builder.mutation({
      query: (id) => ({
        url: "cart/",
        method: "POST",
        headers: {
          'Authorization': `Token ${getToken()}`,
          'Content-Type': 'application/json', // Specify the content type as JSON
        },
        body: {
          image_ids: [id], // Include the id in the request body
        },
      }),
      invalidatesTags: ["Basket"],
    }),
    // editUser: builder.mutation({
    //   query: ({ id, ...rest }) => ({
    //     url: `/users/${id} `,
    //     method: "PUT",
    //     body: rest
    //   }),
    //   invalidatesTags: ["User"]
    // })
    deleteBasket: builder.mutation({
      query: (id) => ({
        url: `/cart/`,
        method: "DELETE",
        headers: {
          'Authorization': `Token ${getToken()}`,
          'Content-Type': 'application/json', // Specify the content type as JSON
        },
        body: {
          image_ids: [id], // Include the id in the request body
        },
      }),
      invalidatesTags: ["Basket"],
    }),
  }),
});

export const {
  useBasketImagesQuery,
  useDeleteBasketMutation,
  useAddBasketMutation

} = basketApi;