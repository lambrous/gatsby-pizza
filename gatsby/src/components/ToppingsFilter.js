import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import styled from 'styled-components';

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    align-items: center;
    padding: 5px;
    background: var(--grey);
    border-radius: 2px;
    text-decoration: none;
    font-size: clamp(1.5rem, 1.5vw, 2.5rem);
    .count {
      background: white;
      padding: 2px 5px;
    }
    &[aria-current] {
      background: var(--yellow);
    }
  }
`;

const countPizzasInToppings = (pizzas) => {
  const counts = pizzas
    .map(({ toppings }) => toppings)
    .flat()
    .reduce((acc, topping) => {
      const existingTopping = acc[topping.name];
      if (existingTopping) existingTopping.count += 1;
      else acc[topping.name] = { ...topping, count: 1 };
      return acc;
    }, {});

  return Object.values(counts).sort((a, b) => b.count - a.count);
};

const ToppingsFilter = () => {
  const { pizzas } = useStaticQuery(graphql`
    query {
      pizzas: allSanityPizza {
        nodes {
          toppings {
            name
            id
          }
        }
      }
    }
  `);

  const toppingsWithCounts = countPizzasInToppings(pizzas.nodes);

  return (
    <ToppingsStyles>
      <Link to="/pizzas">
        <span className="name">All</span>
        <span className="count">{pizzas.nodes.length}</span>
      </Link>
      {toppingsWithCounts.map(({ name, id, count }) => (
        <Link to={`/topping/${name}`} key={id}>
          <span className="name">{name}</span>
          <span className="count">{count}</span>
        </Link>
      ))}
    </ToppingsStyles>
  );
};

export default ToppingsFilter;
