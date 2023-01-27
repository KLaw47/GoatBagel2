/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable radix */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { deleteRecipe, getSingleRecipe } from '../../utils/data/recipes';
import { useAuth } from '../../utils/context/authContext';
import { getCategories } from '../../utils/data/categoryData';
import { createRecipeCat } from '../../utils/data/recipeCatData';

export default function ViewRecipeDetail() {
  const [recipeDetail, setRecipeDetail] = useState({});
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  // const [recipeCats, setRecipeCats] = useState([]);
  const recId = recipeDetail.id;
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  const getRecContent = () => {
    getSingleRecipe(id).then(setRecipeDetail);
    getCategories().then(setCategories);
  };

  const deleteThisRecipe = () => {
    if (window.confirm(`Delete ${recipeDetail.name}?`)) {
      deleteRecipe(recipeDetail.id).then(() => router.push('/'));
    }
  };

  useEffect(() => {
    getRecContent();
  }, []);

  const handleChange = (e) => {
    const copy = new Set(checked);
    const catId = e.target.id;
    if (e.target.checked) {
      copy.add(parseInt(catId));
    } else {
      copy.delete(parseInt(catId));
    }
    setChecked(copy);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const catArr = Array.from(checked);

    Promise.all(catArr.map((cat) => (createRecipeCat(cat, recId)))).then(() => {
      router.push('/');
    });
  };

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
      <Form onSubmit={handleSubmit}>
        {categories.map((category) => (
          <><div key={category.id} className="mb-3" /><Form.Check
            type="checkbox"
            id={category.id}
            label={category.label}
            onChange={handleChange}
            // checked={recipeDetail?.categories?.some((cat) => cat.id === category.id)}
          />
          </>
        ))}
        <Button className="appendCats" type="submit">
          Add/remove Categories
        </Button>
      </Form>
      <div>
        {recipeDetail.directions}
      </div>
      <br />
      <div>
        {recipeDetail.categories?.map((category) => (
          <div>
            <Button disabled> {`${category.label}`} </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
