const COLORS = {
    "red" : "red",
    "blue" : "blue",
    "white" : "white",
    "green" : "green",
    "orange" : "orange",
    "yellow" : "yellow"
};

const PIECE_TYPES = [
    "middle", // 1 color
    "edge", // 2 colors
    "corner" // 3 colors
];

var g;

const SCENE = document.getElementById("main-scene");
const CUBE_TEMPLATE = document.getElementById("cubePiece").content;

const pieces = [];

class CubePiece {
    element; // readonly

    colors; // readonly
    type; // readonly

    constructor(...colors) {
        this.colors = colors
            .map(color => COLORS[color])
            .filter(color => color != undefined);
        
        this.type = PIECE_TYPES[this.colors.length - 1];

        this.element = document.importNode(CUBE_TEMPLATE, true);

        let currentFace = this.element;
        for(const color of this.colors) (currentFace = currentFace.firstElementChild).setAttribute("color", color);

        SCENE.appendChild(this.element);

        console.log(`created piece\n    type:${this.type}\n    colors:${this.colors}`);

        pieces.push(this);
    }
}