import React, { useEffect } from 'react'
import { Card, Breadcrumb, Form, Button, Space, Input, Select } from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { channelsId } from '../../store/actions/channels'

export default function ArticlePublish() {
  const channelsID = useSelector((sate) => sate.channels)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(channelsId())
  }, [dispatch])
  const onFinish = (values) => {
    console.log(values)
  }
  return (
    <Card
      title={
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/home"> 首页</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>发布文章</Breadcrumb.Item>
        </Breadcrumb>
      }
    >
      <Form
        labelCol={{ span: 4 }}
        validateTrigger={['onChange', 'onBlur']}
        onFinish={onFinish}
      >
        <Form.Item
          label="标题"
          rules={[{ required: true, message: '文章标题不能为空!' }]}
          name="title"
        >
          <Input style={{ width: 304 }} placeholder="请输入文章标题"></Input>
        </Form.Item>
        <Form.Item
          label="频道"
          name="channels_id"
          rules={[{ required: true, message: '请输入频道!' }]}
        >
          <Select style={{ width: 200 }} placeholder="请选择频道">
            {channelsID.map((item) => (
              <Select.Option key={item.id}>{item.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="封面"></Form.Item>
        <Form.Item label="内容"></Form.Item>
        <Form.Item wrapperCol={{ offset: 4 }}>
          <Space>
            <Button type="primary" htmlType="submit" size="large">
              发布文章
            </Button>
            <Button size="large">存入草稿</Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  )
}
