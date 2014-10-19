//! scrolltable.js - simple, dependency-free sticky-header table scrolling
//! version : 1.0.0
//! authors : Jason Jones
//! license : MIT
//! https://github.com/jgj/scrolltable

(function(factory) {
    "use strict";

    if(typeof define === "fucntion" && define.amd) {
        define(factory);
    } else if(typeof module !== "undefined" && typeof module.exports !== "undefined") {
        module.exports = factory();
    } else {
        window.ScrollTable = factory();
    }

})(function() {
    "use strict";

    var arr = Array.prototype,
        body = document.querySelector("body"),
        defaults = {
            height: 250,
            widths: "auto",
            styleAll: false
        };

    function ScrollTable(table, options) {
        var thead = table.querySelector("thead"),
            tbody = table.querySelector("tbody"),
            tfoot = table.querySelector("tfoot"),
            widths;

        this.options = extend(defaults, options);

        this.table = table;
        this.thead = thead;
        this.tbody = tbody;
        this.tfoot = tfoot;

        this.columnCount = thead.querySelectorAll("tr:last-of-type > *").length;

        if(this.options.styleAll) {
            this.hCells = thead.querySelectorAll("tr > *");
            this.bCells = tbody.querySelectorAll("tr > *");
            this.fCells = tfoot ? tfoot.querySelectorAll("tr > *") : [];
        } else {
            this.hCells = thead.querySelectorAll("tr:last-of-type > *");
            this.bCells = tbody.querySelectorAll("tr:first-of-type > *");
            this.fCells = tfoot ? tfoot.querySelectorAll("tr:first-of-type > *") : [];
        }

        this.widths = widths;
        this.enable();
    };

    ScrollTable.prototype.enable = function() {
        sbfix();
        this.widths = initWidths(this.hCells, this.options.widths);

        this.table.classList.add("scrolltable");
        setWidth(this.table, this.widths.reduce(sumArr, 0));

        styleCells(this.hCells, this.widths);
        styleCells(this.bCells, this.widths);
        styleCells(this.fCells, this.widths);

        setHeight(this.tbody, this.options.height);
        sbfix(true);
    };

    ScrollTable.prototype.disable = function() {
        var empty = new Array(this.columnCount);
        setHeight(this.tbody, null);

        styleCells(this.hCells, empty);
        styleCells(this.bCells, empty);
        styleCells(this.fCells, empty);

        setWidth(this.table, null);
        this.table.classList.remove("scrolltable");
    };

    ScrollTable.prototype.setHeight = function(height) {
        setHeight(this.tbody, (this.options.height = height));
    };

    ScrollTable.prototype.reset = function() {
        this.disable();
        setTimeout(this.enable.bind(this), 1);
    };

    function initWidths(cells, widths) {
        if(Array.isArray(widths) && widths.length === cells.length) return options.widths;
        return arr.map.call(cells, getCellWidth);
    }

    function getCellWidth(cell) {
        return cell.offsetWidth;
    }

    function setWidth(node, width) {
        node.style.width = width ? width + "px" : "";
        node.style.maxWidth = width ? width + "px" : "";
        node.style.minWidth = width ? width + "px" : "";
    }

    function setHeight(node, height) {
        node.style.height = height ? height + "px" : "";
        node.style.maxHeight = height ? height + "px" : "";
    }

    function styleCells(cells, widths) {
        var l = widths.length;
        arr.forEach.call(cells, function(cell, index) {
            setWidth(cell, widths[index % l]);
        });
    }

    // Existing scroll bars may affect table widths, so hide them
    function sbfix(reset) {
        body.classList.toggle("st-sb-fix", !reset);
    }

    function sumArr(memo, item) {
        return memo + item;
    }

    function extend(obj) {
        obj = obj || {};
        for(var i=0,src; i<arguments.length; src=arguments[++i]) {
            if(!src) continue;
            for(var key in src) {
                if(src.hasOwnProperty(key)) obj[key] = src[key];
            }
        }
        return obj;
    }

    return ScrollTable;
});