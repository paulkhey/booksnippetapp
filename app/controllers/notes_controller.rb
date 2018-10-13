class NotesController < ApplicationController

  def index
    @book = Book.find(params[:book_id])
    @mynotes = @book.notes.order('created_at DESC')
  end
  
  def show
    @note = Note.find(params[:id])
  end
  
  def new
    @book = Book.find(params[:book_id])
  end
  
  def update 
    @note = Note.find(params[:id])
    @note.update(note_params)
    redirect_to book_note_path(@note)
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
