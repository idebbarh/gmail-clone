import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userData:null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state,action) => {
      state.userData = action.payload
    },
    logout: (state) => {
      state.userData = null;
    },
  },
});

export const {login,logout} = userSlice.actions;

export const selectUserData = (state) => state.user.userData;


export default userSlice.reducer;
