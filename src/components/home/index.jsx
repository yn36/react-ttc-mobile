import React, {Component} from "react"
import {withRouter, Switch, Route} from "react-router-dom";
import {TabBar} from 'antd-mobile';

// 组件
import Home from './home'
import Sort from "./sort/sort";
import About from "../about";


class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTab: "/" + [window.location.href.split("/")[4], window.location.href.split("/")[5]].join("/"),
            hidden: false,
            fullScreen: false,
        };
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        // console.log(nextState.selectedTab)
        if (nextState.selectedTab === ("/" + [window.location.href.split("/")[4], window.location.href.split("/")[5]].join("/"))) {
            return
        } else {
            this.setState({
                selectedTab: "/" + [window.location.href.split("/")[4], window.location.href.split("/")[5]].join("/"),
            })
        }
    }

    render() {
        let sum = window.$store.getState()
        // sum ? sum.length : 0
        let a = sum ? sum.length : 0
        return (
            <div style={{width: "100%", height: "100%"}}>
                <Switch>
                    {/*{ 首页组件 }*/}
                    <Route exact path="/home/home" component={Home}/>

                    {/*首页的分类页*/}
                    <Route exact path="/home/sort" component={Sort}/>
                    <Route exact path='/home/about' component={About}/>
                </Switch>
                <div style={{
                    position: 'fixed',
                    width: '100%',
                    bottom: 0,
                    zIndex: '999'
                }}>
                    <TabBar
                        unselectedTintColor="#949494"
                        tintColor="#e4308d"
                        barTintColor="white"
                        tabBarPosition="bottom"
                        noRenderContent
                        hidden={this.state.hidden}
                    >
                        <TabBar.Item
                            title="首页"
                            key="Life"
                            icon={<div style={{
                                width: '22px',
                                height: '22px',
                                background: `url("/static/images/home/home.svg") center center /  22px 22px no-repeat`
                            }}
                            />
                            }
                            selectedIcon={<div style={{
                                width: '22px',
                                height: '22px',
                                background: 'url("/static/images/home/home1.svg") center center /  22px 22px no-repeat'
                            }}
                            />
                            }
                            selected={this.state.selectedTab === '/home/home'}
                            onPress={() => {
                                this.setState({
                                    selectedTab: '/home/home',
                                });
                                // console.log(this)
                                this.props.history.push('/home/home')
                            }}
                            data-seed="logId"
                        >
                        </TabBar.Item>

                        <TabBar.Item
                            icon={
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: 'url(/static/images/home/sort.svg) center center /  22px 22px no-repeat'
                                }}
                                />
                            }
                            selectedIcon={
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: 'url(/static/images/home/sort1.svg) center center /  22px 22px no-repeat'
                                }}
                                />
                            }
                            title="分类"
                            key="Koubei"
                            selected={this.state.selectedTab === '/home/sort'}
                            onPress={() => {
                                this.setState({
                                    selectedTab: '/home/sort',
                                });
                                this.props.history.push('/home/sort')
                            }}
                            data-seed="logId1"
                        >
                        </TabBar.Item>
                        <TabBar.Item
                            icon={
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: 'url(/static/images/home/gwc.svg) center center /  22px 22px no-repeat'
                                }}
                                />
                            }
                            selectedIcon={
                                <div style={{
                                    width: '22px',
                                    height: '22px',
                                    background: 'url(/static/images/home/gwc1.svg) center center /  22px 22px no-repeat'
                                }}
                                />
                            }
                            title="购物车"
                            badge={a}
                            key="Friend"
                            selected={this.state.selectedTab === '/shoppingcar'}
                            onPress={() => {
                                this.setState({
                                    selectedTab: '/shoppingcar',
                                });
                                this.props.history.push('/shoppingcar')
                            }}
                        >
                        </TabBar.Item>
                        {
                            window.localStorage.tscusernamelogin ? (
                                <TabBar.Item
                                    icon={{uri: '/static/images/home/my.svg'}}
                                    selectedIcon={{uri: '/static/images/home/my1.svg'}}
                                    title="我的"
                                    key="my"
                                    selected={this.state.selectedTab === '/home/about'}
                                    onPress={() => {
                                        this.setState({
                                            selectedTab: '/home/about',
                                        });
                                        this.props.history.push('/home/about')
                                    }}
                                >
                                </TabBar.Item>
                            ) : (
                                <TabBar.Item
                                    icon={{uri: '/static/images/home/my.svg'}}
                                    selectedIcon={{uri: '/static/images/home/my1.svg'}}
                                    title="未登陆"
                                    key="my"
                                    selected={this.state.selectedTab === '/login'}
                                    onPress={() => {
                                        this.setState({
                                            selectedTab: '/login',
                                        });
                                        this.props.history.push('/login')

                                    }}
                                >
                                </TabBar.Item>
                            )
                        }
                    </TabBar>
                </div>
            </div>
        )
    }
}


export default withRouter(Index);