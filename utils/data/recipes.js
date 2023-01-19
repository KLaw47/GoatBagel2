import { clientCredentials } from '../client';

const getRecipes = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/recipes`, {
    method: 'GET',
    headers: {
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleRecipe = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/recipes/${id}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        name: data.name,
        flourId: data.flour_id,
        flourAmount: data.flour_amount,
        saltId: data.salt_id,
        saltAmount: data.salt_amount,
        yeastId: data.yeast_id,
        yeastAmount: data.yeast_amount,
        water: data.water,
        directions: data.directions,
        image: data.image,
        public: data.public,
        user: data.user,
      });
    })
    .catch((error) => reject(error));
});

const createRecipe = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/recipes`, {
    method: 'POST',
    body: JSON.stringify({
      flour_id: payload.flourId,
      flour_amount: payload.flourAmount,
      salt_id: payload.saltId,
      salt_amount: payload.saltAmount,
      yeast_id: payload.yeastId,
      yeast_amount: payload.yeastAmount,
      water: payload.water,
      directions: payload.directions,
      image: payload.image,
      public: payload.public,
      user_id: payload.userId,
      recipe_categories: payload.recipeCategories,
    }),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const updateRecipe = (recipe) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/recipes/${recipe.id}`, {
    method: 'PUT',
    body: JSON.stringify({
      flour_id: recipe.flourId,
      flour_amount: recipe.flourAmount,
      salt_id: recipe.saltId,
      salt_amount: recipe.saltAmount,
      yeast_id: recipe.yeastId,
      yeast_amount: recipe.yeastAmount,
      water: recipe.water,
      description: recipe.description,
      image: recipe.image,
      public: recipe.public,
      user_id: recipe.userId,
      recipe_categories: recipe.recipeCategories,
    }),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const deleteRecipe = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/recipes/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  getRecipes,
  getSingleRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
