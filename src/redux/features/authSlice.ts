import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: number; // Identifiant unique de l'utilisateur
  firstName: string; // Prénom de l'utilisateur
  lastName: string; // Nom de l'utilisateur
  email: string; // Adresse e-mail de l'utilisateur
  phoneNumber: string; // Numéro de téléphone de l'utilisateur
  role: string; // Référence au rôle de l'utilisateur
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload;
    },
  },
});

export const { login, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
