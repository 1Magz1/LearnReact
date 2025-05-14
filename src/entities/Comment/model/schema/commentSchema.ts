import { EntityState } from '@reduxjs/toolkit';

export interface Comment {
  id: string,
  text: string,
  user: {
    id: string,
    username: string,
    avatar?: string,
  }
}

export type CommentSchema = EntityState<Comment, string>
