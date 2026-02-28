export type UserType = {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}

export type UserStateType ={
  user: UserType | null;
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;
}

export const initialUserState: UserStateType = {
  user: null,
  isLoading: false,
  error: null,
  isInitialized: false,
}

export type User ={
  status: "logged" | "guest" | "logging";
  data: UserType | null;
}


export type UserWithTokenType = {
    user: UserType;
    accessToken: string;
};

export type UserSignUpData = {
    name: string;
    email: string;
    password: string;
}

export type UserSignInData = {
    email: string;
    password: string;
}

export type UserState = {
    user: UserType | null;
    isLoading: boolean;
    isInitialized: boolean;
    error: string | null;
}
