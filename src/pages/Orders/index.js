import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { Button, Grid, Icon, Item, Image, Label, Dropdown, Accordion } from 'semantic-ui-react';
import _ from 'lodash';
import 'moment/locale/es';

// Reducers
import { getAllOrders } from '../../reducers/orders';

import './styles.css';

moment.locale('es');


const paragraph = <Image src='/assets/images/wireframe/short-paragraph.png' />

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return {
    actions : bindActionCreators({
      getAllOrders,
      changePage: () => push('/')
    }, dispatch),
  };
}

class Orders extends Component {
  state = { activeIndex: 0 };

  componentWillMount () {
    this.props.actions.getAllOrders();
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render () {
    const { activeIndex } = this.state;
    const { reducers : { orders : { orders }}} = this.props;
    return (
      <div className='Orders'>
        <Accordion fluid styled>
          {
            _.map(orders, (order, i) => {
              return (
                <div>
                  <Accordion.Title active={activeIndex === i} index={i} onClick={this.handleClick}>
                    <Icon name='dropdown' />
                    {order.orderNumber} {moment(order.createdAt).format('LLL')} {order.total}
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === i}>
                    {
                      _.map(order.products, (product) => {
                        return   <p>{product.qty} x {product.name} </p>
                      })
                    }

                  </Accordion.Content>
                </div>
              )
            })
          }
        </Accordion>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
