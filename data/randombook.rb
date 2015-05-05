require 'yaml'
books = YAML.load_file('to-read.yaml')
book = books.sample

open('up-next.yaml', 'w') { |f|
  f << "- author: #{book['author']}\n"
  if /:/.match(book['title']) or /'/.match(book['title'])
    f << "  title:  '#{book['title'].gsub(/'/, '&#39;')}'\n"
  else
    f << "  title:  #{book['title']}\n"
  end
}
