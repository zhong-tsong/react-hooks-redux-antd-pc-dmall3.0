// 获取 - 商品详情
export const getDetailsData = (_service) => (async (obj={}) => {
    const res = await _service.getDetailsData(obj);
    try{
        if( res.data.code === 200 ){
            const { basicInfo={}, imgList=[], params={}, specs=[], detailsPic=[] } = res.data.data || {};
            return { basicInfo, imgList, params, specs, detailsPic };
        }
    }catch(err) {
        console.log(err);
    }
})