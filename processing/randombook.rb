require 'yaml'

def prettyBook(b)
  "#{b['author']} - #{b['title']}"
end

books = YAML.load_file('../data/to-read.yaml')
num_choices = 5
book_list = books.sample(num_choices)

puts "Choose a book:"
(1..num_choices).map { |n|
  puts "#{n}. #{prettyBook(book_list[n-1])}"
}
puts "Input chosen book number: "
book_number = gets
chosen_book = book_list[book_number.to_i - 1]
open('../data/up-next.yaml', 'w') { |f|
  f << "- author: #{chosen_book['author']}\n"
  if /:/.match(chosen_book['title']) or /'/.match(chosen_book['title'])
    f << "  title:  '#{chosen_book['title'].gsub(/'/, '&#39;')}'\n"
  else
    f << "  title:  #{chosen_book['title']}\n"
  end
}
