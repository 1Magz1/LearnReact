import {
  getScrollPosition,
  getScrollPositionByName,
} from './model/selectors/getScrollPosition/getScrollPosition';
import { ScrollPositionSchema } from './model/schema/scrollPositionSchema';
import { scrollPositionActions, scrollPositionReducer } from './model/slice/scrollPositionSlice';

export {
  ScrollPositionSchema,
  scrollPositionActions,
  scrollPositionReducer,
  getScrollPosition,
  getScrollPositionByName,
};
