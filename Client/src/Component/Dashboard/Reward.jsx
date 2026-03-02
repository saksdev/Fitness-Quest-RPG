import React, { useState, useEffect } from 'react';
import { fetchRewardStatus, claimReward, claimDailyReward } from '../../api';
import { FaBoxOpen, FaGem, FaCoins, FaGift } from "react-icons/fa";
import { toast } from 'react-hot-toast';
import GuildLoading from './GuildLoading';

const Reward = ({ userData, setGlobalLoading }) => {
  const [inventory, setInventory] = useState([]);
  const [isOpening, setIsOpening] = useState(false);
  const [dailyStatus, setDailyStatus] = useState({ available: false, loading: false });
  const [status, setStatus] = useState({ availableChests: 0, nextMilestone: 2 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRewards = async () => {
      try {
        if (setGlobalLoading) setGlobalLoading(true);
        setIsLoading(true);
        const response = await fetchRewardStatus();
        if (response.data.success) {
          setStatus({
            availableChests: response.data.availableChests,
            nextMilestone: response.data.nextMilestone,
          });
          setDailyStatus(prev => ({ ...prev, available: response.data.dailyRewardAvailable }));
          setInventory(response.data.inventory || []);
        }
      } catch (err) {
        console.error('Failed to load rewards:', err);
      } finally {
        setIsLoading(false);
        if (setGlobalLoading) setGlobalLoading(false);
      }
    };
    loadRewards();
  }, [setGlobalLoading]);

  const handleClaimDaily = async () => {
    if (!dailyStatus.available) return;

    setDailyStatus(prev => ({ ...prev, loading: true }));
    try {
      const response = await claimDailyReward();
      if (response.data.success) {
        setDailyStatus(prev => ({ ...prev, available: false, loading: false }));
        toast.success(
          <div>
            <strong>Daily Login Bonus!</strong><br />
            <span style={{ color: '#ffd700' }}>+ {response.data.xpGain} XP</span>
          </div>,
          {
            icon: '🌞',
            style: { background: '#1a1a3a', color: '#fff', border: '1px solid #ffd700' }
          }
        );
        // Refresh specific parts if needed, though header XP might need global context refresh
        // For now, user sees the toast
      }
    } catch (err) {
      console.error('Daily Claim Error:', err);
      toast.error(err.response?.data?.message || "Failed to claim daily reward.");
      setDailyStatus(prev => ({ ...prev, loading: false }));
    }
  };

  const openChest = async () => {
    if (status.availableChests <= 0) {
      toast.error("No chests available! Seek higher levels, traveler.");
      return;
    }

    setIsOpening(true);
    try {
      const response = await claimReward();
      if (response.data.success) {
        const loot = response.data.loot;
        setInventory(response.data.inventory);
        setStatus(prev => ({ ...prev, availableChests: prev.availableChests - 1 }));

        toast.success(
          <div>
            <strong>You found: {loot.name}!</strong><br />
            <span>Bonus: {loot.bonus}</span><br />
            <span style={{ color: '#ffd700' }}>+ {response.data.bonusGold} Gold</span>
          </div>,
          {
            icon: '🎁',
            style: { background: '#1a1a3a', color: '#fff', border: '1px solid #ffd700' }
          }
        );
      }
    } catch (err) {
      console.error('Chest Open Error:', err);
      toast.error("The chest is magically sealed. Try again.");
    } finally {
      setIsOpening(false);
    }
  };

  if (isLoading) return <GuildLoading />;

  return (
    <div className="rpg-rewards">
      <h1 className="section-title">Hero's Loot</h1>

      {/* Daily Reward Section */}
      <div className="chest-section daily-section" style={{ marginBottom: '30px', background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.05), rgba(0, 0, 0, 0.4))' }}>
        <h2 className="inventory-title" style={{ border: 'none', marginBottom: '10px' }}>Daily Gift</h2>
        <div className={`chest-container ${dailyStatus.loading ? 'pulse-gold' : ''}`}>
          <FaGift className="chest-icon" style={{ fontSize: '3rem', color: dailyStatus.available ? '#ffd700' : '#555' }} />
        </div>
        <div className="loot-status">
          <p className="chest-hint">
            {dailyStatus.available
              ? "A gift from the guild masters awaits you!"
              : "You have claimed today's reward. Return tomorrow!"}
          </p>
          <button
            className={`rpg-btn-primary claim-btn ${!dailyStatus.available ? 'locked-btn' : ''}`}
            onClick={handleClaimDaily}
            disabled={!dailyStatus.available || dailyStatus.loading}
            style={{ marginTop: '15px' }}
          >
            {dailyStatus.loading ? 'Claiming...' : dailyStatus.available ? 'Claim Daily XP' : 'Claimed'}
          </button>
        </div>
      </div>

      <div className="chest-section">
        <div className={`chest-container ${isOpening ? 'opening pulse-gold' : ''}`}>
          <FaBoxOpen className="chest-icon" />
        </div>
        <div className="loot-status">
          <p className="chest-hint">
            {status.availableChests > 0
              ? `You have ${status.availableChests} Level-Up Chest${status.availableChests > 1 ? 's' : ''} available!`
              : `Next reward unlocks at Level ${status.nextMilestone}`}
          </p>
          {status.availableChests > 0 && (
            <button
              className="rpg-btn-primary claim-animation"
              onClick={openChest}
              disabled={isOpening}
            >
              {isOpening ? 'Manifesting Loot...' : 'Open Loot Chest'}
            </button>
          )}
        </div>
      </div>

      <div className="inventory">
        <h2 className="inventory-title">📜 Shared Vault (Inventory)</h2>
        {inventory.length === 0 ? (
          <div className="empty-inventory">
            <p className="fade-text">Your vault is empty. Complete quests and level up to earn loot!</p>
          </div>
        ) : (
          <div className="loot-grid">
            {[...inventory].reverse().map((loot, idx) => (
              <div key={idx} className={`loot-card rarity-${loot.rarity.toLowerCase()}`}>
                <div className="loot-icon-wrapper">
                  <FaGem className="loot-icon" />
                </div>
                <div className="loot-info">
                  <span className="loot-name">{loot.name}</span>
                  <span className="loot-bonus">{loot.bonus}</span>
                </div>
                <div className="loot-footer">
                  <span className="rarity-badge">{loot.rarity}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reward;
