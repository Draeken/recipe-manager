import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

interface UserState {
  accessToken: string;
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
}

interface UserDTO {
  accessToken: string;
  displayName: string;
  email: string;
  photoURL: string;
  uid: string;
}

const initialState: UserState = {
  accessToken: null,
  displayName: null,
  email: null,
  photoURL: null,
  uid: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChange(state, action: PayloadAction<UserDTO>) {
      return { ...action.payload };
    },
  },
});

export const { authChange } = userSlice.actions;
export default userSlice.reducer;
