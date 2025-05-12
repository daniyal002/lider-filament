import { product_additional_prices } from "@/interface/product";
import { lengthLocalCartAtom } from "@/store/cartStore";
import { useAtom } from "jotai";
import toast from "react-hot-toast";

interface Product {
  product_id: number;
  product_price: number;
  product_quantity: number;
  product_additional_prices:product_additional_prices[]
}

function useLocalCart() {
  const [cartLength, setCartLength] = useAtom(lengthLocalCartAtom)

  const getLocalCart = (): Product[] => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  };

  const addLocalCart = (product: Product, isCartPage:boolean = false) => {
    console.log(product)
    const currentCart = getLocalCart();
    const existingProductIndex = currentCart.findIndex((item) => item.product_id === product.product_id);
    if (existingProductIndex === -1) {
      // Add new product to cart
      const updatedCart = [...currentCart, product];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      if(window.location.pathname !== "/cart" ) {
        toast.success("Товар успешно добавлен в корзину!")
      }
      setCartLength(updatedCart.length)
    } else {
      // Update existing product quantity
      let updatedProduct;
      let updatedCart;
      if(isCartPage){
         updatedProduct = { ...currentCart[existingProductIndex], product_quantity:product.product_quantity };
      }
      else{
        updatedProduct = { ...currentCart[existingProductIndex], product_quantity: currentCart[existingProductIndex].product_quantity + product.product_quantity };
      }
      
      updatedCart = [...currentCart.slice(0, existingProductIndex), updatedProduct, ...currentCart.slice(existingProductIndex + 1)];
      if(product.product_quantity <= 0){
        updatedCart = currentCart.filter((currentProduct) => currentProduct.product_id !== product.product_id);
      }
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      window.dispatchEvent(new StorageEvent('storage', { key: "cart", newValue: JSON.stringify(updatedCart) }));
      if(window.location.pathname !== "/cart" ) {
        toast.success("Товар успешно добавлен в корзину!")
      }
      setCartLength(updatedCart.length)
    }
  };

  const removeLocalCart = (productId: number) => {
    const currentCart = getLocalCart();
    const updatedCart = currentCart.filter((product) => product.product_id !== productId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new StorageEvent('storage', { key: "cart", newValue: JSON.stringify(updatedCart) }));
    setCartLength(updatedCart.length)
  };

  const removeAllLocalCart = () => {
    localStorage.setItem("cart", '');
    window.dispatchEvent(new StorageEvent('storage', { key: "cart", newValue: '' }));
    setCartLength(0)
  };

  return { cartLength,getLocalCart, addLocalCart, removeLocalCart,removeAllLocalCart };
}

export default useLocalCart;