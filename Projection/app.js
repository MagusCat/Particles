const canvas = document.getElementById("scene");
const ctx = canvas.getContext("2d");
const radius = 100;

let width = canvas.offsetWidth;
let height = canvas.offsetHeight;
let dist = 0;

class Vec3 {
    constructor(x, y, z) {
        this.x = x * radius;
        this.y = y * radius;
        this.z = z * radius;

        this._x = 0;
        this._y = 0;
    }

    projec() {
        const depth = this.depth();

        this._x = this.x * depth;
        this._y = this.y * depth;

        return [this._x, this._y];
    }


    depth() {
        return dist / (dist + this.z);
    }


    rotateZ(angle) {
        const cosa = Math.cos(angle);
        const sina = Math.sin(angle);
        const tempx = this.x;

        this.x = cosa * this.x - sina * this.y;
        this.y = cosa * this.y + sina * tempx;

        return this;
    }
    rotateY(angle) {
        const cosa = Math.cos(angle);
        const sina = Math.sin(angle);
        const tempz = this.z;

        this.z = cosa * this.z - sina * this.x;
        this.x = cosa * this.x + sina * tempz;

        return this;
    }

    rotateX(angle) {
        const cosa = Math.cos(angle);
        const sina = Math.sin(angle);
        const tempy = this.y;

        this.y = cosa * this.y - sina * this.z;
        this.z = cosa * this.z + sina * tempy;

        return this;
    }
}

// const points = [
//     new Vec3(0, 0, 0),
//     new Vec3(0.5, 0.5, -0.5),
//     new Vec3(0.5, -0.5, -0.5),
//     new Vec3(-0.5, -0.5, -0.5),
//     new Vec3(-0.5, 0.5, -0.5),

//     new Vec3(0, 1, -0.5),  //5
//     new Vec3(0, -1, -0.5), //6
//     new Vec3(1, 0, -0.5),  //7
//     new Vec3(-1, 0, -0.5), //8

//     new Vec3(0.5, 0.5, 0.5),
//     new Vec3(0.5, -0.5, 0.5),
//     new Vec3(-0.5, -0.5, 0.5),
//     new Vec3(-0.5, 0.5, 0.5),

//     new Vec3(0, 1, 0.5), //13
//     new Vec3(0, -1, 0.5),//14
//     new Vec3(1, 0, 0.5), //15
//     new Vec3(-1, 0, 0.5),//16

//     new Vec3(0, 2, 0),
//     new Vec3(0, -2, 0),
//     new Vec3(2, 0, 0),
//     new Vec3(-2, 0, 0)
// ];

// const lines = [
//     [0, 1],
//     [0, 2],
//     [0, 3],
//     [0, 4],

//     [4, 5],
//     [1, 5],
//     [3, 6],
//     [2, 6],
//     [1, 7],
//     [2, 7],
//     [3, 8],
//     [4, 8],

//     [0, 9],
//     [0, 10],
//     [0, 11],
//     [0, 12],

//     [12, 13],
//     [9, 13],
//     [11, 14],
//     [10, 14],
//     [9, 15],
//     [10, 15],
//     [11, 16],
//     [12, 16],

//     [13, 5],
//     [14, 6],
//     [15, 7],
//     [16, 8],

//     [13, 17],
//     [5, 17],
//     [6, 18],
//     [14, 18],   
//     [7, 19],
//     [15, 19],
//     [8, 20],
//     [16, 20],

//     [17, 19],
//     [19, 18],
//     [18, 20],
//     [20, 17],
// ];

// const points = [
//     new Vec3(1, 1, 1),
//     new Vec3(1, 1, -1),
//     new Vec3(-1, 1, -1),    
//     new Vec3(-1, 1, 1),

//     new Vec3(1, -1, 1),
//     new Vec3(1, -1, -1),
//     new Vec3(-1,-1, -1),    
//     new Vec3(-1, -1, 1),
// ];

// const lines = [
//     [0, 1],
//     [1, 2],
//     [2, 3],
//     [3, 0],
//     [4, 5],
//     [5, 6],
//     [6, 7],
//     [7, 4],
//     [0, 4],
//     [1, 5],
//     [2, 6],
//     [3, 7],
// ];

const points = [
    new Vec3(0, 0, 0),
    new Vec3(0, 0, 1),
    new Vec3(0, 1, 0),
    new Vec3(0, 1, 1),
    new Vec3(1, 0, 0),
    new Vec3(1, 0, 1),
    new Vec3(1, 1, 0),
    new Vec3(1, 1, 1),
];

const lines = [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [1, 5],
    [1, 6],
    [1, 7],
    [2, 5],
    [2, 6],
    [2, 7],
    [3, 5],
    [3, 6],
    [3, 7],
    [4, 5],
    [4, 6],
    [4, 7],
];

function resize() {
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;
    dist = width * 0.8;

    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
}


function animation() {
    ctx.clearRect(0, 0, width, height);


    points.forEach(point => {
        ctx.beginPath();
        ctx.fillStyle = "red";

        point.rotateY(0.01).rotateZ(0.00);

        const [x, y] = point.projec();

        ctx.arc(width / 2 + x, height / 2 + y, 5, 0, Math.PI * 2);
        ctx.fill();
    });


    lines.forEach(line => {
        const fdepth = points[line[0]].depth() + points[line[1]].depth() / 2;

        ctx.beginPath();
        ctx.lineWidth = fdepth;
        ctx.globalAlpha = fdepth;

        ctx.strokeStyle = "white";
        ctx.moveTo(width / 2 + points[line[0]].projec()[0], height / 2 + points[line[0]].projec()[1]);
        ctx.lineTo(width / 2 + points[line[1]].projec()[0], height / 2 + points[line[1]].projec()[1]);
        ctx.stroke();

        ctx.globalAlpha = 1;
    });

    requestAnimationFrame(animation);
}
window.onload = () => {
    animation();
}

window.onresize = resize;
resize();