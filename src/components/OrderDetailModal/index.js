import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal, Form, Transition, Table, Header, Image } from 'semantic-ui-react';
import _ from 'lodash';

import './styles.css';
import 'cropperjs/dist/cropper.css';

// Reducers
import { handleModal } from '../../reducers/modals';
import { handleMenuInputs, createMenu, handleMenuLoader } from '../../reducers/menus';
import { formatPrice } from '../../helpers/formats';

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
  closeModal = () => {
    this.props.actions.handleModal('orderDetailModal');
  };
  render() {
    const { orderDetailModal } = this.props.reducers.modals;
    const { selectedOrder : { orderNumber, products } } = this.props.reducers.orders;
    return (
      <div className='MenuModal'>
        <Transition animation='fade up' duration={ 600 } visible={ orderDetailModal }>
          <Modal
            closeIcon
            open={ orderDetailModal }
            onClose={ this.closeModal }>
            <Modal.Header>
              Detalles de la orden {orderNumber}
            </Modal.Header>
            <Modal.Content>
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

            </Modal.Content>
          </Modal>
        </Transition>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailModal)
