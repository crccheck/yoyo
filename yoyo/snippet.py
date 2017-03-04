import os
from glob import glob


class Snippet:
    def __init__(self, path):
        self.path = path
        self.name = os.path.basename(path)
        # WISHLIST defer this
        self.files = glob(f'{path}/*', recursive=True)

    def __str__(self):
        return self.name
