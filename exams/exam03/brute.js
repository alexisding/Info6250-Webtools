const bruteForce = (obj1, obj2) => {
  for(let key of Object.keys(obj2)) {
    obj1[key] = obj2[key];
  }
};

module.exports = bruteForce;
