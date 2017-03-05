import os
import shutil
from glob import glob


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
                with open(local_path, 'a') as lf:
                    lf.write(template_file.contents)
            else:
                shutil.copy(template_file.path, local_path)

    @property
    def files(self):
        if not self._files:
            self._files = [File(x, self) for x in glob(f'{self.path}/*', recursive=True)]
        return self._files

    def __str__(self):
        return self.name
