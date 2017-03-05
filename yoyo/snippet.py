import os
import shutil
from glob import glob


class Snippet:
    def __init__(self, path: str):
        self.path = path
        self.name = os.path.basename(path)

    def run(self, cwd: str):
        files = glob(f'{self.path}/*', recursive=True)
        for template_path in files:
            relative_path = template_path.replace(self.path, '').lstrip('/')
            local_path = os.path.join(cwd, relative_path)
            print(f'merging {template_path} with {local_path}')
            if os.path.isfile(local_path):
                with open(local_path, 'a') as lf, open(template_path, 'r') as tf:
                    lf.write(tf.read())
            else:
                shutil.copy(template_path, local_path)

    def __str__(self):
        return self.name
