var express = require('express');
var router = express.Router();

var db = require("./../public/javascripts/db");


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

router.get('/first', function (req, res, next) {
  /**/
  db.query(`SELECT topic.tTopic,topic.tHeadImage,chat.tId,count(*) AS count from topic,user,chat WHERE topic.uId=user.uId and chat.tId=topic.tId GROUP BY tId  ORDER BY count DESC  LIMIT 3`, [], function (results, rows) {

    var _res = res


    const data = [
      {country: '中国', first: 50, second: 50, third: 9},
      {country: '日本', first: 28, second: 9, third: 4},
      {country: '韩国', first: 17, second: 15, third: 3},
      {country: '伊朗', first: 25, second: 40, third: 5},
      {country: '沙特', first: 28, second: 40, third: 2},
      {country: '伊拉克', first: 50, second: 50, third: 1},
      {country: '卡塔尔', first: 50, second: 40, third: 9},
      {country: '阿联酋', first: 50, second: 40, third: 9},
      {country: '乌兹别克斯坦', first: 40, second: 40, third: 5},
      {country: '泰国', first: 50, second: 50, third: 9},
      {country: '越南', first: 50, second: 50, third: 5},
      {country: '阿曼', first: 50, second: 50, third: 9},
      {country: '巴林', first: 40, second: 40, third: 9},
      {country: '朝鲜', first: 40, second: 32, third: 17},
      {country: '印尼', first: 50, second: 50, third: 9},
    ];

    // Create the data 2D-array (vectors) describing the data
    let vectors = new Array();
    for (let i = 0; i < data.length; i++) {
      vectors[i] = [data[i]['first'], data[i]['second'], data[i]['third']];
    }

    const kmeans = require('node-kmeans');
    kmeans.clusterize(vectors, {k: 3}, (err, res) => {
      if (err) {
        _res.status(200).json({
          err_code: 0,
          message: 'OK',
          results2: err
        })
        // console.error(err);
      } else {
        _res.status(200).json({
          err_code: 0,
          message: 'OK',
          results2: res
        })
        // console.log('%o', res);
      }
    });
  })
});

// 获取用户基础分析数据
router.get('/totalnum', function (req, res, next) {

  db.query(`
            SELECT COUNT(*) AS female FROM
            user
            where userSex='女' UNION SELECT COUNT(*) AS male FROM
            user
            where userSex='男'`, [], function (results, rows) {

    var sex = JSON.parse(results)

    db.query(`
            SELECT userBirthday FROM user`, [], function (results, rows) {

      let res1 = JSON.parse(results);

      let age20 = [], age30 = [], age40 = [], age50 = []

      // 生日对象转换年龄对象
      for (i = 0; i < res1.length; i++) {
        if (res1[i].userBirthday) {

          // console.log(getage(res1[i].userBirthday));

          if (getage(res1[i].userBirthday) < 20) {
            age20.push(getage(res1[i].userBirthday))
          } else if (20 <= getage(res1[i].userBirthday) && getage(res1[i].userBirthday) < 25) {
            age30.push(getage(res1[i].userBirthday))

          } else if (25 <= getage(res1[i].userBirthday) && getage(res1[i].userBirthday) < 30) {
            age40.push(getage(res1[i].userBirthday))

          } else if (getage(res1[i].userBirthday) >= 30) {

            age50.push(getage(res1[i].userBirthday))
          }
        }
      }

      let age = [age20.length, age30.length, age40.length, age50.length]


      // console.log(age);

      db.query(`SELECT userRegDate FROM user`, [], function (results, rows) {

        var res2 = JSON.parse(results)

        let reg1 = [], reg2 = [], reg3 = [], reg4 = []

        for (j = 0; j < res2.length; j++) {
          if (res2[j].userRegDate) {
            if (getage(res2[j].userRegDate) < 12) {
              reg1.push(getage(res2[j].userRegDate))
            } else if (12 <= getage(res2[j].userRegDate) && getage(res2[j].userRegDate) < 15) {
              reg2.push(getage(res2[j].userRegDate))

            } else if (15 <= getage(res2[j].userRegDate) && getage(res2[j].userRegDate) < 18) {
              reg3.push(getage(res2[j].userRegDate))

            } else if (getage(res2[j].userRegDate) >= 18) {
              reg4.push(getage(res2[j].userRegDate))
            }
          }
        }

        let reg = [reg1.length, reg2.length, reg3.length, reg4.length]
        // console.log(res2[1].userRegDate);

        let count1 = [], count2 = [], count3 = [], count4 = [], count5 = [], count6 = []

        var myDate = new Date();
        var year = myDate.getFullYear();

        year = Number(year)

        for (w = 0; w < res2.length; w++) {
          if (res2[w].userRegDate) {

            // console.log(handleYear(res2[w].userRegDate)) ;
            if (Number(handleYear(res2[w].userRegDate)) >= (year - 12) && Number(handleYear(res2[w].userRegDate)) < (year - 10)) {
              count1.push(handleYear(res2[w].userRegDate))

            } else if (Number(handleYear(res2[w].userRegDate)) >= (year - 10) && Number(handleYear(res2[w].userRegDate)) < (year - 8)) {
              count2.push(handleYear(res2[w].userRegDate))

            } else if (Number(handleYear(res2[w].userRegDate)) >= (year - 8) && Number(handleYear(res2[w].userRegDate)) < (year - 6)) {
              count3.push(handleYear(res2[w].userRegDate))
            } else if (Number(handleYear(res2[w].userRegDate)) >= (year - 6) && Number(handleYear(res2[w].userRegDate)) < year - 4) {
              count4.push(handleYear(res2[w].userRegDate))

            } else if (Number(handleYear(res2[w].userRegDate)) >= (year - 4) && Number(handleYear(res2[w].userRegDate)) < year - 2) {
              count5.push(handleYear(res2[w].userRegDate))

            } else if (Number(handleYear(res2[w].userRegDate)) >= (year - 2) && Number(handleYear(res2[w].userRegDate)) < year) {
              count6.push(handleYear(res2[w].userRegDate))
            }
          }
        }

        let count = [count1.length, count2.length, count3.length, count4.length, count5.length, count6.length]

        // console.log(count);


        let adduser1 = [], adduser2 = [], adduser3 = [], adduser4 = [], adduser5 = [], adduser6 = [], adduser7 = []


        var ye = myDate.getFullYear();
        var mo = (myDate.getMonth() + 1).toString().padStart(2, '0');
        var day = myDate.getDate().toString().padStart(2, '0');
        var time = ye + '-' + mo + '-' + day;


        for (w = 0; w < res2.length; w++) {
          if (res2[w].userRegDate) {

            // console.log(handleYear(res2[w].userRegDate)) ;
            if ((handleDate(res2[w].userRegDate)) == gettime(6)) {
              adduser1.push(handleDate(res2[w].userRegDate))

            } else if ((handleDate(res2[w].userRegDate)) == gettime(5)) {
              adduser2.push(handleDate(res2[w].userRegDate))

            } else if ((handleDate(res2[w].userRegDate)) == gettime(4)) {
              adduser3.push(handleDate(res2[w].userRegDate))

            } else if ((handleDate(res2[w].userRegDate)) == gettime(3)) {
              adduser4.push(handleDate(res2[w].userRegDate))
            } else if ((handleDate(res2[w].userRegDate)) == gettime(2)) {
              adduser5.push(handleDate(res2[w].userRegDate))

            } else if ((handleDate(res2[w].userRegDate)) == gettime(1)) {
              adduser6.push(handleDate(res2[w].userRegDate))

            } else if ((handleDate(res2[w].userRegDate)) == gettime(0)) {
              adduser7.push(handleDate(res2[w].userRegDate))
            }
          }
        }

        let adduser = [adduser1.length, adduser2.length, adduser3.length, adduser4.length, adduser5.length, adduser6.length, adduser7.length]

        console.log(adduser);


        db.query(`SELECT userLocal FROM user`, [], function (results, rows) {

          // console.log(JSON.parse(results));
          var res3 = JSON.parse(results)

          let local1 = [], local2 = [], local3 = [], local4 = [], local5 = [], local6 = [], local7 = [];

          for (v = 0; v < res3.length; v++) {
            if (res3[v].userLocal) {


              // console.log(getlocal(res3[v].userLocal));

              if (getlocal(res3[v].userLocal) == 2) {
                local1.push(getlocal(res3[v].userLocal))
              } else if (getlocal(res3[v].userLocal) == 3) {
                local2.push(getlocal(res3[v].userLocal))
              } else if (getlocal(res3[v].userLocal) == 1) {
                local3.push(getlocal(res3[v].userLocal))
              } else if (getlocal(res3[v].userLocal) == 4) {
                local4.push(getlocal(res3[v].userLocal))
              } else if (getlocal(res3[v].userLocal) == 7) {
                local5.push(getlocal(res3[v].userLocal))
              } else if (getlocal(res3[v].userLocal) == 5) {
                local6.push(getlocal(res3[v].userLocal))
              } else if (getlocal(res3[v].userLocal) == 6) {
                local7.push(getlocal(res3[v].userLocal))
              }
            }
          }

          let local = [local1.length, local2.length, local3.length, local4.length, local5.length, local6.length, local7.length]

          // console.log(local);

          res.status(200).json({
            err_code: 0,
            message: 'OK',
            results1: sex,
            results2: age,
            results3: reg,
            results4: local,
            results5: count,
            results6: adduser
          })
        })
      })
    })
  })
})
// 获得分析用户的详细信息
router.get('/totaldetail', function (req, res, next) {

  var param1 = req.query.db.query(`
            SELECT COUNT(*) AS female FROM
            user
            where userSex='女' UNION SELECT COUNT(*) AS male FROM
            user
            where userSex='男'`, [], function (results, rows) {

  })
})

// 通过日期获取年龄
function getage(strBirthday) {

  strBirthday = strBirthday.split('T')[0];
  var returnAge,
    strBirthdayArr = strBirthday.split("-"),
    birthYear = strBirthdayArr[0],
    birthMonth = strBirthdayArr[1],
    birthDay = strBirthdayArr[2],
    d = new Date(),
    nowYear = d.getFullYear(),
    nowMonth = d.getMonth() + 1,
    nowDay = d.getDate();
  if (nowYear == birthYear) {
    returnAge = 0;//同年 则为0周岁
  } else {
    var ageDiff = nowYear - birthYear; //年之差
    if (ageDiff > 0) {
      if (nowMonth == birthMonth) {
        var dayDiff = nowDay - birthDay;//日之差
        if (dayDiff < 0) {
          returnAge = ageDiff - 1;
        } else {
          returnAge = ageDiff;
        }
      } else {
        var monthDiff = nowMonth - birthMonth;//月之差
        if (monthDiff < 0) {
          returnAge = ageDiff - 1;
        } else {
          returnAge = ageDiff;
        }
      }
    } else {
      returnAge = -1;//返回-1 表示出生日期输入错误 晚于今天
    }
  }
  return returnAge;//返回周岁年龄
}

// 通过日期获取年份
function handleYear(str) {
  var day = new Date(str)

  return (day.getFullYear());
}
// 通过地域代码获取地域
function getlocal(strLocal) {
  strLocal = strLocal.split('"')[1];

  // 东北（黑龙江省、吉林省、辽宁省）
  if (strLocal == '230000' || strLocal == '220000' || strLocal == '210000') {
    return 2
  }

  //  华东（上海市、江苏省、浙江省、安徽省、福建省、江西省、山东省、台湾省）
  else if (strLocal == '310000' || strLocal == '320000' || strLocal == '330000' || strLocal == '340000' || strLocal == '350000' || strLocal == '360000' || strLocal == '370000' || strLocal == '710000') {
    return 3
  }

  //  华北（北京市、天津市、山西省、河北省、内蒙古自治区）
  else if (strLocal == '110000' || strLocal == '120000' || strLocal == '130000' || strLocal == '140000' || strLocal == '150000') {
    return 1
  }

  //  华中（河南省、湖北省、湖南省）
  else if (strLocal == '410000' || strLocal == '420000' || strLocal == '430000') {
    return 4
  }

  //  华南（广东省、广西壮族自治区、海南省、香港特别行政区、澳门特别行政区）
  else if (strLocal == '440000' || strLocal == '450000' || strLocal == '460000' || strLocal == '810000' || strLocal == '820000') {
    return 7
  }
  //  西南（四川省、贵州省、云南省、重庆市、西藏自治区）
  else if (strLocal == '510000' || strLocal == '520000' || strLocal == '500000' || strLocal == '530000' || strLocal == '540000') {
    return 5
  }

  //  西北（陕西省、甘肃省、青海省、宁夏回族自治区、新疆维吾尔自治区）
  else if (strLocal == '610000' || strLocal == '620000' || strLocal == '630000' || strLocal == '640000' || strLocal == '650000') {
    return 6
  }
}


// 通过详细日期获取日期
function handleDate(str) {
  return str.split('T')[0]
}

// 获取当前日期前几天的日期
function gettime(num) {
  var time = (new Date).getTime() - 24 * 60 * 60 * 1000 * num;
  var yesterday = new Date(time);
  var month = yesterday.getMonth();
  var day = yesterday.getDate();
  return yesterday.getFullYear() + "-" + (yesterday.getMonth() > 9 ? (yesterday.getMonth() + 1) : "0" + (yesterday.getMonth() + 1)) + "-" + (yesterday.getDate() > 9 ? (yesterday.getDate()) : "0" + (yesterday.getDate()));
}



module.exports = router;
