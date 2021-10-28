// https://pluginongkoskirim.com/cek-resi/
// const API_CHECK_SHIPPER = 'https://cors.bridged.cc/https://pluginongkoskirim.com/cek-tarif-ongkir/front/resi-amp?__amp_source_origin=https%3A%2F%2Fpluginongkoskirim.com';

const API_CHECK_SHIPPER = 'https://pluginongkoskirim.com/cek-tarif-ongkir/front/resi-amp?__amp_source_origin=https%3A%2F%2Fpluginongkoskirim.com';
const API_BYPASS_CORS = {
  CORS_ANYWHERE: 'https://cors-anywhere.herokuapp.com/'
}

// const BASE_API = 'http://localhost:3001';
// const BASE_API = 'https://serverv1.codev98.xyz';
const BASE_API = 'https://1ba9-223-255-230-36.ngrok.io';

const SESSION_API = '/portal/check/token';
const LOGIN_ACTION_API = '/portal/go/login';
const REGISTER_ACTION_API = '/portal/go/register';
// USER
const USER_INFO_GET_API = '/join/userv1';
const USER_GET_API = '/user/read';
const USER_POST_API = '/user/add';
const USER_PUT_API = '/user/change';
const USER_DELL_API = '/user/delete';
// CUSTOMER
const CUSTOMER_GET_API = '/customer/read';
const CUSTOMER_POST_API = '/customer/add';
const CUSTOMER_PUT_API = '/customer/change';
const CUSTOMER_DELL_API = '/customer/delete';
// PRODUCT
const PRODUCT_GET_API = '/product/read';
const PRODUCT_POST_API = '/product/add';
const PRODUCT_PUT_API = '/product/change';
const PRODUCT_DELL_API = '/product/delete';
// CART
const CART_USER_GET_API = '/join/cart';
const CART_INFO_GET_API = '/join/cart/status';
const CART_ITEM_GET_API = '/join/cart/item';
const CART_GET_SHIPPING = '/join/cart/shipping';
const CART_GET_USER_SHIPPING = '/join/cart/shipping/user';
const CART_CURRENT_USER_GET_API = '/cart/read/user';
const CART_GET_API = '/cart/read';
const CART_POST_API = '/cart/add';
const CART_PUT_API = '/cart/change';
const CART_PUT_APIv1 = '/cart/changev1';

const IMAGE_PUT_API = '/image/upload/profile';

const VIEW_ADMIN_DASHBOARD = '/admin';
const VIEW_CUSTOMER_DASHBOARD = '/customer';
const VIEW_LOGIN_DASHBOARD = '/';
const VIEW_REGISTER_DASHBOARD = '/';

const TOKEN_DATA = window.location.search.substring(6);

const fetchSettings = {
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  redirect: 'follow',
  referrerPolicy: 'no-referrer',
}

const linkMap = {
  LOGIN: 'login.html',
  HOME: 'index.html',
  ORDER_HISTORY: 'order-history.html',
  PROFILE: 'profile.html',
  TRACKING: 'tracking.html',
}





// CEK SESSION
const CHECK_SESSION = async (url) => {
  console.log('===> TOKEN_DATA', TOKEN_DATA)
  console.log('===> url', BASE_API+url)
  GET_API_V2(url, TOKEN_DATA)
  .then(ress => ress?.ok ? ress?.json() : swalNotification(`Server error ${ress?.status}`, 'error'))
  .then(ressData => {
    // const { status, data } = ressData;
    console.log('===> data', ressData)
    // console.log('===> status', status)
  })
}
// END CEK SESSION






// Login API
const handleIsLogin = () => $.ajax({
  type  : 'GET',
  url   : BASE_API+USER_INFO_GET_API+'?page='+TOKEN_DATA,
  async : true,
  dataType : 'JSON',
  success : (ress) => {
    const { status, message, data } = ress;
    console.log(ress);
    if (!status || !data,length) {
      window.location = `./index.html`;
    }
  }
});
// End Login API call







// Get API
const GET_API = (url, token = '') => $.ajax({
  type  : 'GET',
  url   : BASE_API+url+'?page='+token,
  async : true,
  dataType : 'JSON',
  success : (ress) => ress
});
const GET_API_V2 = async (url, token = '') => await fetch(BASE_API+url, {
  fetchSettings,
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Token': token,
  },
});
// End Get API







// Post API
const POST_API = (url, data = {}, token = '') => $.ajax({
  type : "POST",
  url  : BASE_API+url+'?page='+token,
  dataType : "JSON",
  data : data,
  success: (ress) => ress
});
const POST_API_V2 = async (url, data = {}, token = '') => await fetch(BASE_API+url, {
  fetchSettings,
  body: JSON.stringify(data),
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Token': token,
  },
});
// Post API






// Put API
const PUT_API = (url, data = {}, token = '') => $.ajax({
  type : "PUT",
  url  : BASE_API+url+'?page='+token,
  dataType : "JSON",
  data : data,
  success: (ress) => ress
});
const PUT_API_V2 = async (url, data = {}, token = '') => await fetch(BASE_API+url, {
  fetchSettings,
  body: JSON.stringify(data),
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Token': token,
  },
});
// End Put APi`








// Del API
const DELL_API = (url, data = {}, token = '') => $.ajax({
  type : "DELETE",
  url  : BASE_API+url+'?page='+token,
  dataType : "JSON",
  data : data,
  success: (ress) => ress
});
const DELL_API_V2 = async (url, data = {}, token = '') => await fetch(BASE_API+url, {
  fetchSettings,
  body: JSON.stringify(data),
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Token': token,
  },
});
// End Dell API









// Post External API
const POST_EXTERNAL_API = (url, data = {}) => $.ajax({
  type : "POST",
  url  : url,
  dataType : "JSON",
  data : data,
  success: (ress) => ress
});
// End Post External API







// const isImageExists = (image_url) => {
//   const http = new XMLHttpRequest();

//   http.open('HEAD', image_url, false);
//   http.send();

//   return http.status != 404;
// }

const isImageExists = (image_url) => true;








const doNothink = (req, res) => {};

const getCookie = (cookie_key) => {
  const name = cookie_key + "=";
  const cDecoded = decodeURIComponent(document.cookie); //to be careful
  const cArr = cDecoded .split(';');
  let res;
  cArr.forEach(val => {
      if (val.indexOf(name) === 0) res = val.substring(name.length);
  })
  return res;
}

const setCookie = (cName, cValue, expDays) => {
  let date = new Date();
  date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
  const expires = "expires=" + date.toUTCString();
  document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
}

const loadingRequest = `<div class="row box-loading" id="loadingRequest"
    style="position: fixed; top: 0; left: 7px; z-index: 9999; width: 100vw; height: 100vh;
    background-color: rgba(0, 0, 0, 0.7); color: white; display: flex; justify-content: center;
    align-items: center;">
  <div class="spinner-grow" role="status"
    style="width: 7rem; height: 7rem;">
    <span class="sr-only">Loading...</span>
  </div>
</div>`;

const handleLoadingRequest = (status = false) => {
  if(status) {
    document.querySelector('#loadingWrapper').innerHTML = loadingRequest 
  } else {
    document.querySelector('#loadingWrapper').innerHTML = '';
    // console.log(document.querySelector('.modal-backdrop'));
    // console.log(document.querySelector('.modal-backdrop').parentNode);
    if (document.querySelector('.modal-backdrop')) document.querySelector('.modal-backdrop').parentNode.removeChild(
      document.querySelector('.modal-backdrop')
    );
  }
}

const disabledButton = (btnDOM, status) => btnDOM.forEach(item => item.disabled = status);

const clearConsole = () => console.clear();

const hideElement = (arrEl) => arrEl.length > 0 && arrEl.map(item => item?.classList.add('d-none'))

const showElement = (arrEl) => arrEl.length > 0 && arrEl.map(item => item?.classList.add('d-block'))

const defineLink = () => {
  const urlData = TOKEN_DATA ? `?page=${TOKEN_DATA}` : '';
  const linkOrderHistoryDOM = document.querySelector('#link-order-history');
  const linkTrackingDOM = document.querySelector('#link-tracking');
  const linkProfileDOM = document.querySelector('#link-profile');
  const linkLogoutDOM = document.querySelector('#link-logout');
  const linkLoginDOM = document.querySelector('#link-login');
  const linkHomeDOM = document.querySelector('#link-home');

  if(TOKEN_DATA) {
    hideElement([linkLoginDOM]);
    showElement([
      linkLogoutDOM,
      linkOrderHistoryDOM,
      linkTrackingDOM,
      linkProfileDOM,
    ]);
  } 
  else {
    showElement([linkLoginDOM]);
    hideElement([
      linkLogoutDOM,
      linkOrderHistoryDOM,
      linkTrackingDOM,
      linkProfileDOM,
    ]);
  }

  linkOrderHistoryDOM.setAttribute('href', `./${linkMap.ORDER_HISTORY + urlData}`);
  linkTrackingDOM.setAttribute('href', `./${linkMap.TRACKING + urlData}`);
  linkProfileDOM.setAttribute('href', `./${linkMap.PROFILE + urlData}`);
  linkLogoutDOM.setAttribute('href', `./${linkMap.HOME}`);
  linkLoginDOM.setAttribute('href', `./${linkMap.LOGIN}`);
  linkHomeDOM.setAttribute('href', `./${linkMap.HOME + urlData}`);
}

const handleCopy = (text) => {
  const TempText = document.createElement("input");
  TempText.value = text;
  document.body.appendChild(TempText);
  TempText.select();
  
  document.execCommand("copy");
  document.body.removeChild(TempText);
  
  swalNotification("Text sudah dicopy", 'success');
}

const goTo = (subUrl = linkMap.HOME, resetUrl = false) => window.location.href = TOKEN_DATA && !resetUrl ? `./${subUrl}?page=${TOKEN_DATA}` : `./${subUrl}`;

const tableTmp = (headerTable, dataTable) => `
<table id="example1" class="table table-striped">
  <thead class="bg-primary">
    <tr>${headerTable}</tr>
  </thead>
  <tbody>
    ${dataTable}
  </tbody>
  <tfoot>
    <tr>${headerTable}</tr>
  </tfoot>
</table>`;

const setDataTable = () => {
  $(function () {
    $("#example1").DataTable({
      "responsive": true, 
      "lengthChange": false, 
      "autoWidth": false,
      "buttons": ["copy", "csv", "excel", "print", "colvis"]
    })
    .buttons()
    .container()
    .appendTo('#example1_wrapper .col-md-6:eq(0)');
  });
}

const swalNotification = (msg, type, func = ()=>{}) => {
  const swalConfig = {
    title: '',
    icon: '',
    text: msg,
    confirmButtonText: 'Ok'
  };

  switch (type) {
    case "error":
      swalConfig.title = "ERROR";
      swalConfig.icon = "error";
      break;
    case "warning":
      swalConfig.title = "WARNING";
      swalConfig.icon = "warning";
      break;
    case "info":
      swalConfig.title = "INFO";
      swalConfig.icon = "info";
      break;
    case "question":
      swalConfig.title = "CONFIRMATION";
      swalConfig.icon = "question";
      break;
    default:
      swalConfig.title = "SUCCESS";
      swalConfig.icon = "success";
      break;
  }

  Swal.fire(swalConfig).then(data => func())
};
