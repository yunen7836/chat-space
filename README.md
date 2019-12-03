# DB設計

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|index: true, null: false, foreign_key: true|
|group_id|integer|index: true, null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false|
|mail|string|null: false|
|password|string|null: false|

### Association
- has_many :massages
- has_many :groups, throu: groups_users

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false|

### Association
- has_many :massages
- has_many :users, throu: groups_users

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|text|string|null: false|
|image|string||
|user_id|integer|index: true, null: false, foreign_key: true|
|group_id|integer|index: true, null: false, foreign_key: true|


### Association
- belongs_to :groups
- belongs_to :users


## README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
