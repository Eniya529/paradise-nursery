import { useState } from 'react';
import AboutUs from './AboutUs.jsx';
import ProductList from './ProductList.jsx';
import './App.css';

function App() {
  // false = show the landing page, true = show the plants page
  const [showProductList, setShowProductList] = useState(false);

  const handleGetStartedClick = () => {
    setShowProductList(true);
  };

  // Passed down to ProductList so the navbar's Home link can come back here
  const handleHomeClick = () => {
    setShowProductList(false);
  };

  return (
    <div className="app">
      {!showProductList ? (
        <>
          <div className="landing-page">
            <div className="landing-content">
              <span className="landing-tag">Welcome to</span>
              <h1 className="landing-title">Paradise Nursery</h1>
              <p className="landing-subtitle">
                Where green meets serenity. Bring home healthy, hand-picked
                houseplants and turn any room into a little paradise.
              </p>
              <button className="get-started-btn" onClick={handleGetStartedClick}>
                Get Started
              </button>
            </div>
          </div>

          <AboutUs />
        </>
      ) : (
        <ProductList onHomeClick={handleHomeClick} />
      )}
    </div>
  );
}

export default App;