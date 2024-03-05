import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.mypexel.com/app/v1/",
  }),
  tagTypes: ["Categories"],
  endpoints: (builder) => ({
    categories: builder.query({
      query: () => "categories/",
      providesTags: ["Categories"],
    }),
    filteredItem: builder.query({
      query: ({ Category = "", currentPage }) => ({
        url: `/ctg-filter/${Category ? `${Category}/` : ""}?page=${currentPage}`,
        method: "GET",
      }),
      invalidatesTags: ["Categories"],
    }),
    categoriesDetail: builder.query({
      query: (detailId) => ({
        url:`/categories/${detailId}`,
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
  useCategoriesQuery,
  useFilteredItemQuery,
  useCategoriesDetailQuery
} = categoriesApi;