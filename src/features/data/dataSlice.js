import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

// Define the initial state for the slice
const initialState = {
    resturants: [],
    listItems: [],
    groups: [],
    status: 'idle',
    error: null,
  };



export const getResturantsData = createAsyncThunk(
  'data/getResturantsData',
  async ({ latitude, longitude }, thunkAPI) => {
    try {
      const response = await axios.post(url + 'get-resturants/', { latitude:latitude, longitude: longitude });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


// Define the thunk for getting resturants data by IDs
export const getResturantsDataByIds = createAsyncThunk(
  'data/getResturantsDataByIds',
  async (ids) => {
    const response = await axios.get(url + `get-resturants-list/?ids=${ids.join(',')}`);
    return response.data;
  }
);

// Define the thunk for getting list items
export const getListItems = createAsyncThunk(
  'data/getListItems',
  async (params) => {
    const { user_id, group_id } = params;
    const response = await axios.get(`${url}get-list-items?user_id=${user_id}&group_id=${group_id}`);
    return response.data;
  }
);

// Define the thunk for creating a list item
export const createListItem = createAsyncThunk(
  'data/createListItem',
  async (data) => {
    const response = await axios.post(url + 'create-list/', data);
    return response.data;
  }
);

// Define the thunk for updating a list item
export const updateListItem = createAsyncThunk(
  'data/updateListItem',
  async ({ id, ...data }) => {
    const response = await axios.put(url + `update-item/${id}/`, data);
    return response.data;
  }
);

// Define the thunk for deleting a list item
export const deleteListItem = createAsyncThunk(
  'data/deleteListItem',
  async (id) => {
    const response = await axios.delete(url + `delete-list/?id=${id}`);
    return response.data;
  }
);

// Create Group
export const createGroup = createAsyncThunk('group/create', async (groupData) => {
    const response = await axios.post(url + 'create-group/', groupData);
    return response.data;
  });
  
  // Add User to Group
  export const addUserToGroup = createAsyncThunk('group/addUser', async (userData) => {
    const response = await axios.post(url + 'add-user-to-group/', userData);
    return response.data;
  });

  export const getGroup = createAsyncThunk(
    'group/getGroup',
    async (groupId) => {
      const response = await axios.get(`${url}get-group/?group_id=${groupId}`);
      return response.data;
    }
  );

  export const searchRestaurants = createAsyncThunk(
    'search/restaurants',
    async ({ keyword, category, distance }, thunkAPI) => {
      try {
        const response = await axios.post(url + 'search/', { keyword, category, distance });
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

  export const getSuggestions = createAsyncThunk(
    'suggestions/get',
    async ({ usersList, groupId }, thunkAPI) => {
      try {
        const response = await axios({
          method: 'post',
          url: (url +'get-suggestion/'),
          data: { users_list: usersList, group_id: groupId },
        });
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

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
      })
      .addCase(getGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.groupData = action.payload;
      })
      .addCase(getGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getSuggestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSuggestions.fulfilled, (state, action) => {
        state.loading = false;
        state.suggestions = action.payload.data;
      })
      .addCase(getSuggestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch suggestions';
      })
      .addCase(searchRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.restaurants = [];
      })
      .addCase(searchRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants = action.payload;
      })
      .addCase(searchRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.restaurants = [];
      });

  },
});

export default dataSlice.reducer;