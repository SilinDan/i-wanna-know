import createHOC from './HOCCreator';

export const withClassificationHandle = createHOC({
  queryProps: {
    fetchPolicy: 'cache-and-network',
  },
  isFetchMore: false,
  initState: {
    page: 1,
    perPageNum: 8,
  },
});
