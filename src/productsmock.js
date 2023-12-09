const products = [
  {
    id: "1",
    category: "celular",
    name: "iPhone 11",
    price: 530,
    brand: "Apple",
    description: "Celular Inteligente",
    img: "https://http2.mlstatic.com/D_NQ_NP_656548-MLA46114829749_052021-O.webp",
    stock: 15,
  },
  {
    id: "2",
    category: "celular",
    name: "iPhone 12",
    price: 630,
    brand: "Apple",
    description: "Celular Inteligente",
    img: "https://http2.mlstatic.com/D_NQ_NP_743195-MLA45719932493_042021-O.webp",
    stock: 11,
  },
  {
    id: "3",
    category: "celular",
    name: "iPhone 13",
    price: 830,
    brand: "Apple",
    description: "Celular Inteligente",
    img: "https://http2.mlstatic.com/D_NQ_NP_973345-MLA47781591382_102021-O.webp",
    stock: 2,
  },
  {
    id: "4",
    category: "celular",
    name: "iPhone 14",
    price: 930,
    brand: "Apple",
    description: "Celular Inteligente",
    img: "https://http2.mlstatic.com/D_NQ_NP_864844-MLM51559388062_092022-O.webp",
    stock: 5,
  },
  {
    id: "5",
    category: "reloj",
    name: "Apple Watch 3",
    price: 150,
    brand: "Apple",
    description: "Reloj Inteligente",
    img: "https://http2.mlstatic.com/D_NQ_NP_985061-MLA46397868333_062021-O.webp",
    stock: 7,
  },
  {
    id: "6",
    category: "reloj",
    name: "Apple Watch 4",
    price: 250,
    brand: "Apple",
    description: "Reloj Inteligente",
    img: "https://http2.mlstatic.com/D_NQ_NP_944523-MLA54038927848_022023-O.webp",
    stock: 23,
  },
  {
    id: "7",
    category: "reloj",
    name: "Apple Watch 5",
    price: 350,
    brand: "Apple",
    description: "Reloj Inteligente",
    img: "https://http2.mlstatic.com/D_NQ_NP_623117-MLA43978688478_112020-O.webp",
    stock: 12,
  },
  {
    id: "8",
    category: "reloj",
    name: "Apple Watch 6",
    price: 450,
    brand: "Apple",
    description: "Reloj Inteligente",
    img: "https://http2.mlstatic.com/D_NQ_NP_698428-MLA46220008583_052021-O.webp",
    stock: 1,
  },
  {
    id: "9",
    category: "airpods",
    name: "AirPods 2",
    price: 200,
    brand: "Apple",
    description: "auriculares inalambricos",
    img: "https://http2.mlstatic.com/D_NQ_NP_695135-MLA42770626210_072020-O.webp",
    stock: 4,
  },
  {
    id: "10",
    category: "airpods",
    name: "AirPods 3",
    price: 230,
    brand: "Apple",
    description: "auriculares inalambricos",
    img: "https://http2.mlstatic.com/D_NQ_NP_787340-MLA71300864715_082023-O.webp",
    stock: 2,
  },
  {
    id: "11",
    category: "airpods",
    name: "AirPods Pro",
    price: 250,
    brand: "Apple",
    description: "auriculares inalambricos",
    img: "https://http2.mlstatic.com/D_NQ_NP_779146-MLA53778959612_022023-O.webp",
    stock: 3,
  },
  {
    id: "12",
    category: "airpods",
    name: "AirPods Pro 2",
    price: 300,
    brand: "Apple",
    description: "auriculares inalambricos",
    img: "https://http2.mlstatic.com/D_NQ_NP_651993-MLU69974057583_062023-O.webp",
    stock: 8,
  },
  {
    id: "13",
    category: "airpods",
    name: "AirPods Pro 2",
    price: 300,
    brand: "Apple",
    description: "auriculares inalambricos",
    img: "https://http2.mlstatic.com/D_NQ_NP_651993-MLU69974057583_062023-O.webp",
    stock: 8,
  },
  {
    id: "14",
    category: "airpods",
    name: "AirPods Pro 2",
    price: 300,
    brand: "Apple",
    description: "auriculares inalambricos",
    img: "https://http2.mlstatic.com/D_NQ_NP_651993-MLU69974057583_062023-O.webp",
    stock: 8,
  },
  {
    id: "15",
    category: "airpods",
    name: "AirPods Pro 2",
    price: 300,
    brand: "Apple",
    description: "auriculares inalambricos",
    img: "https://http2.mlstatic.com/D_NQ_NP_651993-MLU69974057583_062023-O.webp",
    stock: 8,
  },
  {
    id: "16",
    category: "airpods",
    name: "AirPods Pro 2",
    price: 300,
    brand: "Apple",
    description: "auriculares inalambricos",
    img: "https://http2.mlstatic.com/D_NQ_NP_651993-MLU69974057583_062023-O.webp",
    stock: 8,
  },
];

export const getProducts = () => {
  return new Promise((resolve, reject) => {
    if (products.length > 0) {
      setTimeout(() => {
        resolve(products);
      }, 1000);
    } else {
      reject("No hay Stock");
    }
  });
};
export const getProductById = (productId) => {
  return new Promise((resolve, reject) => {
    const product = products.find((item) => item.id === productId);
    if (product) {
      resolve(product);
    } else {
      reject(new Error("No se a encontrado el producto"));
    }
  });
};
