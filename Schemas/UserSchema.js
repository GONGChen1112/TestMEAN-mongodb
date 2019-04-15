var mongoose = require('mongoose');
var UserSchema =new mongoose.Schema({
    //定义数据模型
    name:String,
    pwd:String
});
// 将这个User Schema,发布为Model,第一个参数为数据库的一个集合（表），没有 会自动创建
var model=mongoose.model('u2',UserSchema);
module.exports =model;