/**
 * 全局常量
 */
const __LAYER__ = []
const __W__ = 300
const __H__ = 305
const __TYPE__ = 1
const __TITLE__ = '新建便签'
const __PLACEHOLDER__ = '记笔记...'

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
 * 清空所有空的 layer
 */
const clearEmptyLayer = () => {
    // 由于需要在循环中删减数组成员，所以需要用for--的方式遍历
    for (let i = __LAYER__.length - 1; i >= 0; i--) {
        // 获取当前索引记录的id
        const id = __LAYER__[i]
        // 是否为空，如果为空那么返回true
        const isEmpty = isEmptyContentLayer(id)
        // 判断 layer 内容是否为空
        if (isEmpty) {
            // 从缓存中移除成员
            __LAYER__.splice(i, 1)
            // 关闭空标签
            closeLayerById(id)
        }
    }
}

/**
 * 获取当前时间
 */
const now = (format = 'YYYY/MM/DD HH:mm:ss') => moment(new Date()).format(format)

/**
 * 获取内容编辑区域
 */
const getContentArea = () => {
    // html内容
    const html = `
        <div class='note-container'>
            <textarea class='note' placeholder='${__PLACEHOLDER__}'></textarea>
        </div>
    `
    // 返回一个 html 字符串
    return html
}

/**
 * 新建一个便签
 * 使用示例 1； newNote()
 * 使用示例 2； $('#app').click(newNote)
 * 使用示例 3； $('#app').click(event => newNote(event))
 * 使用示例 4； newNote({ clientX:0, clientY: 0 })
 */
const newNote = ({ clientX: __X__, clientY: __Y__ } = event) => {
    // 新建 layer 弹窗
    return layer.open({
        // 弹窗类型
        type: __TYPE__,
        // 标题
        title: __TITLE__,
        // 坐标
        offset: [__Y__ + 'px', __X__ + 'px'],
        // 宽高
        area: [__W__ + 'px', __H__ + 'px'],
        // 内容
        content: getContentArea(),
    })
}


/**
 * 按住ctrl键的时候触发的函数
 */
const ctrlKeyHandle = ({ ctrlKey } = event) => {
    if (ctrlKey) {
        // 鼠标形状变成 “+”
        $('#app').addClass('ctrlcursor')
    } else {
        // 移除鼠标形状
        $('#app').removeClass('ctrlcursor')
        // 重新绑定keydown
        $(window).one('keydown', ctrlKeyHandle)
    }
}

/**
 * 点击事件的回调函数
 */
const clickHandle = ({ ctrlKey } = event) => {
    if (ctrlKey) {
        // 清空所有空的layer
        clearEmptyLayer()
        // 新建便签
        const lay = newNote(event)
        // 添加到缓存中
        __LAYER__.push(lay)
    }
}

/**
 * say something ...
 * @param {*} 参数 参数说明
 */
$(window).one('keydown', ctrlKeyHandle)
         .keyup(ctrlKeyHandle)
         .click(clickHandle)


/*
//////////////////////////////////////////////
//////////////////////////////////////////////
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