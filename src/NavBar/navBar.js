import React from 'react'
import Logo from './Logo/logo'
import Burger from './Burger/burger'
import LiWrap from './LiWrap/liWrap'
import LiWrapMobile from './LiWrapMobile/liWrapMobile'
import LiLink from './LiLink/liLink'
import LiGetEventUpdate from './GetEventUpdate/LiGetEventUpdate'
import LangPicking from './LanguagePicking/langPicking'
import vi from './Logo/vi.png'
import en from './Logo/en.png'

const NavBar = props => (
  <div>
    <div className="site-mobile-menu">
      <div className="site-mobile-menu-header">
        <div className="site-mobile-menu-close mt-3">
          <span className="icon-close2 js-menu-toggle" />
        </div>
      </div>
      <div className="site-mobile-menu-body">
        <LiWrapMobile>
          <LiLink to="/attend" title="Attend" />
          <LiLink to="/learn" title="Learn" />
          <LiLink to="/about" title="About" />
          <LiGetEventUpdate isVN={props.isVN} getEventUpdate={props.getEventUpdate} />
          <LangPicking img={vi} toggleLang={props.toggleVN} />
          <LangPicking img={en} toggleLang={props.toggleEN} />
        </LiWrapMobile>
      </div>
    </div>
    <div className="site-navbar-wrap js-site-navbar">
      <div className="container">
        <div className="site-navbar bg-light">
          <div className="py-1">
            <div className="row align-items-center">
              <Logo />
              <div className="col-lg-10 col-8">
                <nav className="site-navigation text-right" role="navigation">
                  <div className="container">
                    <Burger />
                    <LiWrap>
                      <LiLink to="/attend" title="Attend" />
                      <LiLink to="/learn" title="Learn" />
                      <LiLink to="/about" title="About" />
                      <LiGetEventUpdate isVN={props.isVN} getEventUpdate={props.getEventUpdate} />
                      <LangPicking img={vi} toggleLang={props.toggleVN} />
                      <LangPicking img={en} toggleLang={props.toggleEN} />
                    </LiWrap>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default NavBar
