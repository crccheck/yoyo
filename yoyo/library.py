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
        if snippet.name not in self._snippets:
            self._snippets[snippet.name] = snippet

    def __len__(self):
        return len(self._snippets)

    def __getitem__(self, key):
        return self._snippets[key]

    def __str__(self):
        return f'Library({len(self)})'
