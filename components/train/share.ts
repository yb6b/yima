import { withBase } from "vitepress";
import confetti from "canvas-confetti";

export const cache = {}

export interface ZigenCard {
    name: string;
    key: string;
    rel: string;
    kind?: 'b' | 'eb'
}

export interface ChaiCard {
    name: string,
    /** 编码 */
    key: string,
    /** 拆分 */
    comp?: string,
}

export type Card = ZigenCard | ChaiCard

export async function fetchJsonWithCache(url: string) {
    if (url in cache)
        return cache[url]

    let urlFixed = url
    if (url[0] === '/') {
        urlFixed = withBase(url)
    }

    try {
        const req = await fetch(urlFixed)
        const json = await req.json()
        cache[url] = json
        return json

    } catch (error) {
        if (error instanceof Error)
            alert(`无法下载或解析《${url}》文件：${error.cause}`)
        throw error
    }
}

export function startConfette() {
    var duration = 5000;
    var animationEnd = Date.now() + duration;
    var defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 0,
        particleCount: 30,
        shapes: [
            confetti.shapeFromText({ text: '快', scalar: 7 }),
            confetti.shapeFromText({ text: '强', scalar: 8 }),
            confetti.shapeFromText({ text: '😆', scalar: 4 }),
            confetti.shapeFromText({ text: '🎉', scalar: 5 }),
            confetti.shapeFromText({ text: '👍', scalar: 5 }),
        ],
        scalar: 2,
    };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function () {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        confetti({
            ...defaults, shapes: ['circle'],
            particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
    }, 250);
}