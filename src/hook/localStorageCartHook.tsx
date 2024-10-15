interface Product {
  product_id: number;
  product_price: number;
  product_quantity: number;
}

function useLocalCart() {
  const getLocalCart = (): Product[] => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  };

  const addLocalCart = (product: Product, isCartPage:boolean = false) => {
    const currentCart = getLocalCart();
    const existingProductIndex = currentCart.findIndex((item) => item.product_id === product.product_id);
    if (existingProductIndex === -1) {
      // Add new product to cart
      const updatedCart = [...currentCart, product];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      // Update existing product quantity
      let updatedProduct;
      if(isCartPage){
         updatedProduct = { ...currentCart[existingProductIndex], product_quantity:product.product_quantity };
      }else{
        updatedProduct = { ...currentCart[existingProductIndex], product_quantity: currentCart[existingProductIndex].product_quantity + product.product_quantity };

      }
      const updatedCart = [...currentCart.slice(0, existingProductIndex), updatedProduct, ...currentCart.slice(existingProductIndex + 1)];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const removeLocalCart = (productId: number) => {
    const currentCart = getLocalCart();
    const updatedCart = currentCart.filter((product) => product.product_id !== productId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return { getLocalCart, addLocalCart, removeLocalCart };
}

export default useLocalCart;