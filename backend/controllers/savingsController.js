const { Savings, User, UserSavings } = require('../models');

// Get current savings
const getSavings = async (req, res) => {
  const userId = req.user.id;
  try {
    const savings = await Savings.findAll({
      where: { user_id: userId }, // Direct ownership
      include: [{
        model: User,
        as: 'Collaborators'
      }]
    });
    res.status(200).json(savings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update savings by adding an item
const updateSavings = async (req, res) => {
  const { item, savingsId } = req.body;
  const userId = req.user.id;
  try {
    // const item = await Item.findByPk(itemId);
    // if (!item) {
    //   return res.status(404).json({ message: 'Item not found' });
    // }

    const userSavings = await UserSavings.findOne({
      where: {
        user_id: userId,
        savings_id: savingsId,
      },
    });

    if (!userSavings) {
      return res.status(403).json({ message: 'You do not have access to this savings account' });
    }

    const savings = await Savings.findByPk(savingsId);
    if (!savings) {
      return res.status(404).json({ message: 'Savings record not found' });
    }

    savings.total += item.price;
    await savings.save();

    res.status(200).json(savings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Share savings with a friend
const shareSavingsWithFriend = async (req, res) => {
  const { friendId, savingsId } = req.body;
  try {
    await UserSavings.create({
      user_id: friendId,
      savings_id: savingsId,
    });
    res.status(200).json({ message: 'Savings shared successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getSavings,
  updateSavings,
  shareSavingsWithFriend,
};
