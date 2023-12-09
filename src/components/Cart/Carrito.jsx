import React, { useEffect, useRef, useState } from "react";
import { useStore , useStoreNoPersist} from "../../store";
import style from "./Carrito.module.css";
import { useNavigate } from "react-router-dom";
import {getFirestore, collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoc} from 'firebase/firestore';
import {db} from '../../config/firebase';
export const Cart = () => {
  const dialog = useRef(null);
  const navigate = useNavigate();
  const article = useStore((state) => state.article);
  const resetActicle = useStore((state) => state.resetActicle);

  const setMsgSuccess = useStoreNoPersist((state) => state.setMsgSuccess);
  const desactiveDialog = () => {
    const elem = dialog.current;
    elem.open = false;
  };

  const activeDialog = () => {
    const elem = dialog.current;
    elem.open = true;
  };

  const [isEmpty, setIsEmpty] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [showError, setShowError] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    confirmEmail: "",
  });

  const handleChange = (e) => {
    let { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const promise = () => {
    return new Promise((res) => {
      res({
        msg: `Tu compra se ha realizado correctamente, order id: ${crypto.randomUUID()}`,
      });
    });
  };

  const comprarProductos = (e) => {
    e.preventDefault();
    if (form.email != form.confirmEmail) {
      setForm({
        ...form,
        email: "",
        confirmEmail: "",
      });
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);

      return;
    }
    setForm({
      name: "",
      phone: "",
      email: "",
      confirmEmail: "",
    });
    setIsSending(true);
    setTimeout(async () => {
      setIsSending(false);

      // POST A FIREBASE
     
      await addDoc(collection(db, 'orders'), {
        ...form,
        ...article
      }).then(e => {
        setMsgSuccess(e.id);
  
      }).then(() => {
        resetActicle() 
        navigate("/success")
      })
      .catch(error => {
        console.log(error)
      })  
          
    }, 500);
  };

  useEffect(() => {
    if (Object.values(form).includes("")) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
    }
  }, [form]);

  return (
    <>
      <h2 className={style.titleSection}>Carrito</h2>

      <div className={style.contenedor}>
        {article.map((e) => (
          <CardProduct
            name={e.name}
            key={e.item}
            item={e.item}
            cantidad={e.cantidad}
            img={e.img}
            price={e.price}
          />
        ))}
        {!article.length == 0 ? (
          <TotalOrden handleButton={activeDialog} />
        ) : null}
      </div>
      {article.length == 0 ? <Title /> : null}

      <dialog ref={dialog} className={style.confirmProducts}>
        <div
          onClick={desactiveDialog}
          className={style.confirmProducts__opacity}
        ></div>

        <div className={style.confirmProducts__modal}>
          <div className={style.modal__products}>
            {article.map((e) => (
              <div className={style.overviewbeforePurchase}>
                <p>{e.name}</p>
                <p>${e.price}.00</p>
                <p>x{e.cantidad}</p>
                <p>${(e.price * e.cantidad)}.00</p>
              </div>
            ))}
          </div>

          <form onSubmit={(e) => comprarProductos(e)}>
            <div className={style.inputDetail}>
              <div className={style.inputs__content}>
                <input
                  onChange={(e) => handleChange(e)}
                  name="name"
                  type="text"
                  value={form.name}
                  placeholder="eg. Mario Ruiz"
                />
              </div>
              <div className={style.inputs__content}>
                <input
                  onChange={(e) => handleChange(e)}
                  name="phone"
                  type="tel"
                  value={form.phone}
                  placeholder="1122334455"
                />
              </div>
            </div>
            <div className={style.inputDetail}>
              <div className={style.inputs__content}>
                <input
                  onChange={(e) => handleChange(e)}
                  name="email"
                  type="email"
                  value={form.email}
                  placeholder="user@example.com"
                />
              </div>
              <div className={style.inputs__content}>
                <input
                  onChange={(e) => handleChange(e)}
                  name="confirmEmail"
                  type="email"
                  value={form.confirmEmail}
                  placeholder="user@example.com"
                />
              </div>
            </div>
            {showError && (
              <span className={style.error}>Mail deben coindicir</span>
            )}
            <button
              className={style.submitButton}
              type="submit"
              disabled={isEmpty}
            >
              {isSending ? (
                <div className={style.loader}></div>
              ) : (
                "Finalizar compra"
              )}
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

const CardProduct = ({ item, cantidad, name, img, price }) => {
  const deleteArticleFromArray = useStore(
    (state) => state.deleteArticleFromArray
  );

  let image =
    "https://http2.mlstatic.com/D_NQ_NP_779146-MLA53778959612_022023-O.webp";
  //  let name = 'AirPods 2023'
  return (
    <>
      <div className={style.contenedor__card}>
        <div className={style.contenedor__image}>
          <img src={img} />
        </div>
        <p title={name} className={style.contenedor__name}>
          {name}
        </p>
        <p>${price}.00</p>
        <div className={style.contenedor__quantity}>
          <b>{cantidad}</b>
        </div>
        <p className={style.contenedor__subtotal}>
          ${(price * cantidad)}.00
        </p>
        <button
          onClick={() => deleteArticleFromArray(item)}
          className={style.contenedor__button}
        >
          <DeleteIcon />
        </button>
      </div>

      <div className={style.contenedor__mediaquery}>
        <div className={style.mediaquery__left}>
          <div className={style.contenedor__image}>
            <img src={img} />
          </div>
          <p title={name} className={style.contenedor__name}>
            {name}
          </p>
        </div>

        <div className={style.mediaquery__right}>
          <div className={style.mediaquery__price}>
            <p>${price}.00</p>

            <div className={style.contenedor__quantity}>
              <b>{cantidad}</b>
            </div>
          </div>

          <div className={style.mediaquery__subtotal}>
            <p className={style.contenedor__subtotal}>
              ${(price * cantidad)}.00
            </p>
            <button
              onClick={() => deleteArticleFromArray(item)}
              className={style.contenedor__button}
            >
              <DeleteIcon />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const DeleteIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="128"
      height="128"
      viewBox="0 0 24 24"
    >
      <path
        fill="#000"
        d="M9.4 16.5l2.6-2.6 2.6 2.6 1.4-1.4-2.6-2.6L16 9.9l-1.4-1.4-2.6 2.6-2.6-2.6L8 9.9l2.6 2.6L8 15.1l1.4 1.4zM7 21q-.825 0-1.413-.588T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.588 1.413T17 21H7z"
      ></path>
    </svg>
  );
};

const Title = () => {
  return (
    <div className={style.empty}>
      <p>El carrito esta vacio</p>
      <span>Agrega Productos</span>
    </div>
  );
};

const TotalOrden = ({ handleButton }) => {
  const article = useStore((state) => state.article);
  const totalCompra = article.reduce((acc, cur) => {
    acc = acc + cur.cantidad * cur.price;
    return acc;
  }, 0);
  return (
    <div className={style.totalOrden}>
      <div className={style.totalOrden__contenedor}>
        <button className={style.totalOrden__payButton} onClick={handleButton}>
          PAGAR
        </button>
      </div>
      <p className={style.totalCompra__purchase}>
        Total a pagar: <b>${totalCompra}</b>
      </p>
    </div>
  );
};

// export default DeleteIcon;
