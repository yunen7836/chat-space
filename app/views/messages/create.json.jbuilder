json.text @message.content
json.created_at @message.created_at.strftime("%Y年%m月%d日 %H時%M分")
json.name @message.user.name
json.image @message.image.url
json.id @message.id