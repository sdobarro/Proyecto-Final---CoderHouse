import { create } from "zustand";

import { persist, createJSONStorage } from "zustand/middleware";

export const useStore = create(
  persist(
    (set, get) => ({
      allProduct: [], // GET DESDE FIREBASE
      article: [],
      cart: 0,
      quantity: 0,
      msgSuccess: "",
      cantidadInCart: 0,
      setAllProduct: (products) => set((state) => ({ allProduct: products })),

      setMsgSuccess: (msg) => set((state) => ({ msgSuccess: msg })),
      setQuantityZero: () => set((state) => ({ quantity: 0 })),
      setAmountCart: (number) =>
        set((state) => ({ cart: state.cart + number })),
      addQuantity: () => set((state) => ({ quantity: state.quantity + 1 })),
      subtractQuantity: () =>
        set((state) => ({
          quantity: state.quantity > 0 ? state.quantity - 1 : state.quantity,
        })),
      addCart: () => set((state) => ({ cart: state.cart + 1 })),
      updatecart: () => {
        const article = get().article;
        set({ cart: article.length });
      },
      updateCantidadInCart: () => {
        const article = get().article;
        let n = article.reduce((acc, cur) => {
          acc = acc + cur.cantidad;
          return acc;
        }, 0);
        set({ cantidadInCart: n });
      },
      AddNewarticle: (newProduct) => {
        const prev = get().article;
        const [data] = prev.filter(
          (element) => element.item === newProduct.item
        );
        const idx = prev.findIndex(
          (element) => element.item === newProduct.item
        );
        if (data) {
          data.cantidad = data.cantidad + newProduct.cantidad;
          prev.splice(idx, 1, data);
          set((state) => ({ article: prev }));
        } else {
          set((state) => ({ article: [...state.article, newProduct] }));
        }
        get().updatecart();
        get().updateCantidadInCart();
      },

      deleteArticleFromArray: (idToRemove) => {
        set((state) => ({
          article: state.article.filter(
            (product) => product.item !== idToRemove
          ),
        }));
        get().updatecart();
        get().updateCantidadInCart();
      },
      resetActicle: () => {
        set((state) => ({ article: [] }));
        get().updatecart();
        get().updateCantidadInCart();
      },
    }),
    {
      name: "product-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export const useStoreNoPersist = create((set) => ({
  allProduct: [],
  setAllProduct: (products) => set((state) => ({ allProduct: products })),
  msgSuccess: "",
  setMsgSuccess: (msg) => set((state) => ({ msgSuccess: msg })),
  cleanMsgSuccess: () => set((state) => ({ msgSuccess: "" })),
}));
