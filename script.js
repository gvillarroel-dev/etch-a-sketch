const screenContainer = document.querySelector(".etch-sketch__screen");
const clearButton = document.querySelector("#clear");
const changeSizeButton = document.querySelector("#changeSize");
const colorPicker = document.querySelector("#colorPicker");
const rainbowButton = document.querySelector("#rainbowButton");
const darkenButton = document.querySelector("#darkenButton");

let pixels = [];
let activeColorMode = "picker";

const generateRandomColor = () => {
	const red = Math.floor(Math.random() * 256);
	const green = Math.floor(Math.random() * 256);
	const blue = Math.floor(Math.random() * 256);

	return `rgb(${red}, ${green}, ${blue})`;
};

const applyColor = (pixel) => {
	switch (activeColorMode) {
		case "picker":
			pixel.style.backgroundColor = colorPicker.value;
			pixel.style.opacity = 1;
			break;
		case "rainbow":
			pixel.style.backgroundColor = generateRandomColor();
			pixel.style.opacity = 1;
			break;
		case "darken":
			let currentOpacity = parseFloat(pixel.style.opacity) || 0;
			if (currentOpacity === 0) {
				pixel.style.backgroundColor = "#000";
			}
			if (currentOpacity < 1) {
				pixel.style.opacity = currentOpacity + 0.1;
			}
			break;
		default:
			pixel.style.backgroundColor = colorPicker.value;
			pixel.style.opacity = 1;
	}
	pixel.style.transitionDuration = "0.3s";
};

const handlePixelHover = (e) => {
	const pixel = e.target;
	applyColor(pixel);
};

const createGrid = (size) => {
	const totalPixels = size * size;
	const pixelSize = 100 / size;

	screenContainer.textContent = "";
	pixels = [];

	for (let i = 0; i < totalPixels; i++) {
		const pixel = document.createElement("div");
		pixel.classList.add("screen__pixel");

		pixel.style.width = `${pixelSize}%`;
		pixel.style.height = `${pixelSize}%`;

		pixel.addEventListener("mouseover", handlePixelHover);
		screenContainer.appendChild(pixel);
		pixels.push(pixel);
	}
};

const promptGridSize = () => {
	let userInput = prompt("Enter a size of the grid (1-100):");

	if (userInput === null) return null;

	let size = parseInt(userInput);

	while (isNaN(size) || size <= 0 || size > 100) {
		userInput = prompt("Invalid input. Enter a number between 1 and 100:");
		if (userInput === null) return null;
		size = parseInt(userInput);
	}

	return size;
};

const clearCanvas = () => {
	pixels.forEach((pixel) => {
		pixel.style.backgroundColor = "";
		pixel.style.opacity = "";
	});
};

clearButton.addEventListener("click", clearCanvas);

changeSizeButton.addEventListener("click", () => {
	const newSize = promptGridSize();
	if (newSize !== null) {
		createGrid(newSize);
	}
});

colorPicker.addEventListener("click", () => {
	activeColorMode = "picker";
});

rainbowButton.addEventListener("click", () => {
	activeColorMode = "rainbow";
});

darkenButton.addEventListener("click", () => {
	activeColorMode = "darken";
});

createGrid(16);
