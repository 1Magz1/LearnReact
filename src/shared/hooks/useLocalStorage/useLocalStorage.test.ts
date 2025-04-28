import { renderHook, act } from '@testing-library/react';
import { useLocalStorage, STORAGE_EVENT } from './useLocalStorage';

const mockLocalStorage = (function () {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
}());

Object.defineProperty(global, 'localStorage', { value: mockLocalStorage });

describe('useLocalStorage', () => {
  beforeEach(() => {
    mockLocalStorage.clear();
  });

  it('should return the initial value if no data is in localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'defaultValue'));
    expect(result.current[0]).toBe('defaultValue');
  });

  it('should save and return the value in localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'defaultValue'));

    act(() => {
      result.current[1]('newValue');
    });

    expect(result.current[0]).toBe('newValue');
    expect(mockLocalStorage.getItem('testKey')).toBe(JSON.stringify('newValue'));
  });

  it('should remove the value from localStorage and reset to initial value', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'defaultValue'));

    act(() => {
      result.current[1]('newValue');
    });

    act(() => {
      result.current[2]();
    });

    expect(result.current[0]).toBe('defaultValue');
    expect(mockLocalStorage.getItem('testKey')).toBeNull();
  });

  it('should update state when a change occurs through another window event', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'defaultValue'));

    act(() => {
      result.current[1]('newValue');
    });

    // Dispatch event to simulate a localStorage change
    act(() => {
      window.dispatchEvent(new Event(STORAGE_EVENT));
    });

    // Ensure the hook updates the state correctly
    expect(result.current[0]).toBe('newValue');
  });

  it('should handle errors when reading from localStorage', () => {
    // Mock localStorage with error
    Object.defineProperty(global, 'localStorage', {
      value: {
        getItem: jest.fn().mockImplementation(() => { throw new Error('localStorage error'); }),
        setItem: jest.fn(),
        removeItem: jest.fn(),
      },
    });

    const { result } = renderHook(() => useLocalStorage('testKey', 'defaultValue'));
    expect(result.current[0]).toBe('defaultValue'); // Should return the default value in case of an error
  });

  it('should handle errors when writing to localStorage', () => {
    // Mock localStorage with error
    Object.defineProperty(global, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn().mockImplementation(() => { throw new Error('localStorage error'); }),
        removeItem: jest.fn(),
      },
    });

    const { result } = renderHook(() => useLocalStorage('testKey', 'defaultValue'));

    act(() => {
      result.current[1]('newValue');
    });

    // Ensure no change happened
    expect(result.current[0]).toBe('defaultValue');
  });
});
