import { createSlice } from '@reduxjs/toolkit';

const keyboardSlice = createSlice({
  name: 'keyboard',
  initialState: {
    isKeyboardVisible: false,
  },
  reducers: {
    setIsKeyboardVisible: (state, aciton) => {
      state.isKeyboardVisible = aciton.payload.value;
    },
    toggleIsKeyboardVisible: (state, action) => {
      state.isKeyboardVisible = !state.isKeyboardVisible;
    },
  },
});

export const setIsKeyboardVisible = keyboardSlice.actions.setIsKeyboardVisible;

export default keyboardSlice.reducer;
