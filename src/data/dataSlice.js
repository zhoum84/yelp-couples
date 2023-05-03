import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state for the slice
const initialState = {
    resturants: [],
    listItems: [],
    groups: [],
    status: 'idle',
    error: null,
  };

// Define the thunk for getting resturants data
export const getResturantsData = createAsyncThunk(
  'data/getResturantsData',
  async () => {
    const response = await axios.get('/get-resturants/');
    return response.data;
  }
);

// Define the thunk for getting resturants data by IDs
export const getResturantsDataByIds = createAsyncThunk(
  'data/getResturantsDataByIds',
  async (ids) => {
    const response = await axios.get(`/get-resturants-list/?ids=${ids.join(',')}`);
    return response.data;
  }
);

// Define the thunk for getting list items
export const getListItems = createAsyncThunk(
  'data/getListItems',
  async () => {
    const response = await axios.get('/get-list-items');
    return response.data;
  }
);

// Define the thunk for creating a list item
export const createListItem = createAsyncThunk(
  'data/createListItem',
  async (data) => {
    const response = await axios.post('/create-list/', data);
    return response.data;
  }
);

// Define the thunk for updating a list item
export const updateListItem = createAsyncThunk(
  'data/updateListItem',
  async (data) => {
    const response = await axios.put('/update-item/', data);
    return response.data;
  }
);

// Define the thunk for deleting a list item
export const deleteListItem = createAsyncThunk(
  'data/deleteListItem',
  async (id) => {
    const response = await axios.delete(`/delete-list/?id=${id}`);
    return response.data;
  }
);

// Create Group
export const createGroup = createAsyncThunk('group/create', async (groupData) => {
    const response = await axios.post('/api/create_group/', groupData);
    return response.data;
  });
  
  // Add User to Group
  export const addUserToGroup = createAsyncThunk('group/addUser', async (userData) => {
    const response = await axios.post('/api/add_user_to_group/', userData);
    return response.data;
  });

// Define the data slice
export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getResturantsData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getResturantsData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.resturants = action.payload;
      })
      .addCase(getResturantsData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getResturantsDataByIds.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getResturantsDataByIds.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.resturants = action.payload;
      })
      .addCase(getResturantsDataByIds.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getListItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getListItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.listItems = action.payload;
      })
      .addCase(getListItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(createListItem.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(createListItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.listItems.push(action.payload);
        state.isLoading = false;
      })
      .addCase(createListItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(updateListItem.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(updateListItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const updatedItemIndex = state.listItems.findIndex((item) => item.id === action.payload.id);
        if (updatedItemIndex !== -1) {
          state.listItems[updatedItemIndex] = action.payload;
        }
        state.isLoading = false;
      })
      .addCase(updateListItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(deleteListItem.pending, (state) => {
        state.status = 'loading';
        state.isLoading = true;
      })
      .addCase(deleteListItem.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.listItems = state.listItems.filter((item) => item.id !== action.payload.id);
        state.isLoading = false;
      })
      .addCase(deleteListItem.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(createGroup.pending, (state) => {
        state.loading = true;
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.groups.push(action.payload);
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addUserToGroup.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUserToGroup.fulfilled, (state, action) => {
        state.loading = false;
        // update the specific group with the new user
        const updatedGroup = state.groups.find((group) => group.id === action.payload.group_id);
        if (updatedGroup) {
          updatedGroup.users.push(action.payload.user);
        }
      })
      .addCase(addUserToGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dataSlice.reducer;