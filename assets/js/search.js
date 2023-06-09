import groupBy from "lodash/groupBy";
import truncate from "lodash/truncate";
import { FlexSearch } from "flexsearch/dist/flexsearch.compact";
import { Validator } from "@cfworker/json-schema";
import { iconSprite, isMac, isReadMode, relativePathDepth } from "./utils";

const input = document.querySelector("#search-input");
const lang = input ? input.dataset.siteLang : "";

const init = (input, searchConfig) => {
	input.removeEventListener("focus", init);

	const indexCfgDefaults = {
		tokenize: "forward",
	};
	const indexCfg = searchConfig.indexConfig ? searchConfig.indexConfig : indexCfgDefaults;
	const dataUrl = relativePathDepth() + "/search/" + lang + ".data.min.json";

	indexCfg.document = {
		key: "id",
		index: ["title", "content", "description"],
		store: ["title", "href", "parent", "description"],
	};

	const index = new FlexSearch.Document(indexCfg);
	window.searchIndex = index;

	getJson(dataUrl, function (data) {
		data.forEach((obj) => {
			window.searchIndex.add(obj);
		});
	});
};

const search = (input, results, searchConfig) => {
	const searchCfg = {
		enrich: true,
		limit: 5,
	};

	while (results.firstChild) {
		results.removeChild(results.firstChild);
	}

	if (!input.value) {
		return results.classList.remove("has-hits");
	}

	let searchHits = flattenHits(window.searchIndex.search(input.value, searchCfg));

	if (searchHits.length < 1) {
		const noResult = document.createElement("li");
		noResult.classList.add("p-3", "flex", "flex-col", "items-center", "text-center");
		noResult.innerHTML = `<div class="mb-3">${iconSprite("no-result", 40, 40)}</div>
								No results have been found, Please <br/>rephrase your query!`;
		results.appendChild(noResult);
		return results.classList.remove("has-hits");
	}

	results.classList.add("has-hits");

	if (searchConfig.showParent === true) {
		searchHits = groupBy(searchHits, (hit) => hit.parent);
	}

	const items = [];

	if (searchConfig.showParent === true) {
		for (const section in searchHits) {
			const item = document.createElement("li"),
				title = item.appendChild(document.createElement("span")),
				subList = item.appendChild(document.createElement("ul"));

			if (!section) {
				title.remove();
			}
			title.classList.add("gdoc-search__section");
			title.textContent = section;
			createLinks(searchHits[section], subList, searchConfig.showDescription);

			items.push(item);
		}
	} else {
		const item = document.createElement("li"),
			subList = item.appendChild(document.createElement("ul"));
		createLinks(searchHits, subList, searchConfig.showDescription);

		items.push(item);
	}

	items.forEach((item) => {
		results.appendChild(item);
	});
};

/**
* Creates links to given fields and either returns them in an array or attaches them to a target element
* @param {Object} fields Page to which the link should point to
* @param {HTMLElement} target Element to which the links should be attatched
* @returns {Array} If target is not specified, returns an array of built links
*/
const createLinks = (pages, target, showDesc) => {
	const items = [];

	for (const page of pages) {
		const item = document.createElement("li"),
			a = item.appendChild(document.createElement("a")),
			entry = a.appendChild(document.createElement("span"));

		a.href = relativePathDepth() + page.href;
		entry.textContent = page.title;
		a.setAttribute("class", "text-body py-2 px-3 block hover:bg-slate-500/10 dark:hover:bg-dark-100/50 focus:outline-none focus:bg-slate-300/80 rounded");

		if (showDesc === true) {
			const desc = a.appendChild(document.createElement("span"));
			desc.setAttribute("gdoc-search__entry--description");
			desc.textContent = truncate(page.description, {
				length: 55,
				separator: " ",
			});
		}

		if (target) {
			target.appendChild(item);
			continue;
		}

		items.push(item);
	}

	return items;
};

const fetchErrors = (response) => {
	if (!response.ok) {
		throw Error("Failed to fetch '" + response.url + "': " + response.statusText);
	}
	return response;
};

function getJson(src, callback) {
	fetch(src)
		.then(fetchErrors)
		.then((response) => response.json())
		.then((json) => callback(json))
		.catch(function (error) {
			if (error instanceof AggregateError) {
				console.error(error.message);
				error.errors.forEach((element) => {
					console.error(element);
				});
			} else {
				console.error(error);
			}
		});
}

const flattenHits = (results) => {
	const items = [];
	const map = new Map();

	for (const field of results) {
		for (const page of field.result) {
			if (!map.has(page.doc.href)) {
				map.set(page.doc.href, true);
				items.push(page.doc);
			}
		}
	}

	return items;
};

const urlPath = (rawURL) => {
	let parser = document.createElement("a");
	parser.href = rawURL;

	return parser.pathname;
};

/**
* Part of [axios](https://github.com/axios/axios/blob/master/lib/helpers/combineURLs.js).
* Creates a new URL by combining the specified URLs
*
* @param {string} baseURL The base URL
* @param {string} relativeURL The relative URL
* @returns {string} The combined URL
*/
const combineURLs = (baseURL, relativeURL) => {
	return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
};

export const siteSearch = () => {
	const results = document.querySelector("#search-results");
	const configSchema = {
		type: "object",
		properties: {
			dataFile: {
				type: "string",
			},
			indexConfig: {
				type: ["object", "null"],
			},
			showParent: {
				type: "boolean",
			},
			showDescription: {
				type: "boolean",
			},
		},
		additionalProperties: false,
	};
	const validator = new Validator(configSchema);

	if (!input) return;

	getJson(relativePathDepth() + "/search/" + lang + ".config.min.json", function (searchConfig) {
		const validationResult = validator.validate(searchConfig);

		if (!validationResult.valid)
			throw AggregateError(
				validationResult.errors.map((err) => new Error("Validation error: " + err.error)),
				"Schema validation failed"
			);

		if (input) {
			input.addEventListener("focus", () => {
				init(input, searchConfig);
			});
			input.addEventListener("keyup", () => {
				search(input, results, searchConfig);
			});
		}
	});

	// Clear search
	const ROOT = document.documentElement;
	const SEARCH_ELEM = document.getElementById("search");
	const SEARCH_TOGGLE_ELEMS = document.querySelectorAll(".search-toggle");
	const searchClear = document.querySelectorAll(".search-clear");

	if (SEARCH_ELEM) {
		searchClear.forEach((elem) => {
			elem.addEventListener("click", () => {
				if (isReadMode()) {
					SEARCH_ELEM.classList.add("rm:hidden");
					input.value = "";
				} else {
					input.value = "";
				}
			});
		});

		SEARCH_TOGGLE_ELEMS.forEach((elem) => {
			elem.addEventListener("click", () => {
				SEARCH_ELEM.classList.remove("rm:hidden");
				input.focus();
			});
		});

		// Keybaord shortcuts
		const SEARCH_SHORTCUT_ELEMS = document.querySelectorAll(".search-shortcut");
		const SEARCH_SHORTCUT = isMac() ? "⌘K" : "Ctrl K";

		SEARCH_SHORTCUT_ELEMS.forEach((elem) => {
			elem.textContent = SEARCH_SHORTCUT;
		});

		// Set keyboard shortcut for search
		document.addEventListener("keydown", (e) => {
			let metaKey = isMac() ? e.metaKey : e.ctrlKey;

			// Focus search input
			if (metaKey && e.key === "k") {
				if (isReadMode()) {
					SEARCH_ELEM.classList.remove("rm:hidden");
					input.focus();
				} else {
					input.focus();
				}
				e.preventDefault();
			}

			// Clear search
			if (e.key === "Escape") {
				SEARCH_ELEM.classList.add("rm:hidden");
				input.value = "";
			}
		});
	}
};
