import React, {Component} from "react"
import {Grid} from 'antd-mobile';

import girdcss from '../../css/home.module.scss'

class Griditem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            griddata: ["超市", "进口", "服装城", "生鲜", "淘到家", "充值中心", "惠赚钱", "领券", "物流查询", "领淘豆", "全球购", "唯品会", "旅行", "全部"].map((_val, i) => ({
                icon: `/static/images/grid/nav${i}.png`,
                text: _val
            }))
        };

    }

    render() {
        return (
            <div className={girdcss.gridbox}>
                <div className={girdcss.grid}>
                    <Grid data={this.state.griddata} hasLine={false} columnNum={5} onClick={_el => console.log(_el)}/>
                </div>
            </div>
        );
    }
}

export default Griditem;