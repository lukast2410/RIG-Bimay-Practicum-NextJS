"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var head_1 = require("next/head");
var react_particles_js_1 = require("react-particles-js");
var axios_1 = require("axios");
var useUser_1 = require("../../lib/useUser");
var Login_module_scss_1 = require("../../../styles/pages/Login.module.scss");
var react_fontawesome_1 = require("@fortawesome/react-fontawesome");
var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
var solid_1 = require("@heroicons/react/solid");
var react_1 = require("react");
var aes_1 = require("../api/aes");
function Login() {
    var _this = this;
    var mutateUser = useUser_1["default"]({
        redirectTo: '/',
        redirectIfFound: true
    }).mutateUser;
    var _a = react_1.useState(false), isLogin = _a[0], setLogin = _a[1];
    var _b = react_1.useState(false), isFailed = _b[0], setFailed = _b[1];
    var handleLogin = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var body, numbers, binusian, initial, astCode, error_1, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    setLogin(true);
                    body = {
                        username: e.target.username.value,
                        password: e.target.password.value,
                        role: 'Student'
                    };
                    numbers = /^[0-9]+$/;
                    binusian = /^[Bb][Nn][0-9]+$/;
                    initial = /^[A-Za-z][A-Za-z][0-9][0-9]-[0-9]/;
                    astCode = /^[Ll][Cc][0-9A-Za-z]+$/;
                    if (!(numbers.test(body.username) || binusian.test(body.username))) return [3 /*break*/, 5];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, mutateUser(axios_1["default"].post("/api/login", body))];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    setFailed(true);
                    setLogin(false);
                    console.log('Error happened: ' + error_1);
                    return [3 /*break*/, 4];
                case 4: return [3 /*break*/, 11];
                case 5:
                    if (!(initial.test(body.username) || astCode.test(body.username))) return [3 /*break*/, 10];
                    body.role = 'Assistant';
                    body.password = aes_1.EncryptToBase64(body.username, body.password);
                    _a.label = 6;
                case 6:
                    _a.trys.push([6, 8, , 9]);
                    return [4 /*yield*/, mutateUser(axios_1["default"].post("/api/login", body))];
                case 7:
                    _a.sent();
                    return [3 /*break*/, 9];
                case 8:
                    error_2 = _a.sent();
                    setFailed(true);
                    setLogin(false);
                    console.log('Error happened: ' + error_2);
                    return [3 /*break*/, 9];
                case 9: return [3 /*break*/, 11];
                case 10:
                    setFailed(true);
                    setLogin(false);
                    _a.label = 11;
                case 11: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement("main", null,
        React.createElement(head_1["default"], null,
            React.createElement("title", null, "Login"),
            React.createElement("meta", { name: 'description', content: 'Login to Binusmaya Practicum' })),
        React.createElement("div", { className: "" + Login_module_scss_1["default"].itemCenter },
            React.createElement("form", { onSubmit: handleLogin, name: 'formLogin', className: "rounded-xl lg:bg-grey-700 " + Login_module_scss_1["default"].formLogin, id: 'form-login', autoComplete: 'off' },
                React.createElement("i", { className: Login_module_scss_1["default"].CIbanner }),
                React.createElement("span", { className: Login_module_scss_1["default"].logoBinus }),
                React.createElement("div", { className: Login_module_scss_1["default"].loginInputContainer },
                    React.createElement("div", { className: "rounded-md bg-red-100 p-2.5 " + Login_module_scss_1["default"].inputControl, hidden: !isFailed },
                        React.createElement("div", { className: 'flex' },
                            React.createElement("div", { className: 'flex-shrink-0' },
                                React.createElement(solid_1.XCircleIcon, { className: 'h-5 w-5 text-red-500', "aria-hidden": 'true' })),
                            React.createElement("div", { className: 'ml-3' },
                                React.createElement("p", { className: 'text-sm font-medium text-red-900' }, "Authentication Failed!")),
                            React.createElement("div", { className: 'ml-auto pl-3' },
                                React.createElement("div", { className: '-mx-1.5 -my-1.5' },
                                    React.createElement("button", { type: 'button', className: 'inline-flex bg-red-100 rounded-md p-1.5 text-red-500 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-red-50 focus:ring-red-600', onClick: function () { return setFailed(false); } },
                                        React.createElement("span", { className: 'sr-only' }, "Dismiss"),
                                        React.createElement(solid_1.XIcon, { className: 'h-5 w-5', "aria-hidden": 'true' })))))),
                    React.createElement("div", { className: "rounded-md " + Login_module_scss_1["default"].inputControl },
                        React.createElement("input", { name: 'username', placeholder: 'NIM / Binusian Number', required: true, autoFocus: true, className: "rounded-md " + Login_module_scss_1["default"].inputComponent }),
                        React.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faUser, className: Login_module_scss_1["default"].fa })),
                    React.createElement("div", { className: "" + Login_module_scss_1["default"].inputControl },
                        React.createElement("input", { name: 'password', type: 'password', placeholder: 'Password', required: true, className: "rounded-md " + Login_module_scss_1["default"].inputComponent }),
                        React.createElement(react_fontawesome_1.FontAwesomeIcon, { icon: free_solid_svg_icons_1.faLock, className: Login_module_scss_1["default"].fa })),
                    React.createElement("button", { type: 'submit', className: "rounded-md inline-flex items-center justify-center transition ease-in-out duration-150 focus:outline-none " + Login_module_scss_1["default"].loginBtn },
                        isLogin ? (React.createElement("svg", { className: 'animate-spin h-5 w-5 -ml-4 mr-2 text-white', xmlns: 'http://www.w3.org/2000/svg', fill: 'none', viewBox: '0 0 24 24' },
                            React.createElement("circle", { className: 'opacity-25', cx: '12', cy: '12', r: '10', stroke: 'currentColor', strokeWidth: '4' }),
                            React.createElement("path", { className: 'opacity-75', fill: 'currentColor', d: 'M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z' }))) : null,
                        "Login")))),
        React.createElement("footer", { className: Login_module_scss_1["default"].textCenter },
            React.createElement("div", { className: Login_module_scss_1["default"].desktopFooter }, "Copyright \u00A9 2021 - Research and Development - SLC - Binus University"),
            React.createElement("div", { className: Login_module_scss_1["default"].mobileFooter },
                React.createElement("div", { className: Login_module_scss_1["default"].mobileFooterText }, "Copyright \u00A9 2021"),
                React.createElement("div", { className: Login_module_scss_1["default"].mobileFooterText }, "Research and Development"),
                React.createElement("div", { className: Login_module_scss_1["default"].mobileFooterText }, "SLC - Binus University"))),
        React.createElement(react_particles_js_1["default"], { className: Login_module_scss_1["default"].particlesJS, params: {
                particles: {
                    number: {
                        value: 40,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: '#ffffff'
                    },
                    shape: {
                        type: 'circle',
                        stroke: {
                            width: 0,
                            color: '#000000'
                        },
                        polygon: {
                            nb_sides: 5
                        },
                        image: {
                            src: 'img/github.svg',
                            width: 100,
                            height: 100
                        }
                    },
                    opacity: {
                        value: 0.5,
                        random: false,
                        anim: {
                            enable: false,
                            speed: 1,
                            opacity_min: 0.1,
                            sync: false
                        }
                    },
                    size: {
                        value: 2,
                        random: true,
                        anim: {
                            enable: false,
                            speed: 100,
                            size_min: 0.1,
                            sync: false
                        }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#ffffff',
                        opacity: 1,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 1,
                        direction: 'none',
                        random: false,
                        straight: false,
                        out_mode: 'out',
                        attract: {
                            enable: false,
                            rotateX: 600,
                            rotateY: 1200
                        }
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: {
                            enable: true,
                            mode: 'grab'
                        },
                        onclick: {
                            enable: false,
                            mode: 'bubble'
                        },
                        resize: true
                    },
                    modes: {
                        grab: {
                            distance: 125,
                            line_linked: {
                                opacity: 1.5
                            }
                        },
                        bubble: {
                            distance: 200,
                            size: 3,
                            duration: 1,
                            opacity: 8
                        },
                        repulse: {
                            distance: 0
                        },
                        push: {
                            particles_nb: 4
                        },
                        remove: {
                            particles_nb: 2
                        }
                    }
                },
                retina_detect: true,
                config_demo: {
                    hide_card: false,
                    background_color: '#b61924',
                    background_image: '',
                    background_position: '50% 50%',
                    background_repeat: 'no-repeat',
                    background_size: 'cover'
                }
            } })));
}
exports["default"] = Login;
