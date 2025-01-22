import useLocalCart from "@/hook/localStorageCartHook";
import { removeAllLocalCart } from "@/hook/removeAllLocal";
import { ICartRequset } from "@/interface/cart";
import { IProductResponseDetail, product_additional_prices } from "@/interface/product";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";



export async function sendTelegramMessageFromCart(
  phone: string,
  items: ICartRequset[],
  products: IProductResponseDetail[],
): Promise<void> {
  // Function to calculate the applicable price based on product_additional_prices
  const calculatePrice = (
    basePrice: number,
    additionalPrices: product_additional_prices[],
    quantity: number
  ): number => {
    // Sort additional prices in descending order of product_from
    const applicablePrice =
      additionalPrices
        ?.sort((a, b) => Number(b.product_from) - Number(a.product_from))
        .find((price) => quantity >= Number(price.product_from))
        ?.product_additional_price || basePrice;

    return applicablePrice;
  };

  // Generate item list with updated prices
  const itemsList = items
  .map((item) => {
    const product = products.find((p) => p.product_id === item.product_id);
    if (!product) return "";
    const price = calculatePrice(
      product.product_price,
      product.product_additional_prices || [],
      item.product_quantity
    );
    return `• ${product.product_name} x ${item.product_quantity} (${price.toFixed(
      2
    )}₽ за единицу) - ${(price * item.product_quantity).toFixed(2)}₽`;
  })
  .join("\n");

  // Calculate total considering additional prices
  const total = items.reduce((sum, item) => {
    const product = products.find((p) => p.product_id === item.product_id);
    if (!product) return sum;
    const price = calculatePrice(
      product.product_price,
      product.product_additional_prices || [],
      item.product_quantity
    );
    return sum + price * item.product_quantity;
  }, 0);

  // Create message
  const message = `Номер телефона: ${phone}\n\nНовый заказ\n\n${itemsList}\n\nИтого: ${total.toFixed(2)}₽`;

  const encodedMessage = encodeURIComponent(message);

  // Send message to Telegram Bot API
  const url = `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_BOT_TOKEN}/sendMessage`;
  const body = JSON.stringify({
    chat_id: "-1002346045711",
    text: message,
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
    });

    if (!response.ok) {
      throw new Error(`Telegram API responded with status: ${response.status}`);
    }

    toast.success("Ваш заказ успешно отправлено, в течении 10 минут с вами свяжется наш менеджер.");
    removeAllLocalCart();
  } catch (error) {
    toast.error("Ошибка при отправке");
  }
}


export async function sendTelegramMessageFromContact(
  name:string,
  phone:string,
  email:string,
  messageText:string,
  from:string,
): Promise<void> {

  const message = `Откуда: ${from}\n\nИмя: ${name}\n\nНомер телефона: ${phone}\n\nПочта: ${email}\n\nСообщение: ${messageText}`;

  const encodedMessage = encodeURIComponent(message);

  // Send message to Telegram Bot API
  const url = `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_BOT_TOKEN}/sendMessage`;
  const body = JSON.stringify({
    chat_id: "-1002346045711",
    text: message,
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body,
    });

    if (!response.ok) {
      throw new Error(`Telegram API responded with status: ${response.status}`);
    }

    toast.success("Ваше сообщение успешно отправлено, в течении 10 минут с вами свяжется наш менеджер.");
  } catch (error) {
    toast.error("Ошибка при отправке")
  }
}
