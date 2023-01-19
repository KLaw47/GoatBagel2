import { clientCredentials } from '../client';

const getYeasts = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/yeast_types`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getYeastById = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/yeast_types${id}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        yeastType: data.yeast_type,
        ounces: data.ounces,
        grams: data.grams,
      });
    })
    .catch(reject);
});

export {
  getYeastById,
  getYeasts,
};
