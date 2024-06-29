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

const AXES = ["x", "y", "z"];

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

        CUBE_ENTITY.appendChild(this.element);

        console.log(`created piece\n    type:${this.type}\n    colors:${this.colors}`);

        pieces.push(this);
    }
}

function createCube() {
    // new CubePiece(0, {x : 1, y : 0, z : 1}, "white");
    // new CubePiece(0, {x : 1, y : 1, z : 0}, "blue");
    // new CubePiece(0, {x : 0, y : 1, z : 1}, "red");
    // new CubePiece(0, {x : 1, y : 2, z : 1}, "yellow");
    // new CubePiece(0, {x : 1, y : 1, z : 2}, "green");
    // new CubePiece(0, {x : 2, y : 1, z : 1}, "orange");
    
    // new CubePiece(0, {x : 0, y : 0, z : 0}, "red", "blue", "white");
    // new CubePiece(0, {x : 0, y : 1, z : 0}, "red", "blue");

    // new CubePiece(0, {x : 2, y : 2, z : 2}, "green", "orange", "yellow");
    // new CubePiece(0, {x : 0, y : 1, z : 2}, "green", "red");
    // new CubePiece(0, {x : 2, y : 1, z : 0}, "blue", "orange");
    // new CubePiece(0, {x : 2, y : 1, z : 2}, "orange", "green");

    // new CubePiece(0, {x : 0, y : 0, z : 1}, "white", "red");
    // new CubePiece(0, {x : 0, y : 0, z : 2}, "white", "green");

    const sideColors = ["white", "blue", "red", "yellow", "green", "orange"];

    for(let x = 0; x < CUBE_SIZE; x++) {
        for(let z = 0; z < CUBE_SIZE; z++) {
            for(let y = 0; y < CUBE_SIZE; y++) {

                const colors = [];

                if(x == 0)
                    colors.push(sideColors[0]);
                else if(x == CUBE_SIZE - 1)
                    colors.push(sideColors[3]);

                if(y == 0)
                    colors.push(sideColors[1]);
                else if(y == CUBE_SIZE - 1)
                    colors.push(sideColors[4]);

                if(z == 0)
                    colors.push(sideColors[2]);
                else if(z == CUBE_SIZE - 1)
                    colors.push(sideColors[5]);

                new CubePiece(0, {x, y, z}, ...colors);
            }
        }
    }
}

function updateCube() {
    for(const piece of pieces) {
        piece.element.setAttribute("position", `${piece.position.x} ${piece.position.y} ${piece.position.z}`);

        // const faces = piece.element.children;

        let colorsIndex = 0;
        for(let index = AXES.length-1; colorsIndex != piece.colors.length; index--) {
            if(piece.position[AXES[index]] == 0) {
                piece.element.children[index + 3].setAttribute("color", piece.colors[colorsIndex++]);
            } else if(piece.position[AXES[index]] == CUBE_SIZE - 1) {
                piece.element.children[index].setAttribute("color", piece.colors[colorsIndex++]);
            }
        }
    }
}

function rotate(axis, row, clockwise) {
    pieces.filter(piece => piece.position[axis] == row).forEach(piece => {
        if(["y", "x", "z"].indexOf(axis) != piece.orientation)
            piece.orientation = piece.orientation ^ ["y", "z", "x"].indexOf(axis);

        const otherAxes = ["y", "x", "z"].filter(otherAxis => otherAxis != axis);

        const temp = piece.position[otherAxes[0]];
        piece.position[otherAxes[0]] = CUBE_SIZE - 1 - piece.position[otherAxes[1]];
        piece.position[otherAxes[1]] = temp;
    });
    updateCube();
}

createCube();

updateCube();