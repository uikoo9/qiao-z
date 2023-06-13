const { json }= require('../index.js');

const res = json('success', 'test', {});
console.log(res);
