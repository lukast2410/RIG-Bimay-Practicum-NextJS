"use strict";
exports.__esModule = true;
var react_1 = require("@headlessui/react");
var solid_1 = require("@heroicons/react/solid");
var react_2 = require("react");
function classNames() {
    var classes = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        classes[_i] = arguments[_i];
    }
    return classes.filter(Boolean).join(' ');
}
function ListData(_a) {
    var label = _a.label, listData = _a.listData, selectedData = _a.selectedData, setSelectedData = _a.setSelectedData;
    return (React.createElement(react_1.Listbox, { value: selectedData, onChange: setSelectedData }, function (_a) {
        var open = _a.open;
        return (React.createElement(React.Fragment, null,
            React.createElement(react_1.Listbox.Label, { className: 'block text-sm font-medium text-gray-700' },
                label,
                React.createElement("strong", { className: 'text-red-700' }, "*")),
            React.createElement("div", { className: 'mt-1 relative' },
                React.createElement(react_1.Listbox.Button, { id: 'adsanads', className: 'cursor-pointer bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-binus-blue focus:border-binus-blue sm:text-sm' },
                    React.createElement("span", { className: 'block truncate font-medium' }, selectedData.Name),
                    React.createElement("span", { className: 'absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none' },
                        React.createElement(solid_1.SelectorIcon, { className: 'h-5 w-5 text-gray-400', "aria-hidden": 'true' }))),
                React.createElement(react_1.Transition, { show: open, as: react_2.Fragment, leave: 'transition ease-in duration-200', leaveFrom: 'opacity-100', leaveTo: 'opacity-0' },
                    React.createElement(react_1.Listbox.Options, { static: true, className: 'absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm' }, listData.map(function (data, idx) { return (React.createElement(react_1.Listbox.Option, { key: idx, className: function (_a) {
                            var active = _a.active;
                            return classNames(active ? 'text-white bg-binus-blue' : 'text-gray-900', 'cursor-default select-none relative py-2 pl-3 pr-9');
                        }, value: data }, function (_a) {
                        var selected = _a.selected, active = _a.active;
                        return (React.createElement(React.Fragment, null,
                            React.createElement("span", { className: classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate') }, data.Name),
                            selected ? (React.createElement("span", { className: classNames(active ? 'text-white' : 'text-binus-blue', 'absolute inset-y-0 right-0 flex items-center pr-4') },
                                React.createElement(solid_1.CheckIcon, { className: 'h-5 w-5', "aria-hidden": 'true' }))) : null));
                    })); }))))));
    }));
}
exports["default"] = ListData;
