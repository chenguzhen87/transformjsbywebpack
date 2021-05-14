const t = require('@babel/types');
const {parse} = require('@babel/parser');
const tr = require('@babel/traverse');
const {default: traverse} = require('@babel/traverse');
const {default: generate} = require('@babel/generator');

const codes = "log('Hello, world!');";

const ast = parse(codes, {
  sourceType: "module"
});

const visitor = {
  Identifier(path) {
    const {node} = path;
    if(node && node.name === 'log') {
      path.replaceWithSourceString('console.log');
      path.stop();
    }
  }
}

traverse(ast, visitor);

const map = generate(ast, { /* options */ }, codes);

console.log(map.code);
// console.log('Hello, world!');

function createMemberExpression() {
  return t.memberExpression(
    t.identifier('console'),
    t.identifier('log')
  );
}
