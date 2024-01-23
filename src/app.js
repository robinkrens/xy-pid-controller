import {Vec2, Box, World} from "planck";
import * as MENU from "./menu.js";
import PIDController from "./pid-controller.js";

// Get the canvas element
const canvas = document.getElementById("area");
const ctx = canvas.getContext("2d");

const world = World(Vec2(0, 0));

canvas.width =	window.innerWidth;
canvas.height = window.innerHeight;

const PPM = 30;

var targetX = 10;
const targetY = -2.5;

// Define the box properties
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

canvas.addEventListener("click", function(event) {
	targetX = (event.clientX - canvas.getBoundingClientRect().left) / PPM;
	console.log("Updated targetX:", targetX);
});

// Render the box on the canvas
function render() {
	const position = box.getPosition();
	const angle = box.getAngle();

	// Clear the canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = "white";
	ctx.fillRect(targetX * PPM, (-position.y * PPM), 30, 30);

	// Draw the box
	ctx.save();
	//ctx.translate(position.x * PPM, (-position.y * PPM));
	ctx.rotate(angle);
	ctx.fillStyle = "blue";
	ctx.fillRect(position.x * PPM, (-position.y * PPM), boxWidth * PPM, boxHeight * PPM);
	ctx.restore();
	var r = pid.Update(1/60, position.x, targetX);
	//console.log(r);
	var force = {x: r, y: 0};
	box.applyForce(force, box.getWorldCenter());
}

// Animation loop
function animate() {
	world.step(1 / 60);
	render();
	requestAnimationFrame(animate);
}

animate();
