import path from 'path';
import fetch from 'isomorphic-fetch';

const turnPizzasIntoPages = async ({ graphql, actions }) => {
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          slug {
            current
          }
        }
      }
    }
  `);

  data.pizzas.nodes.forEach((pizza) => {
    actions.createPage({
      path: `/pizza/${pizza.slug.current}`,
      component: path.resolve('src/templates/Pizza.js'),
      context: {
        slug: pizza.slug.current,
      },
    });
  });
};

const turnToppingsIntoPages = async ({ graphql, actions }) => {
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
        }
      }
    }
  `);

  data.toppings.nodes.forEach((topping) => {
    actions.createPage({
      path: `/topping/${topping.name}`,
      component: path.resolve('src/pages/pizzas.js'),
      context: {
        topping: topping.name,
      },
    });
  });
};

const turnSlicemastersIntoPages = async ({ graphql, actions }) => {
  const { data } = await graphql(`
    query {
      slicemasters: allSanityPerson {
        totalCount
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `);

  const pageSize = +process.env.GATSBY_PAGE_SIZE;
  const pageCount = Math.ceil(data.slicemasters.totalCount / pageSize);

  Array.from({ length: pageCount }).forEach((_, i) => {
    actions.createPage({
      path: `/slicemasters/${i + 1}`,
      component: path.resolve('src/pages/slicemasters.js'),
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    });
  });

  data.slicemasters.nodes.forEach((slicemaster) => {
    actions.createPage({
      path: `/slicemaster/${slicemaster.slug.current}`,
      component: path.resolve('src/templates/Slicemaster.js'),
      context: {
        slicemasterID: slicemaster.id,
      },
    });
  });
};

export const createPages = async (params) => {
  await Promise.all([
    turnPizzasIntoPages(params),
    turnToppingsIntoPages(params),
    turnSlicemastersIntoPages(params),
  ]);
};

const fetchBeersAndTurnIntoNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const res = await fetch('https://api.sampleapis.com/beers/ale');
  const beers = await res.json();

  for (const beer of beers) {
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json',
        contentDigest: createContentDigest(beer),
      },
    };

    actions.createNode({ ...beer, ...nodeMeta });
  }
};

export const sourceNodes = async (params) => {
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
};
