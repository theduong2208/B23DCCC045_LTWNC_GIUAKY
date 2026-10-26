import { useContext } from 'react';
import { ThemeContext, ThemeContextValue } from './ThemeContext';

/**
 * Hook truy xuất Theme context.
 * Ném lỗi rõ ràng nếu gọi bên ngoài ThemeProvider.
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme phải được sử dụng bên trong <ThemeProvider>');
  }
  return context;
}
