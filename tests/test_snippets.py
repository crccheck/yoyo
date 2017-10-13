import pytest

from yoyo.snippet import File, Snippet, find_strategy
from yoyo.merge_strategies import merge_json


@pytest.fixture
def snippet():
    return Snippet('/foo')


def test_find_strategy_works(snippet):
    template_file = File('/foo/package.json', snippet)

    assert find_strategy(template_file) == merge_json


def test_find_strategy_with_nonexistent(snippet):
    template_file = File('/foo/xyzzy', snippet)

    assert find_strategy(template_file) is None
