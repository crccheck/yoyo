import pytest

from yoyo.library import Library


@pytest.fixture
def library():
    return Library()


def test_init(library):
    assert library


def test_add(library):
    library.add('/some/path')
    assert(library._snippets['path'])


def test_getitem(library):
    library.add('/some/path')
    assert library['path']


def test_str(library):
    assert 'Library' in str(library)
