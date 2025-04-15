import { CounterSchema } from 'entities/Counter';
import { AuthInfoSchema } from 'features/AuthByUsername';

export interface StateSchema {
  counter: CounterSchema,
  authInfo: AuthInfoSchema
}
