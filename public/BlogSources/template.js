
function getCount() {
  //  获取统计数据
  $.ajax({
    url: 'http://sgis.site/Statistics/count.json',
    type: 'GET',
    data: {},
    success: function(data){
      if(!data){
        return;
      }
      if(typeof data == 'string'){
        data = JSON.parse(data)
      }
      const localData = data
      //  统计数据自增一
      if(localData['count_articles'][index.toString()]){
        localData['count_articles'][index.toString()] += 1
      }else{
        localData['count_articles'][index.toString()] = 1
      }
      localData['count_all'] += 1
      $('#count').text(localData['count_articles'][index.toString()])
      console.log('记录增加1')
      $.ajax({
        url: 'https://api.country.is',
        type: 'GET',
        data: {},
        success: function(data){
          const country = data.country
          if(localData.count_country[country]){
            localData.count_country[country] += 1
          } else {
            localData.count_country[country] = 1
          }
        }
      })
      const myFile = new Blob([JSON.stringify(localData)], {type: 'application/json'})
      //  传回
      try{
        $.ajax({
          url: 'http://sgis.site/Statistics/count.json',
          type: 'PUT',
          processData:false,
          data: myFile
        })
      } catch(e) {
        alert('文件上传错误')
        console.log(e)
      }
    } 
  })
}

function getComments(){
  $.ajax({
    url: 'http://sgis.site/BlogSources/comments.json',
    type: 'GET',
    data: {},
    success: function(data){
      if(typeof data == 'string'){
        data = JSON.parse(data)
      }
      const thisComments = data[index]
      if(thisComments) {
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
    }
  })
}

function addComments(){
  $.ajax({
    url: 'http://sgis.site/BlogSources/comments.json',
    type: 'GET',
    data: {},
    success: function(data){
      if(typeof data == 'string'){
        data = JSON.parse(data)
      }
      const item = {
        name: $('#name').val(),
        url: $('#url').val()?$('#url').val():'',
        content: escape($('#content').val()),
      }
      if(data[index]){
        data[index].push(item)
      }else{
        data[index] = [item]
      }
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

function escape(str) {
  let newStr = ''
  for (index = 0; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34: // "
        newStr += '&quot;';
        break;
      case 38: // &
        newStr += '&amp;';
        break;
      case 39: // '
        newStr += '&#x27;';
        break;
      case 60: // <
        newStr += '&lt;';
        break;
      case 62: // >
        newStr += '&gt;';
        break;
      default:
        newStr += str[index];
        continue;
    }
    return newStr;
  }
}