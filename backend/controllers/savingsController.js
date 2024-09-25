const { Savings, User, UserSavings } = require('../models');

// Create a new savings object and associate it with the user in UserSavings
const createSavings = async (req, res) => {
  const userId = req.user.id; // assuming you have req.user populated with logged-in user
  const { title } = req.body;

  try {
    // Create the savings
    const newSavings = await Savings.create({ title, user_id: userId });

    // Create an entry in UserSavings to associate the user with the savings
    await UserSavings.create({
      user_id: userId,
      savings_id: newSavings.id
    });

    res.status(201).json(newSavings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSavings = async (req, res) => {
  const userId = req.user.id;

  try {
    // Find savings where user is either the owner or a collaborator
    const savings = await Savings.findAll({
      where: { user_id: userId }, // Direct ownership
      include: [{
        model: User,
        as: 'collaborators',
        through: { attributes: [] }, // Ignore extra attributes in UserSavings
        where: { id: userId }, // Fetch only if the user is a collaborator
        required: false, // Allow savings where user is not a collaborator
      }],
    });

    res.status(200).json(savings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update savings by adding an item
const updateSavings = async (req, res) => {
  const { savingsId } = req.params;
  console.log('Savings ID:', savingsId);

  const { item } = req.body;
  const userId = req.user.id;

  const price = parseFloat(item.price);

  if (isNaN(price)) {
    return res.status(400).json({ message: 'Invalid price format' });
  }

  try {
    const userSavings = await Savings.findOne({
      where: {
        user_id: userId,
        id: savingsId,
      },
    });

    if (!userSavings) {
      return res.status(403).json({ message: 'You do not have access to this savings account' });
    }

    const savings = await Savings.findByPk(savingsId);
    if (!savings) {
      return res.status(404).json({ message: 'Savings record not found' });
    }

    const currentTotal = parseFloat(savings.total); // Convert to a number
    savings.total = (currentTotal + price).toFixed(2); // Update total and format to 2 decimal places
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
      user_id: friendId, // ID of the friend to share with
      savings_id: savingsId,
    });
    res.status(200).json({ message: 'Savings shared successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createSavings,
  getSavings,
  updateSavings,
  shareSavingsWithFriend,
};
