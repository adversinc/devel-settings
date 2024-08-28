"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = develSettings;
const strip_json_comments_1 = __importDefault(require("strip-json-comments"));
const deep_assign_1 = __importDefault(require("deep-assign"));
const fs_1 = __importDefault(require("fs"));
/**
 * Apply devel and personal settings over the project ones.
 * Tries to load settings-devel.json and then settings-personal.json from assets.
 */
function develSettings(Meteor, Assets) {
    if (process.env.NODE_ENV === "development") {
        try {
            let devel = loadFromAssets(Assets, "settings-devel.json");
            (0, deep_assign_1.default)(Meteor.settings, JSON.parse((0, strip_json_comments_1.default)(devel)));
        }
        catch (ex) {
            if (!ex.message.match(/Unknown asset/)) {
                console.error(ex);
            }
        }
        try {
            let personal = loadFromAssets(Assets, "settings-personal.json");
            (0, deep_assign_1.default)(Meteor.settings, JSON.parse((0, strip_json_comments_1.default)(personal)));
        }
        catch (ex) {
            if (!ex.message.match(/Unknown asset/)) {
                console.error(`Personal settings load error: ${ex.message}`);
            }
        }
    }
}
function loadFromAssets(Assets, asset) {
    if (Assets.getText) {
        return Assets.getText(asset);
    }
    // No getText method (Meteor 3+), use local fs
    const path = Assets.absoluteFilePath(asset);
    return fs_1.default.readFileSync(path, "utf8");
}
//# sourceMappingURL=devel-settings.js.map