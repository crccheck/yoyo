from yoyo.library import Library
from yoyo.merge_strategies import merge_json


library = Library()


def test_merge_json_trivial():
    assert merge_json('{}', '{}') == '{}'

    # snippet = library['simple-site']
    # merge_json(snippet['package.json'].contents, )
