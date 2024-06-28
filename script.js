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

    const sideColors = ["blue", "red", "green", "orange"];

    for(let sideColorIndex = 0; sideColorIndex < sideColors.length; sideColorIndex++) {
        const x = ((sideColorIndex >> 1) << 1);
        const z = ((sideColorIndex & 1) << 1) ^ x;

        const verticalX = (sideColorIndex & 1) ? sideColorIndex & 2 ? 2 : 0 : 1;
        const verticalZ = (sideColorIndex & 1) ? 1 : sideColorIndex & 2 ? 2 : 0;

        console.log(`${x} ${z}`)

        new CubePiece(0, {x, y: 1, z}, sideColors[(1+sideColorIndex) % sideColors.length], sideColors[sideColorIndex]);
        new CubePiece(0, {x, y: 2, z}, sideColors[sideColorIndex], sideColors[(1+sideColorIndex) % sideColors.length], "yellow");
        new CubePiece(0, {x, y: 0, z}, sideColors[(1+sideColorIndex) % sideColors.length], sideColors[sideColorIndex], "white");
        new CubePiece(0, {x : verticalX, y: 0, z : verticalZ}, "white", sideColors[sideColorIndex]);
        new CubePiece(0, {x : verticalX, y: 1, z : verticalZ}, sideColors[sideColorIndex]);
        new CubePiece(0, {x : verticalX, y: 2, z : verticalZ}, "yellow", sideColors[sideColorIndex]);
    }

    new CubePiece(0, {x : 1, y: 2, z : 1}, "yellow");
    new CubePiece(0, {x : 1, y: 0, z : 1}, "white");
}

function updateCube() {
    for(const piece of pieces) {
        piece.element.setAttribute("position", `${piece.position.x} ${piece.position.y} ${piece.position.z}`);
        
        const rotation = [0, 0, 0];
        if((piece.position.z % (CUBE_SIZE-1)) != 0 || (piece.position.x % (CUBE_SIZE-1)) != 0) 
            rotation[2] += 90;
        
        if(piece.type === "middle")
            rotation[0] += 90 * piece.position.y;
        else if(piece.position.y == CUBE_SIZE - 1)  {
            rotation[2] -= 180;
            
            if(piece.type === "corner")
                rotation[1] += 90;
        }

        if(piece.position.z > 0 || piece.position.x == CUBE_SIZE - 1) {
            rotation[1] -= 90;
            if(piece.position.x < CUBE_SIZE - 1 || piece.position.z == CUBE_SIZE - 1) {
                rotation[1] -= 90;
                if(piece.position.x == 0) {
                    rotation[1] -= 90;
                }
            }
        }

        piece.element.setAttribute("rotation", `${rotation[0]} ${rotation[1]} ${rotation[2]}`)

        const faces = piece.element.children;
        for(let index = 0; index < piece.colors.length; index++) faces[2-index].setAttribute("color", piece.colors[(piece.orientation + index) % piece.colors.length]);
    }
}

function rotate(axis, row, clockwise) {
    pieces.filter(piece => piece.position[axis] == row).forEach(piece => {
        piece.orientation = (piece.orientation + piece.colors.length + clockwise ? 1 : -1) % piece.colors.length;
        console.log(piece.orientation);

        const otherAxes = ["x", "y", "z"].filter(otherAxis => otherAxis != axis);

        const temp = piece.position[otherAxes[0]];
        piece.position[otherAxes[0]] = CUBE_SIZE - 1 - piece.position[otherAxes[1]];
        piece.position[otherAxes[1]] = temp;
    });
    updateCube();
}

createCube();

updateCube();