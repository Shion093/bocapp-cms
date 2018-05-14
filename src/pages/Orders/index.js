import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { Dropdown, Table } from 'semantic-ui-react';
import _ from 'lodash';
import 'moment/locale/es';

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
    actions : bindActionCreators({
      getAllOrders,
      changeOrderStatus,
      selectOrder,
      changePage : () => push('/')
    }, dispatch),
  };
}

class Orders extends Component {
  state = { activeIndex : 0 };

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
    const { reducers : { orders : { orders, orderStates } } } = this.props;
    return (
      <div className='Orders'>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Numero de Orden</Table.HeaderCell>
              <Table.HeaderCell>Fecha</Table.HeaderCell>
              <Table.HeaderCell>Estado</Table.HeaderCell>
              <Table.HeaderCell>Total</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {
              _.map(orders, (order, i) => {
                return (
                  <Table.Row key={order._id}>
                    <Table.Cell>{ order.orderNumber }</Table.Cell>
                    <Table.Cell>{ moment(order.createdAt).format('LLL') }</Table.Cell>
                    <Table.Cell>
                      <Dropdown
                        placeholder='Estado'
                        selection
                        value={order.status}
                        options={orderStates}
                        onChange={this.handleOnChange(order._id)}
                      />
                    </Table.Cell>
                    <Table.Cell>{ formatPrice(order.total) }</Table.Cell>
                    <Table.Cell selectable>
                      <a href='' onClick={this.handleClick(order)}>Detalles</a>
                    </Table.Cell>
                  </Table.Row>
                )
              })
            }
          </Table.Body>
        </Table>
        <OrderDetailModal />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
