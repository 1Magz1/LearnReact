import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const scrollPositionSlice = createSlice({
  name: 'ScrollPosition',
  initialState: {},
  reducers: {
    setScrollPosition: (state, action: PayloadAction<{name: string, position: number}>) => {
      const { name, position } = action.payload;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state[name] = position;
    },
  },
});

export const { actions: scrollPositionActions } = scrollPositionSlice;
export const { reducer: scrollPositionReducer } = scrollPositionSlice;
