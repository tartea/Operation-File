import {
	App,
	Editor,
	MarkdownView,
	Modal,
	Notice,
	Plugin,
	PluginSettingTab,
	Setting,
} from "obsidian";
import { addFileClass, showRightMenu, toggleHideClass } from "src/menu";
import { DEFAULT_SETTINGS, Settings, SettingsTab } from "src/SettingsTab";

// Remember to rename these classes and interfaces!

export default class FileMenuPlugin extends Plugin {
	settings: Settings;

	async onload() {
		await this.loadSettings();

		//定制右键菜单
		showRightMenu(this);

		//添加左侧按钮
		// this.addLeftIcon();

		//添加自定义命令
		this.addCustomCommand();

		// 在设置里面添加内容
		this.addSettingTab(new SettingsTab(this.app, this));

		//初始化设置
		this.app.workspace.onLayoutReady(() =>
			addFileClass(this, this.settings)
		);
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	// 在左侧创建一个图标
	addLeftIcon() {
		const ribbonIconEl = this.addRibbonIcon(
			"dice",
			"Sample Plugin",
			(evt: MouseEvent) => {
				// Called when the user clicks the icon.
				new Notice("This is a notice!");
			}
		);
		// 添加样式
		ribbonIconEl.addClass("my-plugin-ribbon-class");
	}

	//在命令行添加命令
	addCustomCommand() {
		// 显示 隐藏文件
		this.addCommand({
			id: "display/hide file",
			name: "display or hide file",
			callback: () => {
				toggleHideClass(this);
			},
		});
	}
}
