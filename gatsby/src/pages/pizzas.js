import { graphql } from 'gatsby';
import React from 'react';
import PizzaList from '../components/PizzaList';
import SEO from '../components/SEO';
import ToppingsFilter from '../components/ToppingsFilter';

const PizzasPage = ({ data, pageContext }) => (
  <>
    <SEO
      title={
        pageContext.topping
          ? `Pizzas With ${pageContext.topping}`
          : 'All Pizzas'
      }
    />
    <ToppingsFilter />
    <PizzaList pizzas={data.pizzas.nodes} />
  </>
);

export default PizzasPage;

export const query = graphql`
  query pizzaQuery($topping: [String]) {
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { name: { in: $topping } } } }
    ) {
      nodes {
        name
        id
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
