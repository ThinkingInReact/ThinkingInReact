# Your first React App: TodoMVC

Your first app is a hard choice. Do we build something unique that you have never seen before? Or do you build something very familiar, essentially porting some code you already know?

There is a benefit to uniqueness, we get to learn all sorts of new patterns and ideas we have had little exposure too; in the process we might discover new ways of thinking. The drawback is that we can get confused in unexpected places. Instead of focusing on learning we end up focusing on understanding the uniqueness.  

Porting something familiar like a todos app has the benefit of keeping us focused on just learning React. You don't have to worry about what a todo model should be or how a todo list looks because you have seen it a thousand times. You can just focus on learning React. There is a danger though that we end up taking old ways of thinking and just applying them to React. So much familiarity can make us think "oh, I know how to do this!" and we end up just building what we already knew how to build just with different tech.

For your first app we are going to stick to the familiar but build it with an emphasis on reactiness (of course that is a real word). We will try to strike a balance between staying in familiar territory and treading new ground. My hope is that you wont get overwhelmed by the new ways of doing things nor make the mistake of pushing old ways onto the React way. Let's get started.

## Up and Running

Generate the app by running:

```sh
nwb new react-app react-todos
```

cd into it and add the plugin for sass:

```sh
npm install --save-dev nwb-sass
```
Check that everything is working by running:

```sh
nwb serve --auto-install
```

## Adding Styles

Our styles will be directly borrowed from the TODOMVC project. Open https://raw.githubusercontent.com/tastejs/todomvc-app-css/master/index.css and copy the contents to src/styles/main.css:

```sh
mkdir src/styles
wget -O src/styles/App.css https://raw.githubusercontent.com/tastejs/todomvc-app-css/master/index.css
```

Now require the css in src/App.js:

```sh
import "./styles/App.css"
```

> **Hint** Unless otherwise noted, code goes into `src/App.js`. At the end we will re-organize and put things into semantically proper places. But for now it is very beneficial to just keep a lot of things in one file.

> **INFO** See the [step-1 branch](http://github.com/ThinkingInReact/react-todos/tree/step-1) for the app at this point

## The Data

The first thing we need to decide on is our app's data. This is counterintuitive to many developers. Server side development can train you to focus on business logic first. Business logic is often the most straightforward thing to implement. We just add some controllers some models and some tests then we are done. REST allows us to focus one part of our state at time without ever thinking about the whole of our app state.

I think the biggest hurdle to productively coding applications is learning to think about state. We have been trained by our tools to work on little bits of a state at time and it is often decided for us; by technology choices, by convention, or by another developer. MVC, REST, MVVM, are fundamentally all different conventions for reasoning out state, inputs and outputs.

The power of React is not its diff algorithm, JSX, or even its declarative nature, it is its emphasis on state. It encourages you to think about your data, to be explicit about it. Being explicit about your state helps you build better, clearer, simpler applications. It also makes you more productive and increases adjective usage.

Our app consists of a list of todos. A todo consists of two things;

1. Completion status
2. The todo's text

It looks like this;

```js
let todos = [
  {
    text: 'Save the cheerleader',
    completed: false,
    id: 'heroes'
  },
  { text: 'Save the world',
    completed: false,
    id: 'reborn'
  }
];
```

What state will we need to keep track of changing things in our app? The answer to this can be elusive, but becomes clear if we ask a stupid question or two. What does our app do? What actions can we perform?

We can do the following;

1. Filter todos by; All, Active and Completed.
2. Edit a todo
3. Complete a todo
4. Delete a todo

The first action reveals another state item, we need to keep track of the filter. Now our app state looks like this:

```js
let appState = {
  todos: [],
  filter: "ALL"
};
```

For editing we need to keep track of the current todo being edited and its id:

```js
editing: {
  todoId: null,
  text: null
}
```

Our complete app state now looks like:

```js
let appState = {
  todos: [],
  filter: null,
  editing: {
    id: null,
    text: null
  }
};
```

Move it into a file named src/state.js and export it:

```js
let appState = {
  todos: [],
  filter: null,
  editing: {
    id: null,
    text: null
  }
};

export default appState;
```

Let's now modify our app state to have some initial todos and then pass it into the render function:

```js
let appState = {
  todos: [
    {
      text: "Save the cheerleader",
      completed: false,
      id: "heroes"
    },
    { text:    "Save the world",
      completed: false,
      id: "reborn"
    }
  ],
  filter: null,
  editing: {
    todoId: null,
    text: null
  }
}

export default appState;
```

Our todos storage will be a simple array. For those used to frameworks like Backbone, Angular etc; this can feel like a massive oversimplification. Where are the models? If we have no models, then how will we handle syncing, storage, adding and removing, validation etc? These will handled separately and independently, with little functions that we can compose and re-use for any data not just that specific model's data.

React encourages you to work directly with your data. If all the view needs is just a simple array of object literals then that is what we will give it. We will handle changing our data elsewhere, outside of the flow of the app.

This doesn't just simplify our code, it also comes with huge technological wins. Have you ever tried to keep track of changes to a model? You have to build an entirely new pattern on top of it, keep track of all the method calls, and then replay them back. If you want undo for an array all you have to do is treat it is an immutable structure and you get undo for (almost) free.

It will feel awkward at first to not be able to just pass JSON into some model object, set and forget, but you will get used to it and when you do you will never want to go back.

Now we need one more thing: a render function that passes our appState into React and renders it. Open up src/index.js and replace it with the following

```js
import React from 'react'
import {render} from 'react-dom'

import App from './App'
import state from './state'

render(<App {...state} />, document.querySelector('#app'))
```

> **INFO** See the [step-2 branch](http://github.com/ThinkingInReact/react-todos/tree/step-2) for the app at this point

## The Views

Where React really shines is its ability to let you focus on the data and the views first. You can prototype first and worry about the behind the scenes until later. This stands in contrast to a lot of other frameworks that encourage a business logic first approach. React is data and views first.

Often I find that the benefits of this extend beyond productivity, the data and views ultimately inform logic and make it easier to reason about the backend. In retrospect, it feels kinda silly how we used to approach the logic first. Almost all apps are data and view centric, rarely is their focus the algorithms, but developers are taught to focus on algorithms and hope it results in good apps. The views are the user facing side and should be the ultimate authority, but more often than not we contort and twist our views to work for our logic, we sacrifice in the wrong places.

What views do we need? If we look at TodoMVC there are three main sections;

1. The header, which holds a check all button and a new todo adding field.
2. The main app section, which displays the list of todos
3. The footer, which holds counter and filters for sorting things

This gives use three main views and one subview used to display each Todo. Let's start by create a new component for the header. Run:

```sh
touch src/Header.js
```

Open it and add the following

```js
import React from 'react'

class Header extends React.Component {
  render () {
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          ref="newField"
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus={true}
        />
      </header>
    )
  }
}

export default Header;
```

This gives us a field for adding new todos. Now we need to modify our App component to render our header. While we are it we will render out our Todos view for our Todos to. Open up src/App.js and replace the render with:

```js
render() {
  return (
  <div className="todoapp">
    <Header {...this.props} />
    <section className="main">
      <input
        className="toggle-all"
        type="checkbox"
      />
    <Todos {...this.props} />
    </section>
  </div>
  )
}
```

> **INFO** This is our first encounter with a spread operator. It takes all the properties from the component and spreads them to the child component. Checkout the following for more info: https://facebook.github.io/react/docs/jsx-spread.html, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator

Somewhere near the top add two imports for the Header and Todos:

```js
import Header from './Header';
import Todos from './Todos';
```

Now we need a Todos view. Open up `src/Todos.js` and add the following:

```js
import React from 'react'
import Todo from './Todo'

class Todos extends React.Component {
  render() {
    var rows = [];
    var todos = this.props.todos.filter(function(todo) {
      switch (this.props.filter) {
      case "active":
        return !todo.completed;
      case "completed":
        return todo.completed;
      default:
        return true;
      }
    }, this);

    todos.map(function(todo) {
      if (this.props.editing.id == todo.id) {
        rows.push(<Todo key={todo.id} todo={todo} editing={this.props.editing} />);
      } else {
        rows.push(<Todo key={todo.id} todo={todo} />);
      }
    }, this);

    return (
      <ul className="todo-list">
        {rows}
      </ul>
    )
  }
}

export default Todos;
```

This takes all our todos and pushes them into individual rows that contain Todo views. We add a `key` field so React can keep track of them and improve its performance.

You might wonder why we just don't loop over the todos in the JSX, something like:

```js
<ul>
  todos.map((todo) =>
    <li> {todo.text} </li>
  )
</ul>
```

This wouldn't work because JSX calls are translated directly to React.createElement calls, which means anything not JSX is considered to be a string. Some examples should clarify things.

The following JSX:

```html
<div>Hello World!</div>;
```

Is translated to:

```js
React.createElement("div", null, "Hello World!")
```

This means that any JS we use in our views has to return the same structure of calls -- JS (when it doesn't throw errors) just ends up as strings.

If we had JSX like:

```html
<div>
  todos.map((todo) =>
    Hello World!
  )
</div>
```

When compiled it would become:

```js
React.createElement("div", null,
  "todos.map((todo) =" + '>' +
    "Hello World!" + ' ' +
  ")"
)
```

It can seem strange at first because a set of problems we are used to being very simple like loops, maps, etc can be harder than they usually are. But JSX has its own set of unique powers. Because JSX is React.createElement calls all the way down, we can emit JSX from any place. We can build little functions that emit JSX and compose the JSX together. Because JS is just function calls everything just works. JSX gives you the full power of JS and not a limited set of templating functionality.

Let's create a Todo component to display a todo.

First install a new module called "classnames", this will help us generate classes for our todos easily:

```sh
npm install --save classnames
```

Create a new component called `src/Todo.js` and change it to:

```js
import React from 'react';
import cx from 'classnames';

class Todo extends React.Component {
  render() {
    let editField;
    if (this.props.editing) {
      editField = <input ref="editField"
                         className="edit"
                         value={this.props.editing.text}
                         />;
    }
    return (
      <li className={cx({
        completed: this.props.todo.completed,
        editing:   this.props.editing
      })}>
        <div className="view">
          <input
            ref="toggle"
            className="toggle"
            type="checkbox"
            checked={this.props.todo.completed}
          />
          <label>
            {this.props.todo.text}
          </label>
          <button className="destroy" />
        </div>
        {editField}
      </li>
    );
  }
}

export default Todo;
```

Now we need a footer view. Create `src/Footer.js` with the following:

```js
import React from 'react';
import cx from 'classnames';

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{this.props.count}</strong> todos left
        </span>
        <ul className="filters">
          <li><a href="#/" className={cx({selected: this.props.filter == null})}>All</a></li>
          {' '}
          <li><a href="#/active" className={cx({selected: this.props.filter == "active"})}>Active</a></li>
          {' '}
          <li><a href="#/completed" className={cx({selected: this.props.filter == "completed"})}>Completed</a></li>
        </ul>
      </footer>
    );
  }
}

export default Footer;
```

Now that we have all views created lets hook them up together. Return to `src/App.js` and change it to the following:

```js
import './styles/App.css'
import React from 'react'
import Header from './Header'
import Todos from './Todos'
import Footer from './Footer'

class App extends React.Component {
  render() {
    return (
      <div className="todoapp">
        <Header {...this.props} />
        <section className="main">
          <input
            className="toggle-all"
            type="checkbox"
          />
        <Todos {...this.props} />
        </section>
        <Footer {...this.props} />
      </div>
    )
  }
}
```

> **INFO** See the [step-3 branch](http://github.com/ThinkingInReact/react-todos/tree/step-3) for the app at this point

At this point we should have everything rendering out albeit in a completely static fashion. It is time to add some action!

## The Actions

JavaScript makes it easy to shoot yourself in the foot. If you want to you can adopt any sort of technique for building your app. It makes no difference to JS if you want to use imperative spaghetti code that mutates everything with a bunch of jQuery callbacks or if you want to build everything using completely pure side-effect free functions. JS isn't going to get in your way no matter how you want to develop. JavaScript's greatest strengths are its greatest weaknesses.

React encourages you to adopt a rigid set of fundamentals and never ever violate them under any circumstances, to just say "I'm never ever ever going to use the bad parts". If you want to cheat you can, JS won't (and usually cant) stop you, but resist the temptation. Cheating will turn your code into Rube Goldberg machines.

For this app we are going to adopt one crucial constraint, we only update appState in one function. All other functions will simply return new objects and will not mutate state in place. With this constraint many of our architectural choices are immediately decided. Because functions have no way of updating state, we need a dispatcher that handles routing actions to their actual functions. We will always pass full state objects to these functions.

This means that any calls in our code will mostly look the same. It means that we can grow our functions as we desire. We can start by handling all our actions in a single function and later grow it to more functions.

> **HINT** You might recognize this architecture as [Redux](https://github.com/rackt/redux). We will look at building a Redux app in later chapters.

Let's figure out all the actions we have in our app;

1. Entering a new todo
2. Completing all the todos
3. Toggling complete on a todo
4. Editing a todo's text
5. Deleting a todo
6. Filtering todos by; All, active, and completed.
7. Start editing task
8. Editing Text
9. Stop editing task

This is a total of nine actions, not all that heavy for a single switch statement. Let's create a function for dispatching our actions (in src/index.js) and handling our actions:

```js
let state = handler(initialState, {});
function dispatch(action) {
  state = handler(state, action);
  render(state);
}

function handler(state = initialState, action) {
  switch(action.type) {
    case 'ADD_TODO':
    case 'COMPLETE_TODO':
    case 'UPDATE_TODO':
    case 'DELETE_TODO':
    case 'COMPLETE_ALL':
    case 'CHANGE_FILTER':
    case 'START_EDITING_TODO':
    case 'UPDATE_EDITING_TEXT':
    case 'STOP_EDITING_TODO':
    default:
      return state;
  }
}
```

Let's also create a wrapper around react-dom's render so we can easily render with new state:

```js
import {render as reactRender} from 'react-dom'

function render(state) {
  reactRender(<App {...state} />, document.querySelector('#app'))
}

render(state)
```

Our dispatch function passes things off to the handler, sets the state to the result of our reducer function and then calls render with the new state. If we make sure to never touch our app state outside of this function then we should have a predictable app with few state related bugs.

Let's complete our ADD_TODO action:

```js
case 'ADD_TODO':
  return (
    Object.assign({}, state, {
      todos: [{
        id: state.todos.length + 1,
        completed: false,
        text: action.text
      }, ...state.todos]})
  );
```

> **INFO** Notice how we pass Object.assign an empty object as its first argument. If we passed it the state as the first object then state would be mutated.

Our COMPLETE_TODO action:

```js
case 'COMPLETE_TODO':
  return Object.assign({}, state, { todos: state.todos.map(todo =>
    todo.id === action.id ? Object.assign({}, todo, { completed: !todo.completed }) : todo
  )});
```

This looks a little convoluted and it is, but it is mostly ceremony to avoid mutating state. We pass Object.assign an empty object, the current state, and then a modified todos array. The heart of the code is a todos map which simply loops through the todos and finds the one that needs changing.

Now the update action:

```js
case 'UPDATE_TODO':
  return Object.assign({}, state, { todos: state.todos.map(todo =>
    todo.id === action.id ? Object.assign({}, todo, { text: action.text }) : todo
  )});
```

The delete action

```js
case 'DELETE_TODO':
  return Object.assign({}, state, { todos: state.todos.filter(todo =>
    todo.id !== action.id
  )});
```

And an action to complete them all and in the darkness mutate them:

```js
case 'COMPLETE_ALL':
  const areAllMarked = state.todos.every(todo => todo.completed);
  return Object.assign({}, state, {todos: state.todos.map(todo => Object.assign({}, todo, {
    completed: !areAllMarked
  }))});
```

Then an action that changes the filter:

```js
case 'CHANGE_FILTER':
  return Object.assign({}, state, {filter: action.filter});
```

And finally actions for starting and stopping editing:

```js
case 'START_EDITING_TODO':
  return Object.assign({}, state, {editing: {id: action.id, text: action.text}});
case 'EDITING_TODO':
  return Object.assign({}, state, {editing: Object.assign({}, state.editing, {text: action.text})});
case 'STOP_EDITING_TODO':
  return Object.assign({}, state, {editing: {}});
```

> **INFO** See the [step-4 branch](http://github.com/ThinkingInReact/react-todos/tree/step-4) for the app at this point

## Connecting Things

With actions like this connecting things is simple. We just need handlers that listen to UI events and then call the dispatch function with an action and some data. Okay, so that is a massive oversimplification, but where would developers be without massive oversimplification.

Before we do anything else, lets pass our dispatch method to all the components. This is to overcome scope issues that we could overcome other ways, but for this project we will overcome it with laziness:

```js
function render(state) {
  reactRender(<App dispatch={dispatch} {...state} />, document.querySelector('#app'))
}
```

> **INFO**: The idiomatic way to overcome this problem is to use React's context feature. https://facebook.github.io/react/docs/context.html.

Let's start with our new todo input. Let's add add handler for it to src/Header.js

```js
handleNewFieldKeyDown(event) {
  // Check for enter key
  if (event.keyCode !== 13) {
    return;
  }

  event.preventDefault();

  this.props.dispatch({type: 'ADD_TODO', text: event.target.value});
}
```

And we need to modify our field to use it:

```js
<input
  ref="newField"
  className="new-todo"
  placeholder="What needs to be done?"
  autoFocus={true}
  onKeyDown={this.handleNewFieldKeyDown.bind(this)}
/>
```

The next thing we'd like to be able to do to our todos is to complete them. Let's open up our todo view (src/Todo.js) and add some event handling to check off todos:

```js
toggle(event) {
  this.props.dispatch({type: 'COMPLETE_TODO', id: this.props.todo.id});
}
...
<input
  ref="toggle"
  className="toggle"
  type="checkbox"
  checked={this.props.todo.completed}
  onChange={this.toggle.bind(this)}
/>
...
```

> **WARNING**: React uses onChange for all mutable fields. If you were to specify the handler as onClick it wouldn't like you. So use onChange for all fields.

Try this out and you should get an error warning you that this.props.dispatch is undefined. This is because we forgot to pass it to our Todo component. Open `src/components/Todos.js` and modify the rows output (lines 18-24) to include it:

```js
todos.map(function(todo) {
  if (this.props.editing.id == todo.id) {
    rows.push(<Todo dispatch={this.props.dispatch} key={todo.id} todo={todo} editing={this.props.editing} />);
  } else {
    rows.push(<Todo dispatch={this.props.dispatch} key={todo.id} todo={todo} />);
  }
}, this);
```

Toggling todos to complete and back again should work now. Now we come to the heart of our application, or maybe the heart is adding todos, who can know these things -- anyways we have come to the point where we add support for editing of tasks we have created. This is a savior feature for those with spelling problems. First, we need to trigger the showing of our editing field by adding a doubleClick handler to the label that triggers and edit field to be revealed:

```js
showEditField(event) {
  this.props.dispatch({type: 'START_EDITING_TODO', id: this.props.todo.id, text: this.props.todo.text});
}
...
<label onDoubleClick={this.showEditField.bind(this)}>
  {this.props.todo.text}
</label>
...
```

Now when we double click we should have a edit field that we can make changes in and see --- Wait, what the hell, why aren't text changes showing up? When we click the edit field appears but we cant make any changes!! What is going on here? The answer lies in how React treats input fields.

In React there are two types of input fields;

1. Standard fields. These are your normal browser input fields and can be edited/interacted with normally.
2. "Controlled" fields. These can only be modified by changing state.

When added a value property to our input we indicated to React that the field should be controlled. If we remove the property the input works as expected:

```js
editField = <input ref="editField" className="edit"/>;
```

Why do fields even work this way? The answer is that it allows us to maintain a central location for a field's state. We can update the state and then watch as the field is updated.

Keeping state like this is not just useful for unidirectional data flow. Imagine a user is editing and suddenly closes his browser window. Under normal circumstances maintaining a user's current editing state would be a nightmare. In almost all cases we would settle for a basic state restore, restoring the UI from the last synced data. But if we have text field's input as state then entire UI can be restored down to the most minute details. Losing form data becomes a thing of the past, what the user sees is what we have.

To finish hooking up our editing field we only need to make sure we update the state on every change:

```js
updateEditingText(event) {
  this.props.dispatch({type: 'UPDATE_EDITING_TEXT', id: this.props.todo.id, text: event.target.value});
}

stopEditingTodo(event) {
  this.props.dispatch({type: 'STOP_EDITING_TODO', id: this.props.todo.id, text: event.target.value});
}

handleKeyDown(event) {
  if (event.which === 27) {
    this.updateEditingText(event);
  } else if (event.which === 13) {
    this.stopEditingTodo(event);
  }
}

...
editField = <input ref="editField"
                   className="edit"
                   value={this.props.editing.text}
                   onChange={this.updateEditingText.bind(this)}
                   onKeyDown={this.handleKeyDown.bind(this)}
                   />;
```

Next up is the ability to destroy our todos. Let's add function for handling the event:

```js
destroyTodo(event) {
  this.props.dispatch({type: 'DELETE_TODO', id: this.props.todo.id});
}
```

And connect it:

```html
<button className="destroy" onClick={this.destroyTodo.bind(this)} />
```

Now let's add completeAll. Open src/App.js and add a callback to our toggle-all field:

```js
completeAll(event) {
  this.props.dispatch({type: 'COMPLETE_ALL'});
}
...
<input
  className="toggle-all"
  type="checkbox"
  onChange={this.completeAll.bind(this)}
/>
...
```

> **WARNING**: React uses onChange for all mutable fields. If you were to specify the handler as onClick it wouldn't like you. So use onChange for all fields.

There is one final hookup we need to do, the filters. Open up src/Footer.js and add functions to set the filters:

```js
filterAll(event) {
  event.preventDefault();
  this.props.dispatch({type: "CHANGE_FILTER", filter: "all"});
}

filterActive(event) {
  event.preventDefault();
  this.props.dispatch({type: "CHANGE_FILTER", filter: "active"});
}

filterCompleted(event) {
  event.preventDefault();
  this.props.dispatch({type: "CHANGE_FILTER", filter: "completed"});
}

...

<ul className="filters">
  <li><a href="#/" onClick={this.filterAll.bind(this)} className={cx({selected: this.props.filter == null})}>All</a></li>
  {' '}
  <li><a href="#/active" onClick={this.filterActive.bind(this)} className={cx({selected: this.props.filter == "active"})}>Active</a></li>
  {' '}
  <li><a href="#/completed" onClick={this.filterCompleted.bind(this)} className={cx({selected: this.props.filter == "completed"})}>Completed</a></li>
</ul>
...
```

> **INFO** See the [step-5 branch](http://github.com/ThinkingInReact/react-todos/tree/step-5) for the app at this point

## Saving Data

Under normal circumstances persistence can be a nightmare, you have to work out how to serialize your models, how to turn them into JSON, perhaps change them a bit, maybe call a few specific methods, and figure out how to connect it all together. But with all our state and data in on central spot all we have to do in is just dump it to a DB. It is literally that simple. Let's do it.


```js
let state = localStorage.getItem('state'); // Read state from localStorage

// Check if anything was in localStorage, if so JSON.parse it. If not, just default to initialState
if(!state) {
  state = initialState;
} else {
  state = JSON.parse(state);
}

state = handler(state, {}); // Initialize the state
```

Now there is only one thing left, we need to dump the appState everytime dispatch gets new state:

```js
function dispatch(action) {
  state = handler(state, action);
  render(state);
  localStorage.setItem('state', JSON.stringify(state));
}
```

And make sure to change our initial render call to use state and not initialState:

```js
render(state)
```

Try it out! It is pretty awesome! Since we have been careful about only using props for state, literally every state of our UI is persisted and restored upon refresh. Pretty cool, huh?

> **INFO** See the [step-6 branch](http://github.com/ThinkingInReact/react-todos/tree/step-6) for the app at this point

That wraps up your first React app! In later chapters we will examine how to make this app more idiomatic and how to utilize Redux to eliminate all the boilerplate.
