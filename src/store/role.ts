import { createSlice } from '@reduxjs/toolkit'

export interface RoleState {
  role: "USER" | "GUEST" | "NOT-DEFINED";
}

const initialState: RoleState = {
  role: "NOT-DEFINED",
}

export const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    switchToRoleGuest: (state) => {
      state.role = "GUEST"
    },
    switchToRoleUser: (state) => {
      state.role = "USER"
    },
    switchToRoleNotDefined: (state) => {
      state.role = "NOT-DEFINED"
    }
  },
});

// Action creators are generated for each case reducer function
export const {switchToRoleGuest, switchToRoleUser, switchToRoleNotDefined } = roleSlice.actions

export default roleSlice.reducer