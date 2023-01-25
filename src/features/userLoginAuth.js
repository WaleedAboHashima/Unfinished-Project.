import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const api = "https://graduationproject-production.up.railway.app/user/login";

const initialState = {
  data: {},
  isLoading: false,
  state: "idle",
  status: null,
  error: null,
};

export const fetchUser = createAsyncThunk("userLoginAuth/fetchUser", async (arg) => {
  try {
    const response = await axios.post(api, {
      email: arg.email,
      phone: arg.phone,
      password: arg.password,
    })
    return response.data;
  } catch (error) {
    return error.response;
  }
});

export const userSlice = createSlice({
  name: "userLoginAuth",
  initialState,
  reducers: ({
    handleError: (state) => {
      state.error = null;
      state.status = null;
    }
  })
    ,
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      if (action.payload.status === 403) {
        state.data = {};
        state.error = action.payload.status;
      }
      else {
        state.error = null;
        state.data.username = action.payload.username;
        state.data.token = action.payload.token;
        state.status = action.payload.state;
        state.data.roles = action.payload.roles;
        state.data.phone = action.payload.phone;
        state.data.email = action.payload.email;
      }
      state.state = "success";
      state.isLoading = false;
    });
    builder.addCase(fetchUser.rejected, (state) => {
      state.state = "rejected";
      state.isLoading = true;
    });
    builder.addCase(fetchUser.pending, (state) => {
      state.state = "pending";
      state.isLoading = true;
    });
  },
});
export const { handleError } = userSlice.actions;
export default userSlice.reducer;
