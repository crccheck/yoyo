import os


class Snippet:
    def __init__(self, path):
        self.path = path
        self.name = os.path.basename(path)