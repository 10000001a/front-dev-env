module.exports = function myloader (content) {
  // console.log('myloader가 동작함');
  // console.log(content)
  return content.replace('console.log(', 'alert(');
};