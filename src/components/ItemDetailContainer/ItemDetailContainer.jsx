import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../productsmock";
import { ProductsCounter } from "../ProductsCounter/ProductsCounter";
import style from "./ItemDetailContainer.module.css";
import { useStore, useStoreNoPersist } from "../../store";
import { db } from "../../config/firebase";
import { getDocs, collection } from "firebase/firestore";

export const ItemDetailContainer = () => {
  const { id } = useParams();
  const setProducts = useStoreNoPersist((state) => state.setAllProduct);
  const itemCollection = collection(db, "items");

  const productos = useStore((state) => state.allProduct);
  const [product, setProduct] = useState();

  useEffect(() => {
    const getItemList = async () => {
      try {
        const data = await getDocs(itemCollection);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProducts(filteredData);
        const [res] = filteredData.filter((e) => e.id === id);
        setProduct(res);
       
      } catch (error) {
        console.log(error);
      }
    };
    if (productos.length > 0) {
      const [res] = productos.filter((e) => e.id === id);

      setProduct(res);
    } else {
      getItemList();
    }
  }, []);

  const addCart = useStore((state) => state.addCart);
  const quantity = useStore((state) => state.quantity);
  const article = useStore((state) => state.article);
  const AddNewarticle = useStore((state) => state.AddNewarticle);
  const setQuantityZero = useStore((state) => state.setQuantityZero);
  const setAmountCart = useStore((state) => state.setAmountCart);
  const curentProducts = useStore((state) => state.products);

  useEffect(() => {
    return () => {
      setQuantityZero();
    };
  }, []);

  if (!product) {
    return <div className={style.notFound}>please wait</div>;
  }

  const promise = (object) => {
    return new Promise((res) => {
      res(AddNewarticle(object));
    });
  };

  const addProductToCart = async () => {
    let data = {
      item: id,
      cantidad: quantity,
      name: product.name,
      img: product.img,
      price: product.price,
    };
   
    await promise(data).then(() => setQuantityZero());
  };

  return (
    <>
      <div className={style.contenedor}>
        <div className={style.contenedor__image}>
          <img src={product.img} alt="image product" />
        </div>
        <div className={style.contenedor__details}>
          <h3 className={style.contenedor__details__name}>{product.name}</h3>
          <p className={style.contenedor__details__description}>
            <span>Brand</span>: {product.brand}
          </p>
          <p className={style.contenedor__details__description}>
            <span>price</span>: ${product.price}
          </p>
          <p className={style.contenedor__details__description}>
            <span>description</span>: {product.description}
          </p>
          <p className={style.contenedor__details__description}>
            <span>stock</span>: {product.stock}
          </p>
          <p className={style.contenedor__details__description}>
            {" "}
            <span>category</span>: {product.category}
          </p>
        </div>
      </div>
      <div className={style.actions__btn}>
        <button
          disabled={quantity == 0}
          className="btn btn-primary"
          onClick={() => addProductToCart()}
        >
          {" "}
          Add to Cart{" "}
        </button>
        <ProductsCounter max={product.stock} />
      </div>
    </>
  );
};

export default ItemDetailContainer;
