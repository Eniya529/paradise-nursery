import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice.jsx';
import { plantsArray } from './plantsData.js';
import './ProductList.css';

function ProductList({ onHomeClick }) {
  // false = show the plants, true = show the cart
  const [showCart, setShowCart] = useState(false);

  const dispatch = useDispatch();

  // Read the cart items from the Redux store (state.cart.items)
  const cartItems = useSelector((state) => state.cart.items);

  // Total number of plants in the cart = sum of every item's quantity
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Is this plant already in the cart? (derived from the store, no extra state)
  const isInCart = (plantName) =>
    cartItems.some((item) => item.name === plantName);

  // Send the plant to Redux. The reducer adds quantity: 1 for us.
  const handleAddToCart = (plant) => {
    dispatch(
      addItem({
        name: plant.name,
        image: plant.image,
        cost: plant.cost,
      })
    );
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    onHomeClick();
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  return (
    <div className="product-page">
      {/* ===== Navbar (visible on both the Plants view and the Cart view) ===== */}
      <nav className="navbar">
        <a href="#home" className="navbar-brand" onClick={handleHomeClick}>
          <span className="navbar-logo">🌿</span>
          <span className="navbar-name">Paradise Nursery</span>
        </a>

        <div className="navbar-links">
          <a href="#home" className="nav-link" onClick={handleHomeClick}>
            Home
          </a>
          <a
            href="#plants"
            className={`nav-link ${!showCart ? 'active' : ''}`}
            onClick={handlePlantsClick}
          >
            Plants
          </a>
          <a
            href="#cart"
            className={`nav-link cart-link ${showCart ? 'active' : ''}`}
            onClick={handleCartClick}
            aria-label={`Cart with ${totalQuantity} items`}
          >
            <svg
              className="cart-icon"
              viewBox="0 0 24 24"
              width="26"
              height="26"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
            </svg>
            {/* key={totalQuantity} restarts the pop animation whenever the count changes */}
            <span key={totalQuantity} className="cart-badge">
              {totalQuantity}
            </span>
          </a>
        </div>
      </nav>

      {/* ===== Page content ===== */}
      {!showCart ? (
        <div className="plants-view">
          {/* Outer loop: one section per category */}
          {plantsArray.map((category) => (
            <section className="category-section" key={category.category}>
              <h2 className="category-title">{category.category}</h2>

              <div className="plant-grid">
                {/* Inner loop: one card per plant in this category */}
                {category.plants.map((plant, index) => {
                  const added = isInCart(plant.name);

                  return (
                    <article
                      className="plant-card"
                      key={plant.name}
                      style={{ animationDelay: `${index * 80}ms` }}
                    >
                      <div className="plant-image-wrap">
                        <img
                          className="plant-image"
                          src={plant.image}
                          alt={plant.name}
                          loading="lazy"
                        />
                      </div>
                      <div className="plant-info">
                        <h3 className="plant-name">{plant.name}</h3>
                        <p className="plant-description">{plant.description}</p>
                        <p className="plant-price">${plant.cost}</p>
                        <button
                          className={`add-btn ${added ? 'added' : ''}`}
                          onClick={() => handleAddToCart(plant)}
                          disabled={added}
                        >
                          {added ? 'Added ✓' : 'Add to Cart'}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="cart-view">
          <h2 className="placeholder">Cart will appear here</h2>
        </div>
      )}
    </div>
  );
}

export default ProductList;