export class Particle {
    constructor(x, y, r, vx, vy, lt, cr, cg, cb) {
        this.x = x;
        this.y = y;
        this.r = r;

        this.vx = vx;
        this.vy = vy;

        this.cr = cr;
        this.cg = cg;
        this.cb = cb;

        this.time = 0;
        this.lifetime = lt;
        this.dead = false;
    }

    life() {
        return this.time / this.lifetime;
    }
}