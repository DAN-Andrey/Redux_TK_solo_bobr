import axiosInstance, {
  setAccessToken,
} from "../../../shared/lib/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  UserSignInData,
  UserSignUpData,
  UserType,
  UserWithTokenType,
} from "../model";
import type { ServerResponseType } from "../../../shared/types";
import { AxiosError } from "axios";

const USER_THUNK_NAMES = {
  SIGN_UP: "user/signUp",
  SIGN_IN: "user/signIn",
  REFRESH: "user/refresh",
  SIGN_OUT: "user/signOut",
} as const;

const USER_API_URL = {
  SIGN_UP: "/auth/signup",
  SIGN_IN: "/auth/login",
  REFRESH: "/auth/refreshTokens",
  SIGN_OUT: "/auth/logout",
} as const;

export const refreshThunk = createAsyncThunk<
  UserType,
  void,
  { rejectValue: string }
>(USER_THUNK_NAMES.REFRESH, async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get<
      ServerResponseType<UserWithTokenType>
    >(USER_API_URL.REFRESH);

    // if (response.data.statusCode === 200 && response.data.data?.user) {
      setAccessToken(response.data.data?.accessToken || "");
      return response.data.data.data || null;
    // }
    return rejectWithValue("Ошибка при обновлении токенов");
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(
        error.response?.data?.message || "Ошибка при обновлении токенов",
      );
    }
    return rejectWithValue("Ошибка при обновлении токенов");
  }
});

export const signUpThunk = createAsyncThunk<
  UserType,
  UserSignUpData,
  { rejectValue: string }
>(USER_THUNK_NAMES.SIGN_UP, async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post<
      ServerResponseType<UserWithTokenType>
    >(USER_API_URL.SIGN_UP, userData);

    if (response.data.statusCode === 201 && response.data.data?.user) {
      setAccessToken(response.data.data?.accessToken || "");
      return response.data.data.user;
    }
    return rejectWithValue("Ошибка при регистрации");
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(
        error.response?.data?.message || "Ошибка при регистрации",
      );
    }
    return rejectWithValue("Ошибка при регистрации");
  }
});

export const signInThunk = createAsyncThunk<
  UserType,
  UserSignInData,
  { rejectValue: string }
>(USER_THUNK_NAMES.SIGN_IN, async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post<
      ServerResponseType<UserWithTokenType>
    >(USER_API_URL.SIGN_IN, userData);

    if (response.data.statusCode === 200 && response.data.data?.user) {
      setAccessToken(response.data.data?.accessToken || "");
      return response.data.data.user;
    }
    return rejectWithValue("Ошибка при входе в приложение");
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(
        error.response?.data?.message || "Ошибка при входе в приложение",
      );
    }
    return rejectWithValue("Ошибка при входе в приложение");
  }
});

export const signOutThunk = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>(USER_THUNK_NAMES.SIGN_OUT, async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get<ServerResponseType<null>>(
      USER_API_URL.SIGN_OUT,
    );

    if (response.data.statusCode === 200) {
      setAccessToken("");
      return undefined;
    }
    return rejectWithValue("Ошибка при выходе из приложения");
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(
        error.response?.data?.message || "Ошибка при выходе из приложения",
      );
    }
    return rejectWithValue("Ошибка при выходе из приложения");
  }
});
