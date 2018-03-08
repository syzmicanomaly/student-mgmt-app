const
    $          = require("jquery"),
    dateformat = require("dateformat")
;

const Utils = {};

Utils.bind = function (ctx) {
    const fns = Array.prototype.slice.call(arguments, 1);
    $.each(fns, function (i, fnName) {
        const fn    = ctx[fnName];
        ctx[fnName] = fn.bind(ctx);
    });
};

Utils.die = function (err) {
    throw new Error(err);
};

Utils.formatDate = function(date, format) {
    if (!date) {
        return "";
    }
    date = (typeof date === "string") ? new Date(date) : date;
    const formatted = dateformat(date, format);
    return formatted;
};

module.exports = Object.freeze(Utils);