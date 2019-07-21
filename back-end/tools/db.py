from datetime import datetime

from sqlalchemy import *
from sqlalchemy.orm import sessionmaker, mapper, Session
from sqlalchemy.ext.declarative import declarative_base
from tools.assist import Config
#from assist import Config
engine = create_engine(
    'mysql+mysqlconnector://root:{}@localhost:3306/CharityChain'.format(Config().get_value('DATABASE', 'password')),
    echo=False)
Base = declarative_base()


class Donator(Base):
    __tablename__ = 'donator'

    # id = Column("id", Integer, nullable=False, autoincrement=True)
    name = Column("name", String(100), nullable=False)
    gender = Column("gender", String(10))
    profession = Column("profession", String(500))
    phone = Column("phone", String(20))
    wallet_address = Column("wallet_address", String(100), nullable=False, primary_key=True)
    address = Column("address", String(500))

    def __repr__(self):
        return "Donator WalletAddress {}".format(self.wallet_address)


class Recipient(Base):
    __tablename__ = 'recipient'

    # id = Column("id", Integer, nullable=False, autoincrement=True)
    name = Column("name", String(100), nullable=False)
    gender = Column("gender", String(10), nullable=False)
    profession = Column("profession", String(500), nullable=False)
    phone = Column("phone", String(20))
    wallet_address = Column("wallet_address", String(100), nullable=False, primary_key=True)
    address = Column("address", String(500))

    def __repr__(self):
        return "Recipient WalletAddress {}".format(self.wallet_address)


class Charity(Base):
    __tablename__ = 'charity'

    # id = Column("id", Integer, nullable=False, autoincrement=True)
    name = Column("name", String(100), nullable=False)
    phone = Column("phone", String(20), nullable=False)
    wallet_address = Column("wallet_address", String(100), nullable=False, primary_key=True)
    address = Column("address", String(200), nullable=False)
    description = Column("description", String(2000), nullable=False)
    role = Column("role", String(2000), nullable=False)

    def __repr__(self):
        return "Institusion WalletAddress {}".format(self.wallet_address)


class Project(Base):
    __tablename__ = 'project'

    id = Column("id", Integer, autoincrement=True, primary_key=True)
    name = Column("name", String(100), nullable=False)
    money = Column("money", Float, nullable=False)
    title = Column("title", String(100), nullable=False)
    content = Column("content", String(2000), nullable=False)
    current_money = Column("current_money", Float, nullable=True)
    status = Column("status", String(100), nullable=True)
    wallet_address = Column("wallet_address", String(200), nullable=False)

    def __repr__(self):
        return "Project ID : {}".format(self.id)


class Transaction(Base):
    __tablename__ = 'transaction'

    # id = Column("id", Integer, autoincrement=True)
    txhash = Column("txhash", String(200), nullable=False, primary_key=True)
    height = Column("height", Integer, nullable=False)
    trans_time = Column("trans_time", BigInteger, nullable=False)
    payer = Column("payer", String(200), nullable=False)
    remittee = Column("remittee", String(200), nullable=True)
    amount = Column("amount", Float, nullable=True)
    legal = Column('legal', String(20), nullable=True)

    def __repr__(self):
        return "Transaction Hash : {}".format(self.txhash)


# 创建DBSession类型
DBSession = sessionmaker(bind=engine)

if __name__ == '__main__':
    Base.metadata.create_all(bind=engine)

    session = DBSession()
    donator = Donator(name='Hermy', gender='Female', profession='Magi', phone='010-12345678',
                      wallet_address='AWvQvDrhHL8s2Jmm7w6c3C9PgJ4A6gowDy', address='Earth')
    recipient = Recipient(name='Jayne', gender='Female', profession='Coder', phone='010-87654321',
                          wallet_address='A15NzM9iE3VT9X8SGk5h3dii6GPFQh2vme', address='Jupyter')
    recipient2 = Recipient(name='Jayne2', gender='Female', profession='Coder', phone='010-87654321',
                           wallet_address='A15NzM9iE3VT9X8SGk5h3dii6GPFQh2vme2')
    charity = Charity(name='福利机构', phone='010-87654321', wallet_address='Af4mYFuHBo7RQ5zyiRvQz4Bm1u5zpL8jBE',
                      address='Jupyter', description='福利机构描述', role='charity')
    actuator = Charity(name='执行机构', phone='010-87654322', wallet_address='ATuHwSj13ew142ifnLAW9HpaB28ccdwwf7',
                       address='Jupyter', description='执行机构描述', role='actuator')
    support = Charity(name='供应商', phone='010-87654323', wallet_address='AXJaVSTDEXVgPNP7TpW1uvw35T3zECivZn',
                      address='Jupyter', description='供应商描述', role='provider')
    project = Project(name='Jayne', money=10000, title='MASS', content='问题描述', current_money=10, status='In process',
                      wallet_address='A15NzM9iE3VT9X8SGk5h3dii6GPFQh2vme')
    project2 = Project(name='Jayne', money=10000, title='MASS', content='问题描述', current_money=10, status='Finish',
                       wallet_address='A15NzM9iE3VT9X8SGk5h3dii6GPFQh2vme')
    transaction = Transaction(txhash='bdc6d187ed807df80d5b493dba9484029b48e0e81ce44f7bf74bf05c84ad80fd', height=22483,
                              trans_time=1530949224, payer='APKUmRKRdqunZHLuHyLu2h3zU8jMKFQtR9',
                              remittee='AcXRmbjJcgCj64SWmBR64nU3d5EmFNiqLe', amount=7, legal="true")
    transaction2 = Transaction(txhash='1382cefa1ef0356cd72ac3b4e42c1c8418c8b7507c231fb99eeb02e8384f25fe', height=22483,
                               trans_time=1530949224, payer='APKUmRKRdqunZHLuHyLu2h3zU8jMKFQtR9',
                               remittee='Ad95dvHLTCuTsDGtrYrzhVwTmAVapEgkT1', amount=3, legal='false')
    # 添加到session
    session.add_all([donator,recipient,recipient2,charity,actuator,support,project,project2,transaction, transaction2])
    #session.add_all([project,project2])
    # 提交
    session.commit()
    # 关闭session
    session.close()
