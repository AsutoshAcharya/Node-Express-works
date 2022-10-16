console.log(`hello World my first node program the classic way xd :D`);
// console.log(__dirname);
// console.log(__filename);
// setTimeout(() => {
//   console.log("hello");
// }, 1000);
// console.log(module);

const sayHi = (name) => {
  console.log(`hello ${name}`);
};
module.exports = sayHi;

