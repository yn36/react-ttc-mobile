import React, {Component} from "react"
import Topbar from "../topbar";
import {Link} from "react-router-dom";
import axios from 'axios'

import listcs from '../../css/list/list.module.scss'
import list from '../../css/list/list2.module.scss'

class List extends Component {
    state = {
        css: list,
        data: []
    };

    constructor(props) {
        super(props);
        // console.log(window.location.href.split("/")[5])
        let win = window.location.href.split("/")[5]
        let url = `/static/data/list/${win}.json`
        axios.get(url)
            .then(res => {
                this.setState({
                    data: res.data
                })
            })
    }

    componentDidMount() {
        let list = "/" + [window.location.href.split("/")[4]]
        window.onscroll = () => {
            if (list === '/list') {
                if (window.scrollY > 45) {
                    this.refs.topbar.style.background = "#e4308d"
                    this.refs.topbar.style.borderRadius = "0 0 10px 10px"
                } else {
                    this.refs.topbar.style.background = "transparent"

                }
            }
        }
    }

    // 延时渲染数据
    hehe = ()=>{
        setTimeout(() => {
            let {data} = this.state
            console.log(data)
        }, 100)
    }

    bott = () => {
        let {css} = this.state
        if (css == list) {
            this.setState({
                css: listcs
            })
        } else {
            this.setState({
                css: list
            })
        }
    }

    render() {
        return (
            <div className={this.state.css.list}>
                <div ref='topbar' className={this.state.css.topbar}>
                    <Topbar/>
                </div>

                <div className={this.state.css.listBox}>
                    <ul className={this.state.css.listboxul}>
                        <li className={this.state.css.listulli}>
                            <Link className={this.state.css.lia} to='/content'>
                                <div className={this.state.css.content}>
                                    <div className={this.state.css.contentimg}>
                                        <img src='/public/static/images/list/list1.jpg' alt=""/>
                                    </div>

                                    <div className={this.state.css.contentfloor}>
                                        <div className={this.state.css.title}>
                                            <p>一加 OnePlus 7T 90Hz流体屏 骁龙855Plus旗舰 4800万超广角三摄 8GB+256GB 冰际蓝 游戏手机</p>
                                        </div>
                                        <div className={this.state.css.biaoqian}>
                                            <span>6.22英寸</span>
                                            <span>6.22英寸</span>
                                        </div>
                                        <div className={this.state.css.price}>
                                            <p>
                                                ¥
                                                <span>699</span>
                                                .00
                                            </p>
                                        </div>
                                        <div className={this.state.css.mian}>
                                            <i>
                                                <img src='/public/static/images/list/ziying.jpg' alt=""/>
                                            </i>
                                            <span className={this.state.css.comments}>
                                                <span>3万</span>
                                                条评价
                                            </span>
                                        </div>
                                        <div className={this.state.css.floor}>
                                            <span>小米自营旗舰店</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>

                <div onClick={this.bott} className={this.state.css.bott}>
                    <span href=""></span>
                </div>
            </div>
        );
    }
}

export default List;