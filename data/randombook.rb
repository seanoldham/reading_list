require 'yaml'
book = YAML.load_file('to-read.yaml').sample
puts "#{book['author']} - #{book['title']}"
