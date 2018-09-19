class StaticPagesController < ApplicationController
  def home
    my_search = 'Great Gatsby'
    @books = GoogleBooks.search(my_search, {:count => 10})
  end
end