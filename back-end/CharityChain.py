import os
from flask import Flask
from tools.assist import Config
from moudel.user import user
from moudel.project import project
from moudel.transaction import transaction, update_trans_from_block
from moudel.credit import credit
from multiprocessing import Process

app = Flask(__name__)
app.register_blueprint(user, url_prefix='/user')
app.register_blueprint(project, url_prefix='/project')
app.register_blueprint(transaction, url_prefix='/transaction')
app.register_blueprint(credit,url_prefix='/credit')


@app.route('/')
def hello_world():
    return 'Hello World!'


if __name__ == '__main__':
    host = Config().get_value('DEFAULT', 'host')
    port = int(Config().get_value('DEFAULT', 'port'))
    update_block_info = Process(target=update_trans_from_block, args=())
    update_block_info.start()
    app.run(host=host, port=port, debug=False)
