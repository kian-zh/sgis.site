
//  input:  'hsl(0,50%,32%)'
//  ouput:  'rgb(122,41,41)'
const hsl2rgb = (stringHSL) => {
    const HSL = stringHSL.replace(/(?:\(|\)|hsl|%)*/g, "").split(",");
    const h = Number(HSL[0])/360
    const s = Number(HSL[1])/100
    const l = Number(HSL[2])/100
    let r, g, b;
    if(s === 0) {
        r = g = b = l; // achromatic
    } else {
        var hue2rgb = function hue2rgb(p, q, t) {
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
}

//  input   hsl(0,50%,50%,1%)
//  output  rgba(191,64,64,0.01)
const hsla2rgba = (stringHSLA) => {
    const HSL = stringHSLA.replace(/(?:\(|\)|hsl|%)*/g, "").split(",");
    const h = Number(HSL[0])/360
    const s = Number(HSL[1])/100
    const l = Number(HSL[2])/100
    const a = Number(HSL[3])/100
    let r, g, b;
    if(s === 0) {
        r = g = b = l; // achromatic
    } else {
        var hue2rgb = function hue2rgb(p, q, t) {
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    return `rgba(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)}, ${a})`;
}

//  input  rgb(191,64,64)
//  output  #bf4040
const rgb2hex = (stringRGB) =>{
    const rgb = stringRGB.split(',');
    const r = parseInt(rgb[0].split('(')[1]);
    const g = parseInt(rgb[1]);
    const b = parseInt(rgb[2].split(')')[0]);
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export {hsl2rgb, rgb2hex, hsla2rgba}
