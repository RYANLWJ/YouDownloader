const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const app = express();
const fs = require( 'fs');



const bodyParser = require('body-parser');
app.use(express.static('.'),bodyParser.json(),bodyParser.urlencoded({extended : false}));







app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/sing.html');
})

/* 设置允许跨域 */
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});



app.get('/download', (req,res) => {
    let hasFinish=false;
    // console.log(req);                             
    let URL = req.query.url;
    let fileName=req.query.name;
    console.log(fileName,URL);
    res.header('Content-Disposition', 'attachment; filename="video.mp4"');
  
    let rs =ytdl(URL, {
    format: 'mp4',
    quality:'highest'
    });
    let ws=fs.createWriteStream('./downloads/'+fileName+'.mp4',{
        encoding: 'utf8',
    });
    rs.pipe(ws);
    let isOk = true;
    rs.on('data', function (data) {
        
        if(data&&isOk){
            console.log(`is downloading`);
        }
        isOk=false;
     
      
    });

    


    rs.on('end', function () {
        console.log('数据读取完毕');
        hasFinish=true;
    });
   
    if(hasFinish){
        res.send('下载完成')
    }
})


app.listen(4000, () => {
    console.log('Server Works !!! At port 4000');
});