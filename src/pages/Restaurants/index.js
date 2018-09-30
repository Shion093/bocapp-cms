import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { Button } from 'semantic-ui-react';
import 'moment/locale/es';

// Components
import RestaurantModal from '../../components/Modals/RestaurantModal';

// Reducers
import { getAllOrders, selectOrder, changeOrderStatus } from '../../reducers/orders';
import { handleModal } from '../../reducers/modals';

import './styles.css';

moment.locale('es');

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators({
      handleModal,
      getAllOrders,
      changeOrderStatus,
      selectOrder,
      changePage : () => push('/')
    }, dispatch),
  };
}

class Restaurants extends Component {
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

  openModal = (modal, data) => () => {
    this.props.actions.handleModal(modal, data, 'menu');
  };

  render() {
    return (
      <div className='Restaurants'>
        <Button basic color='green' onClick={this.openModal('restaurantModal')}>Crear</Button>
        <RestaurantModal />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Restaurants);
