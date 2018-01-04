# kirbi-discord module
A module for [Kirbi](https://github.com/richardson-media-house/kirbi), that adds support for Discord.

For commands that are a simple call/response, add a file in `/config` called `markdown-commands.json` with the following format:
```json
[
	{
		"command": "rules",
		"description": "lists rules",
		"deleteRequest": true,
		"channelRestriction": "<channel to restrict command to>",
		"file": "extras/rules.md"
	}
]
```

* `deleteRequest` - Optional
* `channelRestrition` - Optional - Snowflake of channel to restrict command to
* `file` - File path relative to root Kirbi directory

If you want more than one message to be generated by a single markdown file, add a break with the content `=====`.

## Sub-modules

[kirbi-discord-antiraid](https://github.com/Richardson-Media-House/kirbi-discord-antiraid) => prevents raids on discord servers and handles welcoming of new members.

[kirbi-discord-moderation](https://github.com/Richardson-Media-House/kirbi-discord-moderation) => adds various server moderation commands.

[kirbi-discord-musicplayer](https://github.com/Richardson-Media-House/kirbi-discord-musicplayer) => adds support playing music in voice channels, and associated commands.
