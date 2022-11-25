import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mailFormIsOpen:false,
  selectedMail:null
};

export const mailSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setSelectedMail: (state,action) => {
      state.selectedMail = action.payload
    },
    openMailForm: (state) => {
      state.mailFormIsOpen = true;
    },
    closeMailForm: (state) => {
      state.mailFormIsOpen = false;
    }
  },
});

export const { openMailForm,closeMailForm,setSelectedMail} = mailSlice.actions;

export const selecteMailFormIsOpen = (state) => state.mail.mailFormIsOpen;
export const selecteSelectedMail = (state)=> state.mail.selectedMail;

export default mailSlice.reducer;
