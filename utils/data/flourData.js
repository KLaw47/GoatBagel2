import { clientCredentials } from '../client';

const getFlours = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/flour_types`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getFlourById = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/flour_types${id}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        flourType: data.flour_type,
        cups: data.cups,
        grams: data.grams,
      });
    })
    .catch(reject);
});

export {
  getFlourById,
  getFlours,
};
