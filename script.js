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

class CubePiece {
    element; // readonly

    colors; // readonly
    type; // readonly

    constructor(...colors) {
        this.colors = colors
            .map(color => COLORS[color])
            .filter(color => color != undefined);
        
        this.type = PIECE_TYPES[this.colors.length - 1];

        this.element = CUBE_TEMPLATE.cloneNode(true);

        let currentFace = this.element;
        console.log(this.element);
        for(const color of this.colors) {
            console.log(color);
            console.log(currentFace);
            currentFace.color = color;
            currentFace = currentFace.childNodes[0];
        }

        SCENE.appendChild(this.element);
    }
}