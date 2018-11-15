const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('./data.js');

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });


//ITERATION 1
const recipeSchema = new Schema({
  title: { type: String, required: true, unique: true },
  level: { type: String, enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'] },
  ingredients: { type: Array },
  cuisine: { type: String, required: true },
  dishType: { type: String, enum: ['Breakfast', 'Dish', 'Snack', 'Drink', 'Dessert', 'Other'] },
  image: { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg' },
  duration: { type: Number, min: 0 },
  creator: { type: String },
  created: { type: Date, default: Date.now }
});

const Recipe = mongoose.model('Recipe', recipeSchema);


//ITERATION 2
Recipe.create({
  title: 'Asian Glazed Chicken Thighs',
  level: 'Amateur Chef',
  ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
  cuisine: 'Asian',
  dishType: ['Dish'],
  image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
  duration: 40,
  creator: 'Chef LePapu'
})
  .then(recipe => {
    console.log('title: ', recipe.title)
    return Recipe.deleteMany({})
  })
  // .catch(err => { console.log('An error happened on ITER 2:', err) })

  //ITERATION 3
  .then(recipe => {
    console.log(recipe)
    return Recipe.insertMany(data)
  })
  // .catch(err => { console.log('An error happenned on ITER 2b:', err) })

  //ITERATION 4
  .then(recipes => {
    recipes.forEach(recipe => {
      console.log(recipe.title)
      Recipe.updateOne({ title: /Riga/ }, { duration: 100 })
    })
  })
  // .catch(err => { console.log('An error happened o ITER3:', err) });


  //ITERATION 5

  .then(recipe => {
    console.log('ITERATION 4 successful')
    return Recipe.deleteOne({ title: /Carrot/ })
  })
  // .catch(err => { console.log('An error happened on ITER 4:', err) });

  .then(recipe => {
    return Recipe.find()
  })

  //ITERATION 6

  .then(recipes => {
    recipes.forEach(recipe => {
      console.log(recipe.title)
    })
    console.log('ITERATION 5 successful')
    mongoose.connection.close(() => {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    })
  })
  .catch(err => { console.log('An error happened on ITER 5:', err) });




// TOOLS

// Recipe.find({})    // TO CHECK
// .then(recipe => { console.log(recipe) })
// .catch(err => { console.log('An error happened:', err) });

// Recipe.deleteMany({})    // TO START OVER
//   .then(recipe => { console.log(recipe) })
//   .catch(err => { console.log('An error happenned:', err) })


// .then(mongoose.connection.close(() => {   //TO CLOSE CONNECTIONS AND THE DATABASE
//   console.log('Mongoose default connection disconnected through app termination'); 
//   process.exit(0); }))