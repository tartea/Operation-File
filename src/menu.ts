import FileMenuPlugin from "main";
import { Settings } from "./SettingsTab";
/**
 * show right click menu
 *
 * @public
 * @param {FileMenuPlugin} plugin - The main plugin.
 */
const class_hide_file = "obsidian-hide-file";
const class_light_file = "obsidian-light-file";

export const showRightMenu = (
	plugin: FileMenuPlugin,
	callback?: () => void
): void => {
	plugin.registerEvent(
		plugin.app.workspace.on("file-menu", (menu, file) => {
			const fileExplorers =
				plugin.app.workspace.getLeavesOfType("file-explorer");

			fileExplorers.forEach((fileExplorer) => {
				const fileItem = fileExplorer.view.fileItems[file.path];
				const node = fileItem.el as HTMLElement;

				if (!node.classList.contains(class_light_file)) {
					menu.addItem((item) => {
						item.setTitle("隐藏文件").onClick(async () => {
							plugin.settings.filePaths.push(file.path);
							await plugin.saveSettings();
							// this.display();

							//hide file
							node.classList.add(class_light_file);
							addHideSetting(node, plugin.settings.showFile);
						});
					});
				}

				if (node.classList.contains(class_light_file)) {
					menu.addItem((item) => {
						item.setTitle("显示文件").onClick(async () => {
							plugin.settings.filePaths.remove(file.path);
							await plugin.saveSettings();
							//display file
							node.classList.remove(class_light_file);
							removeHideSetting(node, plugin.settings.showFile);
						});
					});
				}
			});
		})
	);
};

/**
 * 添加文件样式
 *
 * @param plugin
 * @param callback
 */
export const addFileClass = (
	plugin: FileMenuPlugin,
	settings: Settings,
	callback?: () => void
): void => {
	const fileExplorers = plugin.app.workspace.getLeavesOfType("file-explorer");
	fileExplorers.forEach((fileExplorer) => {
		settings.filePaths.forEach((filePath) => {
			const fileItem = fileExplorer.view.fileItems[filePath];
			const node = fileItem.el as HTMLElement;
			//show file
			node.classList.add(class_light_file);
			addHideSetting(node, plugin.settings.showFile);
		});
	});
};

/**
 * 展示文件
 *
 * @param plugin
 * @param callback
 */
export const removeFileClass = (
	plugin: FileMenuPlugin,
	filePath: string,
	callback?: () => void
): void => {
	const fileExplorers = plugin.app.workspace.getLeavesOfType("file-explorer");
	fileExplorers.forEach((fileExplorer) => {
		const fileItem = fileExplorer.view.fileItems[filePath];
		const node = fileItem.el as HTMLElement;
		//show file
		node.classList.remove(class_light_file);
		removeHideSetting(node, plugin.settings.showFile);
	});
};

/**
 * 展示文件
 *
 * @param plugin
 * @param callback
 */
export const toggleHideClass = (
	plugin: FileMenuPlugin,
	callback?: () => void
): void => {
	const fileExplorers = plugin.app.workspace.getLeavesOfType("file-explorer");
	fileExplorers.forEach((fileExplorer) => {
		plugin.settings.filePaths.forEach((filePath) => {
			const fileItem = fileExplorer.view.fileItems[filePath];
			const node = fileItem.el as HTMLElement;
			//变更隐藏的样式
			node.classList.toggle(class_hide_file);
		});
	});
};

/**
 * 判断是否添加隐藏样式
 * @param node
 */
function addHideSetting(node: HTMLElement, showFile: boolean) {
	if (showFile) {
		node.classList.add(class_hide_file);
	}
}
/**
 * 判断是否删除隐藏样式
 * @param node
 */
function removeHideSetting(node: HTMLElement, showFile: boolean) {
	if (showFile) {
		node.classList.remove(class_hide_file);
	}
}
