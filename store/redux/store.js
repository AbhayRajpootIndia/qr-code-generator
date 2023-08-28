import { configureStore } from '@reduxjs/toolkit';

import keyboardReducer from './keyboardSlice';

export const store = configureStore({
  reducer: {
    keyboard: keyboardReducer,
  },
});
