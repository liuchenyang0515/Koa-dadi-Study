/**
 * Created by Administrator on 2018/3/17 0017.
 */

//DB库
var MongoClient = require('mongodb').MongoClient;

var Config=require('./config.js');

class Db{


    static getInstance(){   /*1、单例  多次实例化实例不共享的问题*/

        if(!Db.instance){
            Db.instance=new Db();
        }
        return  Db.instance;
    }

    constructor(){

        this.dbClient=''; /*属性 放db对象*/
        this.connect();   /*实例化的时候就连接数据库*/

    }

    connect(){  /*连接数据库*/
      return new Promise((resolve,reject)=>{
          if(!this.dbClient) {         /*1、解决数据库多次连接的问题*/
              MongoClient.connect(Config.dbUrl, { useUnifiedTopology: true }, 
                (err,client)=>{

                  if(err){
                      reject(err)

                  }else{
                      this.dbClient=client.db(Config.dbName);
                      resolve(this.dbClient)
                  }
              })

          } else {
              resolve(this.dbClient);

          }


      })

    }

    find(collectionName,json){

       return new Promise((resolve,reject)=>{

           this.connect().then((db)=>{

               var result=db.collection(collectionName).find(json);

               result.toArray(function(err,docs){

                   if(err){
                       reject(err);
                       return;
                   }
                   resolve(docs);
               })

           })
       })
    }
    update(){

    }
    insert(){


    }
}

// 导入时就已经开始连接数据库
module.exports=Db.getInstance();


// const myDb = Db.getInstance();
// // var myDb = new Db();

// setTimeout(()=>{
//     console.time('start');
//     myDb.find('user', {}).then((data) => {
//         console.log(data);
//         console.timeEnd('start');
//     })

// }, 100)

// setTimeout(()=>{
//     console.time('start1');
//     myDb.find('user', {}).then((data) => {
//         console.log(data);
//         console.timeEnd('start1');
//     })

// }, 1000)
