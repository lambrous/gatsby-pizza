import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default {
  siteMetadata: {
    title: 'Slicks Slices',
    siteUrl: 'https://gatsby.pizza',
    description: 'The best pizza place in Hamilton!',
    twitter: '@slicksSlices',
  },
  flags: {
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
    PRESERVE_WEBPACK_CACHE: true,
    FAST_DEV: true,
    FAST_REFRESH: true,
    DEV_SSR: true,
  },
  plugins: [
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: '4ne3iopb',
        dataset: 'production',
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
};
