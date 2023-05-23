// Get relative path depth
export const relativePathDepth = () => {
	let target = document.querySelector("script[data-rel-url]");

	if (target) {
		let path = target.getAttribute("data-rel-url");
		let dir = path.split("../");
		let relPath =
			path === "./"
				? path
				: dir
						.filter((item) => item === "")
						.map((item) => (item == "" ? "../" : ""))
						.toString()
						.replace(/,/g, "");

		return relPath.slice(0, -1);
	} else {
		return "";
	}
};

// Return SVG sprite
export const iconSprite = (name, width = 24, height = 24) => {
	return `<svg class="pointer-events-none" width=${width} height=${height}>
                <use xlink:href="${relativePathDepth()}/img/svg-sprite.svg#${name}"></use>
            </svg>`;
};

// Find out the platform is MAC or not
export const isMac = () => {
	const platform = navigator?.userAgentData?.platform || navigator?.platform;
	return platform.toUpperCase().indexOf("MAC") >= 0;
};

// Read mode
export const isReadMode = () => {
	const ROOT = document.documentElement;
	return ROOT.classList.contains("read-mode");
};
