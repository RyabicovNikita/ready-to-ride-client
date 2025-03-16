import { useContext } from "react";
import { PriceModalContext } from "../context";

export const usePriceModalContext = () => {
  const { priceModalState, setPriceModalState } = useContext(PriceModalContext);
  return {
    priceModalHide: () => setPriceModalState({ isActive: false }),
    priceModalView: (data = {}) => setPriceModalState({ ...data, isActive: true }),
    priceModalState: priceModalState,
  };
};
