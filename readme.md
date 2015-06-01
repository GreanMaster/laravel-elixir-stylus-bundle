## laravel-elixir-stylus-bundle
Laravel Elixir Stylus bundle with [axis](https://github.com/jenius/axis), [nib](https://github.com/tj/nib), [typographic](https://github.com/corysimmons/typographic), [lost grid](https://github.com/corysimmons/lost) and [autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer)

## Installation
`npm install laravel-elixir-stylus-bundle --save-dev`

## Usage

This is a simple wrapper around Laravel Elixir. Add it to your Elixir-enhanced Gulpfile, like so:

```javascript
var elixir = require('laravel-elixir');

require('laravel-elixir-stylus-bundle');

elixir(function(mix) {
   mix.stylusBundle();
});
```

This will scan your `resources/assets/stylus` directory for all files except `_` prefix file and diractory inside `stylus` diractory ex. `_app.stylus` `resources/assets/stylus/font/` will not compile

If you want minify and sourcemap just use `--production` flag like `gulp --production`

For watch file just use `gulp watch`