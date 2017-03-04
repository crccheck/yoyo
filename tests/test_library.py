import pytest

from yoyo.library import Library


@pytest.fixture
def library():
    return Library()


def test_Library_init(library):
    assert library


def test_Library_add(library):
    library.add('/some/path')
    assert(library._snippets['path'])


def test_Library_str(library):
    assert str(library)
