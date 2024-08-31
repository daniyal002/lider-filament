export interface IRegistrationRequest {
  username: string,
  password: string,
  replayPassword?:string,
  login: string,
  email: string,
  phone: string,
}

export interface ILoginRequest {
  login: string;
  password: string;
}

export interface ILoginResponse {
  detail: string;
  access_token: string;
  refresh_token: string;
}

export interface IRefreshRequest {
  refresh_token: string;
}
