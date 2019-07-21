import json
import pprint

from ontology.sdk import Ontology
from ontology.wallet.account import AccountData
from ontology.wallet.wallet import WalletData


class Network(object):
    def __init__(self, mode, *arg, **kwargs):
        self.sdk = Ontology()
        if mode == 'main':
            self.sdk.rpc.connect_to_main_net()
            self.sdk.restful.connect_to_main_net()
            self.sdk.websocket.connect_to_main_net()
        elif mode == 'test':
            self.sdk.rpc.connect_to_test_net()
            self.sdk.restful.connect_to_test_net()
            self.sdk.websocket.connect_to_test_net()
        elif mode == 'local':
            self.sdk.rpc.connect_to_localhost()
            self.sdk.restful.connect_to_localhost()
            self.sdk.websocket.connect_to_localhost()
        else:
            rpc_address = 'http://10.112.104.226:20336'
            restful_address = 'http://10.112.104.226:20334'
            websocket_address = 'http://10.112.104.226:20335'
            self.sdk.rpc.set_address(rpc_address)
            self.sdk.restful.set_address(restful_address)
            self.sdk.websocket.set_address(websocket_address)

    def get_balance(self, base58_address='AatF7ATuecga82vk8wBqjZizCPUce4rpZ5'):
        address_balance = self.sdk.rpc.get_balance(base58_address)
        return address_balance

    def get_block_count(self):
        count = self.sdk.rpc.get_block_count()
        return count

    def get_block_by_hash(self, block_hash):
        block = self.sdk.rpc.get_block_by_hash(block_hash)
        return block

    def get_block_by_height(self, height=0):
        block = self.sdk.rpc.get_block_by_height(height=height)
        return block

    def get_block_hash_by_height(self, height):
        block_hash = self.sdk.rpc.get_block_hash_by_height(height)
        return block_hash

    def get_contract_info_by_txhash(self, contract_txhash):
        contract = self.sdk.rpc.get_contract_event_by_tx_hash(contract_txhash)
        return contract

    def get_contract_info_by_height(self, height):
        contract = self.sdk.rpc.get_contract_event_by_height(height)
        return contract


class Wallet(object):

    def __init__(self):
        self.wallet = WalletData()

    def add_account(self, b58_address='AatF7ATuecga82vk8wBqjZizCPUce4rpZ5'):
        acct = AccountData(b58_address)
        self.wallet.add_account(acct)

    def remove_account(self, b58_address='AatF7ATuecga82vk8wBqjZizCPUce4rpZ5'):
        self.wallet.remove_account(b58_address)

if __name__ == '__main__':
    # pprint.pprint(Network(mode='local').get_block_count())
    for i in range(20100,20228):
        pprint.pprint(Network(mode='local').get_contract_info_by_height(i))
        # pprint.pprint(Network(mode='local').get_block_by_height(i))

    # a = Wallet()
    # a.add_account()
    # a.remove_account()
    # block22483 = {
    #     "Hash": "d234ab04b62022b57da35ed185d3240e580b53b09620d5c5cf57fe970eee0e4e",
    #     "Size": 2051,
    #     "Header": {
    #         "Version": 0,
    #         "PrevBlockHash": "12024acfbe9890c6b7bdf4f8696a71767e84c55f94c31b9d728ceae6cbe2e8fa",
    #         "TransactionsRoot": "02f78981cd5df07b2c1a32373dc9acf435a03db92fe207e7998769d2ba5aad52",
    #         "BlockRoot": "f707d7989878371e2af091eaa0e89a79f40ad3cacdabf8a2abfd68860fd59dd7",
    #         "Timestamp": 1530949224,
    #         "Height": 22483,
    #         "ConsensusData": 15581606179874565933,
    #         "ConsensusPayload": "7b226c6561646572223a382c227672665f76616c7565223a22424b74396d337a647874476f415a456437795575416d4d2b58434d4e6f51544f64496c5241717a523167556a5563477a3073534353544b746c53396b53557544582f346b5131526136427161706f674f5365494d6767673d222c227672665f70726f6f66223a2269746858376d6f576447776b4463396172612f3337623245595638307751753570322b6a32615276633844784965656867494a6a57676c6f716435574b624777654b6335325331326f4469556d3843376469375657773d3d222c226c6173745f636f6e6669675f626c6f636b5f6e756d223a3230322c226e65775f636861696e5f636f6e666967223a6e756c6c7d",
    #         "NextBookkeeper": "AFmseVrdL9f9oyCzZefL9tG6UbvhPbdYzM",
    #         "Bookkeepers": [
    #             "02765d98bb092962734e365bd436bdc80c5b5991dcf22b28dbb02d3b3cf74d6444",
    #             "022e911fb5a20b4b2e4f917f10eb92f27d17cad16b916bce8fd2dd8c11ac2878c0",
    #             "0251f06bc247b1da94ec7d9fe25f5f913cedaecba8524140353b826cf9b1cbd9f4",
    #             "022bf80145bd448d993abffa237f4cd06d9df13eaad37afce5cb71d80c47b03feb",
    #             "02765d98bb092962734e365bd436bdc80c5b5991dcf22b28dbb02d3b3cf74d6444",
    #             "02bcdd278a27e4969d48de95d6b7b086b65b8d1d4ff6509e7a9eab364a76115af7"
    #         ],
    #         "SigData": [
    #             "a3838fb1b5c28e8e1992a7fdfd397ff08e72c63b303c1ef70fcb7263d05c687c903d0fa20377b91ba9693fead95ccf042ca815085a5a1d1f8e9afda932900f60",
    #             "49c0a6bf9485a245ee46638f7c4ea3b65abcfa5ec00984db5c5cf93fb99b94bcd29c128cc5855f0713fb7b4fd89c80ef3417dc8c288e336a8b463b90b16cd942",
    #             "444129a8297541545f94a6e23a0907a09d3bc4f5d04d10ac99373c91b245c8dd65f2f889bd6fc16c976afe99c5fea9395fdeee76ab852557413f5d389fedb1a3",
    #             "71629e1c6e469320331410be46cbc7cd67d173d11dd84373da1162f4c72af1d0069c774eb3aabe3d421f84853555729feba1762ff690b4a1fefac9180b83b61c",
    #             "645a17f629a44c65a6ca444a88500048b891e203bb324f06099060b9df12655f04bf2218cffc93ffdf0efde44f354c34d276e6b63c85f242b3f83d6d51ebb9e9",
    #             "baff1bb2f22e5d2c666341086c37319525c53a7d8fe5c800ad787e5975619f3d38c082c43479530c5994148c0067c72c98a7499b2bcc7e95e7a4ac120178bb83"
    #         ],
    #         "Hash": "d234ab04b62022b57da35ed185d3240e580b53b09620d5c5cf57fe970eee0e4e"
    #     },
    #     "Transactions": [
    #         {
    #             "Version": 0,
    #             "Nonce": 1530949220,
    #             "GasPrice": 500,
    #             "GasLimit": 20000,
    #             "Payer": "APKUmRKRdqunZHLuHyLu2h3zU8jMKFQtR9",
    #             "TxType": 209,
    #             "Payload": {
    #                 "Code": "00c66b1452c3176957d3b1d60ef3ad884e5f043710fecca26a7cc814e39f376bfbfad221819330a4b2e6d225be58d5396a7cc8576a7cc86c51c1087472616e736665721400000000000000000000000000000000000000010068164f6e746f6c6f67792e4e61746976652e496e766f6b65"
    #             },
    #             "Attributes": [],
    #             "Sigs": [
    #                 {
    #                     "PubKeys": [
    #                         "02e364992535a136283b3f9d821b4d5adb84fd2ecf2484b9021e1fb8f9907e9399"
    #                     ],
    #                     "M": 1,
    #                     "SigData": [
    #                         "2764b462e6f25d199f7a8b08eb3ce561d07ff133f52e5397da7f8f3c9c5c4ba37d08d05bfdcb711aca9da7e856df4751dd31fd57fa1694b55ca73c4685d3cc48"
    #                     ]
    #                 }
    #             ],
    #             "Hash": "bdc6d187ed807df80d5b493dba9484029b48e0e81ce44f7bf74bf05c84ad80fd",
    #             "Height": 0
    #         },
    #         {
    #             "Version": 0,
    #             "Nonce": 1530949219,
    #             "GasPrice": 500,
    #             "GasLimit": 20000,
    #             "Payer": "APKUmRKRdqunZHLuHyLu2h3zU8jMKFQtR9",
    #             "TxType": 209,
    #             "Payload": {
    #                 "Code": "00c66b1452c3176957d3b1d60ef3ad884e5f043710fecca26a7cc814ea5d62aaf78d7ac22fca0dfcedfe65fc6196df826a7cc8536a7cc86c51c1087472616e736665721400000000000000000000000000000000000000010068164f6e746f6c6f67792e4e61746976652e496e766f6b65"
    #             },
    #             "Attributes": [],
    #             "Sigs": [
    #                 {
    #                     "PubKeys": [
    #                         "02e364992535a136283b3f9d821b4d5adb84fd2ecf2484b9021e1fb8f9907e9399"
    #                     ],
    #                     "M": 1,
    #                     "SigData": [
    #                         "556614aa35dc9b4b9752b26ff446e298c43cc879f2be99230f7dfe015bf0c088e1e94c390c83eccaa5b459a915526b2a1fc5749c0a1f483e76d53deac2a78c68"
    #                     ]
    #                 }
    #             ],
    #             "Hash": "1382cefa1ef0356cd72ac3b4e42c1c8418c8b7507c231fb99eeb02e8384f25fe",
    #             "Height": 0
    #         },
    #         {
    #             "Version": 0,
    #             "Nonce": 1530949219,
    #             "GasPrice": 500,
    #             "GasLimit": 20000,
    #             "Payer": "APKUmRKRdqunZHLuHyLu2h3zU8jMKFQtR9",
    #             "TxType": 209,
    #             "Payload": {
    #                 "Code": "00c66b1452c3176957d3b1d60ef3ad884e5f043710fecca26a7cc814e7466d38dd1f1e8c6d2de46101a70b1fbb7eb21b6a7cc801106a7cc86c51c1087472616e736665721400000000000000000000000000000000000000010068164f6e746f6c6f67792e4e61746976652e496e766f6b65"
    #             },
    #             "Attributes": [],
    #             "Sigs": [
    #                 {
    #                     "PubKeys": [
    #                         "02e364992535a136283b3f9d821b4d5adb84fd2ecf2484b9021e1fb8f9907e9399"
    #                     ],
    #                     "M": 1,
    #                     "SigData": [
    #                         "2d23c2001587f30b7645c735a2d18fee785d93691ab8342b42d815c7fc7529fe35f9cc37650a5a6a83d5c58a6db136de96705d8e4cdc80f9ae175932289463cf"
    #                     ]
    #                 }
    #             ],
    #             "Hash": "cd0254a74610c3722b9e86bf3188d94734eebbef2bb897a7a5ddc444d9dce758",
    #             "Height": 0
    #         },
    #         {
    #             "Version": 0,
    #             "Nonce": 1530949219,
    #             "GasPrice": 500,
    #             "GasLimit": 20000,
    #             "Payer": "APKUmRKRdqunZHLuHyLu2h3zU8jMKFQtR9",
    #             "TxType": 209,
    #             "Payload": {
    #                 "Code": "00c66b1452c3176957d3b1d60ef3ad884e5f043710fecca26a7cc814e3b3ab4a7f74469f83f6d06f3c017777cc27c8856a7cc8011a6a7cc86c51c1087472616e736665721400000000000000000000000000000000000000010068164f6e746f6c6f67792e4e61746976652e496e766f6b65"
    #             },
    #             "Attributes": [],
    #             "Sigs": [
    #                 {
    #                     "PubKeys": [
    #                         "02e364992535a136283b3f9d821b4d5adb84fd2ecf2484b9021e1fb8f9907e9399"
    #                     ],
    #                     "M": 1,
    #                     "SigData": [
    #                         "8a9419d531b571bd7734aadff811fb18790cbd786a51158435b129248399668c9abc7ff73237d8e126c6bba16d245e07b4ccad18f801ea1e6d05d0e6ad081a28"
    #                     ]
    #                 }
    #             ],
    #             "Hash": "492ffcd41bcac221603dea60ace1ef863d692fa495fcab9d03c88d0b7b282504",
    #             "Height": 0
    #         }
    #     ]
    # }
    # transaction_24883 = [{'GasConsumed': 10000000,
    #                       'Notify': [{'ContractAddress': '0100000000000000000000000000000000000000',
    #                                   'States': ['transfer',
    #                                              'APKUmRKRdqunZHLuHyLu2h3zU8jMKFQtR9',
    #                                              'AcXRmbjJcgCj64SWmBR64nU3d5EmFNiqLe',
    #                                              7]},
    #                                  {'ContractAddress': '0200000000000000000000000000000000000000',
    #                                   'States': ['transfer',
    #                                              'APKUmRKRdqunZHLuHyLu2h3zU8jMKFQtR9',
    #                                              'AFmseVrdL9f9oyCzZefL9tG6UbviEH9ugK',
    #                                              10000000]}],
    #                       'State': 1,
    #                       'TxHash': 'bdc6d187ed807df80d5b493dba9484029b48e0e81ce44f7bf74bf05c84ad80fd'},
    #                      {'GasConsumed': 10000000,
    #                       'Notify': [{'ContractAddress': '0100000000000000000000000000000000000000',
    #                                   'States': ['transfer',
    #                                              'APKUmRKRdqunZHLuHyLu2h3zU8jMKFQtR9',
    #                                              'Ad95dvHLTCuTsDGtrYrzhVwTmAVapEgkT1',
    #                                              3]},
    #                                  {'ContractAddress': '0200000000000000000000000000000000000000',
    #                                   'States': ['transfer',
    #                                              'APKUmRKRdqunZHLuHyLu2h3zU8jMKFQtR9',
    #                                              'AFmseVrdL9f9oyCzZefL9tG6UbviEH9ugK',
    #                                              10000000]}],
    #                       'State': 1,
    #                       'TxHash': '1382cefa1ef0356cd72ac3b4e42c1c8418c8b7507c231fb99eeb02e8384f25fe'},
    #                      {'GasConsumed': 10000000,
    #                       'Notify': [{'ContractAddress': '0100000000000000000000000000000000000000',
    #                                   'States': ['transfer',
    #                                              'APKUmRKRdqunZHLuHyLu2h3zU8jMKFQtR9',
    #                                              'Acrk796vL3RHo3Hz4n2CCuWsXxpKhDMGui',
    #                                              16]},
    #                                  {'ContractAddress': '0200000000000000000000000000000000000000',
    #                                   'States': ['transfer',
    #                                              'APKUmRKRdqunZHLuHyLu2h3zU8jMKFQtR9',
    #                                              'AFmseVrdL9f9oyCzZefL9tG6UbviEH9ugK',
    #                                              10000000]}],
    #                       'State': 1,
    #                       'TxHash': 'cd0254a74610c3722b9e86bf3188d94734eebbef2bb897a7a5ddc444d9dce758'},
    #                      {'GasConsumed': 10000000,
    #                       'Notify': [{'ContractAddress': '0100000000000000000000000000000000000000',
    #                                   'States': ['transfer',
    #                                              'APKUmRKRdqunZHLuHyLu2h3zU8jMKFQtR9',
    #                                              'AcXrGfwKLgtJtDgfZbCWTknDrv2C4bCMzt',
    #                                              26]},
    #                                  {'ContractAddress': '0200000000000000000000000000000000000000',
    #                                   'States': ['transfer',
    #                                              'APKUmRKRdqunZHLuHyLu2h3zU8jMKFQtR9',
    #                                              'AFmseVrdL9f9oyCzZefL9tG6UbviEH9ugK',
    #                                              10000000]}],
    #                       'State': 1,
    #                       'TxHash': '492ffcd41bcac221603dea60ace1ef863d692fa495fcab9d03c88d0b7b282504'}]
