---
title: "How to create a Discourse plugin"
description: "A thorough guide on developing a plugin for the Discourse forum software"
date: 2018-08-22
tags:
- dev
---
In this article, I will describe in detail how to create a plugin for the Discourse forum software. The plugin will be able to save data to Discourse’s database where it can be retrieved at any time. For this, the plugin’s data needs to be transferred from the client to the server and the other way around. For this reason, a basic understanding of HTTP is required. I will try to provide all necessary information in order for you to understand what we’re doing even without knowing about HTTP and REST and requests and all that.



## Content

- [File structure](#file-structure)
- [Setting up the plugin workspace](#setting-up-the-plugin-workspace)
- [plugin.rb](#plugin.rb)
- [The plugin page](#the-plugin-page)
- [Make it a notebook in the front](#make-it-a-notebook-in-the-front)
- [Sending data](#sending-data)
- [Receiving data](#receiving-data)
- [Make it a notebook in the back](#make-it-a-notebook-in-the-back)
- [Round trip](#round-trip)
- [Deleting notes](#deleting-notes)



## File structure

Let’s get this out of the way first. Following below is the file structure of the plugin we’re going to create. It’s complex and we will need everything from it.

Note that I named some files and directories with part of it being a variable thing. For example, there is `$PLUGIN_NAME`. I will choose a name for our plugin and use it instead of `$PLUGIN_NAME`. `$THING` refers to the type of data we want to store in Discourse’s database. This could be some additional configuration of our plugin or a list of our favorite pets.

- `$PLUGIN_NAME/`
  - `app/`
    - `controllers/`
      - `$PLUGIN_NAME_controller.rb`
      - `$THING_controller.rb`
    - `$THING_store.rb`
  - `assets/`
    - `javascripts/`
      - `discourse/`
        - `controllers/`
          - `$PLUGIN_NAME.js.es6`
        - `models/`
          - `$THING.js.es6`
        - `routes/`
          - `$PLUGIN_NAME.js.es6`
        - `templates/`
          - `$PLUGIN_NAME.hbs`
          - `$PLUGIN_NAME-route-map.js.es6`
    - `stylesheets/`
      - `$PLUGIN_NAME.css`
  - `config/`
    - `locales/`
      - `client.en.yml`
      - `server.en.yml`
    - `settings.yml`
  - `plugin.rb`

In this article, we will build a notebook plugin that stores notes. Looking at the file structure above, we will end up with a `notebook` directory and; for example, a `note_store.rb` file in the `lib` directory.

<p class="note note--info">
  The <a href="https://github.com/kleinfreund/notebook">final plugin code</a> is available on GitHub.
</p>



## Setting up the plugin workspace

The main component for every Discourse plugin is the `plugin.rb` file in the root of the plugin’s directory. Assuming a Discourse installation in a `discourse` directory somewhere, each plugin has its own directory inside the `plugins` directory.

- `discourse/`
  - `…/`
  - `plugins/`
    - `notebook/`
      - `plugin.rb`
  - `…`

**Tip**: You can develop your plugin outside of the Discourse installation by creating a symbolic link in the `plugins` directory to the actual location of the plugin’s directory like this:

```sh
cd discourse/plugins
ln -s ../../notebook notebook
```

This assumes the `notebook` directory to be located right next to the `discourse` directory in the file system. You can specify a different location than `../../notebook` according to your needs.

- `discourse/`
  - `…/`
  - `plugins/`
    - `notebook` → `../../notebook`
  - `…`

- `notebook/`
  - `plugin.rb`



## plugin.rb

Below is a minimal plugin that doesn’t do anything apart from being noticed by Discourse: Navigate to [localhost:3000/admin/plugins](http://localhost:3000/admin/plugins) after restarting the rails server. The plugin will be listed under “Installed Plugins” with the name “notebook”. You can also see that it’s already enabled.

**`./plugin.rb`**:

```ruby
# name: notebook
# version: 0.1.0
```

<p class="note note--info">
  I will refer to file system paths in relation to the plugin directory by starting them with <code>./</code>. The dot character represents the plugin directory. In other words, the plugin directory <code>notebook</code> is our <i>current working directory</i>.
</p>

We can make sure that the plugin is disabled by default. However, this is only useful if a Discourse administrator can enable the plugin from the settings. For this, we need to add the setting and also the accompanying text for the user interface.

**`./plugin.rb`**:
```ruby
# name: notebook
# version: 0.1.1

enabled_site_setting :notebook_enabled
```

The following value in the `settings.yml` file determines whether the plugin is enabled by default.

**`./config/settings.yml`**:
```yaml
plugins:
  notebook_enabled:
    default: false
```

Discourse uses the `site_settings` property in its language files to provide labels for settings in its user interface.

**`./config/locales/server.en.yml`**:
```yaml
en:
  site_settings:
    notebook_enabled: 'Enable Notebook'
```

In the settings, you’re now able to find the entry “notebook enabled”. Next to it will be a checkbox labelled “Enable Notebook”.

Currently, the plugin’s file structure should look like this:

- `notebook/`
  - `config/`
    - `locales/`
      - `server.en.yml`
    - `settings.yml`
  - `plugin.rb`



## The plugin page

We need a page to access the plugin. Let’s put it on the path `/notebook` so that our plugin will be available at [localhost:3000/notebook](http://localhost:3000/notebook). This requires a bunch of new files and directories. Below is the file structure showing all files that will be created or modified in the process:

- `notebook/`
  - `app/`
    - `controllers/`
       - `notebook_controller.rb`
  - `assets/`
    - `javascripts/`
       - `discourse/`
          - `routes/`
            - `notebook.js.es6`
          - `templates/`
            - `notebook.hbs`
          - `notebook-route-map.js.es6`
  - `plugin.rb`

First of all, we need to set up a route for the path `/notebook` on both the server and the client side. Expanding the `plugin.rb` file, we define a new server-side route for `/notebook`. It will point to the notebook controller’s `index` method.

**`./plugin.rb`**:
```ruby
# name: notebook
# version: 0.2.0

enabled_site_setting :notebook_enabled

after_initialize do
  load File.expand_path('../app/controllers/notebook_controller.rb', __FILE__)

  Discourse::Application.routes.append do
    # Map the path `/notebook` to `NotebookController`’s `index` method
    get '/notebook' => 'notebook#index'
  end
end
```

We also need to create said notebook controller. This requires some caution as its name needs to match the route target defined in `plugin.rb`. Targetting `notebook#index` requires a file called `notebook_controller.rb`. In it, a class `NotebookController` inheriting from `ApplicationController` will need to be defined along with its own `index` method.\

**`./app/controllers/notebook_controller.rb`**:
```ruby
class NotebookController < ApplicationController
  def index
  end
end
```

Now this is a bit strange. The `index` method does nothing apart from existing. This particular `index` method will never actually be called when accessing [localhost:3000/notebook](http://localhost:3000/notebook) directly. Nonetheless, it’s still needed so that we can visit that URL. Doing just that will now, after restarting the rails server, produce the following logger output:

```
Processing by NotebookController#index as HTML
```

Didn’t I just say this method won’t ever be called? Right. Let’s verify that:

**`./app/controllers/notebook_controller.rb`**:
```ruby
class NotebookController < ApplicationController
  def index
    Rails.logger.info '🚂 Called the `NotebookController#index` method.'
  end
end
```

Restarting the server and opening [localhost:3000/notebook](http://localhost:3000/notebook) again won’t produce the expected output. It turns out that Discourse’s internal controller logic expects controller actions to be called via the front end. You can verify this by skipping this logic:

**`./app/controllers/notebook_controller.rb`**:
```ruby
class NotebookController < ApplicationController
  skip_before_action :check_xhr

  def index
    Rails.logger.info '🚂 Called the `NotebookController#index` method.'
  end
end
```

Restarting the server once more and requesting [localhost:3000/notebook](http://localhost:3000/notebook) again should now produce the output of our own `index` method. However, we don’t want this to happen. The `check_xhr` method (or *before action* as it is called in Rails) ensures that Discourse renders its front end. This way, we can add our own plugin page inside Discourse’s front end. Make sure you remove the `skip_before_action` line if you added it.

We made the path `/notebook` known to the Discourse back end; let’s add it to the front end, too. We defined a server-side route in the back end; now we need a client-side route in the frond end:

**`./assets/javascripts/discourse/notebook-route-map.js.es6`**:
```js
/**
 * Links the path `/notebook` to a route named `notebook`. Named like this, a
 * route with the same name needs to be created in the `routes` directory.
 */
export default function () {
  this.route('notebook', { path: '/notebook' });
}
```

Using the name `notebook`, we need to create a route called the same by choosing the file name accordingly:

**`./assets/javascripts/discourse/routes/notebook.js.es6`**:
```js
/**
 * Route for the path `/notebook` as defined in `../notebook-route-map.js.es6`.
 */
export default Discourse.Route.extend({
  renderTemplate() {
    // Renders the template `../templates/notebook.hbs`
    this.render('notebook');
  }
});
```

For now, we will just ask it to render a template called … well, it’s called `notebook` again. Yep.

**`./assets/javascripts/discourse/templates/notebook.hbs`**:
```html
<h1>Notebook</h1>
```



## Make it a notebook in the front

So far, we managed to display a heading reading “Notebook” at the URL [localhost:3000/notebook](http://localhost:3000/notebook). Amazing what one can achieve by following a few hundred lines of text.

Next, we will add a text field inside a form which we will use to add new notes to the notebook.

**`./assets/javascripts/discourse/templates/notebook.hbs`**:
```html
{% raw %}<h1>{{ i18n 'notebook.title' }}</h1>

<form {{ action 'createNote' content on='submit' }}>
  <label>
    {{ i18n 'notebook.create_note.text_field_label' }}
    {{ textarea name='note' value=content }}
  </label>

  <button type='submit' class='btn btn-primary'>
    {{ i18n 'notebook.create_note.submit_label' }}
  </button>
</form>{% endraw %}
```

We start by using some more localization strings by calling the `{% raw %}{{ i18n … }}{% endraw %}` helper expression. This allows Discourse components to be written language-independent and enables internationalization via localization files like the ones we used before for the settings label of our plugin.

<p class="marginalia note note--info">
  “i18n” is short for “internationalization” where 18 represents the amount of left-out characters.
</p>

Since we’re working on the front end, we now need the `client.en.yml` file:

**`./config/locales/client.en.yml`**:
```yaml
en:
  js:
    notebook:
      title: 'Notebook'

      create_note:
        text_field_label: 'New note:'
        submit_label: 'Save'
```

If the labels don’t show up and you see something like `[en.notebook.title]` instead, stop the rails server and empty Discourse’s cache. Then restart the server.

```sh
rm -rf tmp/cache
```

For the most part, we will rely on Discourse’s own styles. I just added some small tweaks to the `textarea` element to demonstrate how to add stylesheets to a plugin.

**`./assets/stylesheets/notebook.css`**:
```css
textarea {
  display: block;
  min-width: 500px;
  resize: vertical;
}
```

The stylesheet needs to be referenced from the `plugin.rb` file. You can also use Sass right away (e.g. by referencing a `notebook.scss` file) as this is what Discourse uses.

**`./plugin.rb`**:
```ruby
# name: notebook
# version: 0.3.0

enabled_site_setting :notebook_enabled

register_asset 'stylesheets/notebook.css'

# …
```

Finally, the form’s action is defined as something called `createNote`. From the template, we can tell that submitting the form (`on='submit'`) calls a `createNote` action which is passed `content` as an argument. Since we specify `content` as the `value` of the `textarea` component, whatever is written inside the text field will be passed to `createNote`.

**`./assets/javascripts/discourse/controllers/notebook.js.es6`**:
```js
import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createNote(content) {
      console.log(content);
    }
  }
});
```

The `actions` object holds all methods that are available as actions in a template. In its current state, the action just evaluates the assumption that the argument indeed holds the new note from the text field by logging it to the console.

## Sending data

Discourse uses stores to exchange data between client and server. The `createRecord()` method creates a record in a store determined by the first argument: The store type. I used `'note'` below which means that our note records will be stored in the *note store*.

**`./assets/javascripts/discourse/controllers/notebook.js.es6`**:
```js
import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createNote(content) {
      if (!content) {
        return;
      }

      const noteRecord = this.store.createRecord('note', {
        id: Date.now(),
        content: content
      });

      noteRecord.save()
        .then(console.log)
        .catch(console.error);
    }
  }
});
```

Changing the `createNote()` action method as shown above, a new record with the fields for the note’s ID and content will be created. Right now, we don’t need an ID. We just want to store the note. Later on, we will come across a reason why adding one is helpful.

<p class="marginalia note note--warning">Discourse’s store only allows non-zero integers as IDs (see <a href="https://meta.discourse.org/t/store-what-s-the-correct-type-of-a-record-id/92605">Store: What’s the correct type of a record ID?</a>).</p>

The record will eventually be sent to the server by calling the `save()` method. The `save()` method returns a promise. It resolves when it receives a positive response from the server. If an error occured, it will reject. Either way, the response will be logged to the console.

Except none of this works if you try it right now. An error will be logged reading “this.updateProperties is not a function”. That doesn’t really help us. We never called anything with the name `updateProperties`, but Discourse did.

Hidden in the implementation of its stores, Discourse expects the data model for the store records to fullfil certain criteria. It expects you to implement a model for the records you want to store in the store. To be precise, Discourse expects a model named after the store type you want to access. Since we specified `'note'` as our store type argument, it looks for a model called `note`:

<p class="marginalia note note--info">
  A data model describes the data’s structure. In our case, it says “a note has a content property”.
</p>

**`./assets/javascripts/discourse/models/note.js.es6`**:
```js
import RestModel from 'discourse/models/rest';

/**
 * Has to be implemented for `../controllers/notebook.js.es6` in order to use
 * Discourse’s store properly.
 */
export default RestModel.extend({
  /**
   * Required when sending PUT requests via Discourse’s store
   */
  updateProperties() {
    return this.getProperties('content');
  }
});
```

The `updateProperties()` method is called when storing records with an ID. If no ID is provided when creating the record, the `createProperties()` method needs to be implemented. Both methods are meant to return a list of properties that they store. If our record contained multiple fields (e.g. `content` and `author`), you can implement the method like this:

<p class="marginalia note note--info">
  A record’s ID is not part of the record’s data model; hence, it doesn’t need to be returned by <code>createProperties</code> or <code>updateProperties</code>.
</p>

```js
updateProperties() {
  return this.getProperties('content', 'author');
}
```

Now we’re talking. Trying to save a note should now result in an expected error: 404. Looking at the browser developer tools’ network tab, we can see a request to `localhost:3000/notes` that returns with a status code 404 (“Not Found”). The response body contains a helpful error message: “No route matches [PUT] "/notes/1534697038703"”. Remember that we created a route for the path `/notebook` in the beginnging? Now we need a route for the path `/notes/1534697038703`.

## Receiving data

First, we define a route in the `plugin.rb` file again. The error message already tells us everything we need to know: the path (`/notes/1534697038703`) and HTTP method (PUT). This weird number at the end of the path is the value of the ID we provided. It will change with every request so it needs to be dynamic.

**`./plugin.rb`**:
```ruby
# name: notebook
# version: 0.4.0

enabled_site_setting :notebook_enabled

register_asset 'stylesheets/notebook.css'

after_initialize do
  load File.expand_path('../app/controllers/notebook_controller.rb', __FILE__)
  load File.expand_path('../app/controllers/notes_controller.rb', __FILE__)

  Discourse::Application.routes.append do
    # Map the path `/notebook` to `NotebookController`’s `index` method
    get '/notebook' => 'notebook#index'

    put '/notes/:note_id' => 'notes#update'
  end
end
```

I also created another server-side controller to handle all data exchange for our plugin.

**`./app/controllers/notes_controller.rb`**:
```ruby
class NotesController < ApplicationController
  def update
    Rails.logger.info 'Called NotesController#update'

    note_id = params[:note_id]
    note = {
      'id' => note_id,
      'content' => params[:note][:content]
    }

    NoteStore.add_note(note_id, note)

    render json: { note: note }
  end
end
```

The controller’s `update` method receives a `params` object (in Ruby land, they call it a hash). In it are all parameters of the request. In the browser developer tools’ network tab, you can highlight a request and inspect things like the headers and response as well as the sent parameters.

Discourse expects action methods like `update` to include the created object in the response. This is done by returning a JSON object with a property named after the store type (i.e. `note` in our case) that holds the created object as its value.

## Make it a notebook in the back

We’re now able to receive notes on the server side, but we’re not storing them just yet. Discourse has a `PluginStore` class which allows each plugin to store its data in Discourse’s database. I wrote a little class to provide a cleaner interface between the `PluginStore` and the `NotesController`.

**`./app/note_store.rb`**:
```ruby
class NoteStore
  class << self
    def add_note(note_id, note)
      notes = PluginStore.get('notebook', 'notes') || {}
      notes[note_id] = note
      PluginStore.set('notebook', 'notes', notes)

      note
    end
  end
end
```

Whenever we access the plugin store, we need to be specific: We want to access the plugin store of the `notebook` plugin and we want to access its `notes` data. We don’t want to accidentally access the stores of other plugins.

Now, we also need to let the Ruby application know that it shoud load the `NoteStore` file.

**`./plugin.rb`**:
```ruby
# name: notebook
# version: 0.5.0

enabled_site_setting :notebook_enabled

register_asset 'stylesheets/notebook.css'

load File.expand_path('../app/note_store.rb', __FILE__)

after_initialize do
  # …
end
```

Finally, we can tie the two strings together: Before, we just logged the note and included it in the response object. Now, we will actually store it in Discourse’s database via our own `NoteStore` class.

**`./app/controllers/notes_controller.rb`**:
```ruby
class NotesController < ApplicationController
  def update
    Rails.logger.info 'Called NotesController#update'

    note_id = params[:note_id]
    note = {
      'id' => note_id,
      'content' => params[:note][:content]
    }

    NoteStore.add_note(note_id, note)

    render json: { note: note }
  end
end
```

## Round trip

From a user perspective, in its current state, our little plugin does a very bad job at explaining what happens. We can add a note to the notebook, but we only know that this actually happens when looking at logger output. The plugin page itself tells us nothing. We don’t even know which notes already exist. Let’s get some value out of storing all this data by displaying a list of existing notes.

Once more, we add a route to the `plugin.rb` file targetting `NotesController`.

**`./plugin.rb`**:
```ruby
# name: notebook
# version: 0.6.0

enabled_site_setting :notebook_enabled

register_asset 'stylesheets/notebook.css'

load File.expand_path('../app/note_store.rb', __FILE__)

after_initialize do
  load File.expand_path('../app/controllers/notebook_controller.rb', __FILE__)
  load File.expand_path('../app/controllers/notes_controller.rb', __FILE__)

  Discourse::Application.routes.append do
    get '/notebook' => 'notebook#index'

    get '/notes' => 'notes#index'
    put '/notes/:note_id' => 'notes#update'
  end
end
```

`NotesController` doesn’t have an `index` method, so we add it. The response will include an array of notes.

**`./app/controllers/notes_controller.rb`**:
```ruby
class NotesController < ApplicationController
  def index
    Rails.logger.info 'Called NotesController#index'
    notes = NoteStore.get_notes()

    render json: { notes: notes.values }
  end

  # …
end
```

Note how the `index` method returns a JSON object with a `notes` property (plural), whereas the `update` method contains a `note` property (singular) in its JSON object. A GET request for the path `/notes` expects a collection of things. You can read the request as “Get me all the notes that you know about”. For creating a note, a PUT request is sent out to `/notes/1534935124366`, saying “Put the note with ID 1534935124366 into the collection of notes”. Discourse follows this language internally; thus, the HTTP interface between front and back end needs to follow this naming convention as well.

`NoteStore` needs a `get_notes` method fetching the notes out of our plugin store.

**`./app/note_store.rb`**:
```ruby
class NoteStore
  class << self
    def get_notes
      PluginStore.get('notebook', 'notes') || {}
    end

    def add_note(note_id, note)
      notes = get_notes()
      notes[note_id] = note
      PluginStore.set('notebook', 'notes', notes)

      note
    end
  end
end
```

Next, retrieving all notes upon initializing the front-end controller is done in its `init` method. The call to `findAll()` returns a promise which upon resolving yields a `result` object. In it, the `content` property holds the content of the response body. That’s the array of notes we provided in the `NotesController`’s `index` method.

**`./assets/javascripts/discourse/controllers/notebook.js.es6`**:
```js
import Ember from 'ember';

export default Ember.Controller.extend({
  init() {
    this._super();
    this.set('notes', []);
    this.fetchNotes();
  },

  fetchNotes() {
    this.store.findAll('note')
      .then(result => {
        for (const note of result.content) {
          this.notes.pushObject(note);
        }
      })
      .catch(console.error);
  },

  // …
});
```

<p class="note note--info">
  The structure of the <code>result</code> object is an artifact of Discourse following the aforementioned naming convention: Distinquising between requests which deal with a single resource (e.g. “PUT /notes/137”) and the ones dealing with multiple resources (e.g. “GET /notes”). Discourse automatically transforms the JSON object in the response body into the correct data structure for <code>result.content</code> based on the kind of data that was requested. In the case of “GET /notes”, it’s an array of notes.
</p>

Finally, we display all notes in a basic list below our form:

**`./assets/javascripts/discourse/templates/notebook.hbs`**:
```html
{% raw %}<!-- … -->

{{#if notes}}
  <ul>
    {{#each notes as |note|}}
      <li>{{ note.content }}</li>
    {{/each}}
  </ul>
{{/if}}{% endraw %}
```

With a small tweak, we add new notes the same list right when we create them. This way, we don’t need to reload the page in order to see new notes.

**`./assets/javascripts/discourse/controllers/notebook.js.es6`**:
```js
import Ember from 'ember';

export default Ember.Controller.extend({
  // …

  actions: {
    createNote(content) {
      if (!content) {
        return;
      }

      const noteRecord = this.store.createRecord('note', {
        id: Date.now(),
        content: content
      });

      noteRecord.save()
        .then(result => {
          this.notes.pushObject(result.target);
        })
        .catch(console.error);
    }
  }
});
```

## Deleting notes

We could call it a day and be done with this exercise now, but I said that this ID we store with every note will become useful. Deleting a specific note requires a reference point, something to identify the note with. We could use the note’s content and delete the record in the back end that has the same content. While that would work, it’s not a good design. What if we want to be able to edit notes? That’s reasonable. With this approach, referencing notes would quickly become messy. That’s why databases usually store records with an explicit ID.

Following below are implementations for a “Delete note” feature.

**`./plugin.rb`**:
```ruby
# name: notebook
# version: 0.7.0

# …

after_initialize do
  # …

  Discourse::Application.routes.append do
    # …
    delete '/notes/:note_id' => 'notes#destroy'
  end
end
```

**`./app/controllers/notes_controller.rb`**:
```ruby
class NotesController < ApplicationController
  # …

  def destroy
    Rails.logger.info 'Called NotesController#destroy'

    NoteStore.remove_note(params[:note_id])

    render json: success_json
  end
end
```

**`./app/note_store.rb`**:
```ruby
class NoteStore
  class << self
    # …

    def remove_note(note_id)
      notes = get_notes()
      notes.delete(note_id)
      PluginStore.set('notebook', 'notes', notes)
    end
  end
end
```

**`./assets/javascripts/discourse/controllers/notebook.js.es6`**:
```js
import Ember from 'ember';

export default Ember.Controller.extend({
  // …

  actions: {
    // …

    deleteNote(note) {
      this.store.destroyRecord('note', note)
        .then(() => {
          this.notes.removeObject(note);
        })
        .catch(console.error);
    }
  }
});
```

**`./assets/javascripts/discourse/templates/notebook.hbs`**:
```html
{% raw %}{{#if notes}}
  <ul>
    {{#each notes as |note|}}
      <li>
        {{ note.content }}

        <button type="button" class="btn btn-danger" {{ action 'deleteNote' note }}>
          {{ i18n 'notebook.delete_note_label' }}
        </button>
      </li>
    {{/each}}
  </ul>
{{/if}}{% endraw %}
```

---

That’s it. That was quite a lot to unpack. You can find [the final plugin](https://github.com/kleinfreund/notebook) on GitHub.

I’m sure I made some mistakes while copying and updating code blocks, etc. I read this text a dozen times and always found something. So if there is something wrong, please let me know. Also, if something’s not clear, do the same. I’ll be happy to incorporate changes and correct mistakes.
