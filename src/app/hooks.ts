import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

/**
 * Typed hooks cho toàn ứng dụng.
 * Tránh việc phải lặp lại kiểu RootState và AppDispatch trong từng component.
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
