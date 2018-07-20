import React from 'react'

const Footer = () => 
<div className="footer clearfix">
    <div className="dx">
        reSolve
    </div>
    <div className="icons-wrapper">
        <a href="https://facebook.com/resolvejs/" target="_blank"><img className="small-icon" src="./Facebook.svg" alt="Facebook"></img></a>
        <a href="https://twitter.com/resolvejs/" target="_blank"><img className="small-icon" src="./Twitter_.svg" alt="Twitter"></img></a>
    </div>
    <div className="fixedoverlay" id="fixedoverlay"></div>
    <div className="congratulations" id="congratulations">
        <div className="congratulations-content">
            <div className="congratulations-title">Congratulations!</div>
            <img className="reward" src="./reward.svg"></img>
            <p>Name Name</p>
            <p>Поздравляем! Вы попали в ТОП10 рейтинга!</p>
        </div>
        <div className="congratulations-share-wrapper">
            <a href="http://twitter.com/share?text=Wordseeker Game&url=" title="Share in Twitter" target="_blank" className="congratulations-share"><img className="congratulations-share-twitter" src="./twitter.svg"></img>Share in Twitter</a>
        </div>
    </div>
</div>


export default Footer
