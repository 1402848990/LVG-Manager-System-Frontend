import React from 'react';
import { Table, Input, Button, Modal, message } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, createFromIconfontCN } from '@ant-design/icons';
import styles from './index.scss';
import HostPie from './children/hostPie';
import CreateHostModal from './children/createHostModal';
import OperationLog from './children/operationLog';
import axios from '@/request/axiosConfig';
import api_host from '@/request/api/api_host';
import api_logs from '@/request/api/api_logs';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1721121_x0lgkipyqt.js'
});

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      loading: true,
      allHost: [],
      selected: []
    };
    this.operationLogs = React.createRef();
  }

  async componentDidMount() {
    await this.getAllHost();
  }

  /**
   * 批量开/关机
   */
  openOrCloseBatch = async type => {
    const res = await axios({
      url: type === 'open' ? api_host.openHostBatch : api_host.closeHostBatch,
      method: 'post',
      data: {
        ids: this.state.selected
      }
    });
    console.log('res', res);
    if (res.data.success) {
      // 执行成功
      const { id: uid } = JSON.parse(localStorage.getItem('userInfo'));
      // 操作日志写入
      this.saveOperation(
        uid,
        type === 'open' ? '开启' : '关闭',
        JSON.stringify(this.state.selected)
      );
      message.success(
        `${type === 'open' ? '开启' : '关闭'}--${
          res.data.data[0]
        }台主机--成功！`
      );
      await this.getAllHost();
      // 重新加载操作日志
      this.operationLogs.current.getOperationLogs();
    } else {
      // 执行失败
      message.success(`服务器错误！`);
    }
  };

  /**
   * 批量删除
   */
  deleteBatch = async () => {
    const res = await axios({
      url: api_host.deleteHostBatch,
      method: 'post',
      data: {
        ids: this.state.selected
      }
    });
    console.log('res', res);
    if (res.data.success) {
      // 操作日志写入
      const { id: uid } = JSON.parse(localStorage.getItem('userInfo'));
      this.saveOperation(uid, '删除', JSON.stringify(this.state.selected));
      message.success(`删除-${res.data.data}台主机成功！`);
      await this.getAllHost();
      // 重新加载操作日志
      this.operationLogs.current.getOperationLogs();
    } else {
      message.success(`服务器错误！删除失败！`);
    }
  };

  // 操作日志写入
  saveOperation = async (uid, type, hids, log) => {
    const res = await axios({
      url: api_logs.saveOperationLogs,
      method: 'post',
      data: {
        info: {
          uid,
          type,
          hids
        }
      }
    });
  };

  /**
   * 获取所有主机信息
   */
  getAllHost = async () => {
    await this.setState({
      loading: true
    });
    const { id: uid } = JSON.parse(localStorage.getItem('userInfo'));
    // 接口
    const res = await axios({
      url: api_host.getAllHost,
      method: 'post',
      data: {
        uid
      }
    });

    await this.setState({
      allHost: res.data.data,
      loading: false
    });
  };

  // 配置table选择项
  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      );
      // 选择项存到state中
      this.setState(
        {
          selected: selectedRowKeys
        },
        () => {
          console.log(this.state);
        }
      );
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User'
      // Column configuration not to be checked
      // id: record.id
    })
  };

  // 搜索
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type='primary'
          onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size='small'
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size='small'
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      )
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  closeModal = () => {
    this.setState({
      visible: false
    });
  };

  // 刷新操作日志
  refreshOperationLogs = () => {
    console.log(1);

    this.operationLogs.current.getOperationLogs();
  };

  render() {
    const { visible, allHost, loading } = this.state;
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        render: text => text.toString()
      },
      {
        title: '主机名',
        dataIndex: 'hostName',
        ...this.getColumnSearchProps('hostName'),
        render: (text, record) => (
          <a
            onClick={() => {
              this.props.history.push(`/hostDetail/${record.id}`);
            }}
          >
            {text}
          </a>
        )
      },
      {
        title: '系统',
        dataIndex: 'system',
        ...this.getColumnSearchProps('system'),
        render: text => (
          <>
            <IconFont
              style={{ color: '#1890ff', marginRight: '10px' }}
              type={
                text.includes('Windows')
                  ? 'iconwindows-copy'
                  : text.includes('CentOS')
                  ? 'iconicon_centos'
                  : 'iconicon_ubuntu'
              }
            />
            {text}
          </>
        )
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        // 排序
        sorter: (a, b) => {
          return a.createdAt - b.createdAt;
        },
        render: text => moment(text).format('YYYY-MM-DD HH:mm:ss')
      },
      {
        title: '带宽',
        dataIndex: 'netWidth',
        // 排序
        sorter: (a, b) => {
          return a.netWidth - b.netWidth;
        },
        render: text => `${text}M`
      },
      {
        title: '版本',
        dataIndex: 'version'
      },
      {
        title: '状态',
        dataIndex: 'state',
        filters: [
          {
            text: '正常',
            value: 1
          },
          {
            text: '关机',
            value: 0
          }
        ],
        onFilter: (value, record) => {
          return record.hostState === value;
        },
        render: text =>
          text === 1 ? (
            <span className={styles.ok}>正常</span>
          ) : text === 0 ? (
            <span className={styles.close}>关机</span>
          ) : (
            <span className={styles.warn}>告警</span>
          )
      }
    ];

    return (
      <div className={styles.hostList}>
        <div>
          {/* 创建主机Modal */}
          <CreateHostModal
            saveOperation={this.saveOperation}
            visible={visible}
            closeModal={this.closeModal}
            getAllHost={this.getAllHost}
            refreshOperationLogs={this.refreshOperationLogs}
          />
          <Button
            onClick={this.openOrCloseBatch.bind(this, 'close')}
            className={styles.batchButton}
            // type='primary'
            disabled={this.state.selected.length === 0}
          >
            批量关机
          </Button>
          <Button
            onClick={this.openOrCloseBatch.bind(this, 'open')}
            // style={{ backgroundColor: '#20a53a' }}
            className={styles.batchButton}
            type='primary'
            disabled={this.state.selected.length === 0}
          >
            批量开机
          </Button>
          <Button
            style={{ backgroundColor: '#20a53a' }}
            className={styles.batchButton}
            type='primary'
            ghost
            onClick={() => {
              this.setState({
                visible: true
              });
            }}
          >
            创建主机
          </Button>
          <Button
            onClick={this.deleteBatch}
            danger
            className={styles.batchButton}
            type='primary'
            disabled={this.state.selected.length === 0}
          >
            批量删除
          </Button>
          {/* 表格 */}
          <Table
            loading={loading}
            rowKey='id'
            rowSelection={{
              ...this.rowSelection
            }}
            className={styles.table}
            dataSource={allHost}
            columns={columns}
          />
        </div>
        {/* 主机状态扇形图 */}
        <HostPie allHost={allHost} />
        {/* 操作日志 */}
        <OperationLog ref={this.operationLogs} />
      </div>
    );
  }
}

export default withRouter(IndexPage);
