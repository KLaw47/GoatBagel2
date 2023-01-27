import { clientCredentials } from '../client';

const createRecipeCat = (categoryId, recipeId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/recipe_categories`, {
    method: 'POST',
    body: JSON.stringify({
      category_id: categoryId,
      recipe_id: recipeId,
    }),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const deleteRecipeCat = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/recipe_categories/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  createRecipeCat,
  deleteRecipeCat,
};
