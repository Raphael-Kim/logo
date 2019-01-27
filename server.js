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

app.listen(1219, ()=>{
    console.log('Always my eyes on here');
});

app.post('/submit', function(req, res){
	console.log(req.body); 
    var data = {
        email: req.body.email, 
        name: req.body.name, 
        nickName: req.body.nickName,
        job: req.body.job,
        schoolName: req.body.schoolName,
        major: req.body.major,
        secondMajor: req.body.secondMajor,
        schoolNumber: req.body.schoolNumber,
        check1: req.body.check1,
        check2: req.body.check2,
        check3: req.body.check3
    };
    var sql = 'INSERT INTO userinfo SET ?';
    db.query(sql, data, (err, result)=>{
        if(err) throw err;
        console.log(result);
    });
});

app.post('/searchNick', function(req, res){
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
});

app.post('/searchUni', function(req, res){
    var data = {
        uniName: req.body.checkUni
    };
    var sql = `SELECT DISTINCT uniName, schoolCode FROM university WHERE uniName LIKE '%${data.uniName}%'`;
    db.query(sql, data, (err, result)=>{
        if(err){
            throw err;
        }else{
            console.log(result);
            res.send(result);
        } 
    });
});

app.post('/searchMajor', function(req, res){
    var data = {
        uniName: req.body.checkUni,
        majorName: req.body.checkMajor
    };
    var sql = `SELECT majorName FROM university WHERE uniName = '${data.uniName}' AND majorName LIKE '%${data.majorName}%'`;
    db.query(sql, data, (err, result)=>{
        if(err){
            throw err;
        }else{
            console.log(result);
            res.send(result);
        } 
    });
});

app.post('/searchNumber', function(req, res){
    var data = {
        schoolNumber: req.body.checkNumber 
    };
    var sql = `SELECT schoolNumber FROM userinfo WHERE schoolNumber = '${data.schoolNumber}'`;
    db.query(sql, data, (err, result)=>{
        if(err){
            throw err;
        }else{
            console.log(result);
            res.send(result);
        } 
    });
});

app.post('/changeProfileImg', function(req, res){
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
});

app.post('/test', function(req, res){
    var sql = `SELECT img FROM userinfo WHERE name = '최기환'`;
    db.query(sql,(err, result)=>{
        if(err){
            throw err;
        }else{
            console.log(result);
            res.send(result);
        } 
    });
});
