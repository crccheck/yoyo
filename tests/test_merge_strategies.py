from yoyo.library import Library
from yoyo.merge_strategies import merge_json


library = Library()


def test_merge_json_trivial():
    assert merge_json('{}', '{}').strip() == '{}'


def test_merge_json_identity():
    snippet = library['simple-site']
    contents = snippet['package.json'].contents
    assert merge_json(contents, contents).strip() == contents.strip()


def test_merge_json_additive():
    snippet = library['simple-site']
    contents = snippet['package.json'].contents
    assert merge_json('{}', contents).strip() == contents.strip()


def test_merge_json_preserves_existing():
    snippet = library['simple-site']
    contents = snippet['package.json'].contents
    assert merge_json(contents, '{}').strip() == contents.strip()


def test_merge_json_updates():
    assert merge_json('{"a":"foo"}', '{"a":"bar"}').strip() == '{\n  "a": "bar"\n}'
