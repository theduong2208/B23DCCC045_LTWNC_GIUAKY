import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../src/hooks/useDebounce';

describe('useDebounce hook', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('giá trị không đổi trước 300ms và cập nhật chính xác sau 300ms', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }: { value: string; delay?: number }) =>
        useDebounce(value, delay),
      {
        initialProps: { value: 'React' },
      }
    );

    // Giá trị ban đầu lập tức là 'React'
    expect(result.current).toBe('React');

    // Cập nhật props thành 'TypeScript'
    rerender({ value: 'TypeScript' });

    // Trước 300ms (ví dụ 150ms): giá trị vẫn là 'React'
    act(() => {
      jest.advanceTimersByTime(150);
    });
    expect(result.current).toBe('React');

    // Tiến thêm 149ms (tổng 299ms): giá trị vẫn chưa đổi
    act(() => {
      jest.advanceTimersByTime(149);
    });
    expect(result.current).toBe('React');

    // Tiến thêm 1ms (đạt 300ms): giá trị đã cập nhật thành 'TypeScript'
    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(result.current).toBe('TypeScript');
  });
});
