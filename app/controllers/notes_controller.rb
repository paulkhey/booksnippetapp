class NotesController < ApplicationController

  def index
    @book = Book.find(params[:book_id])
    redirect_to book_path(@book)
  end
  
  def show
    @note = Book.find(params[:book_id]).notes
  end
  
  def create
    @book = Book.find(params[:book_id])
    @note = @book.notes.create(note_params)
    redirect_to book_path(@book)
  end
 
  private
    def note_params
      params.require(:note).permit(:title, :body)
    end
end
