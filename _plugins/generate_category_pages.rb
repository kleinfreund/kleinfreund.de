=begin
http://www.marran.com/tech/category-pagination-in-jekyll/
https://github.com/captaincanine/marran.com/blob/master/_plugins/generate_category_pages.rb
https://gist.github.com/runemadsen/6263974

CategoryPagination allows Jekyll sites to have index pages for each category, and to break those
category indexes into multiple pages.

This code belongs in the _plugins directory.

The following items need to be true:

*   There is a file called "category_index.html" in the _layouts directory
*   In the _config.yml, there needs to be a line that says "pagination: true"
*   There needs to be an "index.html" page with "category: category-name" in the YAML front matter.
    Be sure to use the actual category name.

For instance, if you wanted to have a paginated set of pages for all posts in the "recipes"
category, place a file called "index.html" in the "recipes" directory. Make sure that in the
YAML front matter, there is a line that says "category: recipes".

This plugin is structured so that each category index page can have its own unique landing page.
For instance, a page showing all the recipes can be different than the page showing all the blog
entries. Subsequent pages (page 2 of the recipes, for example), use the category_index.html
template. This is by design. Perhaps someday I'll add a parameter to the index page to specify
which template to use for sub-pages.

I have created a custom filter for displaying previous and next links on category pages.

=end

module Jekyll

  class Pagination < Generator
    def generate(site)
    end
  end

  class CategoryPages < Generator

    safe true

    def generate(site)

      site.pages.dup.each do |page|
        paginate(site, page) if CategoryPager.pagination_enabled?(site.config, page)
      end

    end

    def paginate(site, page)

      # sort categories by descending date of publish
      category_posts = site.categories[page.data['category']].sort_by { |p| -p.date.to_f }

      # calculate total number of pages
      pages = CategoryPager.calculate_pages(category_posts, site.config['paginate'].to_i)

      # iterate over the total number of pages and create a physical page for each
      (1..pages).each do |num_page|

        # the CategoryPager handles the paging and category data
        pager = CategoryPager.new(site, num_page, category_posts, page.data['category'], pages)

        if num_page > 1
          newpage = Page.new(site, site.source, page.dir, page.name)
          newpage.pager = pager
          newpage.dir = File.join(page.dir, "/page#{num_page}")
          site.pages << newpage
        else
          page.pager = pager
        end

      end
    end

  end

  class CategoryPager < Pager

    attr_reader :category

    def self.pagination_enabled?(config, page)
      page.name == 'index.html' && page.data.key?('category') && !config['paginate'].nil?
    end

    # same as the base class, but includes the category value
    def initialize(site, page, all_posts, category, num_pages = nil)
      @category = category
      super site, page, all_posts, num_pages
    end

    # use the original to_liquid method, but add in category info
    alias_method :original_to_liquid, :to_liquid
    def to_liquid
      x = original_to_liquid
      x['category'] = @category
      x
    end

  end

  module Filters

    def pager_links(pager)

    if pager['previous_page'] || pager['next_page']

      html = '<div class="pager clearfix">'
      if pager['previous_page']

        if pager['previous_page'] == 1
          html << "<div class=\"previous\"><a href=\"/#{pager['category']}/\">&laquo; Newer posts</a></div>"
        else
          html << "<div class=\"previous\"><a href=\"/#{pager['category']}/page#{pager['previous_page']}\">&laquo; Newer posts</a></div>"
        end

      end

      if pager['next_page']
        html << "<div class=\"next\"><a href=\"/#{pager['category']}/page#{pager['next_page']}\">Older posts &raquo;</a></div>"
      end

      html << '</div>'
      html

    end

    end

  end

end
