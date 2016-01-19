require "goodreads"
load "secrets.rb" # Needs KEY, SECRET, USER_ID constants

client = Goodreads::Client.new(api_key: KEY, api_secret: SECRET)

File.open("../data/to-read.yaml", "w") do |file|
  
  shelf = client.shelf(USER_ID, "to-read", sort: "author", per_page: 200, page: 1)
  
  shelf.books.each do |book|
    author = book["book"]["authors"]["author"]["name"]
    title = book["book"]["title"]
    url = book["book"]["link"]
    file.puts "- author: #{author}\n  title:  \"#{title}\"\n  url:    \"#{url}\""
  end
  
  shelf = client.shelf(USER_ID, "to-read", sort: "author", per_page: 200, page: 2)
  
  shelf.books.each do |book|
    author = book["book"]["authors"]["author"]["name"]
    title = book["book"]["title"]
    url = book["book"]["link"]
    file.puts "- author: #{author}\n  title:  \"#{title}\"\n  url:    \"#{url}\""
  end
  
end
