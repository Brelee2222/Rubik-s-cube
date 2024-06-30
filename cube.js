const COLORS = {
    "red" : "red",
    "blue" : "blue",
    "white" : "white",
    "green" : "green",
    "orange" : "orange",
    "yellow" : "yellow",
    null : "gray"
};

const PIECE_TYPES = [
    "middle", // 1 color
    "edge", // 2 colors
    "corner" // 3 colors
];

const CUBE_ENTITY = document.getElementById("cube-entity");
const CUBE_TEMPLATE = document.getElementById("cubePiece").content;

const AXES = ["x", "y", "z"];

let cubeSize = 3;

let pieces = [];

class CubePiece {
    element; // readonly

    colors;
    type; // readonly

    position;

    constructor(position, ...colors) {
        this.position = position,
        this.colors = colors
            .map(color => COLORS[color])
            .filter(color => color != undefined);
        
        this.type = this.colors.length;

        this.element = document.importNode(CUBE_TEMPLATE, true).firstElementChild;

        CUBE_ENTITY.appendChild(this.element);

        // console.log(`created piece\n    type:${this.type}\n    colors:${this.colors}`);

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

    pieces.forEach(piece => piece.element.remove());
    pieces = [];

    const sideColors = ["white", "blue", "red", "yellow", "green", "orange"];

    for(let x = 0; x < cubeSize; x++) {
        for(let z = 0; z < cubeSize; z++) {
            for(let y = 0; y < cubeSize; y++) {

                const colors = [null, null, null];

                if(x == 0)
                    colors[0] = sideColors[0];
                else if(x == cubeSize - 1)
                    colors[0] = sideColors[3];

                if(y == 0)
                    colors[1] = sideColors[1];
                else if(y == cubeSize - 1)
                    colors[1] = sideColors[4];

                if(z == 0)
                    colors[2] = sideColors[2];
                else if(z == cubeSize - 1)
                    colors[2] = sideColors[5];

                // console.log(colors)

                new CubePiece({x, y, z}, ...colors);
            }
        }
    }
}

async function updatePiece(piece) {
    piece.element.setAttribute("position", `${piece.position.x} ${piece.position.y} ${piece.position.z}`);
    for(const face of piece.element.children) face.setAttribute("color", "gray");
    // const faces = piece.element.children;
    for(let index = 0; index < piece.colors.length; index++) {
        if(piece.colors[index] == "gray")
            continue;

        if(piece.position[AXES[index]] == 0) {
            piece.element.children[index + 3].setAttribute("color", piece.colors[index]);
        } else if(piece.position[AXES[index]] == cubeSize - 1) {
            piece.element.children[index].setAttribute("color", piece.colors[index]);
        }
    }
}

function updateCube() {
    for(const piece of pieces)
        updatePiece(piece);
}

function rotate(axis, row) {
    pieces.filter(piece => piece.position[axis] == row).forEach(piece => {
        const otherAxes = AXES.filter(otherAxis => otherAxis != axis);

        let tempColor = piece.colors[AXES.indexOf(otherAxes[otherAxes.length-1])];

        // if(piece.type == 3)
        otherAxes.forEach(axis => {
            const temp = piece.colors[AXES.indexOf(axis)];
            piece.colors[AXES.indexOf(axis)] = tempColor;
            tempColor = temp;
        })

        const temp = piece.position[otherAxes[0]];
        piece.position[otherAxes[0]] = cubeSize - 1 - piece.position[otherAxes[1]];
        piece.position[otherAxes[1]] = temp;
    });
}

function rotateSide(axis, row, clockwise = true) {
    rotate(axis, row);
    if(!clockwise) for(let rep = 0; rep < 2; rep++)
        rotate(axis, row);

    updateCube();
}

function setSize(size) {
    cubeSize = Math.floor(size);
    createCube();
    updateCube();

    document.getElementById("depth").max = size - 1;
    document.getElementById("cam-anchor").setAttribute("position", `${size / 2 - 0.5} ${size / 2 - 0.5} ${size / 2 - 0.5}`)
    document.getElementById("cam").setAttribute("position", `0 0 ${5/3 * size}`)
}

createCube();

updateCube();