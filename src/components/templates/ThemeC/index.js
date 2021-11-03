import './themplateC.css'
import headerThemeC from '../../../assets/image/header-themeC.png'
const ThemeC = (props) => {
  return (
    <div className="templateC fade-in-animate">
      <div className="templateC__header">
        <img src={headerThemeC} alt="header-themeC" />
        <div className="templateC__header__text">
          <h2>{props.name}</h2>
          {props.message !== '' ? (
            <div
              dangerouslySetInnerHTML={{
                __html: props.message,
              }}
            />
          ) : (
            'Mi mensaje...'
          )}
        </div>
      </div>
    </div>
  )
}
export default ThemeC
