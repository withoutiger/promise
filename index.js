class Promise{
  state='pending'
  succeed = null
  fail = null
  
  resolve(result){
    setTimeout(()=>{
      this.state = 'fulfilled'
      this.succeed(result)
    })
  }
  reject(err){
     setTimeout(()=>{
      this.state = 'rejected'
      this.succeed(err)
    })
  }
  constructor(fn){
    fn(this.resolve.bind(this),this.reject.bind(this))
  }
  then(succeed,fail){
    this.succeed=succeed
    this.fail=fail
  }
}
const getWeather = city => new Promise((resolve,reject)=>{
  let xhr = new XMLHttpRequest()
  xhr.open('GET','http://rap2api.taobao.org/app/mock/287907/getWeather?city='+city,true)
  xhr.onload = () => {
    if(xhr.status === 200){
      resolve(JSON.parse(xhr.responseText))
    }else{
      reject(`获取${city}天气失败`)
    }
  }
  xhr.send()
})
getWeather('北京')
.then(data=>{
  console.log(data)
},err => {
  console.log(error)
})
