class StaticPagesController < ApplicationController
  def home
    @books = GoogleBooks.search('The Great Gatsby', {:count => 20})
  end
end