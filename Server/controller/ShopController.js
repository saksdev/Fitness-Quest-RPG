const User = require('../models/User');

const shopItems = [
    { id: 1, name: "Health Potion", price: 10, type: "Consumable", desc: "Restores HP after heavy training." },
    { id: 2, name: "Iron Shield", price: 50, type: "Gear", desc: "+5 Vitality bonus." },
    { id: 3, name: "Premium Battle Pass", price: 500, type: "Special", desc: "Unlock exclusive legendary gear and 2x XP multipliers!" },
    { id: 4, name: "Mystic Boots", price: 75, type: "Gear", desc: "+10% XP gain for 24h." }
];

const getShopItems = async (req, res) => {
    try {
        console.log("Fetching shop items for user:", req.userId);
        res.json({ success: true, items: shopItems });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Failed to load the shop." });
    }
};

const purchaseItem = async (req, res) => {
    try {
        const { itemId } = req.body;
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ success: false, message: "Hero not found" });

        const item = shopItems.find(i => i.id === Number(itemId));
        if (!item) return res.status(404).json({ success: false, message: "Item not found in the archives." });

        if (user.gold < item.price) {
            return res.status(400).json({ success: false, message: "Not enough Gold!" });
        }

        // Deduct Gold
        user.gold -= item.price;

        // Add to inventory
        user.inventory.push({
            name: item.name,
            type: item.type,
            purchasedAt: new Date(),
            description: item.desc
        });

        await user.save();

        res.json({
            success: true,
            message: `Successfully purchased ${item.name}!`,
            updatedStats: { gold: user.gold, inventory: user.inventory }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Transaction failed." });
    }
};

module.exports = { getShopItems, purchaseItem };
