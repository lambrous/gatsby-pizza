import { useEffect, useState } from 'react';
import useMountedState from './useMountedState';

const gql = String.raw;

const deets = gql`
  {
    name
    _id
    image {
      asset {
        url
        metadata {
          lqip
        }
      }
    }
  }
`;

const useLatestData = () => {
  const [hotSlices, setHotSlices] = useState(null);
  const [slicemasters, setSlicemasters] = useState(null);
  const isMounted = useMountedState();

  useEffect(() => {
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
          query {
            StoreSettings(id: "downtown") {
              hotSlices 
                ${deets}
              slicemasters 
                ${deets}
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        if (isMounted()) {
          setHotSlices(data.StoreSettings.hotSlices);
          setSlicemasters(data.StoreSettings.slicemasters);
        }
      });
  }, [isMounted]);

  return { hotSlices, slicemasters };
};

export default useLatestData;
