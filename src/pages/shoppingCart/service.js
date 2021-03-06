export default (key, _service) => {
    let obj = {
        // 获取购物车列表 - 数据
        async getSelectCartData() {
            const res = await _service.getSelectCartData({
                uname: sessionStorage.getItem('uname'),
                collection: 0
            });
            return res || {};
        },
        // 加入收藏
        async postAddCollectionData(ids = []) {
            const res = await _service.postAddCollectionData({                                
                uname: sessionStorage.getItem('uname'), 
                ids,
                collection: 1
            });
            return res || {};
        }
    }
    return function() {
        return typeof obj[key] === 'function' && obj[key].apply(this, arguments);
    }
}