// const CUBE_ENTITY = document.getElementById("cube-entity");
document.getElementById("size-select").addEventListener("input", function() {setSize(this.value)});

document.getElementById("depth").addEventListener("input", function() {document.getElementById("depthNumber").innerText = this.value;});

document.getElementById("turn").addEventListener("click", () => rotateSide(document.getElementById("axis").value, document.getElementById("depth").value, document.getElementById("clockwise").checked))

document.getElementById("scramble").addEventListener("click", () => {
    for(let moves = 0; moves != 50; moves++) {
        rotate(AXES[Math.floor(Math.random() * AXES.length)], Math.floor(Math.random() * cubeSize));
    }
    updateCube();
});