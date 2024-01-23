import {Vec2, Box, World} from "planck";

// Get the canvas element
const canvas = document.getElementById("area");
const ctx = canvas.getContext("2d");

// Create a <link>Planck.js</link> world
const world = World(Vec2(0, 0));

// Define the box properties
const boxWidth = 50;
const boxHeight = 50;

// Create a dynamic body for the box
const box = world.createDynamicBody(Vec2(200, 100));
box.createFixture({
	shape: Box(boxWidth / 2, boxHeight / 2),
	density: 1.0,
});

// Render the box on the canvas
function render() {
	const position = box.getPosition();
	const angle = box.getAngle();

	// Clear the canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Draw the box
	ctx.save();
	ctx.translate(position.x, position.y);
	ctx.rotate(angle);
	ctx.fillStyle = "#0095DD";
	ctx.fillRect(-boxWidth / 2, -boxHeight / 2, boxWidth, boxHeight);
	ctx.restore();
}

// Animation loop
function animate() {
	world.step(1 / 60);
	render();
	requestAnimationFrame(animate);
}

animate();
