import { Config } from "./src/Config.js";
import { Scene } from "./src/scene.js";

function App() {
    const canvas = document.getElementById("scene");
    const SceneCurrrent = new Scene(canvas);

    window.onresize = () => SceneCurrrent.resize();
    window.onmousemove = e => SceneCurrrent.mouse_move(e.clientX, e.clientY);
    window.onclick = e => SceneCurrrent.mouse_click(e.clientX, e.clientY);

    document.getElementById("wheel").addEventListener("click", () => {
        const alpha = (2 * Math.PI) / 10;
        const radius = innerWidth * 0.1;

        //https://stackoverflow.com/questions/14580033/algorithm-for-drawing-a-5-point-star
        for (let i = 0; i < 10; i++) {
            const r = radius * (i % 2 + 1) / 2;
            const angle = alpha * i;
            const x = r * Math.sin(angle);
            const y = r * Math.cos(angle);

            SceneCurrrent.addParticle(
                innerWidth / 2 + x,
                innerHeight / 2 + y,
                0.4,
                angle,
                0
            );
        }
    });

    document.getElementById("bounce").addEventListener("click", () => {
        Config.Bouncing = !Config.Bouncing;

        if (Config.Bouncing) {
            SceneCurrrent.addParticle(innerWidth / 2, innerHeight / 2, 2, 0.2, 2, 220, 100, 100);
        }
    });

    document.getElementById("gravity").addEventListener("click", () => {
        Config.Gravity = !Config.Gravity;

        if (Config.Gravity) {
            for(let i = 0; i < 200; i++) {
                SceneCurrrent.addParticle(
                    Math.random() * innerWidth,
                    Math.random() * innerHeight,
                    Math.random() / 4,
                    0,
                    0,
                    200,
                    200,
                    200
                );
            }
        }
    });

    document.getElementById("magic").addEventListener("click", () => {
        const alpha = (2 * Math.PI) / 18;
        const radius = innerWidth * 0.1;

        //https://stackoverflow.com/questions/14580033/algorithm-for-drawing-a-5-point-star
        for (let i = 0; i < 18; i++) {
            const r = radius * (i % 2 + 1) / 2;
            const angle = alpha * i;
            const x = r * Math.sin(angle);
            const y = r * Math.cos(angle);

            SceneCurrrent.addParticle(
                innerWidth / 2 + x,
                innerHeight / 2 + y,
                0.4,
                -angle,
                1,
                220,
                0,
                220
            );
        }
    });

    window.debug = () => {
        Config.Debug = !Config.Debug;
    }

    window.particles = SceneCurrrent;

    SceneCurrrent.init();
}


window.onload = () => App();

