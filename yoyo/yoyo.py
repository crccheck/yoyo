import os

import ruamel.yaml as yaml
from .library import Library


library = Library()


def get_local_config(cwd=None) -> dict:
    if cwd is None:
        cwd = os.getcwd()
    with open(os.path.join(cwd, '.yoyo.yml')) as fh:
        data = yaml.safe_load(fh)
    return data


def main() -> None:
    config = get_local_config()
    for snippet in config.get('snippets', []):
        print(snippet)
