$(function(){
    // 获取要操作的dom元素
    var domObj = {
        wrap: $('.wrap'),
        boxs: $('.wrap div')
    }
    waterFull(domObj)
    // 接下来需要实现滚动加载
    $(this).scroll(function(){
        appendBox(domObj)
    })

})
// 定义瀑布流

function waterFull(value){
    // 先获取单个的宽度
    var boxW = value.boxs.eq(0).outerWidth(true);
    // 获取当前屏幕的宽度
    var winW = $(window).width();
    // 判断当前屏幕可以放置多少个元素
    var cols = Math.floor(winW/boxW);
    // 设置当前包裹元素的宽度
    value.wrap.css({width: cols*boxW + 'px'})

    // 接下来需要设置div的布局
    var arrayW =  new Array()
    for( var i = 0; i < value.boxs.length; i++ ){
        // 等第一行的时候将元素的高度保存在数组
        console.log(value.boxs.eq(i).children('img')[0].complete)
        if(value.boxs.eq(i).children('img')[0].complete){
            var ww = value.boxs.eq(i).children('img').height()
            value.boxs.eq(i).children('img').css({height:ww + 'px'})
        }else{
            value.boxs.eq(i).children('img').css({height:200 + 'px'})
        }
        
        if( i < cols ){
            arrayW[i] = value.boxs.eq(i).outerHeight(true)
            console.log(arrayW[i])
        }else{
            // 取出最小高度
            var minH = Math.min.apply(null,arrayW);
            // 获取当前的下标，为了计算left的偏移值
            var index = getIndex(minH,arrayW);
            // 偏移量
            var leftW = index*boxW + 'px';
            // 设置样式
            setStyle(value,minH,leftW,i)
            // 当执行完一个，就更新数组，重新计算数组的最小高度
            arrayW[index] += value.boxs.eq(i).outerHeight(true);

        }
    }

}

// 下标获取
function getIndex(minH,arrayW){
    for( index in arrayW ){
        if( arrayW[index] == minH ){
            return index;
        }
    }
}
// 设置样式
var num = 0
function setStyle(value,minH,leftW,index){
    if( num >= index ){
        return 
    }
    value.boxs.eq(index).css(
        {position:"absolute",
        top: minH + 'px',
        left:leftW}
    ).stop().hide().fadeIn()
    num = index
}

// 滚动事件
function appendBox( domObj ){
    // 首先需要遍历获取的data元素
    // 将他们放入定义好的字符串
    // 将内容追加到wrap中
    // 重新执行瀑布流函数
    var str = '';
    if(getChecked(domObj.wrap)){
        for( var i = 0; i < data.length; i++){
            str += ' <div><img src="'+data[i].imgUrl+'" alt=""></div>'
        }
        domObj.wrap.append(str)
           
        domObj.boxs = domObj.wrap.children('div')
        // 因为是后来追加进去的，所以并没有添加上属性
        waterFull(domObj)
    }

}

// 判断是否到了底部在加载
function getChecked(wrap){
    // 获取视图的高度 + 滚动条的高度。就是当前所移动的高度
    var viewW = $(window).outerHeight(true);
    var scrollW = $(window).scrollTop();
    var WWidth =  viewW + scrollW + 200
    // 获取最后一个盒子的距离顶部的高度 + 自身的高度
    // 获取最后一个盒子的总高度
    var boxs = wrap.children('div')
    var boxW =  boxs.eq(boxs.length-1).outerWidth(true);
    var offsetTop = boxs.eq(boxs.length-1).offset().top;
    var Wbox = boxW + offsetTop;
console.log( WWidth , Wbox)
    return WWidth >= Wbox ? true:false
}