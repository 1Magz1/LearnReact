export interface AuthSchema {
  username: string;
  password: string
}

export interface UserLoginInfo extends Omit<AuthSchema, 'password'> {
  id: number,
}

export interface LoginInfoSchema extends UserLoginInfo{
  isLoading: boolean
}
