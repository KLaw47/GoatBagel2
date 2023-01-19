import { clientCredentials } from '../client';

const getSalts = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/salt_types`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSaltById = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/salt_types${id}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        saltType: data.salt_type,
        teaspoons: data.teaspoons,
        grams: data.grams,
      });
    })
    .catch(reject);
});

export {
  getSaltById,
  getSalts,
};
