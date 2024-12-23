import { ICartRequset } from "@/interface/cart";
import { IProductResponseDetail } from "@/interface/product";
import toast from "react-hot-toast";

export async function sendTelegramMessageFromCart(
  phone:string,
  items: ICartRequset[],
  products: IProductResponseDetail[],
): Promise<void> {
  const itemsList = items
    .map(item => {
      const product = products.find(p => p.product_id === item.product_id);
      if (!product) return '';
      return `• ${product.product_name} x ${item.product_quantity} - ${(product.product_price * item.product_quantity).toFixed(2)}₽`;
    })
    .join('\n');

  const total = items.reduce((sum, item) => {
    const product = products.find(p => p.product_id === item.product_id);
    return sum + (product?.product_price || 0) * item.product_quantity;
  }, 0);

  const message = `Номер телефона: ${phone}\n\nНовый заказ\n\n${itemsList}\n\nИтого: ${total.toFixed(2)}₽`;

  const encodedMessage = encodeURIComponent(message);

  // Send message to Telegram Bot API
  const url = `https://api.telegram.org/bot7901839307:AAGaUbGMJZX8zHhEjkX8uUSLToF2hIr660M/sendMessage`;
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

    console.log("Message sent successfully!");
  } catch (error) {
    console.error("Failed to send message:", error);
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
  const url = `https://api.telegram.org/bot7901839307:AAGaUbGMJZX8zHhEjkX8uUSLToF2hIr660M/sendMessage`;
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
