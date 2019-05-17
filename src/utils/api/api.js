var ENV = "test"; // 控制开关,test：开发环境，master：正式环境时
export default{
    pathUrl: function () {
        var URLS = {
            test:{
                domain: '/apiTest'
            },
            prod: {
                domain: 'https://blog.dulaoshi.club'
            }
        }
        return URLS[ENV];
    }
}
