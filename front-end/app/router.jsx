import React from 'react'
import { HashRouter, Route, Switch, BrowserHistory } from 'react-router-dom'
import Loadable from 'react-loadable'

const Loading = () => (<div />)
const HomePage = Loadable({
  loader: () => import('./components/HomePage/HomePage'),
  loading: Loading,
})
const Nav = Loadable({
  loader: () => import('./components/Nav/Nav'),
  loading: Loading,
})
const Footer = Loadable({
  loader: () => import('./components/Footer/Footer'),
  loading: Loading,
})
const Charity = Loadable({
  loader: () => import('./components/Charity/Charity'),
  loading: Loading,
})
const Wallet = Loadable({
  loader: () => import('./components/Wallet/Wallet'),
  loading: Loading,
})
const Register = Loadable({
  loader: () => import('./components/Register/Register'),
  loading: Loading,
})
const RequesterWallet = Loadable({
  loader: () => import('./components/RequesterWallet/RequesterWallet'),
  loading: Loading,
})
const Donator = Loadable({
  loader: () => import('./components/Donator/Donator'),
  loading: Loading,
})
const Recipient = Loadable({
  loader: () => import('./components/Recipient/Recipient'),
  loading: Loading,
})
const RecipientContent = Loadable({
  loader: () => import('./components/RecipientContent/RecipientContent'),
  loading: Loading,
})
const BusinessDetail = Loadable({
  loader: () => import('./components/BusinessDetail/BusinessDetail'),
  loading: Loading,
})
const Message = Loadable({
  loader: () => import('./components/Message/Message'),
  loading: Loading,
})
const PayCard = Loadable({
  loader: () => import('./components/PayCard/PayCard'),
  loading: Loading,
})
const MoreDetailsListBoard = Loadable({
  loader: () => import('./components/MoreDetailsListBoard/MoreDetailsListBoard'),
  loading: Loading,
})
const Effect = Loadable({
  loader: () => import('./components/Effect/Effect'),
  loading: Loading,
})
const BreadContract = Loadable({
  loader: () => import('./components/BreadContract/BreadContract'),
  loading: Loading,
})

const ChildRoute = () => (
  <div>
    <Route path="*" component={Nav} />
    <Route exact path="/" component={HomePage} />
    <Route exact path="/wallet" component={Wallet} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/requesterwallet" component={RequesterWallet} />
    <Route exact path="/Donator" component={Donator} />
    <Route exact path="/recipient" component={Recipient} />
    <Route exact path="/recipient/:id" component={RecipientContent} />
    <Route exact path="/charity" component={Charity} />
    <Route exact path="/paycard" component={PayCard} />
    <Route exact path="/business" component={BusinessDetail} />
    <Route exact path="/list" component={MoreDetailsListBoard} />
    <Route exact path="/effect" component={Effect} />
    <Route exact path="/provider/breadContract" component={BreadContract}/>
    <Route path="*" component={Footer} />
  </div>
)

const BasicRoute = () => (
  <HashRouter history={BrowserHistory}>
    <div>
      <Switch>
        <Route exact path="/message" component={Message} />
        <Route path="/" component={ChildRoute} />
      </Switch>
    </div>
  </HashRouter>
)

export default BasicRoute
