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
    const date = moment(createdAt).format('MMMM Do YYYY, h:mm:ss a');
    const wazeUrl = `https://waze.com/ul?ll=${coordinates[0]},${coordinates[1]}&navigate=yes`;
    return (
      <div className="invoiceDelivery">

        <div id="invoice-POS" ref={invRef}>

          <div className="invoiceCont">
            <div className="qr">
              <ReactQR value={wazeUrl} />
            </div>

            <div className="invoiceDetails">
              <p>{date}</p>
              <p>Orden: {orderNumber}</p>
              <p>Direccion: {address}</p>
              <p>Detalles: {details}</p>
              <p>Cliente: {user.firstName} {user.lastName}</p>
            </div>

            <div className="invoiceContent">
              <div className="invoiceItem invoiceTitle">
                <div className="product"><h2>Producto</h2></div>
                <div><h2>Cantidad</h2></div>
              </div>
              {
                _.map(products, ({ name, qty, price }, i) => {
                  return (
                    <div className="invoiceItem" key={i}>
                      <p className="product itemText">{name}</p>
                      <p className="itemText">{qty}</p>
                    </div>
                  )
                })
              }
              <div className="invoiceItem invoiceTitle">
                <div className="product"/>
                <div><h2>Total</h2></div>
                <div><h2>&#8353;{total}</h2></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InvoiceDelivery;
