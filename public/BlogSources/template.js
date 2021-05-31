
function getCount(index) {
  //  获取统计数据
  $.ajax({
    url: 'http://sgis.site/Statistics/count.json',
    type: 'GET',
    data: {},
    success: function(data){
      const localData = data
      const count = data['count_articles'][index]
      $('#count').text(count.toString())
      //  统计数据自增一
      localData['count_articles'][index] += 1
      console.log('记录增加1')
      const myFile = new Blob([JSON.stringify(localData)], {type: 'application/json'})
      //  传回
      $.ajax({
        url: 'http://sgis.site/Statistics/count.json',
        type: 'PUT',
        data: myFile
      })
    } 
  })
}

function getComments(){
  $.ajax({
    url: 'http://sgis.site/BlogSources/comments.json',
    type: 'GET',
    data: {},
    success: function(data){
      const thisComments = data[index]
      let html = "<p>\"<a>一</a>\" 说到：<i>为什么</i></p>"
      thisComments.forEach(function(i){
        if(i.url){
          html += `<p>\"<a href=\"${i.url}\">${i.name}</a>\" 说到：<i>${i.content}</i></p>`
        }else{
          html += `<p>\"${i.name}\" 说到：<i>${i.content}</i></p>`
        }
      })
      $('#comment').html = html
    }
  })
}

function addComments(){
  $.ajax({
    url: 'http://sgis.site/BlogSources/comments.json',
    type: 'GET',
    data: {},
    success: function(data){
      const item = {
        name: $('#name').val(),
        url: $('#url').val()?$('#url').val():'',
        content: $('#content').val(),
      }
      data[index].push(item)
      const myFile = new Blob([JSON.stringify(data)], {type: 'application/json'})
      //  传回
      $.ajax({
        url: 'http://sgis.site/BlogSources/comments.json',
        type: 'PUT',
        data: myFile,
        success: function(){
          alert('评论成功')
          getComments(index)
        }
      })
    }
  })
}

  /*
  不需要获取list
  //  获取list
  $.ajax({
    url: 'http://sgis.site/BlogSources/list.json',
    type: 'GET',
    data: {},
    success: function(data){
      var info = null
      var years = Object.keys(data)
      years.forEach(function(year){
        data[year].forEach(function(ar){
          if(ar.index == index){
            info = ar
          }
        })
      })
    } 
  })
  */