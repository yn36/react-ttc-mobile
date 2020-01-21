import React, {Component} from "react"
import {Link} from 'react-router-dom'
import {WhiteSpace} from 'antd-mobile'
import homecss from '../../css/home.module.scss'
import ReactDocumentTitle from 'react-document-title'
// 组件
import Banner from './banner'  // 轮播图
import Grid from './griditem' // 宫格
import Seckill from './seckill' // 秒杀
import Superday from './superday' // 超级新品
import Lovelife from "./lovelife"; // 爱生活
import Recommend from "./recommend/recommend";  // 推荐

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        window.onscroll = () => {
            if (window.location.hash === "#/home/home") {
                if (window.scrollY > 168) {
                    this.refs.topsearch.style.background = "rgba(228, 48, 141,.95)"
                    this.refs.topsearch.style.borderRadius = "0 0 10px 10px"
                    this.refs.topsearch.style.borderBottom = '1px solid rgba(255,255,255,.8)'
                } else if (window.scrollY < 168) {
                    this.refs.topsearch.style.background = "rgba(228, 48, 141,0)"
                    this.refs.topsearch.style.borderBottom = 'none'
                }
            }
        }
    }

    render() {
        return (
            <ReactDocumentTitle title='首页-淘商城移动商城'>
                <div>
                    {/*顶部搜索*/}
                    <header>
                        <div ref='topsearch' className={homecss.topsearch}>
                            <Link className={homecss.header_sort} to='/home/sort'/>
                            <span className={homecss.header_searchico}></span>
                            <input type="search" className={homecss.header_search} placeholder="搜索商品/店铺"/>
                            {
                                window.localStorage.tscusernamelogin ? (
                                    <Link to='/home/about' className={homecss.logins}>
                                        <img src="/static/images/home/myhome.svg" alt=""/>
                                    </Link>
                                ) : (
                                    <Link to='/login' className={homecss.header_login}>登录</Link>

                                )
                            }
                        </div>
                    </header>

                    <section style={{background: "#e4308d", paddingBottom: "100px"}}>
                        <Banner/>
                        <WhiteSpace/>
                        <Grid/>
                        <WhiteSpace/>
                        <Seckill/>
                        <WhiteSpace/>
                        <Superday/>
                        <WhiteSpace/>
                        <Lovelife/>
                        <WhiteSpace/>
                        <Recommend/>
                    </section>

                </div>
            </ReactDocumentTitle>
        );
    }
}

export default Home;