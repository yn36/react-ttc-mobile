import React, {Component} from "react"
import pricecss from '../../css/content/price.module.scss'
import {Tabs} from 'antd-mobile';
import Product from "./Product";
import Ggcs from "./ggcs";
import Shbz from "./shbz";
import DetailItem from "./detailItem";

import {Link} from "react-router-dom";


import {addshopping} from '../../redux/actions'

const tabs = [
    {title: '商品介绍', index: 0},
    {title: '规格参数', index: 1},
    {title: '售后保障', index: 2},
];

class Price extends Component {
    constructor(props) {
        super(props);

        this.detailObj = {
            0: "",
            1: "",
            2: "",
            3: ""
        }
        this.bapiid = {
            0: 0,
            1: 0,
            2: 0
        }

        this.state = {
            data: [],
            title: [],
            xuanze: [],
            oys: [],
            act: 0,
            detailes: [],
            cansu: [],
            colour: "请选择",
            versions: "请选择",
            gmfs: "请选择",
            sum: 1,
            apiid: "a000",
            gwclength: 0
        };
        setTimeout(() => {
            let oys = []
            oys = JSON.parse(JSON.stringify(this.props.data.ys))
            this.setState({
                title: JSON.parse(JSON.stringify(this.props.data.title[0])),
                xuanze: JSON.parse(JSON.stringify(this.props.data.xuanze.a000)),
                oys,
                detailes: JSON.parse(JSON.stringify(this.props.data.detailes)),
                cansu: JSON.parse(JSON.stringify(this.props.data.cansu)),
                colour: this.props.data.xuanze.a000.sku[0],
                versions: this.props.data.xuanze.a000.sku[1],
                gmfs: this.props.data.xuanze.a000.sku[2]
            }, () => {
                this.detailObj = {
                    0: this.state.colour,
                    1: this.state.versions,
                    2: this.state.gmfs
                }
            })

            // console.log(this.props.data.xuanze.a000.sku[0])

        }, 500)
    }

    yixuan = (e) => {
        this.refs.xs.style.display = 'block'
        document.getElementById('contentbox').style.position = 'fixed'
        document.getElementById('contentbox').style.top = '-354px'

    }

    gb = () => {
        // console.log(this.refs.xs.style)
        this.refs.xs.style.display = 'none'
        document.getElementById('contentbox').style.position = ''
    }
    a = () => {

    }

    ys = (item, key) => {
        return <DetailItem parent={this} item={item} key={key}/>
    }

    addshopping = (item) => {
        console.log(item)
        let shopping = window.$store.getState()
        if (!shopping) {
            window.$store.dispatch(addshopping(item))
            this.setState({
                gwclength: 1
            })
        } else {
            let arr = []
            for (let i = 0; i < shopping.length; i++) {
                arr.push(shopping[i].id)
            }

            if (arr.includes(item.id)) {
                const index = shopping.findIndex((el) => {
                    return el.id === item.id
                })
                shopping[index].sum += this.state.sum
            } else {
                window.$store.dispatch(addshopping(item))
            }
        }
        if (shopping) {
            this.setState({
                gwclength: shopping.length
            })
        }
        if (window.location.hash.split("/")[1] === 'content') {
            this.refs.addsum.style.display = "block"
            setTimeout(() => {
                this.refs.addsum.style.opacity = '1'
                this.refs.addsum.style.top = "-25px"
                setTimeout(() => {
                    this.refs.addsum.style.opacity = '0'
                }, 900)
                setTimeout(() => {
                    this.refs.addsum.style.top = "-10px"
                    this.refs.addsum.style.display = "none"
                }, 900)
            }, 200)
        }
    }

    // 传递值 子组件传父组件
    getChildrenMsg = (result, msg) => {
        // console.log(result, msg)
        this.detailObj[msg.type] = msg.value

        // this.detailObj[3] = msg.apiindex
        // console.log(msg)
        // console.log(msg.type)
        this.bapiid[msg.type] = msg.apiindex

        let c = this.bapiid[0].toString()
        let v = this.bapiid[1].toString()
        let g = this.bapiid[2].toString()
        let s = "a"
        let skuid = s.concat(c, v, g)
        // console.log(url)
        this.setState({
            colour: this.detailObj[0],
            versions: this.detailObj[1],
            gmfs: this.detailObj[2],
            apiid: `a${skuid}`,
            xuanze: this.props.data.xuanze[skuid]
        }, () => {
        })
    }

    gcwlength = () => {
        let gwclength = null
        if (window.$store.getState()) {
            gwclength = window.$store.getState().length
        }
        if (gwclength) {
            return (
                <span ref="gcwlegth" className={pricecss.gcwlegth}>
                    {gwclength}
                </span>
            )
        } else {
            return null
        }
    }


    render() {
        let data = null
        let {title, oys, detailes} = this.state
        setTimeout(() => {
            data = JSON.parse(JSON.stringify(title))
        }, 500)


        if (!data) {
            return (
                <div className={pricecss.top}>
                    <div className={pricecss.tops}>
                        <div className={pricecss.price}>
            <span className={pricecss.prtop}>
            ¥
            <span>{this.state.xuanze.price}</span>
            .00
            </span>
                            <div className={pricecss.collect}>
                                <img src="/static/images/home/collect.png" alt=""/>
                                <span>收藏</span>
                            </div>
                        </div>
                        <div className={pricecss.title}>
                            <i>
                                <img src='/static/images/list/ziying.jpg' alt=''/>
                            </i>
                            <p>{this.state.xuanze.title}</p>
                        </div>
                    </div>


                    {/*价格*/}
                    <div className={pricecss.showWin}>
                        <div onClick={this.yixuan} className={pricecss.showa}>
                            <div className={pricecss.showaone}>
                                <h3>已选</h3>
                                <span>
                                 {this.state.colour},{this.state.versions},{this.state.gmfs},{this.state.sum}个
                                </span>
                            </div>
                            <div className={pricecss.showato}>
                                <span>本商品支持保障服务,点击可选服务</span>
                            </div>
                        </div>
                        <div onClick={this.xs} className={pricecss.showa}>
                            <div className={pricecss.showaone}>
                                <h3>送至</h3>
                                <span>北京朝阳区三环到四环之间</span>
                            </div>
                            <div className={pricecss.showato}>
                                <span>现在至明天11:10前下单，预计明天(11月09日)送达</span>
                            </div>
                        </div>
                    </div>

                    {/*详情页*/}
                    <div className={pricecss.prxq}>
                        <Tabs tabs={tabs}
                              initialPage={0}
                        >
                            {/*商品介绍*/}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#fff'
                            }}>
                                <Product img={detailes}/>
                            </div>

                            {/*参数*/}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#fff'
                            }}>
                                {/*{console.log(this.props.data.cs)}*/}
                                <Ggcs cansu={this.state.cansu}/>
                            </div>

                            {/*售后保障*/}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#fff'
                            }}>
                                <Shbz/>
                            </div>
                        </Tabs>
                    </div>

                    {/*bottomBar*/}
                    <div className={pricecss.bott}>
                        <Link to='/shoppingcar' data={this.state.xuanze}>
                            <div className={pricecss.bottgwc}>
                                <img src="/static/images/home/maxgwc.svg" alt=""/>
                                <span>购物车</span>
                                {this.gcwlength()}
                                <span ref="addsum" className={pricecss.addsum}>+1</span>
                            </div>
                        </Link>
                        <div className={pricecss.bottdiv}>
                            <button onClick={() => this.addshopping(this.state.xuanze)}>加入购物车</button>
                            <button>立即购买</button>
                        </div>
                    </div>


                    {/*已选*/}
                    <div ref='xs' className={pricecss.xs}>
                        <div onClick={this.gb} className={pricecss.zhezhao}></div>
                        <div className={pricecss.xianshi}>
                            <div className={pricecss.header}>
                                <img className={pricecss.headerimg} src={this.state.xuanze.url}
                                     alt=""/>
                                <p className={pricecss.headerprice}>
                                    ¥
                                    <em>{this.state.xuanze.price}</em>
                                    .00
                                </p>
                                <p className={pricecss.prop}>
                                    <span>已选</span>
                                    {this.state.colour},{this.state.versions},{this.state.gmfs},{this.state.sum}个
                                </p>

                                <div onClick={this.gb} className={pricecss.ex}>
                                </div>
                            </div>
                            <div className={pricecss.xsbody}>
                                <div ref='area'>

                                    {oys.map((item, key) => {

                                        return this.ys(item, key)
                                    })}
                                </div>

                                <div className={pricecss.count_choose}>
                                    <div className={pricecss.num_wrap_v2}>
                <span className={pricecss.disable} onClick={() => {
                    let {sum} = this.state
                    if (sum <= 1) {
                        return
                    } else {
                        sum--
                    }
                    this.setState({
                        sum
                    })
                }}>
                <i className={pricecss.row}></i>
                </span>
                                        <div className={pricecss.text_wrap}>
                                            <input onChange={this.a} className={pricecss.text} value={this.state.sum}/>
                                        </div>
                                        <span onClick={() => {
                                            let {sum} = this.state
                                            sum++
                                            this.setState({
                                                sum
                                            })
                                        }} className={pricecss.plus}>
                <i className={pricecss.row}></i>
                <i className={pricecss.col}></i>
                </span>
                                    </div>
                                    <p className={pricecss.count}>数量</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>请求数据失败。。。。。。</div>
            )
        }


    }
}

export default Price;