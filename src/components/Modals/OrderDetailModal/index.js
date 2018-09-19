import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal, Transition, Table, Header, Image } from 'semantic-ui-react';
import Print from '@material-ui/icons/Print';
import Button from '@material-ui/core/Button';
import _ from 'lodash';
import mapboxgl from 'mapbox-gl';
import { withStyles } from '@material-ui/core';

import styles from './styles';

// Reducers
import { handleModal } from '../../../reducers/modals';
import { handleMenuInputs, createMenu, handleMenuLoader } from '../../../reducers/menus';
import { formatPrice } from '../../../helpers/formats';

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators({
      handleMenuLoader,
      createMenu,
      handleModal,
      handleMenuInputs,
      changePage : (page) => push(page)
    }, dispatch),
  };
}

type Props = {
  clasess : Object,
}

class OrderDetailModal extends Component<Props> {
  constructor (props) {
    super(props);

    this.map = null;
    this.geoLocation = null;
    this.mapContainer = React.createRef();

    this.state = {
      marker      : null,
      geoLocation : null,
    }

  }

  addMarker = (e) => {
    const { lngLat } = e;
    console.log('esta aqui la vara', e);
    new mapboxgl.Marker()
      .setLngLat([lngLat.lng, lngLat.lat])
      .addTo(this.map);
  };

  mountMap () {
    const { selectedOrder : { location : { coordinates } } } = this.props.reducers.orders;
    this.map = new mapboxgl.Map({
      container : this.mapContainer.current,
      style     : 'mapbox://styles/mapbox/streets-v9',
      center    : [coordinates[1], coordinates[0]],
      zoom      : 16,
    });
  
    this.map.on('load', () => {
      new mapboxgl.Marker()
      .setLngLat([coordinates[1], coordinates[0]])
      .addTo(this.map);
    });

  }

  componentDidUpdate (prevProps) {
    if (prevProps.reducers.modals.orderDetailModal !== this.props.reducers.modals.orderDetailModal && this.props.reducers.modals.orderDetailModal) {
      setTimeout(() => {
        if(this.mapContainer.current) {
          this.mountMap();
        }
      }, 500);
    }
  }

  closeModal = () => {

    this.props.actions.handleModal('orderDetailModal');
  };

  printDiv = () => {
    // console.log('llega');
    var contenido= document.getElementById('areaImprimir').innerHTML;
    var contenidoOriginal= document.body.innerHTML;
    console.log(contenido, contenidoOriginal)
    document.body.innerHTML = contenido;
    
    // setTimeout(() => {
      window.print();
    // }, 200);
    document.body.innerHTML = contenidoOriginal;
  }
  
  render() {
    const { classes } = this.props;
    const { orderDetailModal } = this.props.reducers.modals;
    const { selectedOrder : { orderNumber, products, address } } = this.props.reducers.orders;
    return (
      <div className='MenuModal'>
        
      <div>         
        <h3><center>
        {
          _.map(products, (product) => {
            return (
              <div key={product._id}>
                    <Image src={product.picture} style={{height: 200, width: 200}} rounded size='mini' />
                    <h1 style={{fontSize: 50}}>
                      {product.qty}
                      {/*<Header.Subheader>Human Resources</Header.Subheader>*/}
                    </h1>
                    <h1 style={{fontSize: 50}}>
                      {product.name}
                    </h1>
                <h1 style={{fontSize: 50}}>
                  {formatPrice(product.price)}
                </h1>
              </div>
            )
          })
        }
        </center></h3>
      </div>
        <Transition animation='fade up' duration={ 600 } visible={ orderDetailModal }>
          <Modal
            closeIcon
            open={ orderDetailModal }
            onClose={ this.closeModal }>
            <Modal.Header>
              Detalles de la orden {orderNumber}
            </Modal.Header>
            <Modal.Content>
              <div ref={ this.mapContainer } className={ classes.map }/>
              <div className={ classes.container } id="areaImprimir">

                <p className={ classes.line }>San Isidro, Pérez Zeledón</p>
                <p className={ classes.line }>Teléfono: (506) 83166927</p>

                <p className={ classes.line }>_________________________________________ </p>

                <p className={ classes.line }>DescripciónMonto </p>
                <p className={ classes.line }>_________________________________________</p>


                <p className={ classes.line }>Servicio ₡1000 <br /> de restaurante </p>
              

                <p className={ classes.line }>_________________________________________ </p>



                <p className={ classes.line }>_________________________________________</p>


                <p className={ classes.line }>ACOGIDO AL RÉGIMEN DE TRIBUTACIÓN SIMPLIFICADA</p>
                <br />
                <div className={ classes.line }>
                  Tavuel506, 2018
                </div>
              </div>
              <Table basic='very' celled collapsing>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Cantidad</Table.HeaderCell>
                    <Table.HeaderCell>Nombre</Table.HeaderCell>
                    <Table.HeaderCell>Precio</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  {
                    _.map(products, (product) => {
                      return (
                        <Table.Row key={product._id}>
                          <Table.Cell>
                            <Header as='h4' image>
                              <Image src={product.picture} rounded size='mini' />
                              <Header.Content>
                                {product.qty}
                                {/*<Header.Subheader>Human Resources</Header.Subheader>*/}
                              </Header.Content>
                            </Header>
                          </Table.Cell>
                          <Table.Cell>
                            {product.name}
                          </Table.Cell>
                          <Table.Cell>
                            {formatPrice(product.price)}
                          </Table.Cell>
                        </Table.Row>
                      )
                    })
                  }
                  
                </Table.Body>
              </Table>
              {
                address &&
                <div>
                  <label>Address</label>
                  <p>{address.address}</p>
                  <label>Referencias</label>
                  <p>{address.references}</p>
                  <label>Local o casa color</label>
                  <p>{address.color}</p>
                </div>
              }
              <Button variant="fab" color="primary" aria-label="Add" onClick={this.printDiv} className={classes.button}>
                <Print />
              </Button>
            </Modal.Content>
          </Modal>
        </Transition>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OrderDetailModal))
