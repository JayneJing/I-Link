from flask import Blueprint, request, jsonify
from tools.db import DBSession, Donator, Charity, Recipient

user = Blueprint('user', __name__)


@user.route('/login')
def login():
    wallet_address = request.args.get('walletAddress')
    role = request.args.get('role')
    session = DBSession()
    if role == 'donator':
        result = session.query(Donator).filter(Donator.wallet_address == wallet_address).first()
    elif role == 'recipient':
        result = session.query(Recipient).filter(Recipient.wallet_address == wallet_address).first()
    elif role == 'charity' or role == 'actuator' or role == 'provider':
        result = session.query(Charity).filter(Charity.wallet_address == wallet_address).first()
    else:
        session.close()
        return "Wrong Role", 400
    if result:
        if role == 'donator' or role == 'recipient':
            res = {'registered': 'true',
                   'info': {'role': role,
                            'walletAddress': result.wallet_address,
                            'name': result.name,
                            'gender': result.gender,
                            'profession': result.profession,
                            'phone': result.phone,
                            'homeAddress': result.address
                            }
                   }
        else:
            res = {'registered': 'true',
                   'info': {'role': role,
                            'walletAddress': result.wallet_address,
                            'name': result.name,
                            'phone': result.phone,
                            'homeAddress': result.address,
                            'decription':result.description
                            }
                   }
    else:
        res = {'registered': 'false',
               'info': {}
               }
    session.close()
    return jsonify(res)


@user.route('/register', methods=['GET', 'POST'])
def register():
    user_type = request.json['role']
    session = DBSession()
    if user_type == 'donator':
        donator = Donator(name=request.json['name'], gender=request.json['gender'],
                          profession=request.json['profession'], phone=request.json['phone'],
                          wallet_address=request.json['wallet_address'], address=request.json['address'])
        session.add(donator)
        session.commit()
    elif user_type == 'recipient':
        recipient = Recipient(name=request.json['name'], gender=request.json['gender'],
                              profession=request.json['profession'], phone=request.json['phone'],
                              wallet_address=request.json['wallet_address'], address=request.json['address'])
        session.add(recipient)
        session.commit()
    else:
        session.close()
        return 'Error user_type', 400
    session.close()
    return "Register Success", 201


@user.route('/info')
def info():
    user_type = request.args['role']
    wallet_address = request.args.get('walletAddress')
    session = DBSession()
    if user_type == 'donator':
        result = session.query(Donator).filter(Donator.wallet_address == wallet_address).first()
        res = {'role': 'donator',
               'walletAddress': result.wallet_address,
               'name': result.name,
               'gender': result.gender,
               'profession': result.profession,
               'phone': result.phone,
               'homeAddress': result.address
               }
    elif user_type == 'recipient':
        result = session.query(Recipient).filter(Recipient.wallet_address == wallet_address).first()
        res = {'role': 'recipient',
               'walletAddress': result.wallet_address,
               'name': result.name,
               'gender': result.gender,
               'profession': result.profession,
               'phone': result.phone,
               'homeAddress': result.address
               }
    elif user_type == 'charity' or user_type == 'actuator' or user_type == 'provider':
        result = session.query(Charity).filter(Charity.wallet_address == wallet_address).first()
        res = {'role': user_type,
               'walletAddress': result.wallet_address,
               'name': result.name,
               'phone': result.phone,
               'address': result.address,
               'description': result.description
               }
    else:
        session.close()
        return 'Wrong UserType', 400
    session.close()
    if result:
        return jsonify(res)
    else:
        return "Wallet_address not found", 401
