import { ICartRequset } from "@/interface/cart";
import { IProductResponse, IProductResponseDetail } from "@/interface/product";

export function formatWhatsAppMessage(
  items: ICartRequset[],
  products: IProductResponseDetail[],
): string {
  const itemsList = items
    .map(item => {
      const product = products.find(p => p.product_id === item.product_id);
      if (!product) return '';
      return `• ${product.product_id} x${item.product_quantity} - ${(product.product_price * item.product_quantity).toFixed(2)}₽`;
    })
    .join('\n');

  const total = items.reduce((sum, item) => {
    const product = products.find(p => p.product_id === item.product_id);
    return sum + (product?.product_price || 0) * item.product_quantity;
  }, 0);

  const message = `Новый заказ \n\n${itemsList}\n\nИтого: ${total.toFixed(2)}₽`;
  return encodeURIComponent(message);
}

// export function getWhatsAppLink(message: string): string {
//   return `https://wa.me/${tel}?text=${message}`;
// }