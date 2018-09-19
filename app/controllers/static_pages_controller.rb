class StaticPagesController < ApplicationController
  def home
    @my_search = 'Great Gatsby'
    @search_number = 10
    @book_fields_present = 'book.title && book.image_link && !book.authors.empty?'
    @books = GoogleBooks.search(@my_search, {:count => @search_number})
  end
end