"use strict";

var handleLogin = function handleLogin(e) {
	e.preventDefault();

	$("#domoMessage").animate({ width: 'hide' }, 350);

	if ($("#user").val() == '' || $('#pass').val() == '') {
		handleError("Rawr, username or password not found");
		return false;
	}

	console.log($("input[name=_csrf]").val());

	sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);

	return false;
};

var handleSignup = function handleSignup(e) {
	e.preventDefault();

	$("#domoMessage").animate({ width: 'hide' }, 350);

	if ($("#user").val() == '' || $("#pass").val() || $("#pass2").val() == '') {
		handleError("Rawr, you need to fill out all fields");
		return false;
	}

	if ($("#pass").val() !== $("#pass2").val()) {
		handleError("Rawr, your passwords don't match");
		return false;
	}

	sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);

	return false;
};

// Oh boy react
var renderLogin = function renderLogin() {
	return React.createElement(
		"form",
		{ id: "loginForm", name: "loginForm",
			onSubmit: this.handleSubmit,
			action: "/login",
			method: "POST",
			classname: "mainForm"
		},
		React.createElement(
			"label",
			{ htmlFor: "username" },
			"Username: "
		),
		React.createElement("input", { id: "user", type: "text", name: "username", placeholder: "username" }),
		React.createElement(
			"label",
			{ htmlFor: "pass" },
			"Password: "
		),
		React.createElement("input", { id: "pass", type: "password", name: "pass", placeholder: "password" }),
		React.createElement("input", { type: "hidden", name: "_csrf", value: this.props.csrf }),
		React.createElement("input", { className: "formSubmit", type: "submit", value: "Sign in" })
	);
};

var renderSignup = function renderSignup() {
	return React.createElement(
		"form",
		{ id: "signupForm",
			name: "signupForm",
			onSubmit: this.handleSubmit,
			action: "/signup",
			method: "POST",
			className: "mainForm"
		},
		React.createElement(
			"label",
			{ htmlFor: "username" },
			"Username: "
		),
		React.createElement("input", { id: "user", type: "text", name: "username", placeholder: "username" }),
		React.createElement(
			"label",
			{ htmlFor: "pass" },
			"Password: "
		),
		React.createElement("input", { id: "pass", type: "password", name: "pass", placeholder: "password" }),
		React.createElement(
			"label",
			{ htmlFor: "pass2" },
			"Retype Password: "
		),
		React.createElement("input", { id: "pass2", type: "password", name: "pass2", placeholder: "password" }),
		React.createElement("input", { type: "hidden", name: "_csrf", value: this.props.csrf }),
		React.createElement("input", { className: "formSubmit", type: "submit", value: "Sign up" })
	);
};

var createLoginWindow = function createLoginWindow(csrf) {

	var LoginWindow = React.createClass({
		displayName: "LoginWindow",

		handleSubmit: handleLogin,
		render: renderLogin
	});

	ReactDOM.render(React.createElement(LoginWindow, { csrf: csrf }), document.querySelector("#content"));
};

var createSignupWindow = function createSignupWindow(csrf) {

	var SignupWindow = React.createClass({
		displayName: "SignupWindow",

		handleSubmit: handleSignup,
		render: renderSignup
	});

	ReactDOM.render(React.createElement(SignupWindow, { csrf: csrf }), document.querySelector("#content"));
};

var setup = function setup(csrf) {
	var loginButton = document.querySelector("#loginButton");
	var signupButton = document.querySelector("#signupButton");

	signupButton.addEventListener("click", function (e) {
		e.preventDefault();
		createSignupWindow(csrf);
		return false;
	});

	loginButton.addEventListener("click", function (e) {
		e.preventDefault();
		createLoginWindow(csrf);
		return false;
	});

	createLoginWindow(csrf);
};

var getToken = function getToken() {
	sendAjax('GET', '/getToken', null, function (result) {
		setup(result.csrfToken);
	});
};

$(document).ready(function () {
	getToken();
});
"use strict";

var handleError = function handleError(message) {
	$("#errorMessage").text(message);
	$("#domoMessage").animate({ width: 'toggle' }, 350);
};

var redirect = function redirect(response) {
	$("#domoMessage").animate({ width: 'hide' }, 350);
	window.location = response.redirect;
};

var sendAJAX = function sendAJAX(type, action, data, success) {
	$.ajax({
		cache: false,
		type: type,
		url: action,
		data: data,
		dataType: "json",
		success: success,
		error: function error(xhr, status, _error) {
			var msgObj = JSON.parse(xhr.responseText);
			handleError(msgObj.error);
		}
	});
};