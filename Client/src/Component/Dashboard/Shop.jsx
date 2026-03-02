import React, { useState, useEffect } from 'react';
import { fetchShopItems, purchaseShopItem } from '../../api';
import { FaCoins, FaFlask, FaShieldAlt, FaTrophy, FaMagic, FaShoppingCart } from "react-icons/fa";
import { toast } from 'react-hot-toast';
import GuildLoading from './GuildLoading';

const Shop = ({ userData }) => {
  const [shopItems, setShopItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  // Maintain local gold state for immediate UI updates
  const [currentGold, setCurrentGold] = useState(userData?.gold || 0);

  useEffect(() => {
    const loadShop = async () => {
      try {
        const response = await fetchShopItems();
        if (response.data.success) {
          setShopItems(response.data.items);
        }
      } catch (err) {
        console.error("Shop Load Error:", err);
        toast.error(`Merchant Error: ${err.response?.data?.message || err.message}`);
      } finally {
        setLoading(false);
      }
    };
    loadShop();
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case "Consumable": return <FaFlask />;
      case "Gear": return <FaShieldAlt />;
      case "Special": return <FaTrophy />;
      default: return <FaMagic />;
    }
  };

  const handleBuy = async (item) => {
    if (currentGold < item.price) {
      toast.error("Not enough Gold! Complete quests to earn more.");
      return;
    }

    setPurchasing(true);
    try {
      const response = await purchaseShopItem(item.id);
      if (response.data.success) {
        toast.success(response.data.message);
        setCurrentGold(response.data.updatedStats.gold);
        // We could also update inventory here if we were displaying it
      }
    } catch (err) {
      console.error("Purchase Error:", err);
      toast.error(err.response?.data?.message || "Transaction failed.");
    } finally {
      setPurchasing(false);
    }
  };

  if (loading) return <GuildLoading />;

  return (
    <div className="rpg-shop">
      <header className="shop-header">
        <h1 className="section-title">The Guild Merchant</h1>
        <div className="gold-display animated-gold">
          <FaCoins className="gold-icon" />
          <span>{currentGold} Gold</span>
        </div>
      </header>

      <div className="shop-grid">
        {shopItems.map(item => (
          <div key={item.id} className="shop-card">
            <div className={`item-icon type-${item.type.toLowerCase()}`}>{getIcon(item.type)}</div>
            <div className="item-info">
              <h3>{item.name}</h3>
              <p>{item.desc}</p>
              <div className="item-footer">
                <span className="price">{item.price} Gold</span>
                <button
                  className="buy-btn"
                  onClick={() => handleBuy(item)}
                  disabled={purchasing || currentGold < item.price}
                >
                  {purchasing ? 'Buying...' : <><FaShoppingCart /> Buy</>}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
