const User = require('../models/User');

const lootTable = [
    { name: "Rusty Iron Helm", type: "Gear", rarity: "Common", bonus: "+2 STR", value: 50 },
    { name: "Lesser Health Potion", type: "Consumable", rarity: "Common", bonus: "Restores Minor HP", value: 25 },
    { name: "Worn Leather Boots", type: "Gear", rarity: "Common", bonus: "+1 AGI", value: 40 },
    { name: "Scout's Cloak", type: "Gear", rarity: "Uncommon", bonus: "+3 AGI", value: 120 },
    { name: "Silver Signet", type: "Accessory", rarity: "Uncommon", bonus: "+2 SPR", value: 150 },
    { name: "Knight's Gauntlets", type: "Gear", rarity: "Rare", bonus: "+5 STR", value: 300 },
    { name: "Phoenix Feather", type: "Consumable", rarity: "Epic", bonus: "Full Revive", value: 1000 },
    { name: "Dragon-Scale Plate", type: "Gear", rarity: "Legendary", bonus: "+20 VIT", value: 5000 }
];

/**
 * Calculates how many chests are available based on user level.
 * Logic: 1 chest every 2 levels (2, 4, 6, 8, 10...)
 */
const getAvailableChests = (level, claimedChests = []) => {
    const milestones = [];
    for (let i = 2; i <= level; i += 2) {
        if (!claimedChests.includes(i)) {
            milestones.push(i);
        }
    }
    return milestones;
};

const getRewardStatus = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ success: false, message: 'Hero not found' });

        const availableMilestones = getAvailableChests(user.level, user.claimedChests);

        const lastClaim = user.lastDailyReward ? new Date(user.lastDailyReward) : null;
        let dailyAvailable = true;
        if (lastClaim) {
            const today = new Date();
            if (lastClaim.getFullYear() === today.getFullYear() &&
                lastClaim.getMonth() === today.getMonth() &&
                lastClaim.getDate() === today.getDate()) {
                dailyAvailable = false;
            }
        }

        res.status(200).json({
            success: true,
            availableChests: availableMilestones.length,
            nextMilestone: (Math.floor(user.level / 2) + 1) * 2,
            inventory: user.inventory,
            claimedChests: user.claimedChests,
            dailyRewardAvailable: dailyAvailable
        });
    } catch (err) {
        console.error('Reward Status Error:', err);
        res.status(500).json({ success: false, message: 'Failed to read the loot table.' });
    }
};

const claimLoot = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ success: false, message: 'Hero not found' });

        const availableMilestones = getAvailableChests(user.level, user.claimedChests);
        if (availableMilestones.length === 0) {
            return res.status(400).json({ success: false, message: 'No chests waiting for you, traveler.' });
        }

        const milestoneToClaim = availableMilestones[0];

        // Randomly select loot based on rarity
        // For simplicity: mostly common, rare harder to get
        const rand = Math.random() * 100;
        let selectedLoot;

        if (rand > 98) selectedLoot = lootTable[7]; // Legendary
        else if (rand > 90) selectedLoot = lootTable[6]; // Epic
        else if (rand > 75) selectedLoot = lootTable[5]; // Rare
        else if (rand > 50) selectedLoot = lootTable[3] || lootTable[4]; // Uncommon
        else selectedLoot = lootTable[Math.floor(Math.random() * 3)]; // Common

        // Update User
        user.inventory.push({
            ...selectedLoot,
            obtainedAt: new Date(),
            milestone: milestoneToClaim
        });
        user.claimedChests.push(milestoneToClaim);

        // Bonus gold for opening chest
        const bonusGold = milestoneToClaim * 50;
        user.gold += bonusGold;

        await user.save();

        res.status(200).json({
            success: true,
            loot: selectedLoot,
            bonusGold: bonusGold,
            inventory: user.inventory
        });
    } catch (err) {
        console.error('Claim Loot Error:', err);
        res.status(500).json({ success: false, message: 'The chest is stuck! Try again.' });
    }
};



const claimDailyReward = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ success: false, message: 'Hero not found' });

        const now = new Date();
        const lastClaim = user.lastDailyReward ? new Date(user.lastDailyReward) : null;

        // Check if claimed today
        if (lastClaim) {
            const today = new Date();
            if (lastClaim.getFullYear() === today.getFullYear() &&
                lastClaim.getMonth() === today.getMonth() &&
                lastClaim.getDate() === today.getDate()) {
                return res.status(400).json({ success: false, message: 'You have already claimed your daily reward today. Rest now, hero.' });
            }
        }

        // Generate Random XP (50 - 150)
        const xpGain = Math.floor(Math.random() * (150 - 50 + 1)) + 50;
        user.XP += xpGain;

        // Check for level up (Simple formula: Level = sqrt(XP / 100))
        const oldLevel = user.level;
        const newLevel = Math.max(1, Math.floor(Math.sqrt(user.XP / 100)));
        let levelUpMessage = '';

        if (newLevel > oldLevel) {
            user.level = newLevel;
            levelUpMessage = ` Level Up! You are now level ${newLevel}!`;
        }

        user.lastDailyReward = now;
        await user.save();

        res.status(200).json({
            success: true,
            xpGain,
            newTotalXP: user.XP,
            level: user.level,
            message: `Claimed ${xpGain} XP!${levelUpMessage}`
        });

    } catch (err) {
        console.error('Claim Daily Reward Error:', err);
        res.status(500).json({ success: false, message: 'Daily reward spell failed.' });
    }
};

module.exports = { getRewardStatus, claimLoot, claimDailyReward };
