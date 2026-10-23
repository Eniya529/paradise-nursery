import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice.jsx';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Subtotal for one row = price x quantity
  const calculateSubtotal = (item) => item.cost * item.quantity;

  // Grand total = sum of every row's subtotal
  const calculateTotalAmount = () =>
    cartItems.reduce((sum, item) => sum + calculateSubtotal(item), 0);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // Quantity would hit 0, so remove the plant instead
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    alert('Coming Soon');
  };

  // ----- Empty cart -----
  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <span className="cart-empty-icon">🪴</span>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't picked any plants yet.</p>
          <button className="cart-btn primary" onClick={onContinueShopping}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // ----- Cart with items -----
  return (
    <div className="cart-page">
      <h2 className="cart-heading">Your Cart</h2>
      <p className="cart-total-amount">
        Total: <strong>${calculateTotalAmount().toFixed(2)}</strong>
      </p>

      <div className="cart-list">
        {cartItems.map((item) => (
          <div className="cart-row" key={item.name}>
            <img className="cart-thumb" src={item.image} alt={item.name} />

            <div className="cart-details">
              <h3 className="cart-item-name">{item.name}</h3>
              <p className="cart-unit-price">${item.cost} each</p>

              <div className="qty-controls">
                <button
                  className="qty-btn"
                  onClick={() => handleDecrement(item)}
                  aria-label={`Decrease quantity of ${item.name}`}
                >
                  −
                </button>
                <span className="qty-value">{item.quantity}</span>
                <button
                  className="qty-btn"
                  onClick={() => handleIncrement(item)}
                  aria-label={`Increase quantity of ${item.name}`}
                >
                  +
                </button>
              </div>
            </div>

            <div className="cart-row-end">
              <p className="cart-subtotal">${calculateSubtotal(item).toFixed(2)}</p>
              <button className="cart-delete" onClick={() => handleRemove(item)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-actions">
        <button className="cart-btn secondary" onClick={onContinueShopping}>
          Continue Shopping
        </button>
        <button className="cart-btn primary" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartItem;