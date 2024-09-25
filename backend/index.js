const express = require('express');
const cors = require('cors');

const usersRoutes = require('./routes/usersRoutes');
const itemsRoutes = require('./routes/itemsRoutes');
const savingsRoutes = require('./routes/savingsRoutes');
const friendsRoutes = require('./routes/friendsRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', usersRoutes);
app.use('/api/items', itemsRoutes);
app.use('/api/savings', savingsRoutes);
app.use('/api/friends', friendsRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
