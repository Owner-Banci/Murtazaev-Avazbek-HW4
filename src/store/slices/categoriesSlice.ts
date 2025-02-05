import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Category } from '../../types/category'
import { v4 as uuidv4 } from 'uuid'

interface CategoriesState {
  list: Category[]
}

const initialState: CategoriesState = {
  list: [
    { id: '100', name: 'Компьютеры' },
    { id: '101', name: 'Телефоны' },
  ],
}

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Omit<Category, 'id'>>) => {
      const newCategory: Category = { id: uuidv4(), ...action.payload }
      state.list.push(newCategory)
    },
    updateCategory: (state, action: PayloadAction<Category>) => {
      const index = state.list.findIndex((c) => c.id === action.payload.id)
      if (index !== -1) {
        state.list[index] = action.payload
      }
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((c) => c.id !== action.payload)
    },
  },
})

export const { addCategory, updateCategory, deleteCategory } = categoriesSlice.actions
export default categoriesSlice.reducer
