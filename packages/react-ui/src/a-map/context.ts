import { createContext } from 'react';

import { AMapContextValues } from './interface';

export const AMapContext = createContext<AMapContextValues>({
  map: null,
});
