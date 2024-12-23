export const removeAllLocalCart = () => {
  localStorage.setItem("cart", '');
  window.dispatchEvent(new StorageEvent('storage', { key: "cart", newValue: '' }));

};