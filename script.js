const container = document.querySelector(".etch-sketch__screen");
const clear = document.querySelector("#clear");
const gridMode = document.querySelector("#changeSize");

const colorMode = document.querySelector("#colorMode");
const rainbowMode = document.querySelector("#rainbowMode");
const darkenMode = document.querySelector("#darkenColor");

let squares = [];
let currentColorMode = "classic";

const getRandomColor = () => {
	const red = Math.floor(Math.random() * 256);
	const green = Math.floor(Math.random() * 256);
	const blue = Math.floor(Math.random() * 256);

	return `rgb(${red}, ${green}, ${blue})`;
};

const handlerColor = (e) => {
	const square = e.target;

	if (currentColorMode === "controlled") {
		square.style.backgroundColor = colorMode.value;
		square.style.transitionDuration = "0.3s";
		square.style.opacity = 1;
	} else if (currentColorMode === "rainbow") {
		square.style.backgroundColor = getRandomColor();
		square.style.transitionDuration = "0.3s";
		square.style.opacity = 1;
	} else if (currentColorMode === "darken") {
		let currentOpacity = Number(square.style.opacity);
		if (!square.style.opacity) {
			currentOpacity = 0;
			square.style.backgroundColor = "#000";
		}
		if (currentOpacity < 1) {
			square.style.opacity = currentOpacity + 0.1;
		}
	} else {
		square.style.backgroundColor = colorMode.value;
		square.style.transitionDuration = "0.3s";
		square.style.opacity = 1;
	}
};

const createGrid = (size) => {
	const totalSquares = size * size;
	const squarePercentage = 100 / size;

	container.textContent = "";
	squares = [];

	for (let i = 0; i < totalSquares; i++) {
		const square = document.createElement("div");
		square.classList.add("screen__pixel");

		square.style.width = `${squarePercentage}%`;
		square.style.height = `${squarePercentage}%`;

		square.addEventListener("mouseover", handlerColor);
		container.appendChild(square);
		squares.push(square);
	}
};

const changeGridSize = () => {
	let newSize = prompt("Enter a size of the grid (1-100):");

	if (newSize === null) return null;
	newSize = parseInt(newSize);

	while (isNaN(newSize) || newSize <= 0 || newSize > 100) {
		newSize = prompt("Invalid input. Enter a number between 1 and 100:");
		if (newSize === null) return null;
		newSize = parseInt(newSize);
	}

	return newSize;
};

clear.addEventListener("click", () => {
	squares.forEach((square) => (square.style.backgroundColor = ""));
});

gridMode.addEventListener("click", () => {
	const size = changeGridSize();
	if (size !== null) {
		createGrid(size);
	}
});

colorMode.addEventListener("click", () => {
	currentColorMode = "controlled";
});

rainbowMode.addEventListener("click", () => {
	currentColorMode = "rainbow";
});

darkenMode.addEventListener("click", () => {
	currentColorMode = "darken";
});

createGrid(16);
