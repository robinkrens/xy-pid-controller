import {Pane} from "tweakpane";

function initMenu(pid)
{
	const pane = new Pane();
	const pidSettings = pane.addFolder({
		title: "PID settings"
	});
	pidSettings.addInput(
		pid.PIDParams, "proportionalGain",
		{min: 0, max: 10, step: 0.1}
	);
	
	pidSettings.addInput(
		pid.PIDParams, "derivativeGain",
		{min: 0, max: 10, step: 0.1}
	);
	
	pidSettings.addInput(
		pid.PIDParams, "integralGain",
		{min: 0, max: 10, step: 0.1}
	);
	pane.addMonitor(pid.PIDParams, "force", {
		title: "Force (N)",
  		view: "graph",
		min: -10000,
		max: +10000,
	});
}

export {initMenu};
