import ViewPort from '../domain/viewPort'
import Background from '../domain/background'
import PlayerShip from '../domain/playerShip'
import React from 'react';
import ItemDrawer from '../domain/itemDrawer';
import Asteroid from '../domain/asteroid';

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
                that.state.player = new PlayerShip(sp, 0, 0, 0, 0, 0, 0);
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
        var vp = Object.assign({}, this.state.viewPort);
        
        this.state.items.forEach(item => {
            this.updateItem(item);
        });
        vp.x = ps.x - (vp.width / 2);
        vp.y = ps.y - (vp.height / 2);

        this.setState({ viewPort: vp });
    }

    updateItem(item) {
        if (item.av) {
            item.a += item.av;
            item.a %= 360;
        }
        if (item.xv) {
            item.x = ((item.x + item.xv) % this.state.width + this.state.width) % this.state.width;
        }
        if (item.yv) {
            item.y = ((item.y + item.yv) % this.state.height + this.state.height) % this.state.height;
        }
    }


    keyDown(e) {
        var ps = this.state.player;
        if (e.key === "ArrowRight") {
            ps.av += 0.5;
        }
        else if (e.key === "ArrowLeft") {
            ps.av -= 0.5;
        }
        else if (e.key === "ArrowUp") {
            var angleInRadians = ps.a * (Math.PI / 180);
            ps.xv += Math.sin(angleInRadians);
            ps.yv -= Math.cos(angleInRadians);
        }
    }
    keyUp(e) {
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