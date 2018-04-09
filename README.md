The module allows having several settings.json layers for production,
development and personal (local) usage.

Module activates itself in development env only (process.env.NODE_ENV === "development"),
and does not do anything in production.

**Module affects only the "private" branch (server-side) of the settings!**

# Goal

The goal is to have a main settings.json file with all settings required for
the project (both in development and production env).

However, the development env usually requires some adjustments to the settings
(like using devel REST endpoits, ports etc). Moreover, the local developer's
machine is often configured to use another (third) settings set.

This module does the job by overlapping the default ("production") settings
with development settings, and then with personal settings.

# Usage

```
import develSettings from "meteor-devel-settings";
develSettings(Meteor, Assets);
```

1. Meteor is being started as usual: "meteor --settings /private/settings.json"
2. Import meteor-devel-settings
2. develSettings(), upon called, tries to open /private/settings-devel.json and
then /private/settings-personal.json
3. If these files found in /private, their contents is appended to the default
settings, overwriting them.

## Comments

Both settings-devel.json and settings-personal.json support relaxed JSON and
and comments:

* keys can be bare words (no quotes),
* the comma after the last list entry can be used,
* both /* ... */ and // comments are supported.

Remember that main settings.json has to be a strict JSON.

## Git recommendations

It is advised to add /personal/settings-personal.json to .gitignore since
this file varies for each developer.

# Example

The example of the /private/settings-devel.json file:

```
{
	/*
	This is a development settings file for a developer. These settings are being
	applied over the /config/settings.json.

	Currently can NOT modify the "public" branch of the settings.
	*/

	private: {
		API: {
			endpoint: "https://www.github.com/api/",
			port: 3002,
		},
	}
}
```

The example of the /private/settings-personal.json file:

```
{
	/*
	This is a personal settings file for a developer. These settings are being
	applied over the /config/settings.json, and then over /private/settings-devel.json
	after startup.

	Currently can NOT modify the "public" branch of the settings.

	Should not be added to VCS.
	*/

	private: {
		API: {
			endpoint: "http://127.0.0.1",
		},
	}
}
```
