import React, { useEffect, useState } from 'react'
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Space,
  Input,
  Select,
  Radio,
  Upload,
  Modal,
  message,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { channelsId } from '../../store/actions/channels'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import styles from './index.module.scss'
import { uploadArticle } from '../../store/actions/uploadarts'

export default function ArticlePublish() {
  const channelsID = useSelector((sate) => sate.channels)
  const [imgType, setImgType] = useState(0)
  const [fileList, setFileList] = useState([])
  const [imgUrl, setImgUrl] = useState('')
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(channelsId())
  }, [dispatch])
  const onFinish = (values) => {
    if (fileList.length !== imgType) {
      return message.warn('上传的图片数量不正确')
    }
    const images = fileList.map((item) => {
      return item.url || item.response.data.url
    })
    const { type } = values
    dispatch(
      uploadArticle({
        ...values,
        cover: {
          type,
          images,
        },
      })
    )
  }
  const onChange = (e) => {
    setImgType(e.target.value)
    setFileList([])
  }
  const uploadChange = ({ fileList }) => {
    setFileList(fileList)
  }
  const handlePreview = (file) => {
    const url = file.url || file.response.data.url
    setVisible(true)
    setImgUrl(url)
  }
  const handleCancel = () => {
    setVisible(false)
  }
  const beforeUpload = (file) => {
    // console.log(file)
    if (file.size >= 1024 * 500) {
      message.warn('上传的文件不能超过500kb')
      return Upload.LIST_IGNORE
    }
    if (!['image/png', 'image/jpeg'].includes(file.type)) {
      message.warn('只能上传jpg或者png的图片')
      return Upload.LIST_IGNORE
    }
  }
  return (
    <Card
      className={styles.root}
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
        initialValues={{ content: '', type: imgType }}
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
        <Form.Item label="封面" name="type">
          <Radio.Group onChange={onChange}>
            <Radio value={1}>单图</Radio>
            <Radio value={3}>三图</Radio>
            <Radio value={0}>无图</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4 }}>
          {' '}
          {imgType !== 0 && (
            <Upload
              name="image"
              listType="picture-card"
              fileList={fileList}
              action="http://toutiao.itheima.net/v1_0/upload"
              onChange={uploadChange}
              onPreview={handlePreview}
              beforeUpload={beforeUpload}
            >
              {fileList.length < imgType && <PlusOutlined />}
            </Upload>
          )}
          <Modal
            visible={visible}
            title={'图片预览'}
            footer={null}
            onCancel={handleCancel}
          >
            <img alt="example" style={{ width: '100%' }} src={imgUrl} />
          </Modal>
        </Form.Item>
        <Form.Item
          label="内容"
          name="content"
          rules={[{ required: true, message: '编辑内容不能为空' }]}
        >
          <ReactQuill
            theme="snow"
            placeholder="文章的编辑内容不能为空"
          ></ReactQuill>
        </Form.Item>
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
