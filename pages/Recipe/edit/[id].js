import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleRecipe } from '../../../utils/data/recipes';
import RecipeForm from '../../../components/forms/RecipeForm';
import { getFlours } from '../../../utils/data/flourData';
import { getYeasts } from '../../../utils/data/yeastData';
import { getSalts } from '../../../utils/data/saltData';

export default function EditRecipe() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;
  const [flours, setFlours] = useState([]);
  const [yeasts, setYeasts] = useState([]);
  const [salts, setSalts] = useState([]);
  function getContent() {
    getFlours().then(setFlours);
    getYeasts().then(setYeasts);
    getSalts().then(setSalts);
  }

  useEffect(() => {
    getContent();
    getSingleRecipe(id).then(setEditItem);
  }, [id]);

  return (<RecipeForm obj={editItem} flours={flours} yeasts={yeasts} salts={salts} />);
}
