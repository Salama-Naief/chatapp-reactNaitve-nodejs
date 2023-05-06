import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UsersConnectedProp {
  userId: string | null;
  roomId: string | null;
}
const initialState: UsersConnectedProp = {
  roomId: null,
  userId: null,
};

const ConvSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    AddConv: (
      state: UsersConnectedProp,
      action: PayloadAction<UsersConnectedProp>
    ) => {
      state.userId = action.payload.userId;
      state.roomId = action.payload.roomId;
      console.log("action.payload", action.payload);
    },
    RemoveConv: (state: UsersConnectedProp) => {
      state.userId = null;
      state.roomId = null;
    },
  },
});

export const { AddConv, RemoveConv } = ConvSlice.actions;
export default ConvSlice.reducer;
