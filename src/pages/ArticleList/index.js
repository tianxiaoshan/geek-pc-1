import React, { useEffect, useState } from 'react'
import {
  Card,
  Breadcrumb,
  Form,
  Radio,
  Button,
  Select,
  DatePicker,
  Table,
  Tag,
  Space,
  message,
  // ConfigProvider,
} from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { channelsId } from '../../store/actions/channels'
import defaultImage from '../../assets/images/defaultImage.png'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import { getArticle } from 'store/actions/article'
import { delArt } from '../../store/actions/del'
const { Option } = Select
const { RangePicker } = DatePicker
export default function ArticleList() {
  const dispatch = useDispatch()
  const channelsID = useSelector((sate) => sate.channels)
  const articleList = useSelector((state) => state.article)
  // console.log(articleList)
  const { total_count, results, per_page, page } = articleList
  const [pageValue, setPageValue] = useState({ per_page: 10, page: 1 })
  //   console.log(channelsID)
  const ArticleStatus = [
    { id: -1, name: '全部', color: 'volcano' },
    { id: 0, name: '草稿', color: 'orange' },
    { id: 1, name: '待审核', color: 'gold' },
    { id: 2, name: '审核通过', color: 'green' },
    { id: 3, name: '审核失败', color: 'red' },
  ]
  const onFinish = ({ status, channels_id, date }) => {
    if (status !== -1) {
      setPageValue({
        status: status,
      })
    } else {
      delete pageValue.status
    }
    if (channels_id !== undefined) {
      setPageValue({
        status: channels_id,
      })
    } else {
      delete pageValue.channels_id
    }
    if (date) {
      setPageValue({
        begin_pubdate: date[0].startOf('day').format('YYYY-MM-DD HH:mm:ss'),
        end_pubdate: date[1].startOf('day').format('YYYY-MM-DD HH:mm:ss'),
      })
    } else {
      delete pageValue.begin_pubdate
      delete pageValue.end_pubdate
    }
    pageValue.per_page = 1
    dispatch(getArticle())
  }
  useEffect(() => {
    dispatch(channelsId())
    dispatch(getArticle(pageValue))
  }, [pageValue, dispatch])

  const delart = async (id) => {
    console.log(id, '删除')
    await dispatch(delArt(id))
    dispatch(getArticle())
    message.success('删除成功', 1)
  }
  const columns = [
    {
      title: '封面',
      render: (data) => {
        if (data.cover.type === 0) {
          return <img src={defaultImage} alt="" width={200} height={150} />
        }
        return (
          <img src={data.cover.images[0]} alt="" width={200} height={150} />
        )
      },
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (status) => {
        const obj = ArticleStatus.find((item) => item.id === status)
        // console.log(obj)
        return (
          <div>
            {/* color={obj.color} */}
            <Tag>{obj.name}</Tag>
          </div>
        )
      },
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate',
    },
    {
      title: '阅读数',
      dataIndex: 'read_count',
    },
    {
      title: '评论数',
      dataIndex: 'comment_count',
    },
    {
      title: '点赞数',
      dataIndex: 'like_count',
    },
    {
      title: '操作',
      render: (data) => {
        return (
          <Space>
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
            <Button
              type="primary"
              shape="circle"
              danger
              icon={<DeleteOutlined />}
              onClick={() => delart(data.id)}
            />
          </Space>
        )
      },
    },
  ]

  const onChangePage = (per_page, page) => {
    setPageValue({ per_page: per_page, page: page })
  }
  return (
    <>
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
          <Form.Item label="日期" name="date">
            {/* <ConfigProvider locale={locale}> */}
            <RangePicker locale={locale} />
            {/* </ConfigProvider> */}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title={`根据筛选条件共查询到${total_count}条结果:`}>
        <Table
          columns={columns}
          dataSource={results}
          rowKey="id"
          pagination={{
            position: ['bottomCenter'],
            total: total_count,
            pageSize: per_page,
            current: page,
            onChange: onChangePage,
          }}
        />
      </Card>
    </>
  )
}
