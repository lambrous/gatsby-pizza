import React from 'react';
import { ItemsGrid, ItemStyles } from '../styles/Grid';

const ItemGrid = ({ items }) => (
  <ItemsGrid>
    {items.map((item) => (
      <ItemStyles key={item._id}>
        <p>
          <span className="mark">{item.name}</span>
        </p>
        <img
          src={`${item.image.asset.url}?w=500&h=400&fit=crop`}
          alt={item.name}
          width="500"
          height="400"
          style={{
            background: `url(${item.image.asset.metadata.lqip})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
          }}
        />
      </ItemStyles>
    ))}
  </ItemsGrid>
);

export default ItemGrid;
