import os


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
                self.add(path)

    def add(self, path) -> None:
        self._snippets[os.path.basename(path)] = path

    def get(self, name):
        pass

    def __str__(self):
        n_snippets = len(self._snippets)
        return f'Library({n_snippets})'
