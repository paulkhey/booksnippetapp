class Book < ApplicationRecord
  has_many :notes
  validates :title, presence: true, :uniqueness => true
  validates :author, presence: true
  validates :cover, presence: true
  validates :link, presence: true
end
