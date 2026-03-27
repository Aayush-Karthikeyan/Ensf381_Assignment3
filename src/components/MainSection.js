import { useState, useEffect } from "react";
import flavors from "../data/flavors";
import reviews from "../data/reviews";

function MainSection() {
  const [featuredFlavors, setFeaturedFlavors] = useState([]);
  const [featuredReviews, setFeaturedReviews] = useState([]);

  useEffect(() => {
    const shuffledFlavors = [...flavors].sort(() => Math.random() - 0.5);
    setFeaturedFlavors(shuffledFlavors.slice(0, 3));

    const shuffledReviews = [...reviews].sort(() => Math.random() - 0.5);
    setFeaturedReviews(shuffledReviews.slice(0, 2));
  }, []);

  function renderStars(rating) {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
      stars += i <= rating ? "★" : "☆";
    }
    return stars;
  }

  return (
    <div className="main-section">
      <h2>About Sweet Scoop Ice Cream</h2>
      <p>
        <em>
          Welcome to Sweet Scoop Ice Cream — your neighborhood destination for
          handcrafted, delicious ice cream made with the freshest ingredients.
          Whether you love classic flavors or adventurous combinations, we have
          a scoop for everyone. Come in, explore our menu, and treat yourself!
        </em>
      </p>

      <h2>Featured Flavors</h2>
      <div className="flavor-grid">
        {featuredFlavors.map((flavor) => (
          <div key={flavor.id} className="flavor-card">
            <h3>{flavor.name}</h3>
            <p><em>{flavor.description}</em></p>
            <p>Price: {flavor.price}</p>
            <img src={flavor.image} alt={flavor.name} />
          </div>
        ))}
      </div>

      <h2>Customer Reviews</h2>
      {featuredReviews.map((review, index) => (
        <div key={index}>
          <p><strong>{review.customerName}</strong></p>
          <p>Rating: {renderStars(review.rating)}</p>
          <p><em>{review.review}</em></p>
        </div>
      ))}
    </div>
  );
}

export default MainSection;
