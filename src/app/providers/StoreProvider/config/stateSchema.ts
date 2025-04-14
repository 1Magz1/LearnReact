import { CounterSchema } from 'entities/Counter';
import { LoginInfoSchema } from 'features/AuthByUsername';

export interface StateSchema {
  counter: CounterSchema,
  loginInfo: LoginInfoSchema
}
