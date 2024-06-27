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

const SCENE = document.getElementById("main-scene");
const CUBE_TEMPLATE = document.getElementById("cubePiece").content;

const pieces = [];

class CubePiece {
    element; // readonly

    colors; // readonly
    type; // readonly

    position;

    orientation;

    constructor(orientation, position, ...colors) {
        this.orientation = orientation,
        this.position = position,
        this.colors = colors
            .map(color => COLORS[color])
            .filter(color => color != undefined);
        
        this.type = PIECE_TYPES[this.colors.length - 1];

        this.element = document.importNode(CUBE_TEMPLATE, true);

        const faces = this.element.firstElementChild.children;
        for(let index = 0; index < this.colors.length; index++) faces[index].setAttribute("color", this.colors[index]);

        SCENE.appendChild(this.element);

        console.log(`created piece\n    type:${this.type}\n    colors:${this.colors}`);

        pieces.push(this);
    }
}

new CubePiece(0, {x : 0, y : 0, z : 0}, "red", "blue", "green");