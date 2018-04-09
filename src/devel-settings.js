import stripJsonComments from "strip-json-comments";
import deepAssign from "deep-assign";

// Apply devel and personal settings over the project ones
if(process.env.NODE_ENV === "development") {
	try {
		let devel = Assets.getText("settings-devel.json");
		deepAssign(Meteor.settings, JSON.parse(stripJsonComments(devel)));
	} catch(ex) {
		if(!ex.message.match(/Unknown asset/)) {
			console.error(ex);
		}
	}

	try {
		let personal = Assets.getText("settings-personal.json");
		deepAssign(Meteor.settings, JSON.parse(stripJsonComments(personal)));
	} catch(ex) {
		if(!ex.message.match(/Unknown asset/)) {
			console.error("2:", ex);
		}
	}
}
