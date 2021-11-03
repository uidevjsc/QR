import { Grid, Button, Typography } from '@material-ui/core'
import Icon from '@mdi/react'
import { mdiQrcode, mdiQrcodeScan } from '@mdi/js'
import { Link } from 'react-router-dom'
import logo from '../assets/image/logo.svg'

function Home() {
  return (
    <Grid
      container
      style={{ height: '100vh' }}
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={7}
    >
      <Grid item>
        <img src={logo} className="logo-image" />
        <Typography align="center" style={{ padding: 10 }}>
          Crea tu mensaje y <b>genera tu propia experiencia</b> con tu codigo
          [QR]
        </Typography>
      </Grid>

      <Grid item md={6}>
        <Link to="/qr-generator">
          <Button variant="contained" size="large" color="primary">
            <Icon
              path={mdiQrcode}
              title="QR Generator"
              size={5}
              color="white"
            />
          </Button>
        </Link>
      </Grid>

      {/* <Grid item xs={6}>
                    <Link to="/qr_scanner">
                    <Button variant="contained" size="large" color="primary">
                        <Icon 
                        style={{padding:10}}
                        path={mdiQrcodeScan}
                        title="QR Scanner"
                        size={10}
                        color="white"
                        />
                    </Button>
                    </Link>
                </Grid> */}
    </Grid>
  )
}

export default Home
