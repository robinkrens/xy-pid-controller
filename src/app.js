import {Vec2, Box, World} from "planck";
import * as MENU from "./menu.js";
import PIDController from "./pid-controller.js";

const canvas = document.getElementById("area");
const ctx = canvas.getContext("2d");

const world = World(Vec2(0, 0));

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const PPM = 30;

let targetX = 10;
let targetY = -2.5;

const boxWidth = 1;
const boxHeight = 1;

// Create a dynamic body for the box
const box = world.createDynamicBody(Vec2(1, -2.5));
box.createFixture({
	shape: Box(boxWidth, boxHeight),
	density: 1.0,
	friction: 0.01,
});

const pid = new PIDController();
MENU.initMenu(pid);

canvas.addEventListener("click", (event) => {
	targetX = (event.clientX - canvas.getBoundingClientRect().left) / PPM;
	targetY = -(event.clientY) / PPM;
	console.log("Updated target:", targetX, targetY);
});

// Render the box on the canvas
function render() {
	const position = box.getPosition();
	const angle = box.getAngle();

	// Clear the canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "white";
	ctx.fillRect(targetX * PPM, -targetY * PPM, 30, 30);

	// Draw the box
	ctx.save();
	ctx.rotate(angle);
	ctx.fillStyle = "blue";
	ctx.fillRect(
		position.x * PPM,
		-position.y * PPM,
		boxWidth * PPM,
		boxHeight * PPM
	);
	ctx.restore();
	const force = pid.Update(1 / 60, {x: position.x, y: position.y}, {x: targetX, y: targetY});
	box.applyForce(force, box.getWorldCenter());
}

function animate() {
	world.step(1 / 60);
	render();
	requestAnimationFrame(animate);
}

animate();

