from flask import Blueprint, request, jsonify
from tools.db import DBSession, Donator, Charity, Recipient

credit = Blueprint('credit', __name__)


@credit.route('/')
def root():
    return 'welcome to credit'
@credit.route('/register', methods=['POST'])
def register():
    wallet_address = request.json['wallet_address']
    passwd = request.json['password']
    session = DBSession()
    try:
        session.query(Recipient).filter(Recipient.wallet_address == wallet_address).update({"password": passwd})
        session.commit()
        session.close()
        return "Register Success", 201
    except:
        session.close()
        return 'Error user_type', 400

def pass_decode(passwd,encode_private):
    return 'Decode buy private_pass on AES success'

@credit.route('/buy', methods=['GET','POST'])
def buy():
    wallet_address = request.json['wallet_address']
    encode_private = request.json['encode_private']
    info = request.json['info']
    # passwd = session.query(Recipient.passwd).filter(Recipient.wallet_address == wallet_address).first()
    passwd = '123456'
    private_key = pass_decode(passwd,encode_private)
    # use private key to sign an vaild trans
    try:
        return jsonify(info)
    except:
        return 'Error password', 400
