# Testing Components

Testing JavaScript applications is hard. If you are careful and clever eventually you'll find a tolerable workflow. First, you have to get an environment to run your tests in. If you are lucky this takes only a few commands but it usually means half a dozen commands, a few curse words, and way too many visits to StackOverflow and GitHub issues. Now that you have an environment ready you can setup and configure a test runner to run your tests. Then finally, you are ready to write your tests. Tests that will take forever to load and take ages to run.

Testing is this way because we have to interact with our apps like a browser would. We have to send click events, mouse events, trigger buttons, and submit forms. The only way to know our code works is to feed it browser events in a browser. All the complexity is due to this need, if we could do away with it, our entire testing ecosystem would be dramatically simpler!

React doesn't just offer a means to dramatically simplify creating apps it can make testing them dramatically easier. If we are careful to route all our events through central app state, and if we make sure all our components are pure, then it becomes unnecessary (almost) to test their inputs through events. We can simply feed our components state and check that they return the correct result. If we do things this way it becomes possible to replace the browser with a virtual DOM. And we run and test our apps entirely against a virtual DOM, our tests will run fast and load even faster. It allows us to simplify our entire test workflow to a single command. No large configs, no complicated tooling, headless browsers, or browser drivers, just a script and some node.js.

To test our apps without the browser we can use a virtual DOM library called [jsdom](https://github.com/tmpvar/jsdom). The simplest way to use jsdom is by pushing it into globals and tricking React testUtils into rendering into it. This might sound a bit hackish but React is designed to render into any DOM without issues, it makes no difference to it whether that DOM is real or not.

## Setting Up jsdom

To setup jsdom add a file called test/setup.js with the following:

```js
import jsdom from 'jsdom';

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = window.navigator;

window.addEventListener('load', () => {
  console.log('JSDom loaded!');
});
```

This loads jsdom into the globals and gives React all it needs to render something out.

Now install mocha by running:

```sh
npm install mocha --save-dev
```

Then add a script to package.json:

```js
"scripts": {
  "test": "mocha --compilers js:babel-core/register --recursive"
}
```

> **TIP**: We don't need any complicated setups for JSX or es6 processing. We simply pass a compiler as an argument to mocha and we are done.

And that is it!

## Testing With Shallow Renders

To test our components we simply need to render them to jsdom. We can do this by calling the shallow renderer.

```js
const React = require('react/addons');
const TestUtils = React.addons.TestUtils;

const shallowRenderer = TestUtils.createRenderer();
shallowRenderer.render(<MyComponent className="MyComponent">"brave little toaster"</MyComponent>));

const component = shallowRenderer.getRenderOutput();
```

And to test it we simply assert its content:

```js
expect(component.props.className).to.equal('MyComponent');
```

This works with jsx too. For example, say we have a Todos component and we want to check that when passed a new todo it renders it, we only need to declare the expected output and compare it with what the component renders:

```js
result = renderer.getRenderOutput();
var todos = [
  {text: "Save the leading cheer"},
  {text: "Win the cheerleading regionals"}
]

expect(result.props.children).toEqual([
  <Todo todo={todo} />
  <Todo todo={todo} />
]);
```

You might be wondering how we test actions in our components, the answer is we don't. We test actions separately. As long as our components are pure they can be completely tested by passing in different state. Want to test adding a todo? Pass a new todo into the state. It seems too simple to be true at first, but it really is all that is necessary to properly test a pure component.

Checkout out some of the completed example projects to see how this all fits together.
