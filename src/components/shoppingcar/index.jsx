import React, {Component} from "react"
import Topbar from "../topbar";
import shoppingcss from '../../css/shopping.module.scss'
import Item from "../home/recommend/item";
import {Checkbox} from 'antd-mobile';
import {delshopping, addsum, desum, checkbox, ckeall} from '../../redux/actions'
import {Link} from "react-router-dom";
import ReactDocumentTitle from 'react-document-title'

const CheckboxItem = Checkbox.CheckboxItem;

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: window.$store.getState(),
            sum: 1,
            optxt: false,
        };

        window.$store.subscribe(() => {
            this.setState({
                data: window.$store.getState()
            })
        })
    }

    addsum = (e, item) => {
        e.stopPropagation()
        window.$store.dispatch(addsum(item))
        return false;
    }

    desum = (e, item) => {
        e.stopPropagation()
        window.$store.dispatch(desum(item))
        return false;
    }

    checkbox = (item) => {
        window.$store.dispatch(checkbox(item));
        let arrlength = window.$store.getState();
        let j = 0;
        for (let i = 0; i < arrlength.length; i++) {
            if (arrlength[i].isfalse === true) {
                j++
            }
        }
        if (j === arrlength.length) {
            this.setState({
                optxt: true
            })
        } else {
            this.setState({
                optxt: false
            })
        }

    }

    sum = () => {

    }

    del = (item) => {
        let store = window.$store.getState()
        window.$store.dispatch(delshopping(store, item))
    }

    ckeall = () => {
        let store = window.$store.getState()
        this.setState({
            optxt: !this.state.optxt
        }, () => {
            let {optxt} = this.state
            window.$store.dispatch(ckeall(store, optxt))
        })
    }

    goodsbuy = () => {
        if (!localStorage.tscusernamelogin) {

            setTimeout(() => {
                this.props.history.push("/login")
            }, 1000)
        } else {
            this.props.history.push("/resulto")
        }
    }

    componentDidMount() {
        let {data} = this.state
        let isfalse = data.length
        let s = 0
        if (data) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].isfalse === true) {
                    s++
                }
            }
            if (isfalse === s) {
                this.setState({
                    optxt: true
                })
            } else {
                this.setState({
                    optxt: false
                })
            }
        }
    }


    conter = (totalGoodsprice, goodlength) => {
        let {data} = this.state
        if (data.length >= 1) {
            return (
                <div className={shoppingcss.section}>
                    {
                        data.map((item) => {
                            return (
                                <div key={item.id} className={shoppingcss.itemconnect}>
                                    <div className={shoppingcss.itemca}>
                                        <div>
                                            <div className={shoppingcss.contentl}>
                                                <div className={shoppingcss.input}>
                                                    <CheckboxItem onChange={() => {
                                                        this.checkbox(item)
                                                    }} checked={item.isfalse}/>
                                                </div>
                                                <Link to={{
                                                    pathname: `/content/${item.t}`,
                                                    search: `?name=${item.t}`
                                                }}>
                                                    <img src={item.url} alt=""/>
                                                </Link>
                                            </div>
                                            <div className={shoppingcss.content}>
                                                <div className={shoppingcss.name}>
                                                    <Link to={{
                                                        pathname: `/content/${item.t}`,
                                                        search: `?name=${item.t}`
                                                    }}>
                                                        {item.title}
                                                    </Link>
                                                </div>
                                                <span className={shoppingcss.sku}>
                                                    {
                                                        item.sku.map((item, index) => {
                                                            return (
                                                                <span key={index}
                                                                      style={{margin: "0 3px"}}>{item}</span>
                                                            )
                                                        })
                                                    }
                                    </span>
                                                <div className={shoppingcss.priceline}>
                                                    <div className={shoppingcss.price}>
                                                        ¥ <em>{item.price}</em>.00
                                                    </div>
                                                    <div className={shoppingcss.count_choose}>
                                                        <div className={shoppingcss.num_wrap_v2}>
                <span onClick={(e) => {
                    this.desum(e, item)
                }} className={shoppingcss.disable}>
                <i className={shoppingcss.row}></i>
                </span>
                                                            <div className={shoppingcss.text_wrap}>
                                                                <input className={shoppingcss.text}
                                                                       value={item.sum}
                                                                       onChange={this.sum}/>
                                                            </div>
                                                            <span onClick={(e) => {
                                                                this.addsum(e, item)
                                                            }} className={shoppingcss.plus}>
                <i className={shoppingcss.row}></i>
                <i className={shoppingcss.col}></i>
                </span>
                                                        </div>
                                                    </div>

                                                </div>
                                                <span onClick={() => {
                                                    this.del(item)
                                                }} className={shoppingcss.de}>删除</span>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className={shoppingcss.floorbar}>
                        <div className={shoppingcss.quanxuan}>
                            <CheckboxItem
                                onChange={() => {
                                    this.ckeall()
                                }}
                                checked={this.state.optxt}
                            />
                            <span className={shoppingcss.quanxuantext}>全选</span>
                        </div>
                        <div className={shoppingcss.flr}>
                            <div className={shoppingcss.tmain}>
                                总计:
                                <span className={shoppingcss.tprice}>¥{totalGoodsprice}</span>
                            </div>
                            {
                                goodlength ? (
                                    <div onClick={this.goodsbuy} className={shoppingcss.goodsbuy}>
                                        去结算({goodlength}件)
                                    </div>
                                ) : (
                                    <div className={shoppingcss.buy}>
                                        去结算
                                    </div>
                                )
                            }

                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className={shoppingcss.empty}>
                    <div className={shoppingcss.emptycontent}>
                        <img src="/static/images/shopping/gwc.png" alt=""/>
                        <p>购物车空空如也，去逛逛吧~</p>
                    </div>
                </div>
            )
        }
    }


    render() {
        const goods = window.$store.getState().filter((e) => {
            return e.isfalse
        })
        let totalGoodsprice = 0
        let goodlength = 0
        for (let i = 0; i < goods.length; i++) {
            totalGoodsprice += goods[i].sum * goods[i].price
            goodlength = goods.length
        }
        return (
            <ReactDocumentTitle title='购物车'>
            <div className={shoppingcss.shoppingbox}>
                <div className={shoppingcss.topbar}>
                    <Topbar/>
                </div>
                {this.conter(totalGoodsprice, goodlength)}
                <div className={shoppingcss.floor}>
                    <div className={shoppingcss.cnxhTitle}>
                        <span className={shoppingcss.title}>可能你还想要</span>
                    </div>
                    <Item/>
                </div>
            </div>
            </ReactDocumentTitle>
        );
    }
}

export default Index;