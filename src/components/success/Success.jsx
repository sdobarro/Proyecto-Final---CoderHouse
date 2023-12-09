import React, { useEffect } from "react";
import style from "./Success.module.css";
import { useStoreNoPersist } from "../../store";
import { useNavigate } from "react-router-dom";
const Success = () => {
  const navigate = useNavigate();
  const msgSuccess = useStoreNoPersist((state) => state.msgSuccess);
  const cleanMsgSuccess = useStoreNoPersist((state) => state.cleanMsgSuccess);

  useEffect(() => {
    setTimeout(() => {
      cleanMsgSuccess();
      navigate("/");
    }, 6000);
  }, []);

  return (
    <div className={style.contenedor}>
      {msgSuccess && (
        <>
          <p>Compra Realizada Exitosamente</p>
          <hr />

          <p>ID Compra '{msgSuccess}'</p>
        </>
      )}
    </div>
  );
};

export default Success;
