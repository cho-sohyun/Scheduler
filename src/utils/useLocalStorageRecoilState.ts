import { useEffect } from 'react';
import { RecoilState, useRecoilState } from 'recoil';

export function useLocalStorageRecoilState<T>(
  key: string,
  atom: RecoilState<T>
) {
  const [state, setState] = useRecoilState(atom);

  // Recoil 상태가 변화할 때마다 해당 상태를 localStorage에 저장
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, setState] as const;
}
