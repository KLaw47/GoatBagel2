import React, { useEffect, useState } from 'react';
import RecipeForm from '../../components/forms/RecipeForm';
import { getFlours } from '../../utils/data/flourData';
import { getYeasts } from '../../utils/data/yeastData';
import { getSalts } from '../../utils/data/saltData';

export default function AddRecipe() {
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
  }, []);
  return <RecipeForm flours={flours} yeasts={yeasts} salts={salts} />;
}
