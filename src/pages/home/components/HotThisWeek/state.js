import { action, observable } from 'mobx';
// 接口服务
import service from './service';

class State {

    // 本周热门商品列表
    @observable productsList = [];
    @action setProductsList = (data = []) => {
        this.productsList = data;
    }

    // 查询本周热门商品
    productsListData = async () => {
        const res = await service.productsListData();
        try{
            if( res.data.code === 200 ){
                res.data.data && this.setProductsList( res.data.data );
            }
        }catch(err) {
            console.log(err);
        }
    }
}

export default new State();