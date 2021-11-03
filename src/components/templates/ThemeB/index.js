import './themplateB.css'
import ThemeHeaderB from '../../../assets/image/headerThemeB.png'
const ThemeB = (props) => {
  return (
    <div className="templateB fade-in-animate">
      <div className="templateB__header">
        <img src={ThemeHeaderB} alt="header" />
        <div className="templateB__header__text">
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
export default ThemeB
