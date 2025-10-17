import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Hook that debounces a value
 * @param value - The value to debounce
 * @param delay - The delay in milliseconds
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Hook that debounces a callback function
 * @param callback - The callback function to debounce
 * @param delay - The delay in milliseconds
 * @param deps - Dependencies array (like useCallback)
 * @returns The debounced callback function
 */
export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
  deps: React.DependencyList = []
): T {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [callback, delay, ...deps]
  ) as T;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
}

/**
 * Hook that provides immediate and debounced values
 * Useful for search inputs where you want immediate UI updates but debounced API calls
 * @param initialValue - The initial value
 * @param delay - The delay in milliseconds for debouncing
 * @returns Object with immediate value, debounced value, and setter
 */
export function useImmediateAndDebounced<T>(
  initialValue: T,
  delay: number
): {
  immediate: T;
  debounced: T;
  setValue: (value: T) => void;
} {
  const [immediate, setImmediate] = useState<T>(initialValue);
  const debounced = useDebounce(immediate, delay);

  return {
    immediate,
    debounced,
    setValue: setImmediate,
  };
}

/**
 * Hook for debounced search functionality
 * @param searchFunction - The function to call with the search term
 * @param delay - The delay in milliseconds
 * @returns Object with search term, debounced search, loading state, and setters
 */
export function useDebouncedSearch<T>(
  searchFunction: (term: string) => Promise<T>,
  delay: number = 300
): {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  results: T | null;
  loading: boolean;
  error: string | null;
} {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearchTerm = useDebounce(searchTerm, delay);

  useEffect(() => {
    if (!debouncedSearchTerm.trim()) {
      setResults(null);
      setLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    searchFunction(debouncedSearchTerm)
      .then((result) => {
        if (!cancelled) {
          setResults(result);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message || "Search failed");
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [debouncedSearchTerm, searchFunction]);

  return {
    searchTerm,
    setSearchTerm,
    results,
    loading,
    error,
  };
}

/**
 * Hook that debounces a value and provides a cancel function
 * @param value - The value to debounce
 * @param delay - The delay in milliseconds
 * @returns Object with debounced value and cancel function
 */
export function useCancellableDebounce<T>(
  value: T,
  delay: number
): {
  debouncedValue: T;
  cancel: () => void;
  isPending: boolean;
} {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const [isPending, setIsPending] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      setIsPending(false);
    }
  }, []);

  useEffect(() => {
    setIsPending(true);

    const handler = setTimeout(() => {
      setDebouncedValue(value);
      setIsPending(false);
    }, delay);

    timeoutRef.current = handler;

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return {
    debouncedValue,
    cancel,
    isPending,
  };
}
