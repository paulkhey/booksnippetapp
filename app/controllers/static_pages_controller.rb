class StaticPagesController < ApplicationController
  def home
    @books = GoogleBooks.search('The Great Gatsby')
  end
end