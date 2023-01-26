import { clientCredentials } from '../client';

const getCategories = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/categories`)
    .then((res) => res.json())
    .then(resolve)
    .catch(reject);
});

const getCategoryById = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/categories/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createCategory = (category) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/categories`, {
    method: 'POST',
    body: JSON.stringify(category),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const updateCategory = (category) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/categories/${category.id}`, {
    method: 'PUT',
    body: JSON.stringify({
      label: category.label,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const deleteCategory = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/categories/${id}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

export {
  createCategory, updateCategory, deleteCategory, getCategories, getCategoryById,
};
