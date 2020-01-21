import React, {Component} from "react"
import {ListView} from 'antd-mobile';
import {Link} from "react-router-dom";
import axios from 'axios'

import listcss from '../../../css/home.module.scss'

let data = [];

let url = '/static/data/recommend.json'
axios.get(url)
    .then(res => {
        data = res.data.recommend
    })

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


class Item extends Component {
    constructor(props) {
        super(props);

        const dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        });

        this.state = {
            dataSource,
            isLoading: true,
        };

    }

    componentDidMount() {
        setTimeout(() => {
            this.rData = genData();
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this.rData),
                isLoading: false,
            });
        }, 500);
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


    render() {
        let index = data.length - 1;
        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = data.length - 1;
            }
            const obj = data[index--];
            return (
                <li className={listcss.list}>
                    <Link to={{
                        pathname: `/content/${obj.t}`,
                        search: `?name=${obj.t}`
                    }}>
                        <div className={listcss.listimg}>
                            <img src={obj.url} alt=""/>
                        </div>
                        <span
                            className={listcss.listtitle}>{obj.title}</span>
                        <p className={listcss.listinfo}>
                            <span className={listcss.listinfosp}>
                                ¥
                                <span className={listcss.listpro}>{obj.pro}</span>
                            </span>
                        </p>
                        <p className={listcss.listci}></p>
                    </Link>
                </li>
            );
        };
        return (
            <ListView
                ref={el => this.lv = el}
                dataSource={this.state.dataSource}
                renderFooter={() => (
                    <div style={{padding: 0, textAlign: 'center', color: "#fff"}}>
                        {this.state.isLoading ? "Loaded......" : 'Loaded'}
                    </div>
                )}
                initialListSize={8}
                renderRow={row}
                className={["am-list", listcss.listbox].join(' ')}
                pageSize={4}
                useBodyScroll
                scrollRenderAheadDistance={200}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={10}
            />
        );
    }
}

export default Item;