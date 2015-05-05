# load data file
require 'yaml'
books = YAML.load_file('to-read.yaml')

#create empty array for book storage
book_list = []

# iterate through data file
books.each do |book|
  
  # find book's author and title
  author = book['author']
  title = book['title']
  
  # add book's author and title to array
  book_list.push("#{author} - #{title}")
end

# print out random book from list
puts book_list.sample
