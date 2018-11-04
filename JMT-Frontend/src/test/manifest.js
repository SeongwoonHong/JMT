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
  Loader: {
    components: require('components/Loader'),
    props: {},
  },
  Signup: {
    components: require('modules/Signup/components/Signup'),
    props: {}
  },
  Button: {
    components: require('components/Button'),
    props: {
      text: 'Search',
    },
  },
};
