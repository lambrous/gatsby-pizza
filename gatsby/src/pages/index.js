import React from 'react';
import ItemGrid from '../components/ItemGrid';
import LoadingGrid from '../components/LoadingGrid';
import SEO from '../components/SEO';
import { HomePageGrid } from '../styles/Grid';
import useLatestData from '../utils/useLatestData';

const CurrentlySlicing = ({ slicemasters }) => (
  <div>
    <h2 className="center">
      <span className="mark tilt">Slicemasters On</span>
    </h2>
    <p>Standing by, ready to slice you up!</p>
    {!slicemasters && <LoadingGrid count={4} />}
    {slicemasters && !slicemasters?.length && (
      <p>No one is working right now!</p>
    )}
    {slicemasters?.length && <ItemGrid items={slicemasters} />}
  </div>
);

const HotSlices = ({ hotSlices }) => (
  <div>
    <h2>
      <span className="mark tilt">Hot Slices</span>
    </h2>
    <p>Come on by, buy the slice!</p>
    {!hotSlices && <LoadingGrid count={4} />}
    {hotSlices && !hotSlices?.length && <p>Nothin' in the Case</p>}
    {hotSlices?.length && <ItemGrid items={hotSlices} />}
  </div>
);

const HomePage = () => {
  const { hotSlices, slicemasters } = useLatestData();

  return (
    <>
      <SEO title="Hot Now" />
      <div className="center">
        <h2>The Best Pizza Downtown</h2>
        <p>Open 11am to 11pm Every Single Day</p>
        <HomePageGrid>
          <CurrentlySlicing slicemasters={slicemasters} />
          <HotSlices hotSlices={hotSlices} />
        </HomePageGrid>
      </div>
    </>
  );
};

export default HomePage;
