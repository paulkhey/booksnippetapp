class BooksController < ApplicationController
  before_action :set_book, only: [:show, :edit, :update, :destroy]

  def index
    @mybooks = Book.paginate(:page => params[:page], :per_page => 1)
    @mybooks =  @mybooks.order('created_at DESC')
  end

  def show
    redirect_to book_notes_path(@book)
  end

  def new
    redirect_to '/books'
    @book = Book.new
  end

  def edit
    redirect_to @book
  end

  def create
    @book = Book.new(book_params)

    respond_to do |format|
      if @book.save
        format.json { render :show, status: :created, location: @book }
      else
        format.html { render :new }
        format.json { render json: @book.errors, status: :unprocessable_entity }
      end
    end
  end
  
  def update
    redirect_to @book

    respond_to do |format|
      if @book.update(book_params)
        format.html { redirect_to @book, notice: 'Book was successfully updated.' }
        format.json { render :show, status: :ok, location: @book }
      else
        format.html { render :edit }
        format.json { render json: @book.errors, status: :unprocessable_entity }
      end
    end
  end
  
  def destroy
    @book.destroy
    respond_to do |format|
      format.html { redirect_to books_path, notice: 'Book was successfully deleted.' }
      format.json { head :no_content }
    end
  end

  private
    def set_book
      @book = Book.find(params[:id])
    end
    
    def book_params
      params.require(:book).permit(:title, :author, :cover, :link)
    end
end
