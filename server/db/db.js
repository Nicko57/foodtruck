/* eslint-disable no-console */
require('dotenv').config();
const { Sequelize } = require('sequelize');
const UserModel = require('./models/User');
const TruckModel = require('./models/Truck');
const ReviewModel = require('./models/Review');
const PostModel = require('./models/Post');
const PhotoModel = require('./models/Photo');

const user = process.env.DB_USERNAME;
const host = process.env.DB_HOST;
const database = process.env.DB_DBNAME;
const password = process.env.DB_PASSWORD;
const port = process.env.DB_PORT;

const sequelize = new Sequelize(
  `postgres://${user}:${password}@${host}:${port}/${database}`,
);

const User = UserModel(sequelize, Sequelize);
const Truck = TruckModel(sequelize, Sequelize);
const Review = ReviewModel(sequelize, Sequelize);
const Post = PostModel(sequelize, Sequelize);
const Photo = PhotoModel(sequelize, Sequelize);

const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
const syncModels = async () => {
  try {
    await sequelize.sync();
    console.log('Models have been synced successfully.');
  } catch (error) {
    console.error('Unable to sync models:', error);
  }
};
// async function doStuffWithUserModel() {
//   const newUser = await User.create({
//     full_name: 'John Smith',
//   });
//   const foundUser = await User.findOne({ where: { full_name: 'John Smith' } });
//   if (foundUser === null) return;

//   const newTruck = await Truck.create({
//     full_name: 'Rolling Fatties',
//   });
//   const foundTruck = await Truck.findOne({
//     where: { full_name: 'Rolling Fatties' },
//   });
//   if (foundTruck === null) return;

//   const newReview = await Review.create({
//     review_title: 'I LOVE Rolling Fatties THEYRE INCREDIBLE!!!!',
//     id_user: 14,
//     id_truck: 4,
//   });
//   const foundReview = await Review.findAll({
//     where: { id_user: 14 },
//     // where: { id_user: 14, id_truck: 4 },
//   });
//   if (foundReview === null) return;
//   console.log('FOUND REVIEW:')
//   console.log(foundReview);
// }
connection();
syncModels();
// doStuffWithUserModel();

module.exports = {
  User,
  Truck,
  Review,
  Post,
  Photo,
};
