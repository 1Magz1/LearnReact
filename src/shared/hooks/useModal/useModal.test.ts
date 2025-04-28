import { renderHook, act } from '@testing-library/react';
import useModal from './useModal';

describe('useModal hook', () => {
  test('should initialize with isOpen as false', () => {
    const { result } = renderHook(() => useModal());
    expect(result.current.isOpen).toBe(false);
  });

  test('should open the modal when handleModalOpen is called', () => {
    const { result } = renderHook(() => useModal());
    act(() => {
      result.current.handleModalOpen();
    });
    expect(result.current.isOpen).toBe(true);
  });

  test('should close the modal when handleModalClose is called', () => {
    const { result } = renderHook(() => useModal());
    act(() => {
      result.current.handleModalOpen();
    });
    act(() => {
      result.current.handleModalClose();
    });
    expect(result.current.isOpen).toBe(false);
  });
});
