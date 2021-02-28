import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import SEO from '../components/SEO';

const BeersGridStyles = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const SingleBeerStyles = styled.div`
  border: 1px solid var(--grey);
  padding: 2rem;
  text-align: center;
  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    display: grid;
    place-items: center;
    font-size: 10px;
  }
  p + p {
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      color: var(--yellow);
      font-size: 2.5rem;
      margin-right: 0.5rem;
    }
  }
`;

const BeersPage = ({ data }) => (
  <>
    <SEO title={`Beers! We have ${data.beers.nodes.length} in stock`} />
    <h2>We have {data.beers.nodes.length} Beers Available. Dine in Only!</h2>
    <BeersGridStyles>
      {data.beers.nodes.map((beer) => {
        const average = Math.round(beer.rating.average);
        return (
          <SingleBeerStyles>
            <img src={beer.image} alt={beer.name} />
            <h3>{beer.name}</h3>
            <p>{beer.price}</p>
            <p title={`${average} out of 5 stars`}>
              <span>
                {'★'.repeat(average)}
                {'☆'.repeat(5 - average)}
              </span>
              ({beer.rating.reviews})
            </p>
          </SingleBeerStyles>
        );
      })}
    </BeersGridStyles>
  </>
);

export const query = graphql`
  query {
    beers: allBeer(filter: { name: { ne: null } }) {
      nodes {
        id
        image
        price
        rating {
          average
          reviews
        }
        name
      }
    }
  }
`;

export default BeersPage;
