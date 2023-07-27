import { createSlice } from '@reduxjs/toolkit';

const weather = createSlice({
  name: 'weather',
  initialState: {},
  reducers: {
    set: (state, { payload }) => state = payload
  }
});

export const { set } = weather.actions;
export default weather.reducer;
