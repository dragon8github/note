/**
 * 常量
 */
const __LAYER__ = []
const __W__ = 300
const __H__ = 305

/**
 * 当 wilddog 加载成功才执行
 */
if (window.wilddog) {
    // 初始化 wilddog
    wilddog.initializeApp({ syncURL: "https://wd6326449524sjxxpb.wilddogio.com" })

    // 实例化 sync 
    var ref = wilddog.sync().ref()

    // 添加功能示例
    ref.set({
      "messageboard":{
        "message1":{
            "content" : "Wilddog, Cool!",
            "presenter" : "Jack"
        }
      }
    })

    // 监听数据变化
    ref.on("value", function(snapshot) {
        console.log(snapshot.val())
    })
}


/**
 * 初始化全局layer配置
 */
layer.config({
    // 没有遮罩层
    shade: 0,
    // 允许拖拽
    resize: true,
    // 鼠标滚动时，层是否固定在可视区域。
    fixed: true,
    // 弹窗不会让body出现滚动条
    scrollbar: false,
    // 最大化按钮
    maxmin: true,
    // 默认隐藏所有footer按钮
    btn: '',
    // 关闭弹窗事件
    cancel (index, layero) {
        return confirm('确定要关闭么') ? layer.close(index) : false
    },
    // 拖拽移动事件
    moveEnd () {
        console.log('moveEnd')
    },
    // 拖拽大小事件
    resizing () {
        console.log('resizing')
    },
})

/**
 * 根据 id 获取 layer 的弹窗 DOM 对象
 */
const getLayerElementById = id => $('#layui-layer' + id)

/**
 * 判断 layer 是否为空
 */
const isEmptyContentLayer = id => maybe(_ => getLayerElementById(id).find('textarea').val().length, 0) === 0 ? true : false

/**
 * 根据 id 关闭 layer 弹窗
 */
const closeLayerById = id => layer.close(id)

/**
 * 如果弹窗的内容为空，那么直接关闭弹窗
 */
const closeLayerIfEmpty = id => isEmptyContentLayer(id) && closeLayerById(id)

/**
 * 清空所有空的 layer
 */
const clearEmptyLayer = () => {
    // 由于需要在循环中删减数组成员，所以需要用for--的方式遍历
    for (let i = __LAYER__.length - 1; i >= 0; i--) {
        // 获取当前索引记录的id
        const id = __LAYER__[i]
        // 判断 layer 内容是否为空
        if (isEmptyContentLayer(id)) {
            // 从缓存中移除成员
            __LAYER__.splice(i, 1)
            // 关闭空标签
            closeLayerById(id)
        }
    }
}

/**
 * 新建一个便签
 */
const newNote = () => {
    // 获取当前点击对象的坐标
    const { clientX, clientY } = event
    // 新建 layer 弹窗
    return layer.open({
        type: 1,
        offset: [clientY + 'px', clientX + 'px'],
        area: [__W__ + 'px', __H__ + 'px'],
        title: `新建便签`,
        content: `<div class="note-container" data-time="${moment(new Date()).format('YYYY/MM/DD HH:mm:ss')}"><textarea class="note" placeholder="记笔记..."></textarea></div>`,
    })
}

$('#app').click(e => {
    // 清空所有空的layer
    clearEmptyLayer()

    // 新建便签
    const lay = newNote()

    // 添加到缓存中
    __LAYER__.push(lay)
})

/*
                   _ooOoo_
                  o8888888o
                  88" . "88
                  (| -_- |)
                  O\  =  /O
               ____/---'\____
             .'  \\|     |//  .
            /  \\|||  :  |||//  \
           /  _||||| -:- |||||-  \
           |   | \\\  -  /// |   |
           | \_|  ''\---/''  |   |
           \  .-\__  -  ___/-. /
         ___. .'  /--.--\  . . __
      ."" '<  .___\_<|>_/___.'  >'"".
     | | :  - \.;\ _ /;./ -  : | |
     \  \ -.   \_ __\ /__ _/   .- /  /
======-.____-.___\_____/___.-____.-'======
                   =---='
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
         佛祖保佑       永无BUG
*/