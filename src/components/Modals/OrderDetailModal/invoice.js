import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
// import { formatPrice } from "../../../helpers/formats";


class Invoice extends Component {
  render() {
    const { invRef, selectedOrder : { orderNumber, products, address, total, user, createdAt } } = this.props;
    const date = moment(createdAt).format('MMMM Do YYYY, h:mm:ss a');
    return (
      <div className="invoice">

        <div id="invoice-POS" ref={invRef}>

          <div className="invoiceCont">
            <div className="info">
              <div className="logo"/>
              <div className="info">
                <h2>Lo que sea</h2>
              </div>
              <p>Contacto:</p>
              <p><br/>
                Email : robertico@gmail.com<br/>
                Telefono : 555-555-5555<br/>
              </p>
            </div>

            <div className="invoiceDetails">
              <p>{date}</p>
              <p>Orden: {orderNumber}</p>
              <p>Direccion: {address}</p>
              <p>Cliente: {user.firstName} {user.lastName}</p>
            </div>

            <div className="invoiceContent">
              <div className="invoiceItem invoiceTitle">
                <div className="product"><h2>Producto</h2></div>
                <div><h2>Cantidad</h2></div>
                <div><h2>Precio</h2></div>
              </div>
              {
                _.map(products, ({ name, qty, price }) => {
                  return (
                    <div className="invoiceItem">
                      <p className="product itemText">{name}</p>
                      <p className="itemText">{qty}</p>
                      <p className="itemText">&#8353;{price}</p>
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
            <div className="legalCopy">
              <p className="legal"><strong>Gracias por comprar con nosotros</strong>
              </p>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Invoice;
