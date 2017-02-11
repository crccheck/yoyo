import os

import ruamel.yaml as yaml


library = set()


def build_library(base=None) -> None:
    """
    Build the internal library of what snippets are available.
    """
    if base is None:
        base = os.path.join(os.path.dirname(__file__), '..', 'snippets')
    paths = [os.path.abspath(os.path.join(base, x)) for x in os.listdir(base)]
    for path in paths:
        library.add(path)


# read .yoyo.yml
with open('.yoyo.yml') as fh:
    data = yaml.safe_load(fh)
