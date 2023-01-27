/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { deleteRecipe } from '../utils/data/recipes';

function RecipeCard({ recipeObj, onUpdate }) {
  const { user } = useAuth();

  const deleteThisRecipe = () => {
    if (window.confirm(`Delete ${recipeObj.name}?`)) {
      deleteRecipe(recipeObj.id).then(() => onUpdate());
    }
  };

  return (
    <Card className="card" style={{ width: '20rem', margin: '10px' }}>
      <Link href={`/Recipe/${recipeObj.id}`} passHref>
        <Card.Img variant="top" src={recipeObj.image} alt={recipeObj.name} style={{ height: '400px' }} />
      </Link>
      <Card.Body>
        <Card.Title>{recipeObj.name}</Card.Title>
        <p>{recipeObj.user.name}</p>
        {recipeObj.user.uid === user.uid ? (
          <>
            <Link href={`/Recipe/edit/${recipeObj.id}`} passHref>
              <Button className="edit">EDIT</Button>
            </Link>
            <Button className="delete" onClick={deleteThisRecipe}>
              DELETE
            </Button>
            <div className="d-flex flex-wrap">
              {recipeObj.categories?.map((category) => (
                <p> {`${category.label}`} </p>
              ))}
            </div>
          </>
        ) : ''}
      </Card.Body>
    </Card>
  );
}

RecipeCard.propTypes = {
  recipeObj: PropTypes.shape({
    categories: PropTypes.shape({
      id: PropTypes.number,
      recipeId: PropTypes.number,
    }),
    image: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
    user: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      uid: PropTypes.string,
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default RecipeCard;
