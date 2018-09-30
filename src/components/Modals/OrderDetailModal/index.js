import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal, Transition, Table, Header, Image, Button, Grid } from 'semantic-ui-react';
import _ from 'lodash';
import mapboxgl from 'mapbox-gl';
import ReactToPrint from 'react-to-print';
import JSpdf from 'jspdf';
import 'jspdf-autotable';

import './styles.css';

// Reducers
import { handleModal } from '../../../reducers/modals';
import { handleMenuInputs, createMenu, handleMenuLoader } from '../../../reducers/menus';
import { formatPrice } from '../../../helpers/formats';

import Invoice from './invoice';

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
  constructor(props) {
    super(props);

    this.map = null;
    this.geoLocation = null;
    this.mapContainer = React.createRef();
    this.invoice = React.createRef();

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

  mountMap = () => {
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
  };

  componentDidMount () {
    setTimeout(this.mountMap, 1000)
  }

  closeModal = () => {
    this.props.actions.handleModal('orderDetailModal');
  };

  render() {
    const { orderDetailModal } = this.props.reducers.modals;
    const { selectedOrder : { orderNumber, products, address, total } } = this.props.reducers.orders;
    return (
      <div>
        <Invoice selectedOrder={this.props.reducers.orders.selectedOrder} invRef={this.invoice} />
        <Transition animation='fade up' duration={600} visible={orderDetailModal}>
          <Modal
            closeIcon
            open={orderDetailModal}
            className="OrderModal"
            onClose={this.closeModal}>
            <Modal.Header>
              Detalles del pedido {orderNumber}
            </Modal.Header>
            <Modal.Content className="bill-container">
              <div ref={this.mapContainer} className="map" />
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
                              <Image src={product.picture} rounded size='mini'/>
                              <Header.Content>
                                {product.qty}
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

              {/*<Button primary onClick={this.printDiv}>Imprimir</Button>*/}

              <Invoice selectedOrder={this.props.reducers.orders.selectedOrder} invRef={this.invoice} />



              <ReactToPrint
                bodyClass={'OrderModal'}
                trigger={() =>  <Button primary>
                  Imprimir
                </Button>}
                content={() => this.invoice.current}
              />

            </Modal.Content>
          </Modal>
        </Transition>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailModal)
