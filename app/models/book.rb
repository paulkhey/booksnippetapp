class Book < ApplicationRecord
  validates :title, presence: true, :uniqueness => true
  validates :author, presence: true, :uniqueness => true
  validates :cover, presence: true, :uniqueness => true
  validates :link, presence: true, :uniqueness => true
end
