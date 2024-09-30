export const Util =
{
    random: (min, max) => {
        return min + Math.random() * (max - min);
    },

    friction: (velocityX, velocityY) => {
        const speed = Math.hypot(velocityX, velocityY);
        const angle = Math.atan2(velocityY, velocityX);

        let newSpeed = speed - 0.1;

        if (newSpeed < 0) {
            newSpeed = 0;
        }

        return [
            Math.cos(angle) * newSpeed,
            Math.sin(angle) * newSpeed
        ];
    },

};