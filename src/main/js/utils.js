const
    $          = require("jquery"),
    dateformat = require("dateformat")
;

const Utils = {};

/**
 * Binds all functions specified by function names provided after context object to context.
 *
 * For example:
 *
 * Utils.bind(instance, ""doFoo", "doBar");
 *
 * @param ctx object to find functions to
 */
Utils.bind = function (ctx) {
    const fns = Array.prototype.slice.call(arguments, 1);
    $.each(fns, function (i, fnName) {
        const fn    = ctx[fnName];
        ctx[fnName] = fn.bind(ctx);
    });
};

/**
 * Simply throws error. Allows paradigm:
 *
 * object.prop || Utils.die("Object requires prop");
 */
Utils.die = function (err) {
    throw new Error(err);
};

/**
 * Returns date string using provided format string.
 *
 * @param {string|Date} date    date object or date string
 * @param {string} format       format string
 * @return {string}
 */
Utils.formatDate = function (date, format) {
    if (!date) {
        return "";
    }
    date = (typeof date === "string") ? new Date(date) : date;

    // noinspection UnnecessaryLocalVariableJS
    const formatted = dateformat(date, format);
    return formatted;
};

/**
 * Replaces item in array.
 *
 * @param {[]} ary           array of objects
 * @param {*} toFind        object to replace
 * @param {*} newElement    replacement object
 * @return {[]} provided array
 */
Utils.replace = function (ary, toFind, newElement) {
    const index = ary.indexOf(toFind);
    ary.splice(index, 1, newElement);
    return ary;
};

module.exports = Object.freeze(Utils);