const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');

app.use(bodyParser.json({type:'application/json'}));
app.use(bodyParser.urlencoded({extended:true}));


const db = mysql.createConnection({
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    password:'2273ulabula',
    database:'heyum'
});

db.connect();

app.listen(3210, ()=>{
    console.log('Always my eyes on here');
});

app.post('/submit', function(req, res){
	console.log(req.body); 
    var data = {
        email: req.body.email, 
        name: req.body.name,
        check1: req.body.check1,
        check2: req.body.check2,
        check3: req.body.check3,
        kakaoCode: req.body.kakaoCode
    };
    var sql = 'INSERT INTO userInfo SET ?';
    db.query(sql, data, (err, result)=>{
        if(err){
            throw err;
        }else{
            res.send(result);
        } 
    });
});

app.post('/fetchUserCode', function(req, res){
    var data = {
        kakaoCode: req.body.kakaoCode 
    };
    var sql = `SELECT userCode FROM userInfo WHERE kakaoCode = '${data.kakaoCode}'`;
    db.query(sql, data, (err, result)=>{
        if(err){
            throw err;
        }else{
            console.log(result);
            res.send(result);
        } 
    });
});

/*app.post('/searchNick', function(req, res){
    var data = {
        nickName: req.body.checkNick 
    };
    var sql = `SELECT nickName FROM userinfo WHERE nickName = '${data.nickName}'`;
    db.query(sql, data, (err, result)=>{
        if(err){
            throw err;
        }else{
            console.log(result);
            res.send(result);
        } 
    });
});*/

/*app.post('/changeProfileImg', function(req, res){
    var data = {
        img: req.body.img
    };
    console.log(data.img);
    var sql = `UPDATE userinfo SET img = '${data.img}' WHERE name = '최기환'`;
    db.query(sql, data, (err, result)=>{
        if(err){
            throw err;
        }else{
            console.log(result);
        } 
    });
});*/

app.post('/askSubmit', function(req, res){
	console.log(req.body); 
    var data = {
        writerCode: req.body.userCode,
        name: req.body.name, 
        content: req.body.contents,
        datetime: req.body.datetime
    };
    var sql = 'INSERT INTO ask SET ?';
    db.query(sql, data, (err, result)=>{
        if(err) throw err;
        console.log(result);
    });
});

app.post('/commentSubmit', function(req, res){
	console.log(req.body); 
    var data = {
        askCode2: req.body.askCode2,
        content: req.body.contents,
        datetime: req.body.datetime,
        name: req.body.name,
        writerCode2: req.body.userCode,

    };
    var sql = 'INSERT INTO answer SET ?';
    db.query(sql, data, (err, result)=>{
        if(err) throw err;
        console.log(result);
    });
});

app.post('/checkKakao', function(req, res){
    var data = {
        kakaoCode: req.body.kakaoCode 
    };
    var sql = `SELECT kakaoCode FROM userInfo WHERE kakaoCode = '${data.kakaoCode}'`;
    db.query(sql, data, (err, result)=>{
        if(err){
            throw err;
        }else{
            console.log(result);
            res.send(result);
        } 
    });
});