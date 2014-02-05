environment     = :development
firesass        = false
line_comments   = false

css_dir         = ""
sass_dir        = ""
images_dir      = "images"
javascripts_dir = "js"

output_style    = :expanded

relative_assets = true

require 'fileutils'

on_stylesheet_saved do |file|
  if file.match('.min') == nil
    require 'compass'

    Compass.add_configuration(
        {
            :project_path => File.dirname(File.dirname(file)),
            :sass_dir => File.basename(File.dirname(file)),
            :css_dir => File.basename(File.dirname(file)),
            :output_style => :compressed
        },
        'alwaysmin' # name for the configuration
    )
    Compass.compiler.compile(File.dirname(file) + "/" + File.basename(file, '.css') + '.scss', File.dirname(file) + "/" + File.basename(file, '.css') + ".min.css")

  end
end
