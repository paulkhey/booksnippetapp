class NotesController < ApplicationController

  def new
  
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
