import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAsync } from './productsSlice';
import { addAsync } from '../cart/cartSlice';
import './Products.css';

export function Products() {
  const products = useSelector((state) => state.product.products);
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  // console.log('items', items);

  useEffect(() => {
    dispatch(fetchAsync());
  }, []);

  return (
    <div className="cardWrapper">
      {products.map((product) => (
        <div className="card" key={product.id}>
          <img src={product.thumbnail} alt={product.title} />
          <h4>{product.title}</h4>
          <p className="price">
            <strong>{`$${product.price}`}</strong>
          </p>
          <p>{product.description}</p>
          <div></div>
          {items.some((element) => element.id === product.id) ? (
            <button style={{ backgroundColor: 'purple' }}>In cart</button>
          ) : (
            <button
              style={{ backgroundColor: 'limegreen' }}
              onClick={() => dispatch(addAsync(product))}
            >
              Add to Cart
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
