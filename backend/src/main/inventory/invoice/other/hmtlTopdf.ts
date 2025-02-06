export const generateInvoiceHTML = (invoice) => {
    return `
      <html>
      <head>
        <style>
          body {
            margin-top: 20px;
            color: #2e323c;
            background: #f5f6fa;
            position: relative;
            height: 100%;
          }
          .invoice-container {
            padding: 1rem;
          }
          .invoice-header .invoice-logo {
            font-size: 1.6rem;
            font-weight: 700;
          }
          .invoice-details {
            padding: 1rem;
            background: #f5f6fa;
          }
          .custom-table {
            border: 1px solid #e0e3ec;
          }
          .custom-table thead {
            background: #007ae1;
          }
          .custom-table thead th {
            color: #ffffff;
          }
          .invoice-footer {
            text-align: center;
            font-size: 0.7rem;
            margin-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="invoice-container">
            <div class="invoice-header">
              <div class="invoice-logo">${invoice.companyName}</div>
              <address class="text-right">
                ${invoice.companyAddress}
              </address>
            </div>
  
            <div class="invoice-details">
              <div class="row">
                <div class="col-md-6">
                  <address>
                    ${invoice.customerName}<br>
                    ${invoice.customerAddress}
                  </address>
                </div>
                <div class="col-md-6 text-right">
                  <div>Invoice - #${invoice.invoiceNumber}</div>
                  <div>${invoice.invoiceDate}</div>
                </div>
              </div>
            </div>
  
            <div class="invoice-body">
              <div class="table-responsive">
                <table class="table custom-table">
                  <thead>
                    <tr>
                      <th>Items</th>
                      <th>Product ID</th>
                      <th>Quantity</th>
                      <th>Sub Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${invoice.items
                      .map(
                        (item) => `
                      <tr>
                        <td>${item.name}</td>
                        <td>#${item.productId}</td>
                        <td>${item.quantity}</td>
                        <td>$${item.subTotal.toFixed(2)}</td>
                      </tr>
                    `
                      )
                      .join("")}
                    <tr>
                      <td colspan="2"></td>
                      <td>
                        <p>Subtotal<br>Shipping<br>Tax</p>
                        <h5 class="text-success"><strong>Total</strong></h5>
                      </td>
                      <td>
                        <p>$${invoice.subtotal.toFixed(2)}<br>$${invoice.shipping.toFixed(2)}<br>$${invoice.tax.toFixed(2)}</p>
                        <h5 class="text-success"><strong>$${invoice.total.toFixed(2)}</strong></h5>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
  
            <div class="invoice-footer">
              Thank you for your business.
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  };
  
  // Ejemplo de datos de la factura
  const invoiceData = {
    companyName: "Bootdey.com",
    companyAddress: "45 NorthWest Street, San Francisco, 00000",
    customerName: "Alex Maxwell",
    customerAddress: "150-600 Church Street, Florida, USA",
    invoiceNumber: "009",
    invoiceDate: "January 10th 2020",
    items: [
      { name: "WordPress Template", productId: "50000981", quantity: 9, subTotal: 5000.0 },
      { name: "Maxwell Admin Template", productId: "50000126", quantity: 5, subTotal: 100.0 },
      { name: "Unify Admin Template", productId: "50000821", quantity: 6, subTotal: 49.99 },
    ],
    subtotal: 5150.99,
    shipping: 100.0,
    tax: 49.0,
    total: 5299.99,
  };
  
  