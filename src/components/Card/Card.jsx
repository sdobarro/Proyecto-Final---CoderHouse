import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";
import { ItemDetailContainer } from "../ItemDetailContainer/ItemDetailContainer";

export const Card = ({ id, name, price, brand, img, description, stock }) => {
  return (
    // <div className="card card-custom h-100 m-10 my - 10 p-10" >
    <div className={style.contenedor}>
      {/* <img src={img} className="card-img-top"/> */}
      <div className={style.image}>
        <img src={img} alt="image-product" />
      </div>
      <Link to={`/item/${id}`}>
        {" "}
        <button className={style.card__btn}>Show Details</button>
      </Link>
      {/* <div className="card-body"> */}
      <div className={style.card__body}>
        <h5 className={style.card__title}> {name}</h5>
        <h6 className={style.card__price}> Price:$ {price}</h6>
      </div>
    </div>
  );
};

export default Card;
