import ViewPort from '../domain/viewPort'
import Background from '../domain/background'
import PlayerShip from '../domain/playerShip'
import React from 'react';
import ItemDrawer from '../domain/itemDrawer';
import Asteroid from '../domain/asteroid';
import Laser from '../domain/laser';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            player: {},
            items: [],
            viewPort: new ViewPort(640, 640),
            height: 1024,
            width: 1024,
            stepNumber: 0,
            itemDrawer: new ItemDrawer()
        };
    }

    componentDidMount() {
        var that = this;
        that.state.viewPort.context = this.refs.canvas.getContext("2d")
        const bg = that.refs.background;
        bg.onload = () => {
            that.setState({ items: [new Background(bg)] });

            const sp = that.refs.sprites;
            sp.onload = () => {
                var items = that.state.items.slice();
                that.state.player = new PlayerShip(sp, 10, 10, 0,
                    Math.random() - .5, Math.random() - .5, Math.random() - .5);
                items.push(that.state.player);

                for (var i = 0; i < 10; i++) {
                    items.push(new Asteroid(sp, Math.random() * this.state.width, Math.random() * this.state.height, Math.random() * 360,
                        Math.random() - .5, Math.random() - .5, Math.random() - .5));
                }

                that.setState({ items: items });

                setInterval(function () { that.tick(that.state.player); }, 15);
            };
            sp.src = "/images/sheet.png";
        };
        bg.src = "/images/purple.png";
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.items !== this.state.items || prevState.viewPort !== this.state.viewPort) {
            this.draw();
        }
    }

    draw() {
        var that = this;
        that.state.items.forEach(item => {
            if (item.draw) {
                item.draw(that.state.viewPort);
            }
            else {
                that.state.itemDrawer.draw(item, that.state.viewPort, that.state.height, that.state.width);
            }
        });
    }

    tick(ps) {
        ps.state &= ~ps.States.shielding;
        var vp = Object.assign({}, this.state.viewPort);

        this.state.items.forEach(item => {
            this.updateItem(item);
        });
        var remaining = [];
        this.state.items.forEach(item => {
            if (item.destroyed) {
                if (item instanceof Asteroid && item.mass > 1) {
                    for (var i = 1; i < item.mass; i *= 2) {
                        var xvd = Math.random() - .5;
                        var yvd = Math.random() - .5;
                        var avd = Math.random() - .5;
                        remaining.push(new Asteroid(item.image, item.x, item.y, item.a, item.xv + xvd, item.yv + yvd, item.av + avd, Math.floor(item.mass / 2), item.color));
                        remaining.push(new Asteroid(item.image, item.x, item.y, item.a, item.xv - xvd, item.yv - yvd, item.av - avd, Math.ceil(item.mass / 2), item.color));
                    }
                }
            }
            else {
                remaining.push(item);
            }
        });
        vp.x = ps.x - (vp.width / 2);
        vp.y = ps.y - (vp.height / 2);

        if (remaining.filter((i) => i instanceof Asteroid).length < 5) {
            remaining.push(new Asteroid(this.state.items[1].image, this.state.width / 2 + ps.x, this.state.height / 2 + ps.y, Math.random() * 360,
                Math.random() - .5, Math.random() - .5, Math.random() - .5, Math.floor(Math.random() * 3) + 6));
        }

        this.setState({ viewPort: vp, items: remaining });
    }

    speedLimit(n) { return Math.max(-10, Math.min(10, n)); }
    angleLimit(n) { return Math.max(-10, Math.min(10, n)); }

    updateItem(item) {
        if (item.av) {
            item.a += item.av;
            item.a %= 360;
            item.av = this.angleLimit(item.av);
        }
        if (item.xv) {
            item.x = ((item.x + item.xv) % this.state.width + this.state.width) % this.state.width;
            item.xv = this.speedLimit(item.xv);
        }
        if (item.yv) {
            item.y = ((item.y + item.yv) % this.state.height + this.state.height) % this.state.height;
            item.yv = this.speedLimit(item.yv);
        }
        var ps = this.state.player;
        if (item instanceof Asteroid) {
            var distSq = Math.pow(item.x - ps.x, 2) + Math.pow(item.y - ps.y, 2);
            if (distSq < Math.pow((ps.spriteInfo.maxSize + item.spriteInfo.maxSize), 2)) {
                ps.state |= ps.States.shielding;
                var ratio = item.mass / ps.mass;
                ps.xv -= 75 * ratio * Math.cos(Math.atan2(item.y - ps.y, item.x - ps.x)) / distSq;
                ps.yv -= 75 * ratio * Math.sin(Math.atan2(item.y - ps.y, item.x - ps.x)) / distSq;
                item.xv += 100 / ratio * Math.cos(Math.atan2(item.y - ps.y, item.x - ps.x)) / distSq;
                item.yv += 100 / ratio * Math.sin(Math.atan2(item.y - ps.y, item.x - ps.x)) / distSq;
            }
        }
        else if (item instanceof Laser) {
            this.state.items.forEach(target => {
                if (target instanceof Asteroid) {
                    var hitX = target.x;
                    var hitY = target.y;
                    var distSq = Math.pow(item.x - hitX, 2) + Math.pow(item.y - hitY, 2);
                    if (distSq < Math.pow(item.spriteInfo.minSize + target.spriteInfo.minSize, 2)) {
                        item.destroyed = true;
                        target.destroyed = true;
                    }
                }
            });
        }
    }


    keyDown(e) {
        var ps = this.state.player;
        if (e.key === "ArrowRight") {
            ps.av += 0.5;
            ps.state |= ps.States.turningRight;
        }
        else if (e.key === "ArrowLeft") {
            ps.av -= 0.5;
            ps.state |= ps.States.turningLeft;
        }
        else if (e.key === "ArrowUp") {
            var angleInRadians = ps.a * (Math.PI / 180);
            ps.xv += Math.sin(angleInRadians);
            ps.yv -= Math.cos(angleInRadians);
            ps.state |= ps.States.accellerating;
        }
        else if (e.key === " ") {
            var lAngleInRadians = ps.a * (Math.PI / 180);
            var x = ps.x + 50 * Math.sin(lAngleInRadians);
            var y = ps.y - 50 * Math.cos(lAngleInRadians);
            var xv = 10 * Math.sin(lAngleInRadians);
            var yv = -10 * Math.cos(lAngleInRadians);
            this.state.items.push(new Laser(this.refs.sprites, x, y, ps.a, xv, yv, 0));
        }
    }
    keyUp(e) {
        var ps = this.state.player;
        if (e.key === "ArrowRight") {
            ps.state &= ~ps.States.turningRight;
        }
        else if (e.key === "ArrowLeft") {
            ps.state &= ~ps.States.turningLeft;
        }
        else if (e.key === "ArrowUp") {
            ps.state &= ~ps.States.accellerating;
        }
    }

    render() {
        return (
            <div onKeyDown={this.keyDown.bind(this)} onKeyUp={this.keyUp.bind(this)} tabIndex='1'>
                <canvas width={this.state.viewPort.width} height={this.state.viewPort.height} ref="canvas" />
                <img alt="" ref="background" className="hidden" />
                <img alt="" ref="sprites" className="hidden" />
            </div>
        );
    }
}

export default Game;