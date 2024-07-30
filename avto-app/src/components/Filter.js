import React, { useState } from 'react';

const Filter = ({ onFilter }) => {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');

  const handleFilterChange = () => {
    onFilter({
      brand,
      model,
      year,
      price
    });
  };

  return (
    <div className="filter-container mb-4">
      <div className="form-row">
        <div className="col">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Brand" 
            value={brand} 
            onChange={e => setBrand(e.target.value)} 
          />
        </div>
        <div className="col">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Model" 
            value={model} 
            onChange={e => setModel(e.target.value)} 
          />
        </div>
        <div className="col">
          <input 
            type="number" 
            className="form-control" 
            placeholder="Year" 
            value={year} 
            onChange={e => setYear(e.target.value)} 
          />
        </div>
        <div className="col">
          <input 
            type="number" 
            className="form-control" 
            placeholder="Price" 
            value={price} 
            onChange={e => setPrice(e.target.value)} 
          />
        </div>
        <div className="col">
          <button 
            className="btn btn-primary" 
            onClick={handleFilterChange}>
            Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
