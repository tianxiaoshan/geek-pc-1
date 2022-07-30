import React from 'react'
import { Layout, Menu, Popconfirm, message } from 'antd'
import {
  LogoutOutlined,
  HomeOutlined,
  ControlOutlined,
  BookOutlined,
} from '@ant-design/icons'
import styles from './index.module.scss'
import { Route, Switch, Link, useHistory } from 'react-router-dom'
import Home from '../Home'
import ArticleList from '../ArticleList'
import ArticlePublish from '../ArticlePublish'
import { removeTokenInfo } from '../../utils/storage'
import { useLocation } from 'react-router-dom'


const { Header, Content, Sider } = Layout
const LayoutCom = () => {
  const location = useLocation()
  const history = useHistory()

  const confirm = () => {
    removeTokenInfo()
    history.push('/login')
    message.success('退出成功')
  }
  return (
    <div className={styles.layout}>
      <Layout>
        <Header className="header">
          <div className="logo" />
          <div className="profile">
            <span>用户名</span>
            <span>
              {' '}
              <Popconfirm
                title="你确定要退出吗？"
                onConfirm={confirm}
                okText="确认"
                cancelText="取消"
              >
                <LogoutOutlined /> 退出
              </Popconfirm>
            </span>
          </div>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={[location.pathname]}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <Menu.Item key="/home" icon={<HomeOutlined />}>
                <Link to="/home"> 数据概览</Link>
              </Menu.Item>
              <Menu.Item key="/home/list" icon={<ControlOutlined />}>
                <Link to="/home/list"> 内容管理</Link>
              </Menu.Item>
              <Menu.Item key="/home/publish" icon={<BookOutlined />}>
                <Link to="/home/publish">发布文章</Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: ' 24px' }}>
            <Content className="site-layout-background">
              <Switch>
                <Route exact path="/home" component={Home}></Route>
                <Route path="/home/list" component={ArticleList}></Route>
                <Route path="/home/publish" component={ArticlePublish}></Route>
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
      ,
    </div>
  )
}
export default LayoutCom
