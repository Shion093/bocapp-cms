import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
// import { formatPrice } from "../../../helpers/formats";


class Invoice extends Component {
  render() {
    const { invRef, selectedOrder : { orderNumber, products, address, total, user, createdAt } } = this.props;
    return (
      <div className="invoice">
        <div className="invoiveContainer" id="invoicePOS" ref={invRef}>
          <div className="invoiceDetails">
            <div className="logo" style={{ backgroundImage: 'url(https://s3.amazonaws.com/lo-que-sea/assets/logo.png)' }}/>
            <h1 className="centerText">Nombre tienda</h1>
            <p><b>Email:</b> info@bopulos.com</p>
            <p><b>Teléfono:</b> Aun sin numero</p>
          </div>
          <div className="invoiceDetails">
            <p><b>Fecha:</b>{moment(createdAt).format('lll')}</p>
            <p><b>Orden:</b> {orderNumber}</p>
            <p><b>Dirección:</b> {address}</p>
            <p><b>Cliente:</b> {user.firstName} {user.lastName}</p>
          </div>
          <div className="invoiceItem invoiceTitle">
            <div style={{ flexGrow : 8 }}>
              <h2>Producto</h2>
            </div>
            <div style={{ flexGrow : 2 }} className="centerText">
              <h2>Cant</h2>
            </div>
            <div style={{ flexGrow : 2 }} className="centerText">
              <h2>Precio</h2>
            </div>
          </div>
          {
            _.map(products, ({ name, qty, price }, i) => {
              return (
                <div className="invoiceItem" key={i}>
                  <div style={{ flexGrow: 8}}><p>{name}</p></div>
                  <div style={{ flexGrow: 2}} className="centerText"><p>{qty}</p></div>
                  <div style={{ flexGrow: 2}} className="endText"><p>&#8353;{price}</p></div>
                </div>
              )
            })
          }
          <div className="invoiceItem invoiceTitle">
            <div style={{ flexGrow: 8}} className="endText"><h2>Total</h2></div>
            <div style={{ flexGrow: 4}} className="endText"><h2>&#8353;{total}</h2></div>
          </div>
          <div className="invoiceDetails centerText">
            <p><b>Gracias por comprar con nosotros</b></p>
            <p><b>bopulos.com</b></p>
          </div>
        </div>
      </div>
    );
  }
}

export default Invoice;
