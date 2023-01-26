/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable radix */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { getCategories } from '../../utils/data/categoryData';
import { createRecipeCat } from '../../utils/data/recipeCatData';

function CategoryForm({ recId, recCats }) {
  console.warn(recId);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [recipeCats, setRecipeCats] = useState([]);

  const getAllCategories = () => {
    getCategories().then(setCategories);
    setRecipeCats(recCats);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleChange = (e) => {
    const copy = new Set(checked);
    const { id } = e.target;
    if (e.target.checked) {
      copy.add(parseInt(id));
    } else {
      copy.delete(parseInt(id));
    }
    setChecked(copy);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const catArr = Array.from(checked);

    Promise.all(catArr.map((cat) => (createRecipeCat(cat, recId))));
  };

  return (
    <Form recipeCats={recipeCats} onSubmit={handleSubmit}>
      {categories.map((category) => (
        <><div key={category.id} className="mb-3" /><Form.Check
          type="checkbox"
          id={category.id}
          label={category.label}
          onChange={handleChange}
          // checked={recipeCats.some((cat) => cat.id === category.id)}
        />
        </>
      ))}
      <Button className="appendCats" type="submit">
        Add/remove Categories
      </Button>
    </Form>
  );
}

CategoryForm.propTypes = {
  recId: PropTypes.number.isRequired,
  recCats: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CategoryForm;
