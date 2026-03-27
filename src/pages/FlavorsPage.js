import { useState } from "react";
import Header from "../components/Header";
import FlavorCatalog from "../components/FlavorCatalog";
import OrderList from "../components/OrderList";
import Footer from "../components/Footer";

function FlavorsPage() {
  const [lastAdded, setLastAdded] = useState(null);

  function handleAddToOrder(flavor) {
    setLastAdded({ ...flavor, _ts: Date.now() });
  }

  return (
    <div className="flavors-page">
      <Header />
      <div className="content">
        <FlavorCatalog onAddToOrder={handleAddToOrder} />
        <OrderList newItem={lastAdded} />
      </div>
      <Footer />
    </div>
  );
}

export default FlavorsPage;
