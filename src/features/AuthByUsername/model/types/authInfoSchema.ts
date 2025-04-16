export interface AuthSchema {
  username: string;
  password: string
}

export interface AuthInfoSchema extends Omit<AuthSchema, 'password'> {
  id: number,
}
