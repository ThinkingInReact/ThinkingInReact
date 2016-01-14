## Future Chapters

- Context Menus
- Data Visualization
- Reduxing our App
- Animating Our App (react-motion todomvc)
- An FRP App
- An app with channels and atoms
- Unleash the falcons -- An Alternative to REST
- User registration form
- Build Your Own React (prelude to full book?)
- Animations tweenstate -> pyhsical based animations -> Using rebound-js
- Changing Things
  - State
  - DOM Manipulations
  - Brief notes on Animations

## Notes

`~` tells webpack to look in modules directories when importing paths

We should document how nested reducers in Redux are necessary. Make a point to note how easily composable redcuers are. They are just plain functions so say for example you have and Articles reducer and you want to split individual logic for articles into an Article reducer. You can do something like:

```js
function articleReducer(state, action) {
  switch (action.type) {
    case 'SET_ARTILE_TITLE':
      return {
        ...state,
        title: action.title  
      }
    default:
      return state;
  }
}

function articlesReducer(state, action) {
  switch (action.type) {
    case 'SET_ARTILE_TITLE':
      return state.map((article) => {
        if(article.id === action.id) {
          Object.assign({}, article, articleReducer(article, action))
        }
        else {
          article
        }
      })      
    default:
      return state;
  }
}
```
