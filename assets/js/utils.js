// Return SVG sprite
export const iconSprite = (name, width = 24, height = 24) => {
	return `<svg class="pointer-events-none" width=${width} height=${height}>
                <use xlink:href="./img/svg-sprite.svg#${name}"></use>
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
