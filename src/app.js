layer.config({
    shade: 0,
    resize: true,
    fixed: true,
    scrollbar: false,
    btn: '',
    cancel: function (index, layero) {
      return confirm('确定要关闭么') ? layer.close(index) : false
    },
    moveEnd: function () {
        console.log('moveEnd')
    },
    resizing: function () {
        console.log('resizing')
    },
})

$('#app').click(e => {
    const x = e.clientX + 'px'
    const y = e.clientY + 'px'
    layer.open({
        offset: [x, y],
        area: ['auto', '305px'],
        title: `新建便签 —— ${moment(new Date()).format('YYYY/MM/DD HH:mm:ss')}`,
        content: '<textarea class="note" placeholder="记笔记..."></textarea>',
    })
})