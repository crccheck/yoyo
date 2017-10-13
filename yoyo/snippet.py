import os
import shutil
from glob import glob

from .merge_strategies import merge_json


def find_strategy(template_file):
    root, ext = os.path.splitext(template_file.name)
    if ext == '.json':
        return merge_json

    return None


class File:
    def __init__(self, abspath, snippet):
        self.path = abspath
        self.name = abspath.replace(snippet.path, '').lstrip('/')

    @property
    def contents(self):
        with open(self.path) as fh:
            return fh.read()

    def __str__(self):
        return self.path

    def __repr__(self):
        return self.__str__()


class Snippet:
    _files = None

    def __init__(self, path: str):
        self.path = path
        self.name = os.path.basename(path)

    def run(self, cwd: str):
        for template_file in self.files:
            local_path = os.path.join(cwd, template_file.name)
            print(f'merging {template_file} with {local_path}')
            if os.path.isfile(local_path):
                strategy = find_strategy(template_file)
                if strategy:
                    output = strategy(local_path, template_file)
                else:
                    output = template_file.contents

                # Concatenate
                with open(local_path, 'a') as lf:
                    return lf.write(output)

            shutil.copy(template_file.path, local_path)

    @property
    def files(self):
        if not self._files:
            self._files = [File(x, self) for x in glob(f'{self.path}/*', recursive=True)]
        return self._files

    def __getitem__(self, key):
        for item in self.files:
            if item.path == key or item.name == key:
                return item

        raise ValueError(f"'{key}' is not in files as a name or path")

    def __str__(self):
        return self.name
