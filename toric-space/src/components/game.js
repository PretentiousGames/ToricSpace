import ViewPort from '../domain/viewPort'
import Background from '../domain/background'
import PlayerShip from '../domain/playerShip'
import React from 'react';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            viewPort: new ViewPort(640, 640),
            height: 1024,
            width: 1024,
            stepNumber: 0
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
                var ps = new PlayerShip(sp,
                    that.state.viewPort.width / 2, that.state.viewPort.height / 2, 0,
                    .25, -.75, .5);
                items.push(ps);
                that.setState({ items: items });

                setInterval(function() { that.tick(ps); }, 15);
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
        this.state.items.forEach(item => {
            item.draw(this.state.viewPort);
        });
    }

    tick(ps) {
        var vp = Object.assign({}, this.state.viewPort);
        this.updatePlayer(ps, vp);
        this.setState({ viewPort: vp });
    }

    updatePlayer(ps, vp) {
        ps.a += ps.av;
        ps.a %= 360;
        vp.x -= ps.xv;
        vp.x %= this.state.width;
        vp.y -= ps.yv;
        vp.y %= this.state.height;
    }

    render() {
        return (
            <div>
                <canvas width={this.state.viewPort.width} height={this.state.viewPort.height} ref="canvas" />
                <img alt="" ref="background" className="hidden" />
                <img alt="" ref="sprites" className="hidden" />
            </div>
        );
    }
}

export default Game;