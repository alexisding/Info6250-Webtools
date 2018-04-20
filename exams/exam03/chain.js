const chain = {
  value: 0,
  one: function() {
    this.value += 1;
    return this;
  },
  two: function() {
    this.value += 2;
    return this;
  },
  result: function() {
    const result = this.value;
    this.value = 0;
    return result;
  }
};

module.exports = chain;
