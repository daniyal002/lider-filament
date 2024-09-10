export interface IUserDetail {
  user_id: number;
  username: string;
  login: string;
  email: string;
  phone: string;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface IUserResponse {
  total: number;
  skip: number;
  limit: number;
  detail: IUserDetail[];
}

export interface IUserDetailById{
    detail: IUserDetail;
}