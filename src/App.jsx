import "./App.css";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavBar } from "./components/Navbar/NavBar";
import { ItemListContainer } from "./components/ItemListcontainer/ItemListContainer";
import { ProductsCounter } from "./components/ProductsCounter/ProductsCounter";
import { Card } from "./components/Card/Card";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";
import { Cart } from "./components/Cart/Carrito";
import Success from "./components/success/Success";
import { useStore, useStoreNoPersist } from "./store";
import { db } from "./config/firebase";
import { getDocs, collection } from "firebase/firestore";
import ItemHome from "./components/ItemHome/ItemHome";

function App() {
  const setProducts = useStoreNoPersist((state) => state.setAllProduct);
  const itemCollection = collection(db, "items");

  useEffect(() => {
    const getItemList = async () => {
      try {
        const data = await getDocs(itemCollection);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProducts(filteredData);
      } catch (error) {
        console.log(error);
      }
    };
    getItemList();
  }, []);

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <ItemHome greetings=" Bienvenidos a Only-Tech | Tienda Apple !" />
          }
        />
        <Route path="/item/:id" element={<ItemDetailContainer />} />
        <Route path="/category/:category" element={<ItemListContainer />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}

export default App;
