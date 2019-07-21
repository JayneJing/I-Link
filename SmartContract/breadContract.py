OntCversion = '2.0.0'
"""
Contract Record
"""
from ontology.interop.System.Storage import GetContext, Get, Put
from ontology.interop.System.Runtime import CheckWitness, Notify
from ontology.interop.Ontology.Runtime import Base58ToAddress

# set the owner codeAddr to your base58 codeAddr (starting with a captical A)
Provider = Base58ToAddress('AXJaVSTDEXVgPNP7TpW1uvw35T3zECivZn')

def Main(operation, args):
    if operation == "setBreadInfo":
        assert (len(args) == 2)
        childAddress = args[0]
        value = args[1]
        return setBreadInfo(childAddress, value)
    if operation == "getBreadInfo":
        assert (len(args) == 1)
        childAddress = args[0]
        return getBreadInfo(childAddress)
    if operation == "updateBreadInfo":
        assert (len(args) == 2)
        childAddress = args[0]
        value = args[1]
        return updateBreadInfo(childAddress,value)
    return False


def setBreadInfo(childAddress, value):
    res = CheckWitness(Provider)
    if res:
        state = "inProgress"
        Put(GetContext(), childAddress, value)
        Notify(["setBreadInfo", childAddress, value, state])
    else:
        Notify(["Identity wrong"])
    return True
    
def getBreadInfo(childAddress):
    msg = Get(GetContext(), childAddress)
    Notify(["getBreadInfo", msg])
    return True

def updateBreadInfo(childAddress,value):
    res = CheckWitness( Base58ToAddress(childAddress))
    if res:
        msg = Get(GetContext(), childAddress)
        if value == msg:
            state = "finish"
            Put(GetContext(), childAddress, state)
            Notify(["updateBreadInfo", childAddress, value, state])
        elif value < msg:
            state = "inProgress"
            Put(GetContext(), childAddress, msg-value)
            Notify(["updateBreadInfo", childAddress, value, state])
    else:
        Notify(["Identity wrong"])
    return True
