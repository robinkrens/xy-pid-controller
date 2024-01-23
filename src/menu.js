import {Pane} from "tweakpane";

function initMenu()
{
	const pane = new Pane();
	const tab = pane.addTab({
		pages: [{title: "Creative Mode"}, {title: "Preset"}]
	});

}

export {initMenu};
