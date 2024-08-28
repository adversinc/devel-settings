import stripJsonComments from "strip-json-comments";
import deepAssign from "deep-assign";
import fs from "fs";

/**
 * Apply devel and personal settings over the project ones.
 * Tries to load settings-devel.json and then settings-personal.json from assets.
 */
export default function develSettings(Meteor, Assets) {
	if(process.env.NODE_ENV === "development") {
		try {
			let devel = loadFromAssets(Assets, "settings-devel.json");
			deepAssign(Meteor.settings, JSON.parse(stripJsonComments(devel)));
		} catch(ex) {
			if(!ex.message.match(/Unknown asset/)) {
				console.error(ex);
			}
		}

		try {
			let personal = loadFromAssets(Assets, "settings-personal.json");
			deepAssign(Meteor.settings, JSON.parse(stripJsonComments(personal)));
		} catch(ex) {
			if(!ex.message.match(/Unknown asset/)) {
				console.error(`Personal settings load error: ${ex.message}`);
			}
		}
	}
}

function loadFromAssets(Assets: any, asset: string): string {
	if(Assets.getText) {
		return Assets.getText(asset);
	}

	// No getText method (Meteor 3+), use local fs
	const path = Assets.absoluteFilePath(asset);
	return fs.readFileSync(path, "utf8");
}