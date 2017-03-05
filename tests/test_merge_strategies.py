from yoyo.library import Library
from yoyo.merge_strategies import merge_json


library = Library()


def test_merge_json():
    print(library['simple-site'])
