import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal, Transition, Table, Header, Image } from 'semantic-ui-react';
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
      zoom      : 15,
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
    const { selectedOrder : { orderNumber, products, address, total } } = this.props.reducers.orders;
    var mywindow = window.open('', 'PRINT', 'height=400,width=600');

    mywindow.document.write('<html><head><title></title>');
    mywindow.document.write('</head><body>');
    mywindow.document.write(`<h2>Orden: #${orderNumber}</h2>`);
    _.map(products, (product, index) => {
      return  mywindow.document.write(`<p className={ classes.line } key={index}>${product.qty} - ${product.name}</p>`);
    });
    mywindow.document.write(`<p className={ classes.line } key={index}>Total: ${formatPrice(total || 0)}</p>`);
    mywindow.document.write('</body></html>');

    mywindow.document.close();
    mywindow.focus();

    mywindow.print();
    mywindow.close();
    this.closeModal();
    return true;
  }
  
  render() {
    const { classes } = this.props;
    const { orderDetailModal } = this.props.reducers.modals;
    const { selectedOrder : { orderNumber, products, address, total } } = this.props.reducers.orders;
    return (
      <div className='MenuModal' className={ classes.ordenModal }>
        <Transition animation='fade up' duration={ 600 } visible={ orderDetailModal }>
          <Modal
            closeIcon
            size="tiny"
            open={ orderDetailModal }
            onClose={ this.closeModal }>
            <Modal.Header>
              Detalles del pedido
            </Modal.Header>
            <Modal.Content className={ classes.billContainer }>
              <div className={ classes.billContainer } >
                <p className={ classes.line }>Orden #{orderNumber}</p>
                  <p className={ classes.line }>-----------------------</p>
                  {
                    _.map(products, (product, index) => {
                      return (

                        <p className={ classes.line } key={index}>{product.qty}-{product.name}</p>
                      );
                    })
                  }
                  <p className={ classes.line }>-----------------------</p>
                  <p className={ classes.line }>Total: {formatPrice(total || 0)}</p>
                  <p className={ classes.line }>-----------------------</p>
                  </div>
                    {
                      address &&
                      <React.Fragment>
                        <p className={ classes.line }>Dirección</p>
                        <p className={ classes.line } >{address.address}</p>
                        <label>Referencias</label>
                        <p>{address.references}</p>
                        <label>Local o casa color</label>
                        <p>{address.color}</p>
                      </React.Fragment>
                    }
              <div ref={ this.mapContainer } className={ classes.map }/>
              <button class='ui primary button' role='button' onClick={this.printDiv} className={classes.button}>
                Imprimir
              </button>
            </Modal.Content>
          </Modal>
        </Transition>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(OrderDetailModal))
