import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/productsSlice'
import categoriesReducer from './slices/categoriesSlice'
import userReducer from './slices/userSlice'

const loggerMiddleware = (storeAPI: any) => (next: any) => (action: any) => {
  console.log('dispatching', action)
  const result = next(action)
  console.log('next state', storeAPI.getState())
  return result
}

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

