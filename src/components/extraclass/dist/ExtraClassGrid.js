"use strict";
exports.__esModule = true;
var solid_1 = require("@heroicons/react/solid");
var listShift = [
    { id: 1, Name: '07:20 - 09:00' },
    { id: 2, Name: '09:20 - 11:00' },
    { id: 3, Name: '11:20 - 13:00' },
    { id: 4, Name: '13:20 - 15:00' },
    { id: 5, Name: '15:20 - 17:00' },
    { id: 6, Name: '17:20 - 19:00' },
    { id: 7, Name: '19:20 - 21:00' },
    { id: 8, Name: '21:20 - 23:00' },
];
var formatDate = function (date) {
    var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var monthName = monthNames[monthIndex];
    var year = date.getFullYear();
    return day + " " + monthName + " " + year;
};
function ExtraClassGrid(_a) {
    var key = _a.key, extra = _a.extra;
    var course = extra.Course.split('-');
    var ast = extra.Assistant1 + (extra.Assistant2.length == 0 ? '' : ' & ' + extra.Assistant2);
    var date = formatDate(new Date(extra.ExtraClassDate));
    return (React.createElement("div", { key: key, className: 'flex flex-col rounded-lg shadow-lg overflow-hidden' },
        React.createElement("div", { className: 'flex-shrink-0 bg-binus-blue text-white font-medium text-center py-2 px-4' },
            React.createElement("p", { className: 'text-xl font-semibold' }, course[0]),
            React.createElement("p", { className: 'text-lg leading-tight border-b-2 border-white pb-1.5' }, course[1]),
            React.createElement("p", { className: 'text-base pt-1' }, ast)),
        React.createElement("div", { className: 'flex-1 bg-white pt-2 pb-4 px-4 flex flex-col justify-between' },
            React.createElement("div", { className: 'flex-1' },
                React.createElement("a", { href: '', className: 'block' },
                    React.createElement("p", { className: 'text-lg font-semibold text-gray-900 overflow-ellipsis overflow-hidden whitespace-nowrap' }, extra.Topics))),
            React.createElement("div", { className: 'mt-2 flex items-center text-gray-500 text-sm font-medium' }, listShift[extra.Shift - 1].Name),
            React.createElement("div", { className: 'mt-1 flex items-center text-gray-500 text-sm font-medium' }, date),
            React.createElement("div", { className: 'flex justify-between' },
                React.createElement("div", { className: 'mt-1 flex items-center text-gray-500 text-sm font-medium' },
                    React.createElement(solid_1.LocationMarkerIcon, { className: 'h-4 w-4 mr-1' }),
                    extra.Room),
                React.createElement("div", { className: 'mt-1 flex items-center text-blue-600 text-sm font-medium cursor-pointer hover:text-blue-700' }, "Read More")))));
}
exports["default"] = ExtraClassGrid;
