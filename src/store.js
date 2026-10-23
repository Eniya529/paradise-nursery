import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice.jsx';

const store = configureStore({
  reducer: {
    // The key "cart" becomes state.cart in the store
    cart: cartReducer,
  },
});

export default store;