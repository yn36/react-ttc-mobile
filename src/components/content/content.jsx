import React, {Component} from "react"
import Topbar from "../topbar";
import {Carousel} from 'antd-mobile';
import axios from 'axios'
import ReactDocumentTitle from 'react-document-title'

import content from '../../css/content/content.module.scss'
import Price from "./price";

class Content extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dataimg: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            imgHeight: 375,
            data: [],
            error: "",
            hehetitle: ""
        };
        let query = this.useQuery();
        let url = `/static/data/content/${query.get('name')}.json`
        axios.get(url)
            .then(res => {
                // console.log(res)
                let dataimg = res.data.bannerimg
                let data = res.data
                this.setState({
                    dataimg,
                    data,
                    hehetitle: res.data.title[0].title
                })
            })
            .catch(error => {
                this.setState({
                    error
                })
                // document.write("数据请求失败（数据暂无）")
            })
    }

    useQuery() {
        return new URLSearchParams(this.props.location.search);
    }

    componentDidMount() {
        if (this.state.data) {
            window.onscroll = () => {
                if (window.location.hash.split('/')[1] === 'content') {
                    if (window.scrollY > 345) {
                        this.refs.top.style.background = "#fff";
                        this.refs.top.style.borderBottom = '1px solid #eee'
                        this.refs.top.children[0].children[0].children[1].style.opacity = '1'
                    } else if (window.scrollY < 345) {
                        this.refs.top.style.background = "transparent";
                        this.refs.top.style.borderBottom = 'none'
                        this.refs.top.children[0].children[0].children[1].style.opacity = '0'
                    }
                }
            }
        }
    }

    render() {
        if (this.state.error) {
            return (
                <div className={content.contentbox}>
                    <div ref='top' className={content.topbar}>
                        <Topbar/>
                    </div>
                    <div style={{margin: "87px"}}>数据请求失败（数据暂无）</div>
                </div>
            )

        }
        if (this.state.data) {
            return (
                <ReactDocumentTitle title={this.state.hehetitle}>
                    <div id='contentbox' className={content.contentbox}>
                        <div ref='top' className={content.topbar}>
                            <Topbar title={this.state.hehetitle}/>
                        </div>
                        <div className={content.lbt}>
                            <Carousel
                                autoplay={false}
                                infinite
                            >
                                {this.state.dataimg.map(val => {
                                    return (

                                        <img key={val}
                                             src={val.url}
                                             alt=""
                                             style={{width: '100%', verticalAlign: 'top'}}
                                             onLoad={() => {
                                                 window.dispatchEvent(new Event('resize'));
                                                 this.setState({imgHeight: '375'});
                                             }}
                                        />

                                    )
                                })}
                            </Carousel>
                        </div>

                        <div className={content.price}>
                            <Price data={this.state.data}/>
                        </div>
                    </div>
                </ReactDocumentTitle>
            );
        }

    }
}

export default Content;