YoYo (TBD)
==========

This is a tool to helps you maintain and use a library of snippets. Snippets
are those little bits of boilerplate that go in every project. But there's
more; as you update your snippets, you can backport those changes to your
existing project!

Like [Yeoman] and [Cookiecutter], this is designed to eliminate boilerplate
when starting a new project. Build a collection of snippets for your team and
get consistent code across all your projects.

  [Yeoman]: http://yeoman.io/
  [Cookiecutter]: https://cookiecutter.readthedocs.io/en/latest/


Usage
-----

### Snippets

Snippets are like [Yeoman generators], [Chef recipes], [Ansible roles],
[Homebrew formulas], etc. See the
[examples](https://github.com/crccheck/yoyo/tree/master/snippets) to get a
better idea.

A snippet can be as large or small as you can write. At the minimum, a snippet
is a directory that contains:

1. Meta information in a `.yoyo.yml`
2. A template file

An ideal meta would contain:

* Author - You, also doubles as the namespace
* Name - Something like you'd name a repository
* Description - A blurb about the snippet, will also be shown when it's installed.
* Homepage - A URL
* Keywords - To help people find your snippet

All this is optional, if you included it in `package.json`, there's no reason
to duplicate it here.

So we can update existing inserted snippets, you should specify:

* `firstMarker` - One of:
  * `same first line` *default*
  * a JavaScript style regexp (example: `/-{80}/`). It is up to the author to
    anchor the regular expression as they intended.
  * a line number (example: `5`)

And one of:

* `lastMarker` - One of:
  * `same last line` (will ignore blank lines)
  * a JavaScript style regexp (example: `/-{80}/`)
  * a line number (example: `5`)
* `length` - One of:
  * `same lines`
  * `same blank lines` This *includes* trailing blank lines
  * the number of lines (example: '5')

We could go nuts with this, but as long as you only have simple snippets, worse
case scenario, the user has to some manual text fixing. That is greatly
preferred to adding complexity here.

The template file (or a whole directory) is just that: a template. If you
choose to create a complicated template, you can do that. Instead, you should
write lots of small snippets instead kitchen sinks.

#### Where it looks for snippets

Snippets are searched for in the following order:

1. local `./snippets`
2. `node_modules/...`
3. environment variable
4. bundled snippets

  [Yeoman generators]: http://yeoman.io/authoring/
  [Chef recipes]: https://docs.chef.io/recipes.html
  [Ansible roles]: http://docs.ansible.com/ansible/playbooks_roles.html
  [Homebrew formulas]: https://github.com/Homebrew/brew/blob/master/docs/Formula-Cookbook.md
  [semver]: http://semver.org/
  [Babel Setup]: https://babeljs.io/docs/setup/


### Configuration files

A configuration file basically just a list of what snippets your project should
have, along with any local overrides.

It's also named `.yoyo.yml`.

Notes
-----

It's always `.yoyo.yml` and never `.yoyo.yaml`. I don't see a reason to support
both `.yml` and `.yaml` and it's always bothered me that I had to choose.
