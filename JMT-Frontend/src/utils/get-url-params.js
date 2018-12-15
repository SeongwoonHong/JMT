const getURLSearchParams = (str, param) => {
  const params = new URLSearchParams(str);

  return params.get(param);
};

export default getURLSearchParams;
