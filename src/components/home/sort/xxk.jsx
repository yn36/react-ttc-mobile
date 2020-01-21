import React, {Component} from "react"
import axios from 'axios'
// import IScroll from 'iscroll'
import xxkcss from '../../../css/sort.module.scss'

import {Link} from "react-router-dom";

class Xxk extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ohe: 0,
            title: [],
            currentIndex: 0,
            rigdata: [],
            startY: 0,
            moveY: 0,
            distaneY: 0,
            currentY: 0,
            letBoxH: 0, // 父元素的高
            ulBoxH: 0, // ul 的高
            maxTop: 0,  // 静止状态最大的top值
            minTop: 0,  // 静止状态最小的top值
            maxbounceTop: 0, // 滑动状态最大的top值
            minbounceTop: 0, // 滑动状态最小的top值
            myScroll: "",
            spiltlink: false,
            rigmoveY: 0, // rigbox
            rigdistaneY: 0,
            rigstartY: 0,
            rigcurrentY: 0,
            rigmaxBounceTop: 0,
            rigminbounceTop: 0,
            rigminTop: 0,
            rigmaxTop: 0,
            rigboxH: 0,
            rigdivH: 0,
            lljllength: null
        };
    }

    UNSAFE_componentWillMount() {
        this.setState({
            ohe: window.screen.availHeight - 95
        })

        let url = '/static/data/section.json'
        axios.get(url)
            .then(res => {
                let title = JSON.parse(JSON.stringify(res.data.hello))
                let rigdata = JSON.parse(JSON.stringify(res.data.hello[0].top[0].container))
                // console.log(res.data)
                this.setState({
                    title,
                    rigdata
                })
            })
    }

    componentDidMount() {
        // 设置中间部分的固定高
        this.refs.xxk.style.height = this.state.ohe + 'px'

        // 设置左侧拦和右侧栏的最大高度和最小高度
        setTimeout(() => {
            let {
                letBoxH,
                ulBoxH,
                maxTop,
                minTop,
                maxbounceTop,
                minbounceTop,
                rigboxH,
                rigdivH,
                rigmaxTop,
                rigminTop,
                rigmaxBounceTop,
                rigminbounceTop
            } = this.state
            let letBox = this.refs.letBox.offsetHeight
            let ulBox = this.refs.ulBox.offsetHeight
            let rigBox = this.refs.rigBox.offsetHeight
            let rigdiv = this.refs.rigdiv.offsetHeight

            rigboxH = rigBox
            rigdivH = rigdiv
            letBoxH = letBox
            ulBoxH = ulBox

            // 设置top值
            minTop = letBox - ulBox
            maxbounceTop = maxTop + 50
            minbounceTop = minTop - 50

            rigminTop = rigBox - rigdivH
            rigmaxBounceTop = rigmaxTop + 50
            rigminbounceTop = rigminTop + 50

            // console.log(minTop)
            this.setState({
                letBoxH,
                ulBoxH,
                maxTop,
                minTop,
                maxbounceTop,
                minbounceTop,
                rigboxH,
                rigdivH,
                rigmaxTop,
                rigminTop,
                rigmaxBounceTop,
                rigminbounceTop
            })

            // let myScroll = new IScroll(this.refs.rigBox, {
            //     mouseWheel: true,
            //     scrollbars: true
            // })
            // let Scrollbar = document.querySelector(".iScrollVerticalScrollbar.iScrollLoneScrollbar")
            // console.log(Scrollbar.style)
        }, 600)


        if (window.localStorage.lljlarr) {
            this.setState({
                lljllength: window.localStorage.lljlarr
            })
        }
    }

    // 点击事件
    handleClick = (e) => {
        let {minTop} = this.state
        const nodeName = e.target.nodeName.toUpperCase()
        let liH = this.refs.ulBox.querySelectorAll("li")
        let tag = e.target;
        if (nodeName === 'LI') {
            let index = parseInt(tag.getAttribute('index'))
            let rigdata = JSON.parse(JSON.stringify(this.state.title[index].top[0].container))
            let ulBox = this.refs.ulBox
            // console.log(liH, index, ulBox)
            // console.log(ulBox)
            ulBox.style.transition = 'top .5s'
            if (-index * liH[index].offsetHeight < minTop) {
                ulBox.style.top = minTop + "px"
                this.setState({
                    currentY: minTop
                })
            } else {
                ulBox.style.top = -index * liH[index].offsetHeight + "px"
                this.setState({
                    currentY: -index * liH[index].offsetHeight
                })
            }
            this.setState({
                currentIndex: index,
                rigdata,
                minTop
            })
        }

        setTimeout(() => {
            let {
                letBoxH,
                ulBoxH,
                maxTop,
                minTop,
                maxbounceTop,
                minbounceTop,
                rigboxH,
                rigdivH,
                rigmaxTop,
                rigminTop,
                rigmaxBounceTop,
                rigminbounceTop
            } = this.state
            let letBox = this.refs.letBox.offsetHeight
            let ulBox = this.refs.ulBox.offsetHeight
            let rigBox = this.refs.rigBox.offsetHeight
            let rigdiv = this.refs.rigdiv.offsetHeight

            rigboxH = rigBox
            rigdivH = rigdiv
            letBoxH = letBox
            ulBoxH = ulBox

            // 设置top值
            minTop = letBox - ulBox
            maxbounceTop = maxTop + 50
            minbounceTop = minTop - 50

            rigminTop = rigBox - rigdivH
            rigmaxBounceTop = rigmaxTop + 50
            rigminbounceTop = rigminTop + 50

            // console.log(minTop)
            this.setState({
                letBoxH,
                ulBoxH,
                maxTop,
                minTop,
                maxbounceTop,
                minbounceTop,
                rigboxH,
                rigdivH,
                rigmaxTop,
                rigminTop,
                rigmaxBounceTop,
                rigminbounceTop
            })

            // let myScroll = new IScroll(this.refs.rigBox, {
            //     mouseWheel: true,
            //     scrollbars: true
            // })
            // let Scrollbar = document.querySelector(".iScrollVerticalScrollbar.iScrollLoneScrollbar")
            // console.log(Scrollbar.style)
        }, 600)

    }

    lljl = (item) => {
        if (window.localStorage.lljlarr) {
            var array = JSON.parse(window.localStorage.lljlarr)
        } else {
            array = []
        }

        for (let i = 0; i < array.length; i++) {
            if (item.id === array[i].id) {
                return
            }
        }
        let obj = item
        array.push(obj)
        window.localStorage.lljlarr = JSON.stringify(array)

    }

    // 渲染右边数据组件
    zj = () => {
        var data = null
        setTimeout(() => {
            data = JSON.parse(JSON.stringify(this.state.rigdata))
        }, 500)
        if (!data) {
            return (
                <ul className={xxkcss.wrigbox}>
                    {
                        this.state.rigdata.map((item, index) => {
                            return (
                                <li key={index} className={xxkcss.sortbox}>
                                    <h4>{item.title}</h4>
                                    <ul className={xxkcss.sortboxul}>
                                        {
                                            item.ul.map((item, index) => {
                                                return (
                                                    <li key={index} className={xxkcss.sbul}>
                                                        <Link onClick={() => this.lljl(item)}
                                                              className={xxkcss.sbulping}
                                                              to={{
                                                                  pathname: `/list/${item.t}/`,
                                                                  search: "title=" + item.title
                                                              }}>
                                                            <img src={item.url} alt=""/>
                                                            <span>{item.title}</span>
                                                        </Link>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </li>
                            )
                        })
                    }
                </ul>
            )
        }
    }

    // 滑动事件
    TouchStart = (e) => {
        let {startY} = this.state
        // console.log(e.targetTouches[0].clientY)
        startY = e.targetTouches[0].clientY
        this.setState({
            startY
        })
    }
    TouchMove = (e) => {
        let {moveY, distaneY, startY, currentY, maxbounceTop, minbounceTop} = this.state
        // console.log("a" + distaneY)
        moveY = e.targetTouches[0].clientY
        distaneY = moveY - startY
        // console.log("b" + distaneY)
        this.setState({
            startY,
            distaneY,
            moveY
        })
        if ((currentY + distaneY) > maxbounceTop || (currentY + distaneY) < minbounceTop) {
            return
        }
        this.refs.ulBox.transition = 'none'
        this.refs.ulBox.style.top = (currentY + distaneY) + "px"
    }
    TouchEnd = (e) => {
        let {distaneY, startY, currentY, maxTop, minTop} = this.state
        if ((currentY + distaneY) < minTop) {
            currentY = minTop
            // this.refs.ulBox.transition = "top .5s"
            this.refs.ulBox.style.top = minTop + "px"
        } else if ((currentY + distaneY) > maxTop) {
            currentY = maxTop
            // this.refs.ulBox.transition = "top .5s"
            this.refs.ulBox.style.top = maxTop + "px"
        } else {
            currentY += distaneY
        }
        this.setState({
            currentY,
            distaneY,
            startY,
            maxTop,
            minTop
        })
    }

    rigboxStart = (event) => {
        let {rigstartY} = this.state
        rigstartY = event.targetTouches[0].clientY
        this.setState({
            rigstartY
        })
    }

    rigboxMove = (event) => {
        let {rigmoveY, rigdistaneY, rigstartY, rigcurrentY, rigmaxbounceTop, rigminbounceTop} = this.state

        rigmoveY = event.targetTouches[0].clientY
        rigdistaneY = rigmoveY - rigstartY
        this.setState({
            rigstartY,
            rigmoveY,
            rigdistaneY
        })
        if ((rigcurrentY + rigdistaneY) > rigmaxbounceTop || (rigcurrentY + rigdistaneY) < rigminbounceTop) {
            return
        }
        this.refs.rigdiv.style.top = (rigcurrentY + rigdistaneY) + "px"
    }

    rigboxEnd = (event) => {
        let {rigdistaneY, rigstartY, rigcurrentY, rigmaxTop, rigminTop} = this.state
        if ((rigcurrentY + rigdistaneY) < rigminTop) {
            rigcurrentY = rigminTop
            this.refs.rigdiv.style.top = rigminTop + "px"
        } else if ((rigcurrentY + rigdistaneY) > rigmaxTop) {
            rigcurrentY = rigmaxTop
            this.refs.rigdiv.style.top = rigmaxTop + "px"
        } else {
            rigcurrentY += rigdistaneY
        }

        this.setState({
            rigcurrentY,
            rigdistaneY,
            rigstartY,
            rigmaxTop,
            rigminTop
        })

    }

    emptys = () => {
        localStorage.removeItem("lljlarr")
        this.setState({
            lljllength: null
        }, () => {
            this.recode()
        })
    }

    recode = () => {
        let {lljllength} = this.state
        if (lljllength) {
            return (
                <ul className={xxkcss.wrigbox}>
                    <li className={xxkcss.sortbox}>
                        <h4>浏览记录</h4>
                        <span onClick={this.emptys} className={xxkcss.empty}>清空</span>
                        <ul className={xxkcss.sortboxul}>
                            {
                                JSON.parse(lljllength).map((item, index) => {
                                    return (
                                        <li key={index} className={xxkcss.sbul}>
                                            <Link onClick={() => this.lljl(item)}
                                                  className={xxkcss.sbulping}
                                                  to={{
                                                      pathname: `/list/${item.t}/`,
                                                      search: "title=" + item.title
                                                  }}>
                                                <img src={item.url} alt=""/>
                                                <span>{item.title}</span>
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </li>
                </ul>
            )
        }
    }

    render() {
        return (
            <div ref='xxk' className={xxkcss.xxkbox}>
                <div ref='letBox' className={xxkcss.letbox}>
                    <ul ref="ulBox"
                        onTouchStart={(event => this.TouchStart(event))}
                        onClick={(e) => this.handleClick(e)}
                        onTouchMove={(event => this.TouchMove(event))}
                        onTouchEnd={(event => this.TouchEnd(event))}
                    >
                        {
                            this.state.title.map((item, index) => {
                                return (
                                    <li key={index} index={index}
                                        className={this.state.currentIndex === index ? 'current' : ''}>{item.top[0].title}</li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div ref="rigBox" className={xxkcss.rigbox}>
                    <div className={xxkcss.rigdiv} ref='rigdiv'
                         onTouchStart={(event => this.rigboxStart(event))}
                         onTouchMove={(event => this.rigboxMove(event))}
                         onTouchEnd={(event => this.rigboxEnd(event))}

                    >
                        {this.recode()}
                        {this.zj()}
                    </div>
                </div>
            </div>
        );
    }
}

export default Xxk;