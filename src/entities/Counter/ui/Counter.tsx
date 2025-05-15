import { Button } from 'shared/ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { StateSchema } from 'app/providers/StoreProvider';
import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue';
import { counterActions } from '../model/slice/counterSlice';
import cls from './Counter.module.scss';

const Counter = () => {
  const dispatch = useDispatch();
  const value = useSelector((state: StateSchema) => getCounterValue(state));

  const handleIncrement = () => {
    dispatch(counterActions.increment());
  };

  const handleDecrement = () => {
    dispatch(counterActions.decrement());
  };

  return (
    <div className={cls.counter}>
      <Button onClick={handleIncrement}>
        +
      </Button>
      <span>{value}</span>
      <Button onClick={handleDecrement}>-</Button>
    </div>
  );
};
export default Counter;
