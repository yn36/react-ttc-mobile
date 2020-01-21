import React, {Component} from "react"
import {ListView} from 'antd-mobile';
import {Link} from "react-router-dom";
import axios from 'axios'
import ReactDocumentTitle from 'react-document-title'

// import listcss from '../../css/home.scss'
import list from '../../css/list/list2.module.scss'
import listcs from '../../css/list/list.module.scss'
import Topbar from "../topbar";


const NUM_ROWS = 8;
let pageIndex = 0;

function genData(pIndex = 0) {
    const dataBlob = {};
    for (let i = 0; i < NUM_ROWS; i++) {
        const ii = (pIndex * NUM_ROWS) + i;
        dataBlob[`${ii}`] = `row - ${ii}`;
    }
    return dataBlob;
}

class List extends Component {
    constructor(props) {
        super(props);

        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource,
            isLoading: true,
            data: [],
            css: list
        };

        let win = window.location.href.split("/")[5]
        let url = `/static/data/list/${win}.json`
        axios.get(url)
            .then(res => {
                this.setState({
                    data: res.data.top
                })
            })
            .catch(res => {
                this.setState({
                    data: []
                })
            })
    }

    componentDidMount() {
        setTimeout(() => {
            this.rData = genData();
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            });
        }, 600);

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

    onEndReached = (event) => {
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        this.setState({isLoading: true});
        setTimeout(() => {
            this.rData = {...this.rData, ...genData(++pageIndex)};
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            });
        }, 500);
    }

    bott = () => {
        let {css} = this.state
        if (css === list) {
            this.setState({
                css: listcs
            })
        } else {
            this.setState({
                css: list
            })
        }
    }

    listitem = () => {
        let {data} = this.state
        let index = data.length - 1;
        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = data.length - 1;
            }
            // const obj = data[index--];
            return (
                <li className={this.state.css.listulli}>

                    {
                        this.state.data.map((item, index) => {
                            // console.log(item)
                            return (
                                <Link key={index} className={this.state.css.lia}
                                      to={{
                                          pathname: `/content/${item.t}`,
                                          search: `?name=${item.t}`
                                      }}>
                                    <div className={this.state.css.content}>
                                        <div className={this.state.css.contentimg}>
                                            <img src={item.url} alt=""/>
                                        </div>

                                        <div className={this.state.css.contentfloor}>
                                            <div className={this.state.css.title}>
                                                <p>{item.title}</p>
                                            </div>
                                            <div className={this.state.css.biaoqian}>
                                                {
                                                    item.biaoqian.map((item, index) => {
                                                        return (
                                                            <span key={index}>{item.obj}</span>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <div className={this.state.css.price}>
                                                <p>
                                                    ¥
                                                    <span>{item.price}</span>
                                                    .00
                                                </p>
                                            </div>
                                            <div className={this.state.css.mian}>
                                                <i>
                                                    <img src={item.geshi} alt=""/>
                                                </i>
                                                <span className={this.state.css.comments}>
                                                <span>{item.pl}</span>
                                                条评价
                                            </span>
                                                <span className={this.state.css.comments}>
                                                好评率
                                                <span>{item.pll}</span>
                                            </span>
                                            </div>
                                            <div className={this.state.css.floor}>
                                                <span>小米自营旗舰店</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </li>

            );
        };
        if (this.state.data) {
            return (
                <ListView
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                    renderFooter={() => (
                        <div style={{padding: 0, textAlign: 'center'}}>
                            {this.state.isLoading ? "Loaded......" : '获取失败'}
                        </div>
                    )}
                    initialListSize={20}
                    renderRow={row}
                    className={["am-list"].join(' ')}
                    pageSize={1}
                    useBodyScroll
                    scrollRenderAheadDistance={200}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={10}
                />
            )
        }
    }

    render() {
        return (
            <ReactDocumentTitle title='淘商城移动端-列表页'>
            <div className={this.state.css.list}>
                <div ref='topbar' className={this.state.css.topbar}>
                    <Topbar search={this.props.location.search}/>
                </div>
                <div className={this.state.css.listBox}>
                    <ul className={this.state.css.listboxul}>
                        {this.listitem()}
                    </ul>
                </div>

                <div onClick={this.bott} className={this.state.css.bott}>
                    <span href=""></span>
                </div>
            </div>
            </ReactDocumentTitle>
        );
    }
}

export default List;