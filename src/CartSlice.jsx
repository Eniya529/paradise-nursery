import { createSlice } from '@reduxjs/toolkit';

// The cart starts empty.
// Each item will look like: { name, image, cost, quantity }
const initialState = {
  items: [],
};

const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add a plant to the cart (or bump its quantity if it's already there)
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find((item) => item.name === name);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },

    // Remove a plant completely. The payload is the plant's name.
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.name !== action.payload);
    },

    // Set a plant's quantity. The payload is { name, quantity }.
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find((item) => item.name === name);

      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

// Action creators, generated automatically from the reducers above
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// The reducer, which the store will use
export default CartSlice.reducer;