'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Определяем интерфейс для контекста
interface ProductFilterContextType {
  categoryId: number | null;
  setCategoryId: (id: number | null) => void;
}

// Устанавливаем значение по умолчанию
const defaultContextValue: ProductFilterContextType = {
  categoryId: null,
  setCategoryId: () => {},
};

const ProductFilterContext = createContext<ProductFilterContextType>(defaultContextValue);

interface ProductFilterProviderProps {
  children: ReactNode; // Определяем тип для children
}

export const ProductFilterProvider: React.FC<ProductFilterProviderProps> = ({ children }) => {
  const [categoryId, setCategoryId] = useState<number | null>(null);

  return (
    <ProductFilterContext.Provider value={{ categoryId, setCategoryId}}>
      {children}
    </ProductFilterContext.Provider>
  );
};

export const useProductFilter = () => {
  return useContext(ProductFilterContext);
};