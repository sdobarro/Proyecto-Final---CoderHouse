import React, { useEffect, useState } from "react";
import style from "./ItemHome.module.css";
import { Card } from "../Card/Card";
import { useParams } from "react-router-dom";
import { getProducts } from "../../productsmock";
import ItemDetailContainer from "../ItemDetailContainer/ItemDetailContainer";
import { ProductsCounter } from "../ProductsCounter/ProductsCounter";
import { useStore, useStoreNoPersist } from "../../store";
import { db } from "../../config/firebase";
import { getDocs, collection } from "firebase/firestore";

export const ItemHome = (props) => {
  const category = useParams().category;

  const products = useStoreNoPersist((state) => state.allProduct);

 
  return (
    <div>
      <h1 style={{ textAlign: "center" }}> {props.greetings}</h1>
      <h2 style={{ textAlign: "center" }}> Productos de la tienda </h2>
      <div className={style.contenedor__cards}>
        {products?.length > 0 &&
          products.map((product) => (
            <div className={style.contenedor__cards__list} key={product.id}>
              <Card
                name={product.name}
                brand={product.brand}
                img={product.img}
                stock={product.stock}
                price={product.price}
                id={product.id}
                category={product.category}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ItemHome;
