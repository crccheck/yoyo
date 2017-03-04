import os

from .snippet import Snippet


class Library:
    def __init__(self, *search_dirs):
        self._snippets = {}
        dirs = list(search_dirs)
        dirs.append(
            os.path.join(os.path.dirname(__file__), '..', 'snippets'))
        for directory in dirs:
            paths = [os.path.abspath(os.path.join(directory, x))
                     for x in os.listdir(directory)]
            for path in paths:
                self.add(Snippet(path))

    def add(self, snippet: Snippet) -> None:
        self._snippets[snippet.name] = snippet

    def __getitem__(self, key):
        return self._snippets[key]

    def __str__(self):
        n_snippets = len(self._snippets)
        return f'Library({n_snippets})'
