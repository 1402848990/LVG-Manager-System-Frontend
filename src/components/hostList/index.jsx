import React from 'react';
import { Table, Input, Button, Modal } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, createFromIconfontCN } from '@ant-design/icons';
import styles from './index.scss';
import HostPie from './children/hostPie';
import CreateHostModal from './children/createHostModal';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1721121_x0lgkipyqt.js'
});

const data = [
  {
    id: 101,
    system: 'Windows Server 2008 R2',
    hostName: '主机1',
    createdAt: '2020-03-21',
    netWidth: 5,
    hostState: 1
  },
  {
    id: 102,
    system: 'CentOS',
    hostName: '主机2',
    createdAt: '2020-04-21',
    netWidth: 10,
    hostState: 0
  },
  {
    id: 103,
    system: 'Ubuntu',
    hostName: '主机3',
    createdAt: '2020-03-25',
    netWidth: 20,
    hostState: 1
  }
];

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

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

  render() {
    const { visible } = this.state;
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id'
      },
      {
        title: '主机名',
        dataIndex: 'hostName',
        ...this.getColumnSearchProps('hostName')
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
            {text}12
          </>
        )
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        // 排序
        sorter: (a, b) => {
          return a.createdAt - b.createdAt;
        }
      },
      {
        title: '带宽',
        dataIndex: 'netWidth',
        // 排序
        sorter: (a, b) => {
          console.log('a', a, 'b', b);
          return a.netWidth - b.netWidth;
        }
      },
      {
        title: '状态',
        dataIndex: 'hostState',
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
          console.log(value, record);
          return record.hostState === value;
        },
        render: text =>
          text === 1 ? (
            <span className={styles.ok}>正常</span>
          ) : (
            <span className={styles.close}>关机</span>
          )
      }
    ];
    return (
      <div className={styles.hostList}>
        <div>
          {/* 创建主机Modal */}
          <CreateHostModal visible={visible} closeModal={this.closeModal} />
          <Button danger className={styles.batchButton} type='primary'>
            批量删除
          </Button>
          <Button className={styles.batchButton} type='primary'>
            批量关机
          </Button>
          <Button
            style={{ backgroundColor: '#20a53a' }}
            className={styles.batchButton}
            type='primary'
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
          <Table className={styles.table} dataSource={data} columns={columns} />
        </div>
        <HostPie />
      </div>
    );
  }
}

export default IndexPage;
