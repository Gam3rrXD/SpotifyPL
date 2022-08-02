/**
 * @name SpotifyPL
 * @author Gam3rr
 * @authorId 849731649289453629
 * @version 2
 * @description Spotify Listen Along For Free Users | Prevents Discord From Pausing Spotify When Sharing Music
 * @source https://github.com/Gam3rrXD/SpotifyPL
 * @updateUrl https://raw.githubusercontent.com/Gam3rrXD/SpotifyPL/main/SpotifyPL.plugin.js
 */

module.exports = (_ => {
	const config = {
		"info": {
			"name": "SpotifyPL",
			"authors": [{
				"name": "Gam3rr",
				"discord_id": "849731649289453629",
				"github_username": "Gam3rrXD",
			}],
			"version": "2.1.0",
			"description": "Spotify Listen Along For Free Users | Prevents Discord From Pausing Spotify When Sharing Music",
			"github": "https://github.com/Gam3rrXD/SpotifyPL",
			"github_raw": "hhttps://raw.githubusercontent.com/Gam3rrXD/SpotifyPL/main/SpotifyPL.plugin.js"
		},
		"changelog": [
			{
				"title": "v2.1",
				"items": [
					"Hotfix Added For New Update!"
				]
			},
			{
				"title": "v2",
				"items": [
					"Renewed | Spotify No Pause Added!"
				]
			},
			{
				"title": "v1",
				"items": [
					"Original Plugin | No Pause Not Included."
				]
			}
		],
		"main": "index.js"
	};
	return !global.ZeresPluginLibrary ? class {
		constructor() {this._config = config;}
		getName() {return config.info.name;}
		getAuthor() {return config.info.authors.map(a => a.name).join(", ");}
		getDescription() {return config.info.description;}
		getVersion() {return config.info.version;}
		load() {
			BdApi.showConfirmationModal(
				"Library plugin is needed",
				[`The library plugin needed for ${config.info.name} is missing. Please click Download to install it.`], 
				{
					confirmText: "Download",
					cancelText: "Cancel",
					onConfirm: () => {
						require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", async (error, response, body) => {
							if (error) {
								return BdApi.showConfirmationModal("Error Downloading",
									[
										"Library plugin download failed. Manually install plugin library from the link below.",
										BdApi.React.createElement("a", { href: "https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", target: "_blank" }, "Plugin Link")
									],
								);
							}
							await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, r));
						});
					}
				}
			);
		}
		start() {}
		stop() {}
	} : (([Plugin, Api]) => {
		const plugin = (Plugin, Library) => {
			const { DiscordModules, Patcher, WebpackModules } = Library;
			return class SpotifyListenAlong extends Plugin {
				constructor() {
					super();
				}

				start() {
					
					Patcher.instead(DiscordModules.DeviceStore, 'getProfile', ( _, [id, t] ) =>
						DiscordModules.Dispatcher.dispatch({
							type: "SPOTIFY_PROFILE_UPDATE",
							accountId: id,
							isPremium: true
						})
					)
					Patcher.instead(WebpackModules.getByProps("isSpotifyPremium"), 'isSpotifyPremium', () => true)
				}

				stop() {
					Patcher.unpatchAll()
				}
			};
		};
		return plugin(Plugin, Api);
	})(global.ZeresPluginLibrary.buildPlugin(config));
	    return !global.ZeresPluginLibrary ? class {
        constructor() {this._config = config;}
        getName() {return config.info.name;}
        getAuthor() {return config.info.authors.map(a => a.name).join(", ");}
        getDescription() {return config.info.description;}
        getVersion() {return config.info.version;}
        load() {
            BdApi.showConfirmationModal("Library Missing", `The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`, {
                confirmText: "Download Now",
                cancelText: "Cancel",
                onConfirm: () => {
                    require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", async (error, response, body) => {
                        if (error) return require("electron").shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");
                        await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, r));
                    });
                }
            });
        }
        start() {}
        stop() {}
    } : (([Plugin, Api]) => {
        const plugin = (Plugin, Library) => {
  const { Patcher, WebpackModules } = Library;
  return class NoSpotifyPause extends Plugin {
    onStart() {
      const spotify = WebpackModules.getByProps("fetchIsSpotifyProtocolRegistered");
      Patcher.instead(spotify, "pause", function(){})
    }
    onStop() {
      Patcher.unpatchAll();
    }
  };
};
        return plugin(Plugin, Api);
    })(global.ZeresPluginLibrary.buildPlugin(config));
	
})();
