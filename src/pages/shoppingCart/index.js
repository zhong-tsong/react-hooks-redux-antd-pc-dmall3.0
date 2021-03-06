import React, { useState, useEffect } from 'react';
import { Table, Typography, Row, Col, message, Button } from 'antd';
// 各种表头
import { columns } from './data';
// 接口服务
import service from './service';
// 数据
// import state from './state';
// less样式
import './index.less';

// ------------------------------------------ 我的购物车 ---------------------------------- //
// class MyShoppingCart extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             selectedRowKeys: [],
//             selectedRows: [],
//             cartId: [],
//             pidArr: []
//         };
//     }

//     // 结算
//     handleGoPay = () => {
//         const { selectedRows, pidArr } = this.state;
//         if( selectedRows.length ){
//             this.props.history.push({
//                 pathname: '/views/products/cart/settlement',
//                 state: {
//                     id: pidArr,
//                     type: 'cart'
//                 }
//             });
//         }else{
//             message.warning('请选择需要结算的商品！');
//         }
//     }

//     // 删除
//     handleDeleteProduct = () => {
//         const { cartId } = this.state;
//         if( cartId.length ){
//             state.delcartData(cartId);
//             this.setState(() => ({
//                 selectedRowKeys: [],
//                 selectedRows: []
//             }));
//         }else{
//             message.warning('请选择需要删除的商品！');
//         }
//     }

//     render() {
//         const { dataSource, allProductsSize } = state;
//     }
// }

export default ({ _url, _service, getCartNumData }) => {
    const [dataSource, setDataSource] = useState([]);
    const [checkedSize, setCheckedSize] = useState(0);
    const [totalSize, setTotalSize] = useState(0);
    const [sRowKeys, setSRowKeys] = useState([]);

    useEffect(() => {
        getSelectCartData();
    }, []);

    // 获取购物车商品
    const getSelectCartData = () => {
        service('getSelectCartData', _service)().then(res => {
            const { code, data=[] } = res.data ||{};
            code == 200 && setDataSource(data);
        });
    }

    // 当前购物车共有多少件商品
    const handleTotalSize = () => {
        if( !Array.isArray(dataSource) ) return 0;
        let _data = dataSource.reduce((total, current, index, arr) => {
            return total + current.num;
        }, 0)
        return _data || 0;
    }

    // 累加
    const computedSum = (data=[], key) => {
        return data.reduce((total, item, index, arr) => {
            return total + (item[key] || 0);
        }, 0);
    }

    // 选中行
    const rowSelection = {
        type: 'checkbox',
        onChange: (selectedRowKeys=[], selectedRows=[]) => {
            setSRowKeys(selectedRowKeys);
            // 计算被选中商品数量
            setCheckedSize( computedSum(selectedRows, 'num') );
            // 计算被选中商品总价
            setTotalSize( computedSum(selectedRows, 'totalprice') );
        }
    };

    // 表格底部按钮
    const footer = () => {
        return (
            <Row>
                <Col span={ 12 } className='left'>
                    <Button>批量删除</Button>
                    <Button onClick={ () => handleCollection(sRowKeys) }>批量加入收藏</Button>
                </Col>
                <Col span={ 12 } className='right'>
                    <span className='num'>已选择<i>{ checkedSize }</i>件商品</span>
                    <div>
                        总价：<span>¥{ totalSize.toFixed(2) }</span>
                    </div>
                    <span className='go-pay'>去结算</span>
                </Col>
            </Row>
        );
    }

    // 加入收藏
    const handleCollection = (data = []) => {
        if( !data.length ) return message.warning('请选择需要收藏的商品！');
        service('postAddCollectionData', _service)(data).then(res => {
            const { code } = res.data ||{};
            if( code == 200 ) {
                getSelectCartData();
                getCartNumData();
            }
        });;
    }

    return (
        <div className='common_width dm_shoppingCart'>
            <Row className='table_title'>
                <Typography.Title level={ 4 }>我的购物车</Typography.Title>
                <div>（当前购物车共有 <i>{ handleTotalSize() }</i> 件商品）</div>
            </Row>
            <Table 
                columns={ columns(_url, handleCollection) } 
                dataSource={ dataSource } 
                pagination={ false }
                scroll={{ x: false, y: 330 }}
                size='small'
                footer={ footer }
                bordered
                rowSelection={ rowSelection }
                rowKey={ (record) => record.id }
            />
        </div>
    );
};