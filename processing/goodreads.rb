require "goodreads"
load "secrets.rb" # Needs KEY, SECRET, USER_ID constants

client = Goodreads::Client.new(api_key: KEY, api_secret: SECRET)

File.open("../data/to-read.yaml", "w") do |file|

  sorted_books = []

  page = 1
  total_pages = 2 # Each page holds 200 books, adjust total_pages accordingly.

  while page <= total_pages do
    shelf = client.shelf(USER_ID, "to-read", sort: "author", per_page: 200, page: page)
    shelf.books.each do |book|
      sorted_books << book
    end

    page += 1
  end

  book_list = []
  book_list << sorted_books.sort_by do |book|
    [book['book']['authors']['author']['name'], book['book']['title']]
  end
  book_list[0].each do |book|
    author = book["book"]["authors"]["author"]["name"]
    title = book["book"]["title"]
    url = book["book"]["link"]
    file.puts "- author: #{author}\n  title:  \"#{title}\"\n  url:    \"#{url}\""
  end
end
