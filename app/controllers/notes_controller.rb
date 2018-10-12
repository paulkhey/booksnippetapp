class NotesController < ApplicationController

  def index
    redirect_to books_path
  end
  
  def show
    @note = Book.find(params[:book_id]).notes
  end
  
  def create
    @book = Book.find(params[:book_id])
    @note = @book.notes.create(note_params)
    redirect_to book_note_path(@note)
  end
 
  private
    def note_params
      params.require(:note).permit(:title, :body)
    end
end
