import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ConvProps {
  name: string | undefined;
  img: string | undefined;
  groupMembers?: number;
}
const initialState: ConvProps = {
  name: undefined,
  img: "",
};

const ConvSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    AddConv: (state: ConvProps, action: PayloadAction<ConvProps>) => {
      state.name = action.payload.name;
      state.img = action.payload.img;
      state.groupMembers = action.payload.groupMembers;
      console.log("action.payload", action.payload);
    },
    RemoveConv: (state: ConvProps) => {
      state.name = undefined;
      state.img = undefined;
    },
  },
});

export const { AddConv, RemoveConv } = ConvSlice.actions;
export default ConvSlice.reducer;
