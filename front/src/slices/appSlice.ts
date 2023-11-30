import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/stores/app/store';

export interface AppState {
  addScore: number;
  csrfTokenExp: boolean;
}
const initialState: AppState = {
  addScore: 0,
  csrfTokenExp: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleCsrfState: (state) => {
      state.csrfTokenExp = !state.csrfTokenExp;
    },
  },
});
export const { toggleCsrfState } = appSlice.actions;

export const selectCsrfState = (state: RootState) => state.app.csrfTokenExp;
export default appSlice.reducer;
