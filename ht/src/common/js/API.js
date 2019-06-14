
// var urlApi='/api/'
var urlApi='/'


var login =urlApi+'login'
var exit=urlApi+'exit'
// 添加管理员
var addManager=urlApi+'addManage'
// 查询管理员
var findManage =urlApi+'findManage'
// 删除
var delManage  =urlApi+'delManage'
// 跟新
var updateManage =urlApi+'updateManage'


// 用户
var addUser  =urlApi+'addUser'
var findUser =urlApi+'findUser'
var delUser =urlApi+'delUser'
var updateUser =urlApi+'updateUser'

// 通知
var addNews  =urlApi+'addNews'
var findNews =urlApi+'findNews'
var delNews =urlApi+'delNews'
var updateNews =urlApi+'updateNews'


var addDevice  =urlApi+'addDevice'
var findDevice =urlApi+'findDevice'
var delDevice =urlApi+'delDevice'
var updateDevice =urlApi+'updateDevice'

export default{
    login,
    addManager,
    findManage,
    delManage,
    updateManage,

    addUser,
    findUser,
    delUser,
    updateUser,

    addNews,
    findNews,
    delNews,
    updateNews,

    addDevice,
    findDevice,
    delDevice,
    updateDevice,

    exit

}