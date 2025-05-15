import { EntityState } from '@reduxjs/toolkit';
import { UserShema } from 'features/UserProfile';

export interface Comment {
  id: string,
  text: string,
  user: UserShema
}

export type CommentSchema = EntityState<Comment, string>
