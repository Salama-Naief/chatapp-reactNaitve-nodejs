import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { user: UserProps | null } = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    AddUser: (state: any, action: PayloadAction<UserProps>) => {
      state.user = action.payload;
      console.log("action.payload", action.payload);
    },
    RemoveUser: (state: { user: UserProps | null }) => {
      state.user = null;
    },
  },
});

export const { AddUser, RemoveUser } = userSlice.actions;
export default userSlice.reducer;
