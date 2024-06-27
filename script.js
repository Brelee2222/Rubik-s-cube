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

const CUBE_SIZE = 3;

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
    new CubePiece(0, {x : 0, y : 0, z : 1}, "red", "orange", "green");
    new CubePiece(0, {x : 1, y : 0, z : 1}, "red", "orange");
    new CubePiece(0, {x : 2, y : 0, z : 1}, "red", "blue", "orange");
    new CubePiece(0, {x : 2, y : 1, z : 1}, "red", "blue");
    new CubePiece(0, {x : 1, y : 1, z : 1}, "red");
}

function updateCube() {
    for(const piece of pieces) {
        piece.element.setAttribute("position", `${piece.position.x} ${piece.position.y} ${piece.position.z}`);
        
        const rotation = {x : 0, y : 0, z : 0};

        if(piece.position.z == 0)
            rotation.y = -90;
        else if(piece.position.z == CUBE_SIZE)
            rotation.y = 90;

        if(piece.position.x == 0)
            rotation.z = -90;
        else if(piece.position.x == CUBE_SIZE)
            rotation.z = 90;

        if(piece.position.y == 0)
            rotation.x = -90;
        else if(piece.position.y == CUBE_SIZE)
            rotation.x = 90;

        piece.element.setAttribute("rotation", `${rotation.x} ${rotation.y} ${rotation.z}`)
    }
}

createCube();

updateCube();