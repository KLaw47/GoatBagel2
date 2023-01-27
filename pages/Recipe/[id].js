/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { deleteRecipe, getSingleRecipe } from '../../utils/data/recipes';
import { useAuth } from '../../utils/context/authContext';
import CategoryForm from '../../components/forms/CategoryForm';

export default function ViewRecipeDetail() {
  const [recipeDetail, setRecipeDetail] = useState({});
  // console.warn(recipeDetail.categories);
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();
  const getThisRecipe = () => {
    getSingleRecipe(id).then(setRecipeDetail);
  };
  const deleteThisRecipe = () => {
    if (window.confirm(`Delete ${recipeDetail.name}?`)) {
      deleteRecipe(recipeDetail.id).then(() => router.push('/'));
    }
  };

  const catCopy = recipeDetail.categories;

  useEffect(() => {
    getThisRecipe();
  }, []);
  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={recipeDetail.image} alt={recipeDetail.name} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {recipeDetail.name}
        </h5>
        <p>Salt: {recipeDetail.saltAmount} Grams</p>
        <p>Water: {recipeDetail.water} Grams</p>
        <p>Flour: {recipeDetail.flourAmount} Grams</p>
        <p>Yeast: {recipeDetail.yeastAmount} Grams</p>
        <>
          <CategoryForm recId={recipeDetail.id} recCats={catCopy} />
          <Link href={`user/${recipeDetail?.user?.id}`} passHref>
            <Button className="nameLink">{recipeDetail?.user?.name}</Button>
          </Link>
        </>
        {recipeDetail?.user?.uid === user.uid ? (
          <>
            <Link href={`/Recipe/edit/${recipeDetail.id}`} passHref>
              <Button className="edit">EDIT</Button>
            </Link>
            <Button className="delete" onClick={deleteThisRecipe}>
              DELETE
            </Button>
          </>
        ) : ''}
      </div>
      <div>
        {recipeDetail.directions}
      </div>
    </div>
  );
}
