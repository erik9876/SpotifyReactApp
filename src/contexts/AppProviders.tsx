import React, { ReactNode } from "react";
import { SearchProvider } from "./SearchContext";
import { CartProvider } from "./CartContext";

interface Props {
  children: ReactNode;
}

const AppProviders: React.FC<Props> = ({ children }) => {
  return (
    <SearchProvider>
      <CartProvider>{children}</CartProvider>
    </SearchProvider>
  );
};

export default AppProviders;
