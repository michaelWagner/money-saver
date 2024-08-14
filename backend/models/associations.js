const User = require('./User');
const Item = require('./Item');
const Bucket = require('./Bucket');
const Friend = require('./Friend');
const FriendRequest = require('./FriendRequest');

// User - Item (One to Many)
User.hasMany(Item, { foreignKey: 'userId' });
Item.belongsTo(User, { foreignKey: 'userId' });

// User - Bucket (One to One)
User.hasOne(Bucket, { foreignKey: 'userId' });
Bucket.belongsTo(User, { foreignKey: 'userId' });

// User - Friend (Many to Many)
User.belongsToMany(User, {
  through: Friend,
  as: 'friends',
  foreignKey: 'userId',
  otherKey: 'friendId',
});

// User - FriendRequest (One to Many)
User.hasMany(FriendRequest, { as: 'sentRequests', foreignKey: 'senderId' });
User.hasMany(FriendRequest, { as: 'receivedRequests', foreignKey: 'receiverId' });
FriendRequest.belongsTo(User, { as: 'sender', foreignKey: 'senderId' });
FriendRequest.belongsTo(User, { as: 'receiver', foreignKey: 'receiverId' });

module.exports = {
  User,
  Item,
  Bucket,
  Friend,
  FriendRequest,
};
