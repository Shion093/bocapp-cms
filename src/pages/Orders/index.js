import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { Dropdown, Table, Input, Button } from 'semantic-ui-react';
import _ from 'lodash';
import 'moment/locale/es';
import fuzzyFilterFactory from 'react-fuzzy-filter';

// Components
import OrderDetailModal from '../../components/Modals/OrderDetailModal';

// Reducers
import { getAllOrders, selectOrder, changeOrderStatus } from '../../reducers/orders';

import './styles.css';
import { formatPrice } from '../../helpers/formats';

moment.locale('es');

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getAllOrders,
      changeOrderStatus,
      selectOrder,
      changePage: () => push('/')
    }, dispatch),
  };
}

class Orders extends Component {
  componentWillMount() {
    this.props.actions.getAllOrders();
  }

  handleClick = (order) => (e) => {
    e.preventDefault();
    this.props.actions.selectOrder(order)
  };

  handleOnChange = (orderId) => (e, { value }) => {
    this.props.actions.changeOrderStatus(orderId, value);
  };

  render() {
    const { reducers: { orders: { orders, orderStates }, modals: { orderDetailModal } } } = this.props;
    const { InputFilter, FilterResults } = fuzzyFilterFactory();
    const fuseConfig = {
      keys: ['orderNumber'],
      threshold: 0.0,
    };
    return (
      <div className='Orders'>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.Cell>
                <Table.HeaderCell>
                  <InputFilter debounceTime={ 200 } className="input-filter" inputProps={ { placeholder: "Buscar orden..." } } />
                  <Button role='button' onClick={this.props.actions.getAllOrders}>
                    Refrescar ordenes <i aria-hidden='true' className='refresh icon' />
                  </Button>
                </Table.HeaderCell>
                
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>Numero de Orden</Table.HeaderCell>
              <Table.HeaderCell>Fecha</Table.HeaderCell>
              <Table.HeaderCell>Estado</Table.HeaderCell>
              <Table.HeaderCell>Total</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>
            <FilterResults { ...{
              fuseConfig,
              items: orders,
            } }>
              {
              (filteredOrders) => {
                if (filteredOrders.length === 0) {
                  return (
                    <Table.Body className="no-found">No se encontraron ordenes</Table.Body>
                  );
                }
                return (
                  <Table.Body>
                  { 
                    _.map(filteredOrders, (order) => {
                      return (
                        <Table.Row key={order._id}>
                          <Table.Cell>{order.orderNumber}</Table.Cell>
                          <Table.Cell>{moment(order.createdAt).format('LLL')}</Table.Cell>
                          <Table.Cell>
                            <Dropdown
                              placeholder='Estado'
                              selection
                              value={order.status}
                              options={orderStates}
                              onChange={this.handleOnChange(order._id)}
                            />
                          </Table.Cell>
                          <Table.Cell>{formatPrice(order.total)}</Table.Cell>
                          <Table.Cell selectable>
                            <a href='' onClick={this.handleClick(order)}>Detalles</a>
                          </Table.Cell>
                        </Table.Row>
                      );
                    })
                  }
                  </Table.Body>
                );
              }
            }
          </FilterResults>
        </Table>
        {orderDetailModal && <OrderDetailModal />}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
