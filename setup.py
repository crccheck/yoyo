from setuptools import setup

setup(
    name='yoyo',
    version='0.0.0',
    description='Snippets',
    long_description=open('README.rst').read(),
    author='Chris Chang',
    author_email='c@crccheck.com',
    url='https://github.com/crccheck/yoyo',
    packages=['yoyo'],
    # FIXME this does not work
    include_package_data=True,
    entry_points={
        'console_scripts': [
            'yoyo = yoyo:main',
        ],
    },
    zip_safe=False,
    license='Apache',
    classifiers=[
    ],
)
