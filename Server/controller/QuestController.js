const User = require('../models/User');

const quests = [
    { id: 1, title: "Patrol the City Walls", target: 3000, type: "Daily", xpReward: 50, goldReward: 5 },
    { id: 2, title: "Slay the Forest Slimes", target: 5000, type: "Daily", xpReward: 100, goldReward: 10 },
    { id: 3, title: "Defeat the Iron Golem", target: 10000, type: "Weekly", xpReward: 500, goldReward: 50 },
    { id: 4, title: "Legendary Expedition", target: 20000, type: "Weekly", xpReward: 1500, goldReward: 0, lootChest: true },
];

const getQuests = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ success: false, message: "Hero not found" });

        // Calculate progress based on user stats
        // We'll use XP/Steps proxy for now, similar to frontend simulation but with real XP
        const processedQuests = quests.map(quest => {
            const isCompleted = user.completedQuests.includes(quest.id);
            // Progress formula: (CurrentXP / (Target * 0.5)) - slightly adjusted to make it reachable based on current project XP logic
            const currentStepsEquivalent = user.XP / 0.5;
            const progress = Math.min(100, (currentStepsEquivalent / quest.target) * 100);

            return {
                ...quest,
                progress,
                isCompleted,
                isClaimable: progress >= 100 && !isCompleted
            };
        });

        res.json({ success: true, quests: processedQuests });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Failed to fetch quests" });
    }
};

const claimQuestReward = async (req, res) => {
    try {
        const { questId } = req.params;
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ success: false, message: "Hero not found" });

        if (user.completedQuests.includes(Number(questId))) {
            return res.status(400).json({ success: false, message: "Quest already completed!" });
        }

        const quest = quests.find(q => q.id === Number(questId));
        if (!quest) return res.status(404).json({ success: false, message: "Quest not found" });

        // Re-check progress on backend
        const currentStepsEquivalent = user.XP / 0.5;
        if (currentStepsEquivalent < quest.target) {
            return res.status(400).json({ success: false, message: "Quest objectives not met yet." });
        }

        // Apply rewards
        user.XP += quest.xpReward;
        user.gold += quest.goldReward;
        user.completedQuests.push(quest.id);

        let lootResult = null;
        if (quest.lootChest) {
            // Milestone already handles chest generation, but we can add a specific loot item here for legendary quests
            lootResult = "Quest Specialist Badge"; // Just a placeholder string for now
            user.inventory.push({ name: lootResult, type: "Legendary Badge", bonus: "+50 LUCK", obtainedAt: new Date() });
        }

        await user.save();

        res.json({
            success: true,
            message: "Quest Completed!",
            rewards: { xp: quest.xpReward, gold: quest.goldReward, loot: lootResult },
            updatedStats: { xp: user.XP, gold: user.gold }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Failed to claim reward" });
    }
};

module.exports = { getQuests, claimQuestReward };
