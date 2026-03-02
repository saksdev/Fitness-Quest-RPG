/**
 * Utility for Fitness RPG calculation logic.
 * Transforms raw fitness data into gamified stats.
 */

// RPG Constants
const XP_PER_STEP = 0.5;
const XP_PER_CALORIE = 0.2;
const XP_PER_ACTIVE_MINUTE = 5;

/**
 * Calculates Level based on total XP.
 * Growth formula: XP required = 100 * (level^2)
 * level = sqrt(totalXP / 100)
 */
export const calculateLevelInfo = (totalSteps = 0, totalCalories = 0, activeMinutes = 0) => {
    const totalXP = (totalSteps * XP_PER_STEP) + (totalCalories * XP_PER_CALORIE) + (activeMinutes * XP_PER_ACTIVE_MINUTE);
    const currentLevel = Math.max(1, Math.floor(Math.sqrt(totalXP / 100)));

    // XP for current level
    const xpForCurrentLevel = 100 * Math.pow(currentLevel, 2);
    // XP for next level
    const xpForNextLevel = 100 * Math.pow(currentLevel + 1, 2);

    const xpInCurrentLevel = totalXP - xpForCurrentLevel;
    const xpRequiredForNextLevel = xpForNextLevel - xpForCurrentLevel;
    const progressPercentage = Math.min(100, Math.max(0, (xpInCurrentLevel / xpRequiredForNextLevel) * 100));

    return {
        level: currentLevel,
        totalXP: Math.floor(totalXP),
        nextLevelXP: Math.floor(xpForNextLevel),
        progress: Math.floor(progressPercentage),
        xpRemaining: Math.floor(xpForNextLevel - totalXP)
    };
};

/**
 * Determines Character Class based on dominant fitness activity.
 */
export const getCharacterClass = (steps, activeMinutes) => {
    if (activeMinutes > 60) return "Shadow Dancer (Agility Hero)";
    if (steps > 15000) return "Paladin of Pacing (Endurance Hero)";
    if (steps > 10000) return "Vanguard (Balanced Hero)";
    return "Apprentice Traveler";
};

/**
 * Maps fitness stats to RPG Attributes.
 */
export const calculateAttributes = (steps = 0, calories = 0) => {
    return {
        strength: Math.floor(steps / 100),
        vitality: Math.floor(calories / 50),
        agility: Math.floor((steps / 500) + (calories / 200)),
        spirit: 10 // Placeholder for sleep data
    };
};

/**
 * Calculates Gold earned from activity.
 * Rate: 100 steps = 1 Gold
 */
export const calculateGold = (steps = 0) => {
    return Math.floor(steps / 100);
};

/**
 * Returns a pseudo-random loot reward based on current level.
 */
export const getLootReward = (level) => {
    const rewards = [
        { id: 1, name: "Iron Helm", type: "Gear", rarity: "Common", bonus: "+2 STR" },
        { id: 2, name: "Health Potion", type: "Consumable", rarity: "Common", bonus: "Restores HP" },
        { id: 3, name: "Golden Sneakers", type: "Gear", rarity: "Rare", bonus: "+5 AGI" },
        { id: 4, name: "XP Scroll", type: "Consumable", rarity: "Epic", bonus: "+500 XP" }
    ];

    // Simple logic: higher level gives better chance at rare items
    const index = Math.floor(Math.random() * (level > 5 ? rewards.length : 2));
    return rewards[index];
};
