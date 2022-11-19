import FileMenuPlugin from "main";
import { App, Notice, PluginSettingTab, setIcon, Setting } from "obsidian";
import { removeFileClass, toggleHideClass } from "./menu";

export interface Settings {
	filePaths: string[];
	showFile: boolean;
}

export const DEFAULT_SETTINGS: Settings = {
	filePaths: [],
	showFile: true,
};

export class SettingsTab extends PluginSettingTab {
	plugin: FileMenuPlugin;

	constructor(app: App, plugin: FileMenuPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl("h2", { text: "文件操作" });

		this.addShowFileSetting();

		this.plugin.settings.filePaths.forEach((filePath) => {
			const iconDiv = createDiv({ cls: "custom-file-settings-icon" });
			setIcon(iconDiv, "file", 20);
			const setting = new Setting(containerEl)
				.setName(filePath)
				.addExtraButton((button) => {
					button
						.setIcon("trash")
						.setTooltip("Remove File Path")
						.onClick(async () => {
							this.plugin.settings.filePaths.remove(filePath);
							await this.plugin.saveSettings();
							this.display();
							removeFileClass(this.plugin, filePath);
						});
				});
			setting.nameEl.prepend(iconDiv);
			setting.nameEl.addClass("custom-file-flex");
		});
	}

	addShowFileSetting(): void {
		new Setting(this.containerEl)
			.setName("Show hide file")
			.setDesc("this hide file will show with a color")
			.addToggle((toggle) => {
				toggle.setValue(this.plugin.settings.showFile);
				toggle.onChange(async (value) => {
					this.plugin.settings.showFile = value;
					await this.plugin.saveSettings();
					this.display();
					toggleHideClass(this.plugin);
				});
			});
	}
}
