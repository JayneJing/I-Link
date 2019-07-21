import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import classNames from 'classnames'
import { setWalletInfo } from '../../actions/wallet'
import { login } from '../../actions/login'
// import classNames from 'classnames'
import newsImg from './news.jpg';
import blogImg from './blog.png';
import videoImg from './video.jpg';

import styles from './HomePage.scss'
import Sleep from "../../constants/ont-wallet/sleep";
import FileHelper from "../../constants/ont-wallet/file-generate-and-get";
import GetWalletFileMsg from "../../constants/ont-wallet/info";


class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fileName: null,
      selectedFileList: [],
      psword: '',
      hideNav: false,
      success: true,
      roleName: '捐赠者',
    }
    this.list = [
      {name: '捐赠者'},
      {name: '求助者'},
      {name: '慈善机构'},
      {name: '供应商'},
      {name: '执行机构'},
    ]

  }

  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll.bind(this))
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.personalInfo !== nextProps.personalInfo) {
      let path
      if(nextProps.personalInfo.registered === "true"){
        if(this.state.roleName === this.list[0].name){
          path = "donator"
        }else if (this.state.roleName === this.list[1].name){
          path = "recipient"
        }else {
          path = "charity"
        }
      }else{
        path = '/register'
      }
      this.props.history.push(path)
    }
  }
  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleScroll.bind(this))
  }
  handleScroll = (e) => {
    if (e.srcElement.scrollingElement.scrollTop > 100) {
      this.setState({
        hideNav: true,
      })
    } else {
      this.setState({
        hideNav: false,
      })
    }
  }

  loginInfoCheck = (userInfo) => {
    switch (userInfo) {
      case 0 :
        console.log(0)
        this.setState({
          success: false,
        })
        break
      case 1 :
        console.log(1)
        break
      case 2 :
        console.log(2)
        break
      default :
        break
    }
  }

  // 通过自定义按钮触发文件选择功能选择文件并加入数组
  choiceFile = () => {
    this.fileInput.click()
  }
  // 选择文件
  fileSelected = () => {
    this.setState({
      fileName: this.fileInput.files[0].name,
      selectedFileList: this.fileInput.files[0],
    })
  }
  // 输入密码
  handleChange = (e) => {
    const value = e.target.value
    this.setState({
      psword: value,
    })
  }
  // 选择角色
  selectRole = (item) => {
    this.setState({
      roleName: item,
    })
  }
  // 登录
  login = () => {
    Sleep.sleep(200).then(() => {
      FileHelper.readWalletFile(this.state.selectedFileList).then( ($walletFile) => {
        if($walletFile) {
          let info = GetWalletFileMsg.decryptWalletFile($walletFile, this.state.psword)
          if(info.isGetInfo) {
            const Address = info.ontid.substring(8)
            let role
            if(this.state.roleName === this.list[0].name){
              role = "donator"
            }else if (this.state.roleName === this.list[1].name){
              role = "recipient"
            }else if (this.state.roleName === this.list[2].name){
              role = "charity"
            }else if (this.state.roleName === this.list[3].name){
              role = "provider"
            }else if (this.state.roleName === this.list[4].name){
              role = "actuator"
            }
            const walletInfo = {
              address: Address,
              walletFile: $walletFile,
              role: role
            }
            this.props.setWalletInfo(walletInfo)

            this.props.login(Address,role)

          }else{
            console.log(info)
          }
        }
      })
    })
  }
  render() {
    return (
      <div className={styles.bodyWrapper} style={this.state.hideNav ? { marginTop: '161px' } : { marginTop: '0' }}>
        <div className={styles.swiperWrapper}>
          <div className={styles.fromWrapper}>
            <div className={styles.choiseWrapper}>
              <div className={styles.input}><span>{this.state.fileName || '打开钱包文件'}</span></div>
              <div
                ref={(input) => { this.uploadBtn = input }}
                onClick={this.choiceFile}
                className={styles.browseBtn}
              >
                  浏览
              </div>
              <input
                type="file"
                name="attachment"
                onChange={this.fileSelected}
                ref={(input) => { this.fileInput = input }}
                style={{ display: 'none' }}
                accept=""
                multiple
              />
            </div>
            <input
              type="password"
              placeholder="请输入密码"
              value={this.state.psword}
              className={styles.input}
              onChange={this.handleChange}
            />
            {/* <div className={styles.alert}>
              <span style={this.state.success ? {display: 'none'} : {display: 'block'}}>密码错误，重新输入！</span>
            </div> */}
            <div className={styles.roleSelect}>
              <ul>
                {
                  this.list.map((item, index) => {
                    return(
                      <li
                        className={classNames({
                          [styles.listItem]: true,
                          [styles.itemActive]: this.state.roleName == item.name,
                        })}
                        key={index}
                        onClick={() => {this.selectRole(item.name)}}
                      >
                        <div className={classNames({
                          [styles.drow]: true,
                          [styles.drowActive]: this.state.roleName == item.name,
                        })}>
                          &nbsp;
                        </div>
                        {item.name}
                      </li>
                    )
                  })
                }
              </ul>
            </div>
            <div className={styles.submit} onClick={this.login}>登录</div>
          </div>
        </div>
        <div className={styles.infoWrapper}>
          <div className={styles.newsWrapper}>
            <div className={styles.newImg}>
              <img src={newsImg} alt=""/>
            </div>
            <div className={styles.newInfo}>
              {/* <h4>图片+新闻篇</h4> */}
              <span className={styles.time}>2018-07-13</span>
              <h3>非洲儿童的生活现状, 饿得骨瘦如柴, 最大的愿望是活下去</h3>
              <p className={styles.text}>在非洲，有许多的非洲儿童至今都还没有解决温饱问题，大多数贫困家庭的非洲儿童因为没有充足的食物，导致他们身体营养不良，从而被饿得骨瘦如柴。</p>
              <span className={styles.more}>> 阅读新闻</span>
            </div>
          </div>
          <div className={styles.blogWrapper}>
            <div className={styles.blogImg}>
              <img src={blogImg} alt=""/>
            </div>
            <div className={styles.blogInfo}>
              {/* <h4>图片+博客篇</h4> */}
              <span className={styles.time}>2019-01-24</span>
              <h3>币安慈善倡议“非洲儿童午餐计划”</h3>
              <p className={styles.text}>币安慈善机构推出一种旨在解决非洲贫困地区儿童饥饿以及初等教育相关问题的区块链解决方案。</p>
              <span className={styles.more}>> 阅读新闻</span>
            </div>
          </div>
          <div className={styles.videoWrapper}>
            <div className={styles.videoImg}>
              <img src={videoImg} alt=""/>
            </div>
            <div className={styles.videoInfo}>
              {/* <h4>图片+视频篇</h4> */}
              <span className={styles.time}>2016-11-02</span>
              <h3>“携手中非：青少年非洲公益行动”启动</h3>
              <p className={styles.text}>10月31日，由中非民间商会和中华社会救助基金会爱加艾减公益基金主办的“携手发展，增进友谊，共创未来”主题公益活动和“携手中非：青少年非洲公益行动”启动仪式在北京大学附属中学举行。</p>
              <span className={styles.more}>> 阅读新闻</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    walletInfo: state.wallet.walletInfo,
    personalInfo: state.login.personalInfo,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setWalletInfo: bindActionCreators(setWalletInfo, dispatch),
    login: bindActionCreators(login, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(HomePage))
