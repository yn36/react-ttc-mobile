import React, {Component} from "react"
import {Link} from "react-router-dom";

import supercss from '../../css/home.module.scss'

class Superday extends Component {
    constructor(props) {
        super(props);

        this.state = {};

    }

    render() {
        return (
            <div className={supercss.sup}>
                <div className={supercss.superday}>
                    <div className={supercss.spimg}>
                        <Link to='/list'>
                            <img src="/static/images/supernew/superday.jpg" alt=""/>
                        </Link>
                    </div>
                    <div className={supercss.spdaj}>
                        <div className={supercss.area}>
                            <div className={supercss.text}>
                                <h3>排行榜</h3>
                                <p>好货大赏</p>
                            </div>
                            <div className={supercss.textimg}>
                                <span><img alt='' src='/static/images/supernew/milk.jpg'/></span>
                            </div>
                        </div>
                        <div className={supercss.area}>
                            <div className={supercss.text}>
                                <h3>排行榜</h3>
                                <p>好货大赏</p>
                            </div>
                            <div className={supercss.textimg}>
                                <span><img alt='' src='/static/images/supernew/milk.jpg'/></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Superday;