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

const CUBE_ENTITY = document.getElementById("cube-entity");
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

        this.element = document.importNode(CUBE_TEMPLATE, true).firstElementChild;

        const faces = this.element.children;
        for(let index = 0; index < this.colors.length; index++) faces[index].setAttribute("color", this.colors[index]);

        CUBE_ENTITY.appendChild(this.element);

        console.log(`created piece\n    type:${this.type}\n    colors:${this.colors}`);

        pieces.push(this);
    }
}

function createCube() {
    new CubePiece(0, {x : -1, y : -1, z : 0}, "red", "orange", "green");
    new CubePiece(0, {x : 0, y : -1, z : 0}, "red", "orange");
    new CubePiece(0, {x : 1, y : -1, z : 0}, "red", "blue", "orange");
    new CubePiece(0, {x : 1, y : 0, z : 0}, "red", "blue");
    new CubePiece(0, {x : 0, y : 0, z : 0}, "red");
    new CubePiece(0, {x : 1, y : -1, z : 1}, "blue", "orange");
}

function updateCube() {
    for(const piece of pieces) {
        piece.element.setAttribute("position", `${piece.position.x} ${piece.position.y} ${piece.position.z}`);
        
        const rotation = {x : 0, y : 0, z : 0};

        rotation.y = piece.position.z
        if(piece.position.z == 1) {
            rotation.y = -90;
        }

        if(piece.position.z == 0) {
            rotation.y = 0;
        }

        if(piece.position.x == 1) {
            rotation.z = 90;
        }

        piece.element.setAttribute("rotation", `${rotation.x} ${rotation.y} ${rotation.z}`)
    }
}

createCube();

updateCube();