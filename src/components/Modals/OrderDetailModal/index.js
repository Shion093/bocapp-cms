import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal, Transition, Table, Header, Image, Button, Grid, Segment, Card, Label, List } from 'semantic-ui-react';
import _ from 'lodash';
import mapboxgl from 'mapbox-gl';
import ReactToPrint from 'react-to-print';

import './styles.css';

// Reducers
import { handleModal } from '../../../reducers/modals';
import { handleMenuInputs, createMenu, handleMenuLoader } from '../../../reducers/menus';
import { formatPrice } from '../../../helpers/formats';

import Invoice from './invoice';
import InvoiceDelivery from './invoiceDelivery';
import moment from 'moment';

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
    this.mapContainer = React.createRef();
    this.invoice = React.createRef();
    this.invoiceDelivery = React.createRef();

    this.state = {
      marker      : null,
      geoLocation : null,
    }

  }

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
    const { selectedOrder : { orderNumber, products, address, total, subTotal, createdAt, user, details } } = this.props.reducers.orders;
    const date = moment(createdAt).format('MMMM Do YYYY, h:mm:ss a');
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

              <div className='client-info-cont'>
                <Segment raised>
                  <Label as='a' color='blue' ribbon>
                    Detalles
                  </Label>

                  <List divided selection>
                    <List.Item>
                      <Label horizontal>Fecha</Label>
                      {date}
                    </List.Item>
                    <List.Item>
                      <Label horizontal>Cliente</Label>
                      {user.firstName} {user.lastName}
                    </List.Item>
                    <List.Item>
                      <Label horizontal>Email</Label>
                      {user.email}
                    </List.Item>
                    <List.Item>
                      <Label horizontal>Telefono</Label>
                      {user.phoneNumber}
                    </List.Item>
                    <List.Item>
                      <Label horizontal>Numero de Orden</Label>
                      {orderNumber}
                    </List.Item>
                    <List.Item>
                      <Label horizontal>Detalles</Label>
                      {details}
                    </List.Item>
                    <List.Item>
                      <Label horizontal>Direccion</Label>
                      {address}
                    </List.Item>
                  </List>
                </Segment>
              </div>

              <Segment raised>
                <Label as='a' color='blue' ribbon>
                  Productos
                </Label>
              <Grid padded divided='vertically' columns='equal' textAlign='right'>
                <Grid.Row>
                  <Grid.Column width={6}>
                    <Label attached='top right'>Producto</Label>
                  </Grid.Column>
                  <Grid.Column width={2}>
                    <Label attached='top right'>Cantidad</Label>
                  </Grid.Column>
                  <Grid.Column>
                    <Label attached='top right'>Precio</Label>
                  </Grid.Column>
                  <Grid.Column>
                    <Label attached='top right'>Total</Label>
                  </Grid.Column>
                </Grid.Row>
                {
                  _.map(products, (product) => {
                    return (
                      <Grid.Row key={product._id}>
                        <Grid.Column width={6}>
                          <div className='product-name-image'>
                            <Image src={product.picture} rounded size='mini'/>
                            {product.name}
                          </div>
                        </Grid.Column>
                        <Grid.Column width={2}>
                          {product.qty}
                        </Grid.Column>
                        <Grid.Column>
                          {formatPrice(product.price)}
                        </Grid.Column>
                        <Grid.Column>
                          {formatPrice(product.price * product.qty)}
                        </Grid.Column>
                      </Grid.Row>
                    )
                  })
                }
              </Grid>
              </Segment>

              <Segment raised>
                <Label as='a' color='blue' ribbon>
                  Totales
                </Label>

                <List divided selection>
                  <List.Item>
                    <Label horizontal size='huge'>Total: {formatPrice(total)}</Label>
                  </List.Item>
                </List>
              </Segment>

              <Invoice selectedOrder={this.props.reducers.orders.selectedOrder} invRef={this.invoice} />
              <InvoiceDelivery selectedOrder={this.props.reducers.orders.selectedOrder} invRef={this.invoiceDelivery} />

              <ReactToPrint
                bodyClass={'OrderModal'}
                trigger={() =>  <Button primary>
                  Imprimir Cliente
                </Button>}
                content={() => this.invoice.current}
              />
              <ReactToPrint
                bodyClass={'OrderModal'}
                trigger={() =>  <Button primary>
                  Imprimir Repartidor
                </Button>}
                content={() => this.invoiceDelivery.current}
              />

            </Modal.Content>
          </Modal>
        </Transition>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailModal)
