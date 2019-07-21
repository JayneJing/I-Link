import time
from flask import Blueprint, request, jsonify
from tools.db import DBSession, Donator, Charity, Recipient, Project, Transaction
from sqlalchemy import or_, and_
from tools.ontology_sdk import Network
from tools.assist import Config

transaction = Blueprint('transaction', __name__)


@transaction.route('/', methods=['GET'])
def trans_root():
    return 'trans_root'


@transaction.route('/list')
def list():
    type = request.args['type']
    wallet_address = request.args['wallet_address']
    session = DBSession()
    if type == 'all':
        # result = session.query(Transaction, Recipient).outerjoin(Recipient,
        #                                                          Transaction.remittee == Recipient.wallet_address).filter(
        #     or_(Transaction.payer == wallet_address, Transaction.remittee == wallet_address)).all()
        result = session.query(Transaction).filter(or_(Transaction.payer == wallet_address, Transaction.remittee == wallet_address)).all()

    elif type == 'payer':
        # result = session.query(Transaction, Recipient).outerjoin(Recipient,
        #                                                          Transaction.remittee == Recipient.wallet_address).filter(
        #     Transaction.payer == wallet_address).all()
        result = session.query(Transaction).filter(Transaction.payer == wallet_address).all()
    elif type == 'remittee':
        result = session.query(Transaction).filter(Transaction.remittee == wallet_address).all()
    else:
        session.close()
        return 'Wrong Transation Type', 400
    session.close()
    print(result)
    # res = sorted([{'amount': trans[0].amount,
    #                'walletAddress': wallet_address,
    #                'payer': trans[0].payer,
    #                'remittee': trans[0].remittee,
    #                'height': trans[0].height,
    #                'trans_time': time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(trans[0].trans_time)),
    #                'txhash': trans[0].txhash,
    #                # 'legal': 'true' if trans[1] else 'false'
    #                'legal': trans[0].legal
    #                } for trans in result], key=lambda x: x['trans_time'], reverse=True)
    res = sorted([{'amount': trans.amount,
                   'walletAddress': wallet_address,
                   'payer': trans.payer,
                   'remittee': trans.remittee,
                   'height': trans.height,
                   'trans_time': time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(trans.trans_time)),
                   'txhash': trans.txhash,
                   'legal': trans.legal
                   } for trans in result], key=lambda x: x['trans_time'], reverse=True)
    return jsonify(res)



@transaction.route('vested')
def vested():
    session = DBSession()
    try:
        result = session.query(Transaction, Charity).outerjoin(Charity,
                                                               Transaction.remittee == Charity.wallet_address).filter(
            Charity.role == None).all()
    except:
        session.close()
        return 'Wrong Transation Type', 400
    session.close()
    res = sorted([{'amount': trans[0].amount,
                   'payer': trans[0].payer,
                   'remittee': trans[0].remittee,
                   'height': trans[0].height,
                   'trans_time': time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(trans[0].trans_time)),
                   'txhash': trans[0].txhash,
                   'legal': 'true' if trans[1] else 'false'
                   } for trans in result], key=lambda x: x['trans_time'], reverse=True)
    return jsonify(res)


@transaction.route('/legal')
def trans_legal_verify():
    wallet_address = request.args.get('remittee_address')
    session = DBSession()
    result = session.query(Project).filter(
        and_(Project.wallet_address == wallet_address, Project.status == 'In process')).first()
    session.close()
    if result:
        res = 'true'
    else:
        res = 'false'
    return jsonify(res)


def update_trans_from_block():
    while True:
        try:
            pre_height = int(Config().get_value('CHAIN', 'height'))
            now_height = Network('local').get_block_count()
            for height in range(pre_height + 1, now_height):
                try:
                    session = DBSession()
                    block_info = Network('local').get_block_by_height(height)
                    timestamp = block_info['Header']['Timestamp']
                    trans_list = Network('local').get_contract_info_by_height(height)
                    trans_orm_list = []
                    for trans in trans_list:
                        notify = trans['Notify']
                        try:
                            for trans_info in notify:
                                if trans_info['ContractAddress'] == '0100000000000000000000000000000000000000':
                                    project = session.query(Project).filter(
                                        Project.wallet_address == trans_info['States'][2]).first()
                                    institusion = session.query(Charity).filter(
                                        Charity.wallet_address == trans_info['States'][2]).first()
                                    if project:
                                        current_money = float(project.current_money) + float(trans_info['States'][3])
                                        if current_money >= float(project.money):
                                            status = 'Finish'
                                        else:
                                            status = 'In process'

                                        session.query(Project).filter(
                                            Project.wallet_address == trans_info['States'][2]).update(
                                            {"current_money": current_money, 'status': status})
                                    transaction = Transaction(txhash=trans['TxHash'],
                                                              height=height,
                                                              trans_time=timestamp, payer=trans_info['States'][1],
                                                              remittee=trans_info['States'][2],
                                                              amount=float(trans_info['States'][3]),
                                                              legal='true' if project or institusion else 'false')
                                    trans_orm_list.append(transaction)
                        except Exception as e:
                            print('*' * 20)
                            print(e)
                            print(trans['TxHash'])
                            print(height)
                    session.add_all(trans_orm_list)
                    session.commit()
                    session.close()
                    Config().set_value('CHAIN', 'height', str(height))
                    # print('finish: {}'.format(height))
                except Exception as e:
                    print('=' * 20)
                    print(e)
                    print(height)
                # time.sleep(1)

        except Exception as e:
            print(e)


if __name__ == '__main__':
    update_trans_from_block()
    # n =Network('local').get_block_by_height(10000)['Header']['Timestamp']