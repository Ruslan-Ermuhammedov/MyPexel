import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const getToken = () => localStorage.getItem("token");

export const donateImage = createApi({
  reducerPath: "donateImage",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.mypexel.com/app/v1/",
  }),
  tagTypes: ["Donate"],
  endpoints: (builder) => ({
    donateImages: builder.query({
      query: () => ({
        url: `donate-png/`,
        method: "GET",
      }),
      providesTags: ["Donate"],
    }),
    // searchedItem:builder.query({
    //   query: (query="") => ({
    //         url: `search/?tags=${query}`,
    //         method: "GET",
    //       }),
    //       invalidatesTags: ["Donate"],
    // })

    // userDetail: builder.query({
    //   query: (userId) => ({
    //     url:`/users/${userId}`,
    //   }),
    //   providesTags: ["User"],
    // }),
    addDonateImage: builder.mutation({
      query: (files) => ({
        url: "donate-png/",
        method: "POST",
        body: files
      }),
      invalidatesTags: ["Donate"],
    }),
    // editUser: builder.mutation({
    //   query: ({ id, ...rest }) => ({
    //     url: `/users/${id} `,
    //     method: "PUT",
    //     body: rest
    //   }),
    //   invalidatesTags: ["User"]
    // })
    // deleteBasket: builder.mutation({
    //   query: (id) => ({
    //     url: `/cart/`,
    //     method: "DELETE",
    //     headers: {
    //       'Authorization': `Token ${getToken()}`,
    //       'Content-Type': 'application/json', // Specify the content type as JSON
    //     },
    //     body: {
    //       image_ids: [id], // Include the id in the request body
    //     },
    //   }),
    //   invalidatesTags: ["Donate"],
    // }),
  }),
});

export const {

  useDonateImagesQuery,
  useAddDonateImageMutation
} = donateImage;