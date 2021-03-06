import React, { useState, useEffect } from 'react';
import { Card, Typography } from 'antd';
import { Link } from 'react-router-dom';
// less样式
import './index.less';

const { Meta } = Card;
const { Title } = Typography;
// ------------------------------------------------- 首页 - 热门推荐 -------------------------------- //
export default (props) => {
    
    const [productsList, setProductsList] = useState([]);

    useEffect(() => {
        getHotData();
    }, []);
    
    // 获取热门推荐 - 数据
    const getHotData = async () => {
        const res = await props._service.getHotData();
        try{
            if( res.data.code === 200 ){
                const { data=[] } = res.data || {};
                setProductsList(data);
            }
        }catch(err) {
            console.log(err);
        }
    };
    
    return (
        <div className='dm_hot'>
            <div className='dm_hot__title'>热门推荐</div>
            <div className='dm_hot__content'>
                <div className='common_width'>
                    {
                        productsList.map( item => {
                            return (
                                <Card
                                    key={ item.id }
                                    bordered={ false }
                                    cover={
                                        <img
                                            alt=''
                                            src={ `${ props._url }${ item.mainPicture }` }
                                            title={ item.productName }
                                            onClick={() => props.history.push(`/products/detail/${item.id}`)}
                                        />
                                    }
                                >
                                    <Meta
                                        title={ <Title level={ 4 }><span className='unit'>￥</span>{ item.price ? Number(item.price).toFixed(2) : 0 }</Title> }
                                        description={ 
                                            <Link 
                                                to={`/products/detail/${item.id}`}
                                                title={ item.description }
                                            >{ props._ellipsis(item.description, 50) }</Link> 
                                        }
                                    />
                                </Card>
                            );
                        } )
                    }
                </div>
            </div>
        </div>
    )
};