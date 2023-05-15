import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchItems, addItem, updateItem, deleteItem } from './cartAPI';

const initialState = {
  items: [],
  status: 'idle',
};

export const fetchAsync = createAsyncThunk('cart/fetchItems', async () => {
  const { data } = await fetchItems();
  return data;
});

export const addAsync = createAsyncThunk('cart/addItem', async (item) => {
  const { id, title, brand, thumbnail, price } = item;
  const { data } = await addItem({
    id,
    title,
    brand,
    thumbnail,
    price,
    quantity: 1,
  });
  return data;
});

export const deleteAsync = createAsyncThunk('cart/deleteItem', async (id) => {
  await deleteItem(id);
  return id;
});

export const updateAsync = createAsyncThunk(
  'cart/updateItem',
  async ({ id, item }) => {
    const { data } = await updateItem(id, item);
    return data;
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(addAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addAsync.fulfilled, (state, action) => {
        state.status = 'idle';

        // const index = state.items.findIndex(
        //   (item) => item.id === action.payload.id
        // );

        // if (index !== -1) {
        //   state.items[index].quantity += 1;
        // } else {
        //   state.items.push(action.payload);
        // }
        state.items.push(action.payload);

        // const index = state.items.findIndex(
        //   (item) => item.id === action.payload.id
        // );
        // console.log(state.items[index].quantity);
      })
      .addCase(addAsync.rejected, (state, action) => {
        state.status = 'failed';
      })
      .addCase(deleteAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(
          (item) => item.id === action.payload
        );
        console.log('delete index', index);
        state.items.splice(index, 1);
      })
      .addCase(updateAsync.pending, (state, action) => {
        state.status = 'failed';
      })
      .addCase(updateAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        console.log('index,Action.payload', index, action.payload);
        state.items.splice(index, 1, action.payload);
      });
  },
});

// export const {} = cartSlice.actions;

export default cartSlice.reducer;
