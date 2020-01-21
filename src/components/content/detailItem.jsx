import React, {Component} from "react"
import pricecss from '../../css/content/price.module.scss'

class DetailItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            index: 0,
            value: "",
            type: 0,
            apiid: "a000"

        };
        this.item = this.props.item[0]


    }

    toParent = () => {
        // console.log(this.props.parent.getChildrenMsg.bind(this, this.state.msg))
        // this.props.parent.getChildrenMsg(this, this.state.msg)

    }

    render() {
        // let {colour, versions, gmfs} = this.state
        return (
            <div className={pricecss.popupSkuArea}>
                <div className={pricecss.sku_kind}>{this.item.title}</div>
                <div className={pricecss.sku_choose}>
                    {this.item.xz.map((item, index) => {
                        return (
                            <span className={this.state.index === index ? "active" : ''}
                                  key={index}
                                  onClick={(event) => this.changeIndex(event, index, this.item.id)}
                            >
                                {item.title}
                            </span>
                        )
                    })}
                </div>
            </div>
        );
    }

    changeIndex = (event, index, id) => {
        // 子组件传父组件

        let obj = {
            value: event.currentTarget.innerHTML,
            type: id,
            apiindex: index
        }
        this.setState(obj, () => {
            this.props.parent.getChildrenMsg(this, obj)
        })

        this.setState({
            index,
        })
    }
}

export default DetailItem;