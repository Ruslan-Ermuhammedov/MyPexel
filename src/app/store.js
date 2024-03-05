import { configureStore } from "@reduxjs/toolkit";
import { productsImageApi } from "../services/productsImageApi";
import { categoriesApi } from "../services/categoriesApi";
import { basketApi } from "../services/basketApi";
import { donateImage } from "../services/imageDonate";
export const store = configureStore({
  reducer: {
    [productsImageApi.reducerPath]: productsImageApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [basketApi.reducerPath]: basketApi.reducer,
    [donateImage.reducerPath]: donateImage.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsImageApi.middleware,donateImage.middleware,basketApi.middleware,categoriesApi.middleware)
});