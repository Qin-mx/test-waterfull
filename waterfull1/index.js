window.onload = function () {
    // 先获取元素
    var wrap = document.querySelector('.wrap');
    var boxs = document.querySelectorAll('.wrap div');
    waterFull(wrap, boxs);

    window.onscroll = function () {
        setScrollLoading(wrap)
    }
}

// 定义瀑布流函数
function waterFull(wrap, boxs) {
    // 第一步
    // 获取每个元素的宽度
    // 获取在当前屏幕宽度下能够放置多少列
    // 设置宽度
    var boxWidth = boxs[0].offsetWidth + 20; // 因为margin
    var windowWidth = document.documentElement.clientWidth || document.body.clientWidth;
    var cols = Math.floor(windowWidth / boxWidth);
    wrap.style.width = cols * boxWidth + 'px';

    // 第二步
    // 定义一个空数组保存高度
    // 获取第一行的最小高度
    // 使用定位将下一行的放置在最小高度下
    // 更新数组，让以前的最小高度加上它下面div的高度
    // 重新计算最小高度 

    var array = [];
    for (let i = 0; i < boxs.length; i++) {
        if (cols == 0) {
            return
        }
        if (i < cols) {
            array[i] = boxs[i].offsetHeight + 20
        } else {
                var minHeight = Math.min.apply(null, array);
                var minIndex = getMinIndex(minHeight, array);
                var leftWidth = boxs[minIndex].offsetLeft;
                setStyle(boxs[i], minHeight, leftWidth, i)
                array[minIndex] += boxs[i].offsetHeight + 20
        }
    }
}

// 获取最小高度的下标
function getMinIndex(minHeight, array) {
    for (index in array) {
        if (array[index] == minHeight) {
            return index
        }
    }
}
// 设置样式
// 定义变量，判断是否需要添加样
var num = 0

function setStyle(boxs, top, left, index) {
    console.log(num <= index)
    if (num <= index) {
        boxs.style.cssText = "position:absolute;top:" + top + "px;left:" + left + "px;"
        num = index
    } else {
        return
    }

}

// 滚动追加数据

function setScrollLoading(wrap, boxs) {
    var str = '';
    if (getCheck(wrap)) {
        // 循环data数据
        for (var i = 0; i < data.length; i++) {
            str += "<div><img src=" + data[i].imgUrl + " alt=''><span>" + data[i].title + "</span></div>"
        }
        // console.log(str)
        // 追加到wrap中
        wrap.innerHTML = wrap.innerHTML + str
        // 由于是新加入，因此没有样式
        var boxs = document.querySelectorAll('.wrap div')
        // 只要后面追加的才执行
        waterFull(wrap, boxs)
        
        
    }

}

// 判断什么时候加载
function getCheck(wrap) {
    // 获取当前屏幕高度 + 滚动高度 就是内容的高度
    var wHeight = document.documentElement.clientHeight || document.body.clientHeight;
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var addWHeight = wHeight + scrollTop + 200

    var boxs = document.querySelectorAll('.wrap div')
    // 获取当前最后一个元素距离顶部的高度 + 自身高度
    var boxw = boxs[boxs.length - 1].offsetHeight;
    var boxtop = boxs[boxs.length - 1].offsetTop
    var addbox = boxw + boxtop
    return addWHeight >= addbox ? true : false
}