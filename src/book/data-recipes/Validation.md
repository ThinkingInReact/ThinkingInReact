# Validation

You know when you find yourself with some addresses but you don't really know if they are adddresses? That can be hard. Not as hard as getting a pizza to rise without forming bubbles, but hard, up there with trying to yo-yo or understanding monads.

Let's say we have a model that looks like this:

```js
const userDetails = {
  address: {
    street: '',
    zip:    ''
  }
};
```

We want to verify that these places actually exist and not allow a user to pretend to exist in some non-existent place. Unfortunately, we cant effectively handle the edge case where people exist in non-existent places. We have to make assumptions about our users.

The first thing we need to realize is that when validating things we end up with orthogonal state, related state that shouldn't actually be part of the model. Under many circumstances we would be tempted to store the user's address immediately in the model but this would be a huge mistake. We would set ourselves all sorts of new problems. Somehow we would have to keep track of which userDetails are bad and which are are good, and the model data could never just be trusted without checking first.

Our model data will always be good. We will never ever put something bad into it. So, if we cant put bad data into the model where do we store the transient state we are gathering from the user? We store it in separate state for that form. By the time we save that form's data we should be able to trust that the data is good. It would look like this:

```js
const form = {
  address: {
    street: '',
    zip:    ''
  }
}
```

And we keep track of any errors: in the same form object:

```js
let form = {
  ...
  errors: [["zip", "Zip A113 is non-existent"]]
}
```

To validate our state we simply utilize a validator designed to operate against plain JS objects, something like [revalidator](https://github.com/flatiron/revalidator) for example. It would look like this:

```js
revalidator.validate(form.address, {
  properties: {
    zip: {
      description: 'A valid zip',
      type: 'string',
      pattern: '^\d{5}(-\d{4})?$',
      required: true
    },
  }
});
```

Adopting such an approach keeps our data model simple and makes our code easier to reason about. See the chapters on Payment forms and User Registration forms for some full examples.
