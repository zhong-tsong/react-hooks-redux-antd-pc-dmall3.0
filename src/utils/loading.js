import React from 'react';
import ReactDOM from 'react-dom';
import { Spin } from 'antd';
// 全局设置
import { $globalCloseTime } from '@config';

// 统计 - 当前正在请求的数量
let reqCount = 0;

// 显示loading
const showLoading = () => {

    if( !reqCount )  {
        let div = document.createElement('div');
        div.setAttribute('id', 'dm_loading');
        document.body.appendChild(div);
    
        ReactDOM.render(<Spin tip='加载中...' />, div);
    }
    reqCount++;

}

// 隐藏loading
const hideLoading = (func) => {
    
    setTimeout(() => {
        reqCount--;    
        if(!reqCount) {
            document.body.removeChild(document.getElementById('dm_loading'));
        }
    }, 500)
    
    setTimeout(() => {
        typeof func === 'function' && func();
    }, 500)

}

export default { showLoading, hideLoading }