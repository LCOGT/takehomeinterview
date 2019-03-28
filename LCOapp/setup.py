from setuptools import setup

setup(name='LCOapp',
      version='1.0.0',
      description='Allows the user to create a new planet with its unique information, as well as view planets already in the database.',
      author='Rishika Singh',
      author_email='rishikasb@gmail.com',
      packages=['LCOapp'],
      entry_points={
          'console_scripts': ['LCOapp=LCOapp.__main__:main'],
      },
      license="AGPL-3.0-or-later",
      zip_safe=False)
