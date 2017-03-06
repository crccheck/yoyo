import pytest

from yoyo.snippet import File, Snippet, find_strategy
from yoyo.merge_strategies import merge_json


@pytest.fixture
def snippet():
    return Snippet('/foo')


def test_find_strategy(snippet):
    template_file = File('/foo/package.json', snippet)

    assert find_strategy(template_file) == merge_json
