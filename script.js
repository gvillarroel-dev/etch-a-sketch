const container = document.querySelector(".etch-sketch__screen");
const clear = document.querySelector("#clear");
const colorMode = document.querySelector("#colorMode");
const gridMode = document.querySelector("#changeSize");

let squares = [];

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

		square.addEventListener("mouseover", () => {
			square.style.transitionDuration = "0.3s";
			square.style.backgroundColor = colorMode.value;
		});
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

createGrid(16);
