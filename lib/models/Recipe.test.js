const mongoose = require('mongoose');
const Recipe = require('./Recipe');
const Event = require('./Event');

describe('Recipe model', () => {
  it('has a required name', () => {
    const recipe = new Recipe();
    const { errors } = recipe.validateSync();

    expect(errors.name.message).toEqual('Path `name` is required.');
  });

  it('has a name and directions field', () => {
    const recipe = new Recipe({
      name: 'Cookies',
      ingredients: [
        { name: 'flour', amount: 1, measurement: 'cup' }
      ],
      directions: [
        'preheat oven to 375',
        'mix ingredients',
        'put dough on cookie sheet',
        'bake for 10 minutes'
      ]
    });

    expect(recipe.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      name: 'Cookies',
      ingredients: [
        { _id: expect.any(mongoose.Types.ObjectId), name: 'flour', amount: 1, measurement: 'cup' }
      ],
      directions: [
        'preheat oven to 375',
        'mix ingredients',
        'put dough on cookie sheet',
        'bake for 10 minutes'
      ]
    });
  });
  it('has a virtual events field containing all events related to a recipe', () => {
    const recipe = new Recipe({
      name: 'Cookies',
      ingredients: [
        { name: 'flour', amount: 1, measurement: 'cup' }
      ],
      directions: [
        'preheat oven to 375',
        'mix ingredients',
        'put dough on cookie sheet',
        'bake for 10 minutes'
      ]
    });
    const events = new Event([
      { recipeId: recipe._id, dateOfEvent: Date.now(), rating: 3 },
      { recipeId: recipe._id, dateOfEvent: Date.now(), rating: 2 },
      { recipeId: recipe._id, dateOfEvent: Date.now(), rating: 3 },
      { recipeId: recipe._id, dateOfEvent: Date.now(), rating: 5 }
    ]);
    expect(recipe.events).toContainEqual([
      { recipeId: recipe._id, dateOfEvent: Date.now(), rating: 3 },
      { recipeId: recipe._id, dateOfEvent: Date.now(), rating: 2 },
      { recipeId: recipe._id, dateOfEvent: Date.now(), rating: 3 },
      { recipeId: recipe._id, dateOfEvent: Date.now(), rating: 5 }
    ]);
  });
});
