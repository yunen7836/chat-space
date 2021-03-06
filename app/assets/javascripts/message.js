$(function(){
  
  function buildHTML(message){
    if (message.image) {
      var html = `<div class="chat-main__massage-list__box" data-message_id= "${message.id}" >
      <div class="chat-main__massage-list__box__top">
      <div class="chat-main__massage-list__box__top__left">
      ${message.name}
      </div>
      <div class="chat-main__massage-list__box__top__right">
      ${message.created_at}
      </div>
      </div>
      <div class="chat-main__massage-list__box__bottom">
      <p class="chat-main__massage-list__box__bottom__content">
      ${message.text}
      </p>
      <img class="chat-main__massage-list__box__bottom__image" src="${message.image}" >
      </div>
      </div>`
    } else {
      var html = `<div class="chat-main__massage-list__box" data-message_id= "${message.id}" >
      <div class="chat-main__massage-list__box__top">
      <div class="chat-main__massage-list__box__top__left">
      ${message.name}
      </div>
      <div class="chat-main__massage-list__box__top__right">
      ${message.created_at}
      </div>
      </div>
      <div class="chat-main__massage-list__box__bottom">
      <p class="chat-main__massage-list__box__bottom__content">
      ${message.text}
      </p>
      
      </div>
      </div>`
    }
    return html
  }

  $('.chat-main__massage-form__box').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__massage-list').append(html);
      $('.chat-main__massage-list').animate({ scrollTop: $('.chat-main__massage-list')[0].scrollHeight});
      $('.chat-main__massage-form__box')[0].reset();
      $('.chat-main__massage-form__box__right').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
  });
  })

  var reloadMessages = function() {
    // if 今いるページのURLを取得。match　自動更新を行いたいページの正規表現を書く
    var current_url = location.href;
    var urlRE = /messages$/;
    if (current_url.match(urlRE)) {
      var last_message_id = $('.chat-main__massage-list__box:last').data("message_id");
      $.ajax({
        url: 'api/messages',
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat-main__massage-list').append(insertHTML);
        $('.chat-main__massage-list').animate({ scrollTop: $('.chat-main__massage-list')[0].scrollHeight});
      })
      .fail(function() {
        alert('error');
      });
    };
  };

  setInterval(reloadMessages, 7000);
});

