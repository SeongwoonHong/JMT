// components added to the manifest can be accessed in browser via /test/{componentName}

export default {
  NotFound: {
    components: require('components/NotFound'),
    props: {
    },
  },
  Header: {
    components: require('components/Header'),
    props: {
    },
  },
};
