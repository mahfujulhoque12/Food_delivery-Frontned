export interface SignInFormInput {
  email: string;
  password: string;
  full_name: string;
  role: string;
  mobile: string;
}

export interface Token {
  token: string;
}

export interface LoginResponse {
  user: SignInFormInput;
  token: string;
}
