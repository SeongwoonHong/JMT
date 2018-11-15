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
    components: require('modules/signup/components/Signup'),
    props: {}
  },
  Button: {
    components: require('components/Button'),
    props: {
      text: 'Search',
    },
  },
  'email-verified': {
    components: require('modules/email-verified'),
    props: {
    },
  },
  Dropdown: {
    components: require('modules/landing/components/Dropdown'),
    props: {
      items: ['All', 'Africa Restaurant', 'Afghan Restaurant', 'American Restaurant', 'Asian Restaurant', 'Something Restaurant', 'Something2 Restaurant', 'Something3 Restaurant', 'Something4 Restaurant'],
      isOpened: true
    }
  },
  Options: {
    components: require('components/Options'),
    props: {
      label: 'Cuisines',
      text: 'All',
    },
  },
  RestaurantDetails: {
    components: require('components/RestaurantDetails'),
    props: {
      },
  },
}

