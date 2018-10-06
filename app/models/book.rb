class Book < ApplicationRecord
  extend FriendlyId
  friendly_id :title, use: :slugged
  validates :title, presence: true, :uniqueness => true
  validates :author, presence: true
  validates :cover, presence: true
  validates :link, presence: true
end
