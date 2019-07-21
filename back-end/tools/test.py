from flask import Blueprint, request
from tools.db import DBSession,Donator,Charity,Recipient,Project


session = DBSession()
session.query(Project).filter(Project.wallet_address == 'A15NzM9iE3VT9X8SGk5h3dii6GPFQh2vme').update({"current_money": 11})
session.commit()
session.close()