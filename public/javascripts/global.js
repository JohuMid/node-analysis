/*
Johu 2020/1/14 10:44:22.
*/
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
module.exports={
  gettime,
  getlocal,
  getage,
  handleYear,
  handleDate
}

