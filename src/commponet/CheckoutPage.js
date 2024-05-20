import React, { useEffect } from 'react';
import './Checkout.css';

import $ from 'jquery';
import 'jquery-ui/ui/widgets/datepicker';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const CheckoutPage = () => {
  useEffect(() => {
   /* COPY INPUT VALUES TO CARD MOCKUP */
const bounds = document.querySelectorAll("[data-bound]");

for (let i = 0; i < bounds.length; i++) {
  const targetId = bounds[i].getAttribute("data-bound");
  const defValue = bounds[i].getAttribute("data-def");
  const targetEl = document.getElementById(targetId);
  bounds[i].addEventListener(
    "blur",
    () => (targetEl.innerText = bounds[i].value || defValue)
  );
}

/* TOGGLE CVC DISPLAY MODE */
const cvc_toggler = document.getElementById("cvc_toggler");

cvc_toggler.addEventListener("click", () => {
  const target = cvc_toggler.getAttribute("data-target");
  const el = document.getElementById(target);
  el.setAttribute("type", el.type === "text" ? "password" : "text");
});

function onlyNumberKey(evt) {
  // Only ASCII character in that range allowed
  var ASCIICode = evt.which ? evt.which : evt.keyCode;
  if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) return false;
  return true;
}

$(function () {
  $("#cardNumber").on("keyup", function (e) {
    var val = $(this).val();
    var newval = "";
    val = val.replace(/\s/g, "");
    for (var i = 0; i < val.length; i++) {
      if (i % 4 == 0 && i > 0) newval = newval.concat(" ");
      newval = newval.concat(val[i]);
    }
    $(this).val(newval);
  });

  $(".year-own").datepicker({
    minViewMode: 2,
    format: "yyyy"
  });

  $(".month-own").datepicker({
    format: "MM",
    minViewMode: "months",
    maxViewMode: "months",
    startView: "months"
  });
});

  }, []);

  const onlyNumberKey = (event) => {
    const charCode = event.which ? event.which : event.keyCode;
    const mobileNumber = $('#phone').val();
    if (charCode > 31 && (charCode < 48 || charCode > 57) || mobileNumber.length >= 10) {
      event.preventDefault();
    }
  };

  const formik = useFormik({
    initialValues: {
      cardNumber: '',
      month: '',
      year: '',
      cvv: '',
      cardholderName: '',
      mobileNumber: ''
    },
    validationSchema: Yup.object({
      cardNumber: Yup.string()
        .matches(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/, 'Invalid card number')
        .required('Required'),
      month: Yup.string().required('Required'),
      year: Yup.string().required('Required'),
      cvv: Yup.string().matches(/^\d{3}$/, 'Invalid CVV').required('Required'),
      cardholderName: Yup.string().required('Required'),
      mobileNumber: Yup.string().matches(/^\d{10}$/, 'Invalid mobile number').required('Required')
    }),
    onSubmit: (values) => {
      Swal.fire({
        icon: 'success',
        title: 'Payment successful!',
        showConfirmButton: false,
        timer: 1500
      });
    },
  });

  return (
    <div>
      <meta charSet="UTF-8" />
      <title>Checkout Form / Payment Gateway</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <div className="main-back">
        <div className="container m-auto bg-white p-5 bod-3">
          <div className="row">
            {/* CARD FORM */}
            <div className="col-lg-8 col-md-12">
              <form >
                <div className="header flex-between flex-vertical-center">
                  <div className="flex-vertical-center">
                    <i className="ai-bitcoin-fill size-xl pr-sm f-main-color" />
                    <span className="title">
                      <strong>AceCoin</strong><span>Pay</span>
                    </span>
                  </div>
                </div>
                <div className="card-data flex-fill flex-vertical">
                  {/* Card Number */}
                  <div className="flex-between flex-vertical-center">
                    <div className="card-property-title">
                      <strong>Card Number</strong>
                      <span>Enter 16-digit card number on the card</span>
                    </div>
                  </div>
                  <div className="flex-between">
                    <div className="card-number flex-vertical-center flex-fill">
                      <div className="card-number-field flex-vertical-center flex-fill">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
                          <path fill="#ff9800" d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z" />
                          <path fill="#d50000" d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z" />
                          <path fill="#ff3d00" d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z" />
                        </svg>
                        <input
                          type="text"
                          placeholder="Card Number"
                          className="form-control"
                          id="cardNumber"
                          name="cardNumber"
                          value={formik.values.cardNumber}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          maxLength={19}
                          onKeyPress={onlyNumberKey}
                          required
                        />
                      </div>
                      <i className="ai-circle-check-fill size-lg f-main-color" />
                    </div>
                  </div>
                  {formik.touched.cardNumber && formik.errors.cardNumber ? (
                    <div className="error">{formik.errors.cardNumber}</div>
                  ) : null}
                  {/* Expiry Date */}
                  <div className="flex-between">
                    <div className="card-property-title">
                      <strong>Expiry Date</strong>
                      <span>Enter the expiration date of the card</span>
                    </div>
                    <div className="card-property-value flex-vertical-center">
                      <div className="input-container half-width">
                        <input
                          className="numbers month-own"
                          placeholder="MM"
                          name="month"
                          value={formik.values.month}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                      <span className="m-md">/</span>
                      <div className="input-container half-width">
                        <input
                          className="numbers year-own"
                          placeholder="YYYY"
                          name="year"
                          value={formik.values.year}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                    </div>
                  </div>
                  {formik.touched.month && formik.errors.month ? (
                    <div className="error">{formik.errors.month}</div>
                  ) : null}
                  {formik.touched.year && formik.errors.year ? (
                    <div className="error">{formik.errors.year}</div>
                  ) : null}
                  {/* CCV Number */}
                  <div className="flex-between">
                    <div className="card-property-title">
                      <strong>CVC Number</strong>
                      <span>Enter card verification code from the back of the card</span>
                    </div>
                    <div className="card-property-value">
                      <div className="input-container">
                        <input
                          id="cvc"
                          placeholder="Card CVV"
                          maxLength={3}
                          type="password"
                          name="cvv"
                          value={formik.values.cvv}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          onKeyPress={onlyNumberKey}
                          required
                        />
                        <i id="cvc_toggler" data-target="cvc" className="ai-eye-open pointer" />
                      </div>
                    </div>
                  </div>
                  {formik.touched.cvv && formik.errors.cvv ? (
                    <div className="error">{formik.errors.cvv}</div>
                  ) : null}
                  {/* Name */}
                  <div className="flex-between">
                    <div className="card-property-title">
                      <strong>Cardholder Name</strong>
                      <span>Enter cardholder's name</span>
                    </div>
                    <div className="card-property-value">
                      <div className="input-container">
                        <input
                          id="name"
                          type="text"
                          className="uppercase"
                          placeholder="CARDHOLDER NAME"
                          name="cardholderName"
                          value={formik.values.cardholderName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          required
                        />
                        <i className="ai-person" />
                      </div>
                    </div>
                  </div>
                  {formik.touched.cardholderName && formik.errors.cardholderName ? (
                    <div className="error">{formik.errors.cardholderName}</div>
                  ) : null}
                  <div className="flex-between">
                    <div className="card-property-title">
                      <strong>Mobile No.</strong>
                      <span>Enter Mobile No.</span>
                    </div>
                    <div className="card-property-value">
                      <div className="input-container">
                        <input
                          id="phone"
                          type="text"
                          placeholder="Your Mobile No."
                          name="mobileNumber"
                          value={formik.values.mobileNumber}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          onKeyPress={onlyNumberKey}
                          required
                        />
                        <i className="ai-phone" />
                      </div>
                    </div>
                  </div>
                  {formik.touched.mobileNumber && formik.errors.mobileNumber ? (
                    <div className="error">{formik.errors.mobileNumber}</div>
                  ) : null}
                </div>
                <div className="action flex-center">
                  <button type="submit"onSubmit={formik.handleSubmit} className="b-main-color pointer">
                    Pay Now
                  </button>
                </div>
              </form>
            </div>
            {/* SIDEBAR */}
            <div className="col-lg-4 col-md-12 py-5">
              <div />
              <div className="purchase-section flex-fill flex-vertical">
                <div className="card-mockup flex-vertical">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="40px" height="40px">
                    <path fill="#ff9800" d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z" />
                    <path fill="#d50000" d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z" />
                    <path fill="#ff3d00" d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z" />
                  </svg>
                  <div>
                    <strong>
                      <div id="name_mock" className="size-md pb-sm uppercase ellipsis">
                        mr. Cardholder
                      </div>
                    </strong>
                    <div className="size-md pb-md">
                      <strong>
                        <span id="carddigits_mock">0000 0000 0000 0000</span>
                      </strong>
                    </div>
                    <div className="flex-between flex-vertical-center">
                      <strong className="size-md">
                        <span>Expiry Date : </span><span id="mm_mock">00</span> / <span id="yy_mock">00</span>
                      </strong>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="40px" height="40px">
                        <path fill="#1565C0" d="M45,35c0,2.209-1.791,4-4,4H7c-2.209,0-4-1.791-4-4V13c0-2.209,1.791-4,4-4h34c2.209,0,4,1.791,4,4V35z" />
                        <path fill="#FFF" d="M15.186 19l-2.626 7.832c0 0-.667-3.313-.733-3.729-1.495-3.411-3.701-3.221-3.701-3.221L10.726 30v-.002h3.161L18.258 19H15.186zM17.689 30L20.56 30 22.296 19 19.389 19zM38.008 19h-3.021l-4.71 11h2.852l.588-1.571h3.596L37.619 30h2.613L38.008 19zM34.513 26.328l1.563-4.157.818 4.157H34.513zM26.369 22.206c0-.606.498-1.057 1.926-1.057.928 0 1.991.674 1.991.674l.466-2.309c0 0-1.358-.515-2.691-.515-3.019 0-4.576 1.444-4.576 3.272 0 3.306 3.979 2.853 3.979 4.551 0 .291-.231.964-1.888.964-1.662 0-2.759-.609-2.759-.609l-.495 2.216c0 0 1.063.606 3.117.606 2.059 0 4.915-1.54 4.915-3.752C30.354 23.586 26.369 23.394 26.369 22.206z" />
                        <path fill="#FFC107" d="M12.212,24.945l-0.966-4.748c0,0-0.437-1.029-1.573-1.029c-1.136,0-4.44,0-4.44,0S10.894,20.84,12.212,24.945z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <ul className="purchase-props">
                  <li className="flex-between">
                    <span>Company</span>
                    <strong>Apple</strong>
                  </li>
                  <li className="flex-between">
                    <span>Order number</span>
                    <strong>429252965</strong>
                  </li>
                  <li className="flex-between">
                    <span>Product</span>
                    <strong>MacBook Air</strong>
                  </li>
                  <li className="flex-between">
                    <span>VAT (20%)</span>
                    <strong>$100.00</strong>
                  </li>
                </ul>
              </div>
              <div className="separation-line" />
              <div className="total-section flex-between flex-vertical-center">
                <div className="flex-fill flex-vertical">
                  <div className="total-label f-secondary-color">You have to Pay</div>
                  <div>
                    <strong>549</strong>
                    <small>.99 <span className="f-secondary-color">USD</span></small>
                  </div>
                </div>
                <i className="ai-coin size-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
