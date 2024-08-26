import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const allUsers = (state) => state.users;

export default userSlice.reducer;
