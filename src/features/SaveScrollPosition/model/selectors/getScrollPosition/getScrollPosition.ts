import { StateSchema } from 'app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';

export const getScrollPosition = (state: StateSchema) => (state.scrollPosition);
export const getScrollPositionByName = createSelector(
  getScrollPosition,
  (_state: StateSchema, name: string) => name,
  (scroll, name) => scroll[name] || 0,
);
