
class Colour {
    constructor(R, G, B) {
        this.R = R;
        this.G = G;
        this.B = B;
    }

    RGBString() {
        return "rgb(" + this.R + ',' + this.G + ',' + this.B + ")";
    }

    static scale(num, in_min, in_max, out_min, out_max){
        return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }

    static positionColour(body) {
        var R, G, B;
        R = Colour.scale(body.position.x, 0, 1920 * 1080, 0, 255) * 2000;
        G = Colour.scale(body.position.y, 0, 1920 * 1080, 0, 255) * 2000;
        B = Colour.scale(body.position.x + body.position.y, 0, 1920 * 1080, 0, 255) * 1000;
        return  "rgb(" + R + ',' + G + ',' + B + ")";
    }

    static distanceColour(body) {
        var R, G, B;
        R = (xDistance + yDistance) % 255;
        G = 20;
        B = 255 - R;
        return "rgb(" + R + ',' + G + ',' + B + ")";
    }

    static speedColour(body) {
        var R, G, B;
        R = self.speed * 1000 % 255;
        G = self.speed * 1000 % 255;
        B = self.speed * 1000 % 255;
        return "rgb(" + R + ',' + G + ',' + B + ")";
    }
}
