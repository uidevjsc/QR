import './themplateA.css'
import imagePrice from '../../../assets/image/header-themeA.jpg'
const ThemeA = (props) => {
  return (
    <div className="templateA fade-in-animate">
      <div className="templateA__header">
        <img src={imagePrice} alt="avatar" />
        <div className="templateA__content">
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
export default ThemeA
