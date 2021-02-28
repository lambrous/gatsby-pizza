import React from 'react';
import Img from 'gatsby-image';
import MenuItemStyles from '../styles/MenuItemStyles';
import formatMoney from '../utils/formatMoney';
import calculatePizzaPrice from '../utils/calculatePizzaPrice';

const PizzaOrder = ({ order, pizzas, removeFromOrder }) =>
  order.map((singleOrder, index) => {
    const pizza = pizzas.find((piz) => piz.id === singleOrder.id);
    return (
      <MenuItemStyles key={`${singleOrder.id}-${index}`}>
        <Img width="100" height="100" fluid={pizza.image.asset.fluid} />
        <h2>{pizza.name}</h2>
        <p>{formatMoney(calculatePizzaPrice(pizza.price, singleOrder.size))}</p>
        <button
          className="remove"
          type="button"
          onClick={() => removeFromOrder(index)}
        >
          &times;
        </button>
      </MenuItemStyles>
    );
  });

export default PizzaOrder;
