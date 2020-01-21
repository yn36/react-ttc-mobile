import React, {Component} from "react"

import ggcsscc from '../../css/content/ggcs.module.scss'

class Ggcs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        }

        // let data = []
        setTimeout(() => {
            // console.log(this.props.cansu)
            let data = []
            data.push(JSON.parse(JSON.stringify(this.props.cansu)))

            this.setState({
                data
            })
        }, 600)
    }

    render() {
        let {data} = this.state
        if (data.length > 0) {
            let cs = data[0].cs
            let xh = data[0].xh

            return (
                <div className={ggcsscc.ggcs}>
                    <div className={ggcsscc.package}>
                        <div className={ggcsscc.mod_tit_line}>
                            <h3>包装清单</h3>
                        </div>
                        <div className={ggcsscc.mod_row}>
                            {/*{this.props.cansu.qd}*/}
                            {data[0].qd}
                        </div>
                    </div>
                    <div className={ggcsscc.packto}>
                        <div className={ggcsscc.mod_tit_line}>
                            <h3>商品参数</h3>
                        </div>
                        <div className={ggcsscc.detParam}>
                            <table className={ggcsscc.param_table}>
                                <tbody>
                                <tr>
                                    {
                                        xh.map((item, index) => {
                                            return (
                                                <td key={index}>{item.bh}</td>
                                            )
                                        })
                                    }
                                </tr>
                                </tbody>
                                {
                                    cs.map((item, index) => {
                                        // console.log(item)
                                        return (
                                            <tbody key={index}>
                                            <tr className={ggcsscc.abctr}>
                                                <th className={ggcsscc.tdTitle}>{item.th}</th>
                                            </tr>
                                            {
                                                item.tr.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td className={ggcsscc.tdTitle}>{item.td1}</td>
                                                            <td>{item.td2}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                            </tbody>
                                        )
                                    })
                                }


                            </table>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div>请求失败。。。。。。。</div>
            )
        }
    }
}

export default Ggcs;