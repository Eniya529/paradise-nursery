import { useState } from 'react';
import AboutUs from './AboutUs.jsx';
import './App.css';

function App() {
  // false = show the landing page, true = show the plants page
  const [showProductList, setShowProductList] = useState(false);

  const handleGetStartedClick = () => {
    setShowProductList(true);
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
        <div>
          {/* Temporary placeholder. We'll replace this with <ProductList /> soon */}
          <h2>Plants page coming soon</h2>
        </div>
      )}
    </div>
  );
}

export default App;