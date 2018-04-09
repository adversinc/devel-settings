"use strict";

var _stripJsonComments = require("strip-json-comments");

var _stripJsonComments2 = _interopRequireDefault(_stripJsonComments);

var _deepAssign = require("deep-assign");

var _deepAssign2 = _interopRequireDefault(_deepAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Apply devel and personal settings over the project ones
if (process.env.NODE_ENV === "development") {
	try {
		var devel = Assets.getText("settings-devel.json");
		(0, _deepAssign2.default)(Meteor.settings, JSON.parse((0, _stripJsonComments2.default)(devel)));
	} catch (ex) {
		if (!ex.message.match(/Unknown asset/)) {
			console.error(ex);
		}
	}

	try {
		var personal = Assets.getText("settings-personal.json");
		(0, _deepAssign2.default)(Meteor.settings, JSON.parse((0, _stripJsonComments2.default)(personal)));
	} catch (ex) {
		if (!ex.message.match(/Unknown asset/)) {
			console.error("2:", ex);
		}
	}
}
//# sourceMappingURL=devel-settings.js.map