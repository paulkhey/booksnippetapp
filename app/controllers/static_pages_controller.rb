class StaticPagesController < ApplicationController
  def home
    my_search = 'Great Gatsby'
    @book_fields_present = 'book.title && book.image_link && !book.authors.empty?'
    @books = GoogleBooks.search(my_search, {:count => 10})
  end
end