import { getResistorOhms } from './resistor.js';

const bands = { color1: 'red', color2: 'green', multiplier: 'violet', tolerance: 'gold' };
const selection = document.querySelector('.selection');


selection.addEventListener('click', (event) => {
    const slot = event.target.parentNode.id;
    if (['color0', 'color1', 'color2', 'color3'].includes(slot)) {
        const color = event.target.classList[1];
        bands[slot] = color;
        resistorUpdate(`b${slot.replace(/\D/g, '')}`, color);
    }
});

function resistorUpdate(id, color) {
    document.getElementById(id).style.backgroundColor = `var(--${color})`;
    document.querySelector('.answer').textContent = getResistorOhms(bands);
}