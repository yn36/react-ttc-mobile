import React, {Component} from "react"
import Topbar from "./topbar";
import {Link} from "react-router-dom";

import aboutcss from '../css/about.module.scss'
import Item from "./home/recommend/item";
import ReactDocumentTitle from 'react-document-title'

class About extends Component {
    constructor(props) {
        super(props);

        this.state = {};

    }

    render() {
        let login = JSON.parse(window.localStorage.tscusernamelogin)
        return (
            <ReactDocumentTitle title='淘商城移动端'>
                <div className={aboutcss.about}>
                    <Topbar/>
                    <div className={aboutcss.mybox}>
                        <div className={aboutcss.myCenterTop}>
                            <div className={aboutcss.info}>
                                <div className={aboutcss.avatar}>
                                    <img src="/static/images/home/my.png" alt=""/>
                                </div>
                                <div className={aboutcss.personal}>
                                    <div className={aboutcss.name}>
                                        {login[0].name}
                                    </div>
                                    <div className={aboutcss.pin}>
                                        用户名：{login[0].user}
                                    </div>
                                </div>
                            </div>
                            <div className={aboutcss.accout}>
                                <div className={aboutcss.accoutcontent}>
                                    <Link to='/myinfo'>
                                        <span></span>
                                        账号管理
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={aboutcss.mycell}>
                        <div className={aboutcss.rel_container}>
                            <div className={aboutcss.top_line_box}>
                                <div className={[aboutcss.my_order_entrance, aboutcss.type_unpay].join(" ")}>
                                    <div className={aboutcss.entrance_text}>待付款</div>
                                </div>
                                <div className={[aboutcss.my_order_entrance, aboutcss.type_unrecieve].join(" ")}>
                                    <div className={aboutcss.entrance_text}>待收货</div>
                                </div>
                                <div className={[aboutcss.my_order_entrance, aboutcss.type_consult].join(" ")}>
                                    <div className={aboutcss.entrance_text}>退换／售后</div>
                                </div>
                                <div className={[aboutcss.my_order_entrance, aboutcss.type_orders].join(" ")}>
                                    <div className={aboutcss.entrance_text}>全部订单</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={aboutcss.mycell}>
                        <div className={aboutcss.rel_container}>
                            <div className={aboutcss.top_line_box}>
                                <div className={aboutcss.assets_item}>
                                    <div className={aboutcss.assets_item_val}>
                                        <div className={aboutcss.store_val}>0</div>
                                    </div>
                                    <span className={aboutcss.assets_item_key}>商品收藏</span>
                                </div>
                                <div className={aboutcss.assets_item}>
                                    <div className={aboutcss.assets_item_val}>
                                        <div className={aboutcss.store_val}>0</div>
                                    </div>
                                    <span className={aboutcss.assets_item_key}>店铺收藏</span>
                                </div>
                                <div className={aboutcss.assets_item}>
                                    <div className={aboutcss.assets_item_val}>
                                        <div className={aboutcss.store_val}>0</div>
                                    </div>
                                    <span className={aboutcss.assets_item_key}>我的足迹</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={aboutcss.activity_wrap}>
                        <div className={aboutcss.tools_container}>
                            <div className={aboutcss.tools_item}>
                                <div className={aboutcss.tools_icon}></div>
                                <span className={aboutcss.tools_item_key}>
                                我的预约
                            </span>
                            </div>
                            <div className={aboutcss.tools_item}>
                                <div className={aboutcss.tools_icon}></div>
                                <span className={aboutcss.tools_item_key}>
                                意见反馈
                            </span>
                            </div>
                            <div className={aboutcss.tools_item}>
                                <div className={aboutcss.tools_icon}></div>
                                <span className={aboutcss.tools_item_key}>
                                客服热线
                            </span>
                            </div>
                            <div className={aboutcss.tools_item}>
                                <div className={aboutcss.tools_icon}></div>
                                <span className={aboutcss.tools_item_key}>
                                关于我们
                            </span>
                            </div>
                        </div>
                    </div>

                    <div className={aboutcss.floor}>
                        <div className={aboutcss.cnxhTitle}>
                            <span className={aboutcss.title}>为您推荐</span>
                        </div>
                        <Item/>
                    </div>
                </div>
            </ReactDocumentTitle>
        );
    }
}

export default About;