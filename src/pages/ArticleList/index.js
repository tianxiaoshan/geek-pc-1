import React, { useEffect } from 'react'
import { Card, Breadcrumb, Form, Radio, Button, Select } from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { channelsId } from '../../store/actions/channels'
const { Option } = Select
export default function ArticleList() {
  const dispatch = useDispatch()
  const channelsID = useSelector((sate) => sate.channels)
  //   console.log(channelsID)
  const ArticleStatus = [
    { id: -1, name: '全部' },
    { id: 0, name: '草稿' },
    { id: 1, name: '待审核' },
    { id: 2, name: '审核通过' },
    { id: 3, name: '审核失败' },
  ]
  const onFinish = (values) => {
    console.log(values)
  }
  useEffect(() => {
    dispatch(channelsId())
  }, [dispatch])

  return (
    <Card
      title={
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/home"> 首页</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item> 内容管理</Breadcrumb.Item>
        </Breadcrumb>
      }
    >
      <Form onFinish={onFinish} initialValues={{ status: -1 }}>
        <Form.Item label="状态" name="status">
          <Radio.Group>
            {ArticleStatus.map((item) => (
              <Radio value={item.id} key={item.id}>
                {item.name}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
        <Form.Item label="频道" name="channels_id">
          <Select style={{ width: 200 }} placeholder="请选择频道">
            {channelsID.map((item) => (
              <Option key={item.id}>{item.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}
