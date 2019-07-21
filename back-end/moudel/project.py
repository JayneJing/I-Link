from flask import Blueprint, request, jsonify
from tools.db import DBSession, Donator, Charity, Recipient, Project

project = Blueprint('project', __name__)


@project.route('/create', methods=['POST'])
def create():
    session = DBSession()
    try:
        name = request.json['name']
        money = request.json['money']
        title = request.json['title']
        content = request.json['content']
        wallet_address = request.json['wallet_address']
        project = Project(name=name, money=money, title=title, content=content, wallet_address=wallet_address,
                          current_money=0, status='Create')
        session.add(project)
        session.commit()
        session.close()
        return "Create Project  Success", 201
    except:
        session.close()
        return "Create Project Failed", 400



@project.route('/confirm')
def confirm():
    session = DBSession()
    try:
        project_id = request.args.get('project_id')
        confirm_project = session.query(Project).filter(Project.id == project_id).update(
                                    {"status": 'In process'})
        session.commit()
        session.close()
        if confirm_project:
            return "Confirm Project  Success", 201
        else:
            return "Confirm Project Failed", 400
    except:
        session.close()
        return "Confirm Project Failed", 400


@project.route('/list')
def list():
    search_type = request.args['type']
    session = DBSession()
    if search_type == 'all':
        result = session.query(Project).all()
    elif search_type == 'single':
        wallet_address = request.args['address']
        result = session.query(Project).filter(Project.wallet_address == wallet_address).all()
    elif search_type == 'create':
        result = session.query(Project).filter(Project.status == 'Create').all()
    elif search_type == 'in_process':
        result = session.query(Project).filter(Project.status == 'In process').all()
    elif search_type == 'finish':
        result = session.query(Project).filter(Project.status == 'Finish').all()
    else:
        session.close()
        return 'Wrong Seaarch Type', 400
    session.close()
    res = [{'id': project.id,
            'name': project.name,
            'walletAddress': project.wallet_address,
            'money': project.money,
            'title': project.title,
            'current_money': project.current_money,
            'state': project.status
            } for project in result]
    return jsonify(res)



@project.route('/detail')
def get_project_detail():
    project_id = request.args.get('project_id')
    session = DBSession()
    result = session.query(Project).filter(Project.id == project_id).first()
    session.close()
    if result:
        res = {'id': result.id,
               'name': result.name,
               'walletAddress': result.wallet_address,
               'money': result.money,
               'title': result.title,
               'state': result.status,
               'current_money': result.current_money,
               'content': result.content
               }
        return jsonify(res)
    else:
        return 'Project id not found', 400
