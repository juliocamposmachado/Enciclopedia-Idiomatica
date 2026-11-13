import { useCallback, useEffect, useState } from 'react';
import { loadJSON, saveJSON } from '@/utils/storage';

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => loadJSON(key, initial));
  useEffect(() => {
    saveJSON(key, value);
  }, [key, value]);
  const reset = useCallback(() => setValue(initial), [initial]);
  return [value, setValue, reset] as const;
}
