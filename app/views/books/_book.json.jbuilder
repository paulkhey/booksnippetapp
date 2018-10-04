json.extract! book, :id, :title, :author, :cover, :link, :created_at, :updated_at
json.url book_url(book, format: :json)
