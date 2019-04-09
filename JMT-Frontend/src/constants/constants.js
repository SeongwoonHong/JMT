export const cuisineOptions = [
  {
    name: 'All',
    value: 'All'
  },
  {
    name: 'African Restaurant',
    value: 'african'
  },
  {
    name: 'Afghan Restaurant',
    value: 'afghani'
  },
  {
    name: 'American Restaurant',
    value: 'tradamerican,newamerican'
  },
  {
    name: 'Korean Restaurant',
    value: 'korean'
  },
  {
    name: 'Japanese Restaurant',
    value: 'japanese'
  },
  {
    name: 'Asian Restaurant',
    value: 'asian'
  },
  {
    name: 'Chinese Restaurant',
    value: 'chinese'
  },
  {
    name: 'French Restaurant',
    value: 'french'
  },
  {
    name: 'Italian Restaurant',
    value: 'italian'
  },
  {
    name: 'Fast Food',
    value: 'hotdogs'
  }
];
export const locationOptions = [
  {
    name: 'Current Location',
    value: 'Current Location',
  },
  {
    name: 'Enter Location',
    value: 'Enter Location',
  }
];
export const categories = [ /** Menu Category and Sub menus */
  {
    name: 'Sort',
    subItems: ['Distance', 'Rating', 'Low to high cost', 'High to low cost']
  },
  {
    name: 'Cuisines',
    subItems: ['afghani', 'african', 'american', 'arabian', 'argentine', 'armenian', 'korean', 'japanese', 'chinese', 'korean1', 'korean2', 'korean3', 'korean4']
  },
  {
    name: 'Price',
    subItems: ['$', '$$', '$$$', '$$$$']
  },
];
export const headerHeight = 45;
export const colors = {
  white: 'rgb(255, 255, 255)',
  lightPink: 'rgba(246, 86, 65, 0.06)',
  theme: 'rgb(246, 58, 63)',
  lightTheme: 'rgb(246, 86, 65)',
  black: 'rgb(37, 37, 37)',
  themeWithGradient: 'linear-gradient(to right ,rgb(244,123,66), rgb(246,54,64))',
  grey: 'rgba(0, 0, 0, 0.4)',
  lightGrey: 'rgb(210, 210, 224)',
  backgroundOverlay: 'rgba(0, 0, 0, 0.75)',
  inputColor: 'rgb(80, 80, 80)',
  inputBorder: 'rgb(173, 173, 173)',
  teal: 'rgb(0,128,128)',
  lightBlue: 'rgb(135,206,250)'
};

export const defaultProfilePicture = 'data:image/png;base64,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';
