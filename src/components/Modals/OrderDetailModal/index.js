import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal, Transition, Table, Header, Image } from 'semantic-ui-react';
import _ from 'lodash';
import mapboxgl from 'mapbox-gl';
 
import './styles.css';

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

class OrderDetailModal extends Component {
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
    mywindow.document.write('<p className="line">-----------------------</p>');
    _.map(products, (product, index) => {
      return  mywindow.document.write(`<p className="line">${product.qty} - ${product.name}</p>`);
    });
    mywindow.document.write('<p className="line">Detalles de la order: Sin queso</p>');
    mywindow.document.write('<p className="line">-----------------------</p>');
    mywindow.document.write(`<p className="line">Total: ${formatPrice(total || 0)}</p>`);
    mywindow.document.write('</body></html>');

    mywindow.document.close();
    mywindow.focus();

    mywindow.print();
    mywindow.close();
    this.closeModal();
    return true;
  }
  
  render() {
    const { orderDetailModal } = this.props.reducers.modals;
    const { selectedOrder : { orderNumber, products, address, total } } = this.props.reducers.orders;
    return (
      <div >
        <Transition animation='fade up' duration={ 600 } visible={ orderDetailModal }>
          <Modal
            closeIcon
            size="tiny"
            open={ orderDetailModal }
            className="OrderModal"
            onClose={ this.closeModal }>
            <Modal.Header>
              Detalles del pedido
            </Modal.Header>
            <Modal.Content className="bill-container">
              <div className="bill-container" >
                <p className="line">Orden #{orderNumber}</p>
                  <p className="line">-----------------------</p>
                  {
                    _.map(products, (product, index) => {
                      return (

                        <p className="line" key={index}>{product.qty}-{product.name}</p>
                      );
                    })
                  }
                  <p className="line">-----------------------</p>
                  <p className="line">Detalles de la order: Sin queso</p>
                  <p className="line">-----------------------</p>
                  <p className="line">Total: {formatPrice(total || 0)}</p>
                  <p className="line">-----------------------</p>
                  </div>
                    {
                      address &&
                      <React.Fragment>
                        <p className="line">Dirección</p>
                        <p className="line">{address.address}</p>
                        <label>Referencias</label>
                        <p className="line">{address.references}</p>
                        <label>Local o casa color</label>
                        <p className="line">{address.color}</p>
                      </React.Fragment>
                    }
              <div ref={ this.mapContainer } className="map"/>
              <button className='ui primary button' role='button' onClick={this.printDiv}>
                Imprimir
              </button>
            </Modal.Content>
          </Modal>
        </Transition>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailModal)
