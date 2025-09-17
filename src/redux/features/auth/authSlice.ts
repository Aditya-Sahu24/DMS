// src/features/auth/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../../utils/Url';

interface UserDetail {
  useR_ID: string;
  suR_NAME: string;
  firsT_NAME: string;
  email: string;
  // Add other user fields as needed
}

interface MenuItem {
  menuId: number;
  menuName: string;
  path: string;
  icon?: string;
  isAdd: boolean;
  isEdit: boolean;
  isDel: boolean;
  isView: boolean;
  displayNo: number;
}

interface ParentMenu {
  menuId: number;
  menuName: string;
  displayNo: number;
  childMenu: MenuItem[];
}

interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string;
  user: UserDetail | null;
  menuPermissions: ParentMenu[];
  token: string;
}

const initialState: AuthState = {
  isLoading: false,
  isAuthenticated: false,
  error: '',
  user: null,
  menuPermissions: [],
  token: '',
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (payload: { userId: string; password: string }, thunkAPI) => {
    try {
      const response = await api.post(
        'USER/USERLOGIN',
        {
          useR_ID: payload.userId,
          password: payload.password,
          collageID: '1',
          packageID: '1',
        },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

      if (response.data.isSuccess) {
        return response.data;
      } else {
        return thunkAPI.rejectWithValue(response.data.mesg);
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.mesg || 'Network error',
      );
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.isAuthenticated = false;
      state.user = null;
      state.menuPermissions = [];
      state.token = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.data[0].userdetail[0];
        state.menuPermissions =
          action.payload.data[0].userPermission[0].parentMenu;
        state.token = action.payload.data[0].token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
