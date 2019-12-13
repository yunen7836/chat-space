$(function(){

  function buildHTML(message){
    // 「もしメッセージに画像が含まれていたら」という条件式
    if (message.image) {
      var html = `<div class="chat-main__massage-list__box">
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
      var html = `<div class="chat-main__massage-list__box">
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
});

