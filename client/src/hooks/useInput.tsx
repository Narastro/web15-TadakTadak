import React, { useState, useCallback } from 'react';

export default function useInput(initialState: string): [string, typeof onChange] {
  const [input, setInput] = useState(initialState);
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setInput(e.target.value),
    [],
  );
  return [input, onChange];
}
