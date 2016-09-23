YoYo (TBD)
==========

This helps you maintain snippets. Like [Yeoman] and [Cookiecutter], this is
designed to eliminate the boilerplate when starting a new project. Unlike those
projects, when you update a snippet, you can easily backport it to an existing
project!

  [Yeoman]: http://yeoman.io/
  [Cookiecutter]: https://cookiecutter.readthedocs.io/en/latest/

Usage
-----

### Snippets

Snippets are like [Yeoman generators], [Chef recipes], [Ansible roles],
[Homebrew formulas], etc.

A snippet can be as large or small as you can write. At the minimum, a snippet
is a directory that contains:

1. Meta information in a `.meta.yml`
2. A template file

An ideal meta would contain:

* Authorship - You, also doubles as the namespace
* Name - Something like you'd name a repository
* Version - [semver] style version string so consumers of your snippet can upgrade safely
* Homepage - A URL
* Tags - To help people find your snippet

The template file (or a whole directory) is just that: a template. If you
choose to create a complicated template, you can do that. But instead, you
should write lots of small/specific snippets instead a kitchen sink snippet. A
great example is the [Babel Setup] site. Each example is short and simple.

  [Yeoman generators]: http://yeoman.io/authoring/
  [Chef recipes]: https://docs.chef.io/recipes.html
  [Ansible roles]: http://docs.ansible.com/ansible/playbooks_roles.html
  [Homebrew formulas]: https://github.com/Homebrew/brew/blob/master/docs/Formula-Cookbook.md
  [semver]: http://semver.org/
  [Babel Setup]: https://babeljs.io/docs/setup/


### Configuration files

A configuration file basically just a list of what snippets your project should
have, along with any local overrides.
