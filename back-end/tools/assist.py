import os
from configparser import SafeConfigParser

class Config(object):

    def __init__(self):
        self.apppath = '/Users/liujing/BlockChainProjects/CharityChain'
        self.parser = SafeConfigParser()
        self.parser.read(self.apppath + '/tools/config.ini')
        return

    def get_value(self, section, key):
        return self.parser.get(section, key)

    def set_value(self,section, key, value):
        self.parser.set(section, key, value)
        return self.parser.write(open(self.apppath + '/tools/config.ini', 'w'))
