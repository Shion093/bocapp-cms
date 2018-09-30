import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { Dropdown, Button, Grid } from 'semantic-ui-react';
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
    actions : bindActionCreators({
      getAllOrders,
      changeOrderStatus,
      selectOrder,
      changePage : () => push('/')
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
    const { reducers : { orders : { orders, orderStates }, modals : { orderDetailModal } } } = this.props;
    const { InputFilter, FilterResults } = fuzzyFilterFactory();
    const fuseConfig = {
      keys      : ['orderNumber'],
      threshold : 0.0,
    };
    return (
      <div className='Orders'>

        <Grid columns='equal' padded celled>
          <Grid.Row>
            <InputFilter debounceTime={200} className="input-filter" inputProps={{ placeholder : "Buscar orden..." }}/>
            <Button role='button' onClick={this.props.actions.getAllOrders}>
              Refrescar ordenes <i aria-hidden='true' className='refresh icon'/>
            </Button>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              Numero de Orden
            </Grid.Column>
            <Grid.Column>
              Fecha
            </Grid.Column>
            <Grid.Column>
              Estado
            </Grid.Column>
            <Grid.Column>
              Total
            </Grid.Column>
            <Grid.Column>
              Detalles
            </Grid.Column>
          </Grid.Row>
        </Grid>


        <Grid columns='equal' padded celled>
          <FilterResults {...{
            fuseConfig,
            items : orders,
          }}>
            {
              (filteredOrders) => {
                if (filteredOrders.length === 0) {
                  return (
                    <Grid.Row className="no-found">No se encontraron ordenes</Grid.Row>
                  );
                }
                return _.map(filteredOrders, (order) => {
                  return (
                    <Grid.Row key={order._id}>
                      <Grid.Column>{order.orderNumber}</Grid.Column>
                      <Grid.Column>{moment(order.createdAt).format('LLL')}</Grid.Column>
                      <Grid.Column>
                        <Dropdown
                          fluid
                          placeholder='Estado'
                          selection
                          value={order.status}
                          options={orderStates}
                          onChange={this.handleOnChange(order._id)}
                        />
                      </Grid.Column>
                      <Grid.Column>{formatPrice(order.total)}</Grid.Column>
                      <Grid.Column>
                        <a href='' onClick={this.handleClick(order)}>Detalles</a>
                      </Grid.Column>
                    </Grid.Row>
                  );
                })
              }
            }
          </FilterResults>
        </Grid>
        {orderDetailModal && <OrderDetailModal />}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
