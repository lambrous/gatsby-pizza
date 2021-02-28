import styled from 'styled-components';

const MenuItemStyles = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-template-rows: 1fr auto;
  gap: 0 1.3rem;
  align-content: center;
  align-items: center;
  position: relative;

  .gatsby-image-wrapper {
    grid-row: span 2;
    aspect-ratio: 1 / 1;
  }

  h2 {
    font-size: clamp(2.5rem, 4vw, 3rem);
  }

  p {
    margin: 0;
  }

  button {
    font-size: clamp(1.4rem, 2vw, 1.8rem);
  }

  button + button {
    margin-left: 1rem;
  }

  .remove {
    background: none;
    color: var(--red);
    font-size: 3rem;
    position: absolute;
    top: 0;
    right: 0;
    box-shadow: none;
    line-height: 1rem;
  }
  &.menu-items {
    @media (max-width: 500px) {
      grid-template-columns: 75px 1fr;
      gap: 1.3rem;

      .gatsby-image-wrapper {
        grid-row: span 1;
      }

      .buttons {
        grid-column: 1 / -1;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 0.5rem;
      }

      button {
        margin: 0;
      }
    }
  }
`;

export default MenuItemStyles;
