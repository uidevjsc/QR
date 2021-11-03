import React, { useState } from 'react'
import {
  Fab,
  TextField,
  Button,
  Grid,
  Hidden,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from '@material-ui/core'
import { GetApp, ArrowBack } from '@material-ui/icons'
import uniqid from 'uniqid'
import { Link } from 'react-router-dom'
import QRcode from 'qrcode.react'
import { DataActionsContext } from '../context'
import { ServicesItems } from '../services/'
import RichField from '../components/RichField'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import LogoImage from '../assets/image/white-logo.svg'
import { ThemeA, ThemeB, ThemeC } from '../components/templates'

const drawerWidth = 430

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      padding: 0,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar

  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
  },
  appToolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
      justifyContent: 'end',
    },
  },
  mgDivider: {
    margin: '10px 0 20px 0',
  },
}))

function ResponsiveDrawer(props) {
  const { window } = props
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
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
      name: convertToSlug(qr) + '-' + qrId,
      message: message.text,
      template: value,
    })
    var canvas = document.getElementById('myCanvas')
    var ctx = canvas.getContext('2d')
    ctx.font = '30px Arial'
    ctx.fillStyle = 'red'
    ctx.fillText('Hello World', 10, 50)
    // // const canvas = document.getElementById('myqr')
    // // const pngUrl = canvas
    // //   .toDataURL('image/jpeg')
    // //   .replace('image/jpeg', 'image/octet-stream')

    // let downloadLink = document.createElement('a')

    // downloadLink.href = canvas
    // downloadLink.download = convertToSlug(qr) + '-qr.jpeg'
    // document.body.appendChild(downloadLink)
    // downloadLink.click()
    // document.body.removeChild(downloadLink)

    setQr('')
    setMessage('')
    setValue('a')
  }

  const drawer = (
    <div style={{ padding: '10px 25px 15px 25px' }}>
      <Fab
        style={{ marginRight: 10, marginBottom: 30 }}
        color="primary"
        size="small"
      >
        <ArrowBack />
      </Fab>

      <Grid container spacing={6}>
        <Grid item md={12}>
          <Grid>
            <Link to="/"></Link>
            <h2>Genera tu código QR</h2>
          </Grid>
          <Grid container style={{ marginTop: 10, marginBottom: 30 }}>
            <Grid item xs={12}>
              <TextField
                onChange={handleChange}
                style={{ maxWidth: 320, width: '100%', marginBottom: 20 }}
                value={qr}
                label="A quien le voy a regalar?"
                size="small"
                variant="outlined"
                color="primary"
                required
              />
            </Grid>
            <FormLabel component="legend">Seleccione un Tema:</FormLabel>
            <Grid item xs={12}>
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
                  label="Regalo"
                />
                <FormControlLabel
                  value="b"
                  control={<Radio color="primary" />}
                  label="Santa"
                />
                <FormControlLabel
                  value="c"
                  control={<Radio color="primary" />}
                  label="Reno"
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={12} style={{ marginTop: 10 }}>
              <RichField value={message.text} onChange={handleChangeMessage} />
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
                  <canvas
                    id="myCanvas"
                    width="200"
                    height="100"
                    style={{ border: '1px solid #d3d3d3' }}
                  ></canvas>
                  <QRcode
                    includeMargin
                    value={
                      'http://www.qurvi.com.ar/' +
                      convertToSlug(qr) +
                      '-' +
                      qrId
                    }
                    size={120}
                    id="myqr"
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
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar variant="dense" className={classes.appToolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <img
            src={LogoImage}
            alt="logo"
            style={{ width: 35, marginRight: 10 }}
          />
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden mdUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />

        <div style={{ position: 'relative', height: '100%', width: '100%' }}>
          {value === 'a' ? (
            <div style={{ paddingTop: 40 }}>
              <ThemeA message={message.text} name={qr} />
            </div>
          ) : value === 'b' ? (
            <div style={{ paddingTop: 40 }}>
              <ThemeB message={message.text} name={qr} />
            </div>
          ) : (
            <div style={{ paddingTop: 40 }}>
              <ThemeC message={message.text} name={qr} />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
}

export default ResponsiveDrawer
