import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '../../types/product'
import { v4 as uuidv4 } from 'uuid'

interface ProductsState {
  list: Product[]
}

const initialState: ProductsState = {
  list: [
    {
      id: '1',
      title: 'Ноутбук',
      description: 'Игровой ноутбук',
      categoryId: '100',
      quantity: 10,
      price: 999,
    },
    {
      id: '2',
      title: 'Смартфон',
      description: 'Флагманский телефон',
      categoryId: '101',
      quantity: 5,
      price: 799,
    },
  ],
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Omit<Product, 'id'>>) => {
      const newProduct: Product = {
        id: uuidv4(),
        ...action.payload,
      }
      state.list.push(newProduct)
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.list.findIndex((p) => p.id === action.payload.id)
      if (index !== -1) {
        state.list[index] = action.payload
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((p) => p.id !== action.payload)
    },
  },
})

export const { addProduct, updateProduct, deleteProduct } = productsSlice.actions
export default productsSlice.reducer
