import React, {Component} from "react"
import axios from 'axios'
import {Link} from "react-router-dom";

import seckillcss from '../../css/home.module.scss'

class Seckill extends Component {
    constructor(props) {
        super(props);

        this.state = {
            seckilldata: [],
            hour: "00",
            minute: "00",
            second: "00",
            strong: "00",
        };
        this.times = ""
    }

    componentWillMount() {
        let url = `/static/data/seckill.json`
        axios.get(url)
            .then(res => {
                let data = res.data.img
                this.setState({
                    seckilldata: data
                })
            })
    }

    // 滚动
    seckill = () => {
        var moveprod = this.refs.seckul
        var windWidth = this.refs.contentbot.offsetWidth
        var ulWidth = moveprod.offsetWidth;
        var minDistance = windWidth - ulWidth;
        var maxDistance = 0
        var startX1 = 0
        var moveX1 = 0
        var distanceX1 = 0
        var delayDistance = 50
        var yzs_transition = function (time) {
            moveprod.style.transition = `all .${time}s`
        }
        var yzs_translate = function (dist) {
            moveprod.style.transform = `translateX(${dist}px)`;
        }
        moveprod.addEventListener('touchstart', function (event) {
            startX1 = event.touches[0].clientX
        })
        moveprod.addEventListener('touchmove', function (event) {
            moveX1 = event.touches[0].clientX - startX1
            if ((moveX1 + distanceX1) > (maxDistance + delayDistance)) {
                moveX1 = 0
                distanceX1 = maxDistance + delayDistance
            } else if ((moveX1 + distanceX1) < (minDistance - delayDistance)) {
                moveX1 = 0
                distanceX1 = minDistance - delayDistance
            }
            yzs_transition(3)
            yzs_translate(moveX1 + distanceX1)
        })
        moveprod.addEventListener('touchend', function (event) {
            distanceX1 += moveX1
            if (distanceX1 > maxDistance) {
                distanceX1 = maxDistance
            } else if (distanceX1 < minDistance) {
                distanceX1 = minDistance
            }
            yzs_transition(4)
            yzs_translate(distanceX1)
        })
    }

    // 倒计时 获取整点场
    count = () => {
        let date = new Date().getHours()
        let strong = null
        if (date % 2 === 0) {
            strong = date
        } else {
            strong = date - 1
        }
        this.setState({
            strong
        })
    }
    // 倒计时
    getTimes = () => {
        let oDate = new Date()
        let date2 = null
        if (oDate.getHours() % 2 === 0) {
            date2 = new Date(oDate.getFullYear(), oDate.getMonth(), oDate.getDate(), oDate.getHours() + 2, 0, 0)
        } else {
            date2 = new Date(oDate.getFullYear(), oDate.getMonth(), oDate.getDate(), oDate.getHours() + 1, 0, 0)
        }
        let chazhi = date2 - oDate

        let s = parseInt(chazhi / 1000 % 60)
        let m = parseInt(chazhi / 1000 / 60 % 60)
        let h = parseInt(chazhi / 1000 / 60 / 60 % 24)
        let hour = `0${h}`
        let minute = m > 9 ? m : `0${m}`
        let second = s > 9 ? s : `0${s}`
        // console.log(hour, minute, second)

        this.setState({
            hour,
            minute,
            second
        })
    }

    componentDidMount() {
        this.seckill()
        this.times = setInterval(() => {
            this.count()
            this.getTimes()
        }, 1000)
    }

    componentWillUnmount() {
        clearTimeout(this.times)
    }

    render() {
        let {seckilldata, hour, minute, second, strong} = this.state
        return (
            <div className={seckillcss.box}>
                <div className={seckillcss.seckill}>
                    <div>
                        <div className={seckillcss.contenttop}>
                            <a href="hello" className={seckillcss.seckleft}>
                                <span className={seckillcss.secksp}>秒杀</span>
                                <strong>{strong}点场</strong>
                                <div className={seckillcss.secktimer}>
                                    <div className={seckillcss.secktime}>
                                        <span>{hour}</span>
                                    </div>
                                    <span className={seckillcss.timespace}>:</span>
                                    <div className={seckillcss.secktime}>
                                        <span>{minute}</span>
                                    </div>
                                    <span className={seckillcss.timespace}>:</span>
                                    <div className={seckillcss.secktime}>
                                        <span>{second}</span>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div ref='contentbot' className={seckillcss.contentbot}>
                            <ul ref='seckul' className={seckillcss.seckul} id='seckul'>
                                {
                                    seckilldata.map((item) => {
                                        return (
                                            <li key={item.id} className={seckillcss.secklist}>
                                                <Link to='/list'>
                                                    <div className={seckillcss.goosimg}>
                                                        <img src={item.url} alt=""/>
                                                        <span className={item.class}>{item.em}</span>
                                                    </div>
                                                    <div className={seckillcss.goosprice}>
                                                        <span className={seckillcss.now}><em>¥</em>188</span>
                                                        <span className={seckillcss.old}><em>¥</em>148</span>
                                                    </div>
                                                </Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Seckill;