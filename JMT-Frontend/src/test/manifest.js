// components added to the manifest can be accessed in browser via /test/{componentName}

export default {
  NotFound: {
    components: require('components/NotFound'),
    props: {}
  },
  SubHeader: {
    components: require('modules/app/components/restaurant-list/components/SubHeader'),
    props: {}
  },
  Loader: {
    components: require('components/Loader'),
    props: {}
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
  Dropdown: {
    components: require('modules/app/components/restaurant-landing/components/Dropdown'),
    props: {
      items: [
        'All',
        'Africa Restaurant',
        'Afghan Restaurant',
        'American Restaurant',
        'Asian Restaurant',
        'Something Restaurant',
        'Something2 Restaurant',
        'Something3 Restaurant',
        'Something4 Restaurant'
      ],
      isOpened: true
    }
  },
  Options: {
    components: require('components/Options'),
    props: {
      label: 'Cuisines',
      text: 'All'
    }
  },
  ImageSlide: {
    components: require('modules/app/components/restaurant-detail/components/ImageSlide'),
    props: {
      images: [
        'https://s3-media3.fl.yelpcdn.com/bphoto/Jt-heyagIeWlSGNcD6DSUw/o.jpg',
        'https://s3-media2.fl.yelpcdn.com/bphoto/zgESCUABKFAvTATWHpWT3w/o.jpg',
        'https://s3-media2.fl.yelpcdn.com/bphoto/qxl3bpWRv_Vm9t8kQNxgGQ/o.jpg'
      ],
      width: '100%',
      height: '250px'
    }
  },
  RatingCircle: {
    components: require('components/RatingCircle'),
    props: {
      rating: 2
    }
  },
  Arrow: {
    components: require('components/Arrow'),
    props: {
      className: 'right'
    }
  },
  Header: {
    components: require('components/Header'),
    props: {}
  },
  GroupList: {
    components: require('components/GroupList'),
    props: {
      group: {
        id: 'asdfadf',
        date: '2019/03/19',
        restaurantName: 'Ssam',
        count: 4
      }
    }
  }
};
