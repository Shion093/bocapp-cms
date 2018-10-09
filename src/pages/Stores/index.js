import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { Button, Card, Grid } from 'semantic-ui-react';
import 'moment/locale/es';
import fuzzyFilterFactory from 'react-fuzzy-filter';

// Components
import StoreModal from '../../components/Modals/StoreModal';

// Reducers
import { getAllOrders, selectOrder, changeOrderStatus } from '../../reducers/orders';
import { handleModal } from '../../reducers/modals';
import { getAllStores, handleStore } from  '../../reducers/store';

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
      getAllStores,
      handleStore,
      changePage : () => push('/')
    }, dispatch),
  };
}

class Stores extends Component {
  componentWillMount() {
    this.props.actions.getAllStores();
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
    const { store: { stores } } = this.props.reducers;
    const { actions } = this.props;
    const { InputFilter, FilterResults } = fuzzyFilterFactory();
    const fuseConfig = {
      keys: ['name', 'description'],
      threshold: 0.3,
    };
    console.log(stores)
    return (
      <div className='Stores'>
        <StoreModal />
        <Grid columns={1} doubling className='top-menu' padded>
          <Grid.Row>
            <Grid.Column floated='left' width={12}>
              <InputFilter debounceTime={ 200 } className="input-filter" inputProps={ { placeholder: "Buscar tienda..." } } />
              <Button basic color='green' onClick={this.openModal('storeModal')}>Crear Tienda</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid columns={2} doubling className='top-menu' padded>
          <Grid.Row>
            <Grid.Column width={12}>
              <Card.Group>
                <FilterResults { ...{
                  fuseConfig,
                  items: stores,
                } }>
                  {
                    (filteredStores) => {
                      if (filteredStores.length === 0) {
                        return (
                          <h3 className="no-found">No se encontraron productos</h3>
                        );
                      }
                      return (
                        _.map(filteredStores, (store, index) => {
                          const { name, logo, isOpen, domain, description } = store;
                          return (
                            <Card {...{
                              key: index,
                              image: logo,
                              header: name,
                              meta: `${domain}.bopulos.com`,
                              description,
                              extra: <div className='ui two buttons'>
                              <Button basic color='green'>
                                Editar
                              </Button>
                              <Button basic color={isOpen ? 'red' : 'green'} onClick={() => actions.handleStore(!isOpen)}>
                                {isOpen ? 'Cerrar' : 'Abrir'}
                              </Button>
                            </div>,
                            }}
                            />
                          );
                        })
                      );
                    }
                  }
                </FilterResults>
              </Card.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stores);
