import React, { createContext, useState } from 'react';

const OrderContext = createContext([]);

export const OrderProvider = ({ children }) => {
  const orderState = useState([]);

  return (
    <OrderContext.Provider value={orderState}>{children}</OrderContext.Provider>
  );
};

export default OrderContext;
