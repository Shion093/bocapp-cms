import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import ReactQR from 'qrcode.react';
// import { formatPrice } from "../../../helpers/formats";


class InvoiceDelivery extends Component {
  render() {
    const {
      invRef,
      selectedOrder : {
        orderNumber,
        products,
        address,
        total,
        user,
        createdAt,
        details,
        location : {
          coordinates
        },
      } } = this.props;
    const wazeUrl = `https://waze.com/ul?ll=${coordinates[0]},${coordinates[1]}&navigate=yes`;
    return (
      <div className="invoiceDelivery">
        <div className="invoiveContainer" id="invoicePOS" ref={invRef}>
          <div className="qr">
            <ReactQR value={wazeUrl} />
          </div>

          <div className="invoiceDetails">
            <p><b>Fecha:</b>{moment(createdAt).format('lll')}</p>
            <p><b>Orden:</b> {orderNumber}</p>
            <p><b>Dirección:</b> {address}</p>
            <p><b>Detalles:</b> {details}</p>
            <p><b>Cliente:</b> {user.firstName} {user.lastName}</p>
          </div>

          <div className="invoiceItem invoiceTitle">
            <div style={{ flexGrow: 8}}><h2>Producto</h2></div>
            <div style={{ flexGrow: 4}} className="centerText"><h2>Cantidad</h2></div>
          </div>
          {
            _.map(products, ({ name, qty, price }, i) => {
              return (
                <div className="invoiceItem" key={i}>
                  <p style={{ flexGrow: 8}}>{name}</p>
                  <p style={{ flexGrow: 4}} className="centerText">{qty}</p>
                </div>
              )
            })
          }
          <div className="invoiceItem invoiceTitle">
            <div style={{ flexGrow: 8}} className="endText"><h2>Total</h2></div>
            <div style={{ flexGrow: 4}} className="centerText"><h2>&#8353;{total}</h2></div>
          </div>
        </div>
      </div>
    );
  }
}

export default InvoiceDelivery;
