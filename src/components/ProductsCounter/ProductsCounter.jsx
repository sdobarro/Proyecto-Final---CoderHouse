import React, { useState } from "react";
import { useStore } from "../../store";

export const ProductsCounter = ({ max }) => {
  const cantidad = useStore((state) => state.quantity);
  const addQuantity = useStore((state) => state.addQuantity);
  const subtractQuantity = useStore((state) => state.subtractQuantity);

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row-reverse",
          gap: "15px",
        }}
      >
        <button className="btn btn-success" onClick={addQuantity}>
          {" "}
          +{" "}
        </button>
        <span> {cantidad}</span>
        <button className="btn btn-danger" onClick={subtractQuantity}>
          {" "}
          -{" "}
        </button>
      </div>
    </>
  );
};

export default ProductsCounter;
