# Let’s look at a first example, to give you a taste of what working with Promises is like

With Node.js-style callbacks, reading a file asynchronously looks like this:

```javascript
fs.readFile('config.json',
    function (error, text) {
        if (error) {
            console.error('Error while reading config file');
        } else {
            try {
                const obj = JSON.parse(text);
                console.log(JSON.stringify(obj, null, 4));
            } catch (e) {
                console.error('Invalid JSON in file');
            }
        }
    });
```

With Promises, the same functionality is used like this:

```javascript
readFilePromisified('config.json')
.then(function (text) { // (A)
    const obj = JSON.parse(text);
    console.log(JSON.stringify(obj, null, 4));
})
.catch(function (error) { // (B)
    // File read error or JSON SyntaxError
    console.error('An error occurred', error);
});
```

There are still callbacks, but they are provided via methods that are invoked on the result (`then()` and `catch()`). The error callback in line B is convenient in two ways: First, it’s a single style of handling errors (versus *if (error)* and *try-catch* in the previous example). Second, you can handle the errors of both `readFilePromisified()` and the callback in line A from a single location.

The code of `readFilePromisified()` is shown later.