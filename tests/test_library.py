from yoyo.library import Library


def test_Library_init():
    Library()


def test_Library_add():
    library = Library()
    library.add('/some/path')
    assert(library._snippets['path'])


def test_Library_str():
    library = Library()
    assert str(library)
