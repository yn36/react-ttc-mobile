import React, {Component} from "react"

class Product extends Component {
    constructor(props) {
        super(props);

        this.state = {};

    }

    render() {
        let {img} = this.props
        // console.log(img)
        // let data = null
        // setTimeout(() => {
        //     data = JSON.parse(JSON.stringify(img))
        // }, 500)
        if (img) {
            return (
                <div style={{width: "100%", textAlign: "center"}}>
                    {
                        img.map((item, index) => {
                            // console.log(item)
                            return (
                                <img key={index} style={{width: "100%"}} src={item.img} alt=""/>
                            )
                        })
                    }
                </div>
            );
        }else{
            return (
                <div>请求失败。。。。。。</div>
            )
        }

    }
}

export default Product;