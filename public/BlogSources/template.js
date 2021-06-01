
function getCount() {
  //  获取统计数据
  $.ajax({
    url: 'http://sgis.site/Statistics/count.json',
    type: 'GET',
    data: {},
    success: function(data){
      const localData = JSON.parse(data)
      //  统计数据自增一
      if(localData['count_articles'][index.toString()]){
        localData['count_articles'][index.toString()] += 1
        
      }else{
        localData['count_articles'][index.toString()] = 1
      }
      $('#count').text(localData['count_articles'][index.toString()])
      console.log('记录增加1')
      const myFile = new Blob([JSON.stringify(localData)], {type: 'application/json'})
      //  传回
      $.ajax({
        url: 'http://sgis.site/Statistics/count.json',
        type: 'PUT',
        processData:false,
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
      data = JSON.parse(data)
      const thisComments = data[index]
      let html = ""
      thisComments.forEach(function(i){
        if(i.url){
          html += `<p>\"<a href=\"${i.url}\">${i.name}</a>\" 说到：<i>${i.content}</i></p>`
        }else{
          html += `<p>\"${i.name}\" 说到：<i>${i.content}</i></p>`
        }
      })
      $('#comment').html(html)
    }
  })
}

function addComments(){
  $.ajax({
    url: 'http://sgis.site/BlogSources/comments.json',
    type: 'GET',
    data: {},
    success: function(data){
      data = JSON.parse(data)
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
        processData:false,
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