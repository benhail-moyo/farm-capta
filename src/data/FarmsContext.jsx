import React, { createContext, useContext, useState } from 'react';
import { farms as initialFarms } from './farms';
const FarmsContext = createContext(null);
export function FarmsProvider({ children }) {
  const [farms, setFarms] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('farmlink-farms'));
      return initialFarms.map(farm => ({ ...farm, ...saved?.find(item => item.id === farm.id) }));
    } catch { return initialFarms; }
  });
  function updateFarm(updated) {
    const next = farms.map(farm => farm.id === updated.id ? updated : farm);
    localStorage.setItem('farmlink-farms', JSON.stringify(next));
    setFarms(next);
  }
  return <FarmsContext.Provider value={{ farms, updateFarm }}>{children}</FarmsContext.Provider>;
}
export const useFarms = () => useContext(FarmsContext);
