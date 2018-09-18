class StaticPagesController < ApplicationController
  def home
    books = GoogleBooks.search('The Great Gatsby')
    @first_book = books.first
  end
end