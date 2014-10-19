# ScrollTable

A simple script to make tables scroll with sticky headers. No dependencies. Works in modern browsers (IE10+).
[ScrollTable in action](http://jgj.github.io/scrolltable)

### How to use it
```js

// ScrollTable(tableElement, options);
var st = new ScrollTable(table, { height: 250 });

// Set a new height
st.setHeight(500);

// Reset (remeasure column widths)
st.reset();

// Disable (remove all styles)
st.disable()

// Enable (apply styles with last set options)
st.enable()
```

ScrollTable relies on CSS for achieving the desired effect and uses JavaScript to apply some of the styles at runtime.
By default ScrollTable tries to do the minimum amount of work to make your table scroll. It sets styles on the last row in the thead,
the first row in the tbody and the first row in the tfoot. This is typically enough to make the rest of the rows fall in line.
If you remove any of these rows, the layout of your table will go wonky. You can set the `styleAll` option to `true` if you want to protect against this.
Or, you can call `reset()` to remeasure the layout and reapply styles.

Colspans and rowspans are not yet supported.

### Options
```js
new ScrollTable(table, {
    // Integer: absolute height, in pixels
    height: 250,
    // Array: the desired widths of the columns in your table
    // Anything else: ScrollTable will measure the widths itself
    widths: "auto" || [],
    // Set to true to apply styles to all rows (slower, but protects against row removal breaking layout)
    styleAll: false
});
```
