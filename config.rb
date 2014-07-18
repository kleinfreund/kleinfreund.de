environment      = :development
firesass         = false
line_comments    = false
relative_assets  = true
preferred_syntax = :scss
output_style     = :expanded

css_dir          = 'css'
sass_dir         = 'sass'
images_dir       = 'img'
javascripts_dir  = 'js'

sass_options = {
    :sourcemap => true
}

require 'fileutils'

on_stylesheet_saved do |file|
  if file.match('.min') == nil
    require 'compass'

    Compass.add_configuration(
        {
            :output_style => :compressed,
            :sass_options => {
                :sourcemap => true
            }
        },
        'minify-css'
    )
    Compass.compiler.compile(
        sass_dir + '/' + File.basename(file, '.css') + '.scss',
        css_dir  + '/' + File.basename(file, '.css') + '.min.css'
    )

  end
end
