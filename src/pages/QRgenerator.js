import React, { useState } from 'react'
import {
  Fab,
  TextField,
  Button,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  Hidden,
} from '@material-ui/core'
import { ArrowBack, GetApp } from '@material-ui/icons'
import uniqid from 'uniqid'
import { Link } from 'react-router-dom'
import QRcode from 'qrcode.react'
import mobile from '../assets/image/mobile-2@2x.png'
import mobileIcons from '../assets/image/mobile-icons@2x.png'
import logo from '../assets/image/logo.svg'
import { DataActionsContext } from '../context'
import { ServicesItems } from '../services/'
import RichField from '../components/RichField'

function QRgenerator() {
  const services = new ServicesItems()
  const contextData = React.useContext(DataActionsContext)
  const [qrAction, setQrAction] = useState(false)
  const [qr, setQr] = useState('')
  const [qrId, setQrId] = useState('')
  const [message, setMessage] = useState({ text: '' })
  const [value, setValue] = React.useState('a')
  const [link, setLink] = React.useState('')
  const handleRadioChange = (event) => {
    setValue(event.target.value)
  }

  function convertToSlug(Text) {
    return Text.toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '')
  }
  const handleChange = (event) => {
    setQr(event.target.value)
    if (!qr) {
      setQrAction(false)
      setLink('')
    }
  }
  const handleChangeMessage = (value) => {
    setMessage({ text: value })
  }
  const handleCreate = () => {
    setQrAction(true)
    setQrId(uniqid())
  }

  React.useEffect(() => {
    //add items
    try {
      if (contextData.items !== null) {
        services
          .addItems(contextData.items)
          .then((res) => {
            contextData.setGetItems(...contextData.getitems, res)
          })
          .catch((error) => {
            console.log('getItems', error)
          })
      }
    } catch (error) {
      console.log('getItems', error)
    }
  }, [contextData.items])

  const downloadQR = () => {
    setLink(convertToSlug(qr))
    contextData.setItems({
      ...contextData.items,
      qr: convertToSlug(qr) + '-' + qrId,
      content: message.text,
      background: value,
    })
    const canvas = document.getElementById('myqr')
    const pngUrl = canvas
      .toDataURL('image/jpeg')
      .replace('image/jpeg', 'image/octet-stream')
    let downloadLink = document.createElement('a')
    downloadLink.href = pngUrl
    downloadLink.download = convertToSlug(qr) + '-qr.jpeg'
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
    setQr('')
    setMessage('')
    setValue('a')
  }
  console.log('id', qrId)
  return (
    <>
      <div className="top-bar">
        <Link to="/">
          <img src={logo} className="logo-image" />
        </Link>
      </div>
      <div className="form-app">
        <Grid container spacing={6}>
          <Grid item md={7}>
            <Grid>
              <Link to="/">
                <Fab style={{ marginRight: 10 }} color="primary" size="small">
                  <ArrowBack />
                </Fab>
              </Link>
              <h2>Genera tu código QR</h2>
            </Grid>
            <Grid container style={{ marginTop: 30, marginBottom: 30 }}>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  style={{ maxWidth: 320, width: '100%', marginBottom: 20 }}
                  value={qr}
                  label="Contenido QR"
                  size="small"
                  variant="outlined"
                  color="primary"
                  required
                />
              </Grid>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={value}
                onChange={handleRadioChange}
                row
              >
                <FormControlLabel
                  value="a"
                  control={<Radio color="primary" />}
                  label="A"
                />
                <FormControlLabel
                  value="b"
                  control={<Radio color="primary" />}
                  label="B"
                />
                <FormControlLabel
                  value="c"
                  control={<Radio color="primary" />}
                  label="C"
                />
              </RadioGroup>
              <Grid item xs={12}>
                {/* <TextField
                  style={{
                    maxWidth: 320,
                    width: "100%",
                    margin: "10px 0 20px 0",
                  }}
                  id="outlined-multiline-static"
                  onChange={handleChangeMessage}
                  label="Mensaje"
                  multiline
                  rows={8}
                  placeholder="Mi mensaje..."
                  value={message}
                  variant="outlined"
                /> */}
                <RichField
                  value={message.text}
                  onChange={handleChangeMessage}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  style={{ margin: '40px 0' }}
                  onClick={handleCreate}
                  disabled={!qr}
                >
                  Crear QR
                </Button>
              </Grid>
              <Grid item xs={12}>
                {qr && qrAction ? (
                  <div className="qr-container">
                    <QRcode
                      id="myqr"
                      value={
                        'http://www.qurvi.com.ar/' +
                        convertToSlug(qr) +
                        '-' +
                        qrId
                      }
                      size={120}
                    />
                  </div>
                ) : (
                  <p className="required-box">
                    <b>Complete el campo requerido</b> para generar el codigo QR
                  </p>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={5} style={{ position: 'relative', marginTop: 20 }}>
            <img src={mobileIcons} className="image-mobile-icons" />
            <img src={mobile} className="image-mobile" />
            <div
              className={
                value === 'a'
                  ? 'movile-text-container back_1'
                  : value === 'b'
                  ? 'movile-text-container back_2'
                  : 'movile-text-container back_3'
              }
            >
              <div className="inner-text-content">
                {message.text !== '' ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: message.text,
                    }}
                  />
                ) : (
                  'Mi mensaje...'
                )}
              </div>
            </div>
          </Grid>
        </Grid>

        <div>
          <Hidden smUp>
            <div className="link-demo">
              {link && (
                <Link to={link} target="_blank">
                  Demo del sitio QR
                </Link>
              )}
            </div>
          </Hidden>
          {qr && qrAction ? (
            <Fab
              onClick={downloadQR}
              style={{
                marginLeft: 10,
                position: 'fixed',
                bottom: 50,
                right: 50,
              }}
              color="primary"
            >
              <GetApp />
            </Fab>
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  )
}

export default QRgenerator
