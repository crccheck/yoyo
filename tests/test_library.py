import pytest

from yoyo.library import Library
from yoyo.snippet import Snippet


@pytest.fixture
def library():
    return Library()


def test_init(library):
    assert library


def test_add(library):
    library.add(Snippet('/some/path'))
    assert(library._snippets['path'])


def test_add_ignores_existing(library):
    library.add(Snippet('/some/path/foo'))
    original_len = len(library)

    library.add(Snippet('/other/path/foo'))

    assert len(library) == original_len
    assert library['foo'].path == '/some/path/foo'


def test_getitem(library):
    library.add(Snippet('/some/path'))
    assert library['path']


def test_str(library):
    assert 'Library' in str(library)
