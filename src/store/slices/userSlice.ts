import { createSlice } from '@reduxjs/toolkit'
import { User } from '../../types/user'

interface UserState {
  profile: User
}

const initialState: UserState = {
  profile: {
    id: 'u1',
    name: 'Иван Иванов',
    email: 'ivan@example.com',
    group: 'Студент',
    avatar: 'https://via.placeholder.com/100?text=Avatar',
  },
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload }
    },
  },
})

export const { updateProfile } = userSlice.actions
export default userSlice.reducer
