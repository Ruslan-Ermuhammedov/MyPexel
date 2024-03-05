import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const productsImageApi = createApi({
  reducerPath: "productsImageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.mypexel.com/app/v1/",
  }),
  tagTypes: ["Images"],
  endpoints: (builder) => ({
    productsImage: builder.query({
      query: () => "/main/",
      providesTags: ["Images"],
    }),
    searchedItem:builder.query({
      query: (query="") => ({
            url: `search/?tags=${query}`,
            method: "GET",
          }),
          invalidatesTags: ["Images"],
    }),
    productsImageDetail: builder.query({
      query: (imageId) => ({
        url:`/main/${imageId}`,
      }),
      providesTags: ["User"],
    }),
    // addUser: builder.mutation({
    //   query: (user) => ({
    //     url: "/users",
    //     method: "POST",
    //     body: user,
    //   }),
    //   invalidatesTags: ["User"],
    // }),
    // editUser: builder.mutation({
    //   query: ({ id, ...rest }) => ({
    //     url: `/users/${id} `,
    //     method: "PUT",
    //     body: rest
    //   }),
    //   invalidatesTags: ["User"]
    // }),
    // deleteUser: builder.mutation({
    //   query: (id) => ({
    //     url: `/users/${id}` ,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["User"],
    // }),
  }),
});

export const {
  useProductsImageQuery,
  useSearchedItemQuery,
  useProductsImageDetailQuery,
} = productsImageApi;