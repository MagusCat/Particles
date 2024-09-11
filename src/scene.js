import { Particle } from "./Particle.js";
import { Util } from "./Util.js";
import { Config } from "./Config.js";


export class Scene {
    requestID = null;
    tstart;
    lag = 0;
    fsp = 1000 / 40;
    lastMove = 0;

    particles = []
    constructor(canvas) {
        this.canvas = canvas;
        this.context = canvas.getContext('2d');

        this.resize();
    }

    init() {
        this.tstart = Date.now();
        this.requestID = requestAnimationFrame(this.loop.bind(this));
    }

    restart() {
        this.particles = [];
    }

    loop() {
        const tcurrent = Date.now();
        const elipsed = tcurrent - this.tstart;
        this.tstart = tcurrent;

        this.lag += elipsed;

        while (this.lag >= this.fsp) {
            this.update(elipsed / this.fsp);

            this.lag -= this.fsp;
        }

        this.draw(this.context);

        requestAnimationFrame(this.loop.bind(this));
    }

    update(dt) {

        //simulation particles
        for (const particle of this.particles) {
            particle.time += dt;

            if (Config.Gravity) particle.vy += Config.GravityForce * (particle.r * 0.05) * dt;

            if (Config.Bouncing) {
                const { x, y, r } = particle;

                if (y + r > innerHeight || y - r < 0) particle.vy *= -Config.BouncingForce;
                if (x + r > innerWidth || x - r < 0) particle.vx *= -Config.BouncingForce;
            }

            let [fx, fy] = Util.friction(particle.vx, particle.vy);

            particle.x += fx * dt;
            particle.y += fy * dt;

            if (particle.life() >= 1) particle.dead = true;
        }

        this.particles = this.particles.filter(e => !e.dead);
    }

    draw(ctx = CanvasRenderingContext2D.prototype) {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.save();
        
        ctx.globalCompositeOperation = "lighter";
        ctx.globalAlpha = 0.4;

        this.particles.forEach((particle) => {
            ctx.beginPath();
            
            ctx.fillStyle = `rgba(${particle.cr}, ${particle.cg}, ${particle.cb}, ${1 - particle.life()})`;
            ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
            ctx.fill();
        })

        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = "source-over";

        if(Config.Debug){
            ctx.beginPath();
            ctx.fillStyle = "white";
            ctx.fillText("Particles: ", 20, 20);
            ctx.fillText(this.particles.length, 40, 40);
            ctx.fill();
        }

        ctx.restore();
    }

    resize() {
        this.canvas.width = innerWidth;
        this.canvas.height = innerHeight;
    }

    mouse_move(x, y) {
        if (!Config.Wheel) return;

        const currentTime = Date.now();

        if (currentTime - this.lastMove > 50) {
            this.lastMove = currentTime;
            this.addParticle(x, y, Math.random() / 2, Math.random(), Math.random() / 2, 200, 200, 200);
        }
    }

    mouse_click(x, y) {
        for (let n = 0; n < 10; n++) {
            let angle = Math.random() * Math.PI * 2;
            let speed = Math.random();

            this.addParticle(x, y, Math.random(), angle, speed);
        }
    }

    addParticle(x, y, radius, angle, speed, red, green, blue) {
        if (this.particles.length < Config.ParticleCount) {
            this.particles.push(
                new Particle(
                    x,
                    y,
                    Config.ParticleSize * radius,
                    Math.cos(angle) * Config.ParticleSpeed * speed,
                    Math.sin(angle) * Config.ParticleSpeed * speed,
                    Config.ParticleLife * radius,
                    red || Util.random(30, 220),
                    green || Util.random(30, 220),
                    blue || Util.random(30, 220)
                )
            );

        }
    }
}