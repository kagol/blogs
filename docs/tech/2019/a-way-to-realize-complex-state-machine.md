# 实现复杂状态机的一种思路


## 一、问题
近期做广告平台，涉及到广告状态转换的问题，将需求抽象之后，发现其实就是要实现一个复杂的广告状态机，状态图如下：
![状态跃迁图](https://img2018.cnblogs.com/blog/296720/201901/296720-20190116164650377-1585504866.png)




广告一个有7种状态（如上图），其中”Not delivering”包含4种子状态。

10种状态（state），理论上最多可能有90种跃迁（transition），状态之间的转化极其复杂，如果只是用条件分支的方式来展示广告的状态，不够优雅。

## 二、解决方案
于是将整个状态转换逻辑进行抽象和简化，具体做法如下：


### 1.后台将广告状态进行拆分

将推广计划和广告的状态拆分成系统状态（system_status）和用户状态（configure_status），用户状态是广告主可以手动开启和关闭的，账户余额状态放在账户层级。
后台不做状态的联动，这意味着：后台所有状态的改变互不影响，例如推广计划被暂停了，广告并不会跟着暂停；账户余额不足，广告的系统状态也不会受到影响。

具体拆分逻辑见下表：


| | 财务状态（fund_status） | 系统状态（system_status） | 用户配置状态（configured_status） | 
| ------ | ------ | ------ | ------ |
| 账户层级 | 余额情况| -- | -- | 
| 推广计划层级 | -- | 是否达到日限额 | 是否开启 | 
| 广告层级 | -- | 是否达到日限额 审核状态 |  是否开启 | 




### 2.前端设计广告状态流转的映射表
用状态映射表将前端展示状态和后台状态关联起来，这样如果增加新状态或状态转换逻辑改变，都只需要改状态映射表就好，修改成本非常低。

这样广告的前端展示状态由以下6个后台状态共同决定：

  - (1)账户余额状态
  - (2)推广计划系统状态
  - (3)推广计划用户状态
  - (4)广告系统状态
  - (5)广告用户状态
  - (6)广告投放时间



## 三、具体实现


### 1.状态映射表的设计

状态映射表就是一个JSON结构，其设计非常简单：
```
{//ad configure status
    "STATUS_SUSPEND": 'Paused',
    "STATUS_NORMAL": {//ad system status
        "STATUS_PENDING": 'Pending for review',//待审核
        "STATUS_DENIED": 'Denied',//审核不通过
        "STATUS_DAILY_LIMIT": 'Not delivering,Reach ad limit',
        "STATUS_NORMAL": {//date range
            "BEFORE_DATE_RANGE": 'Prepare for delivery',
            "AFTER_DATE_RANGE": 'End of delivery',//超过投放时间
            "BETWEEN_DATE_RANGE": {//campaign configure status
                "STATUS_SUSPEND": 'Not delivering,Campaign is paused',
                "STATUS_NORMAL": {//campaign system status
                    "STATUS_DAILY_LIMIT": 'Not delivering,Reach campaign daily limit',
                    "STATUS_NORMAL": {//account system status
                        "FUND_STATUS_NOT_ENOUGH": 'Not delivering,Low balance',
                        "FUND_STATUS_NORMAL": 'In delivery'
                    }
                }
            }
        }
    }
}
```
JSON中的key是后台各个层级状态的值，value是前端广告的展示状态。

需要注意的是投放时间需要手动转换好才能进行映射，转换的逻辑抽离成一个工具函数getDateStatus，后面谈具体实现时会提及。

### 2.映射广告状态
为了将广告状态映射表与后台字段关联起来，写了一个工具函数：
```
var getEffectStatus = function({
    first_level_status, 
    second_level_status, 
    third_level_status, 
    fourth_level_status, 
    fifth_level_status, 
    sixth_level_status}) {
    var firstLevel = status_map[first_level_status];
    var secondLevel = firstLevel && firstLevel[second_level_status];
    var thirdLevel = secondLevel && secondLevel[third_level_status];
    var fourthLevel = thirdLevel && thirdLevel[fourth_level_status];
    var fifthLevel = fourthLevel && fourthLevel[fifth_level_status];
    var sixthLevel = fifthLevel && fifthLevel[sixth_level_status];
    var effect_status = (isString(firstLevel) && firstLevel) 
                     || (isString(secondLevel) && secondLevel) 
                     || (isString(thirdLevel) && thirdLevel)
                     || (isString(fourthLevel) && fourthLevel)
                     || (isString(fifthLevel) && fifthLevel)
                     || (isString(sixthLevel) && sixthLevel)
                     || '';
    return effect_status;
}
```
层级代表各种状态的优先级，浅层的状态会覆盖深层的状态。
具体哪一层是哪个状态，由调用者自己决定，保证了灵活性和可扩展性。

### 3.测试

```
var ad_configure_status = 'STATUS_NORMAL';//STATUS_SUSPEND STATUS_NORMAL
var ad_system_status = 'STATUS_NORMAL';//STATUS_PENDING STATUS_DENIED STATUS_DAILY_LIMIT STATUS_NORMAL
var date_range = {
    start: '2018-01-02',
    end: '2018-01-07'
};
var campaign_configure_status = 'STATUS_NORMAL';//STATUS_SUSPEND STATUS_NORMAL
var campaign_system_status = 'STATUS_NORMAL';//STATUS_DAILY_LIMIT STATUS_NORMAL
var account_fund_status = 'FUND_STATUS_NORMAL';//FUND_STATUS_NOT_ENOUGH FUND_STATUS_NORMAL
var effect_status = getEffectStatus({
    first_level_status: ad_configure_status,
    second_level_status: ad_system_status,
    third_level_status: getDateStatus(date_range),
    fourth_level_status: campaign_configure_status,
    fifth_level_status: campaign_system_status,
    sixth_level_status: account_fund_status
});
console.log('effect status:', effect_status);
```
 用到的转换投放时间状态的工具函数（引入了moment.js日期处理库）：
```
var getDateStatus = function(date_range){
    var today = moment().format('YYYY-MM-DD');
    var start = date_range['start'];
    var end = date_range['end'];
    let date_status = '';
    if(moment(today).isBefore(start)){
        date_status = 'BEFORE_DATE_RANGE';
    }
    if(moment(today).isAfter(end)){
        date_status = 'AFTER_DATE_RANGE';
    }
    if(moment(today).isSame(start) || moment(today).isBetween(start, end) || moment(today).isSame(end)){
        date_status = 'BETWEEN_DATE_RANGE';
    }
    return date_status;
}
```
 后续如果要修改状态转换逻辑，只需修改状态映射表就好。

## 四、总结
通过前后台配合实现复杂状态机是一种思路，并不囿于具体的业务：

通过将状态按照变化的原因进行拆分，将状态的变化进行解耦，这样后台就不需要管状态的具体呈现，只需要关注状态更改的唯一原因，这个原因触发了，就更改这一个状态，其他状态不受影响。具体状态的呈现，由前端通过映射表呈现，映射表将后台状态和前端呈现的状态进行映射，并通过层级对每个状态呈现的优先级进行管理，这样可以大大降低维护成本，无论状态转换的逻辑如何变，只需要修改映射表即可。


<EditInfo time="2019-01-16 16:57" title="阅读(1935) 评论(0) 推荐(1)" />
