const productContentDOM = document.querySelector('#productContent');
const msgErrAddCart = 'Gagal menambahkan item kedalam keranjang, silahkan hubungi admin.';
const msgSucAddCart = 'Item berhasil ditambahkan kedalam keranjang.';

const getModalInputDOM = (index) => [{
  pn: document.querySelector('#product_name'+index),
  ps: document.querySelector('#product_stock'+index),
  pi: document.querySelector('#product_image'+index),
  pp: document.querySelector('#product_price'+index),
  pd: document.querySelector('#product_detail'+index),
}];

const handleAdd = () => {
    handleLoadingRequest(true);
    const pnDOM = getModalInputDOM('Add')[0].pn;
    const psDOM = getModalInputDOM('Add')[0].ps;
    //   const piDOM = getModalInputDOM('Add')[0].pi;
    const ppDOM = getModalInputDOM('Add')[0].pp;
    const pdDOM = getModalInputDOM('Add')[0].pd;

    const dataInput = {
        "product_name": pnDOM.value,
        "product_stock": psDOM.value,
        "product_price": ppDOM.value,
        "product_detail": pdDOM.value
    };
    // console.log(dataInput);

    POST_API(PRODUCT_POST_API, dataInput, TOKEN_DATA).then(ress => {
        const {message, status} = ress;
        // console.log(ress);
        !status && alert('Gagal, '+message);
        handleGet();
        setTimeout(() => handleLoadingRequest(false), 1000);
    });
  
}

const handleChange = (index, id_product) => {
  handleLoadingRequest(true);
  const pnDOM = getModalInputDOM(index)[0].pn;
  const psDOM = getModalInputDOM(index)[0].ps;
  const ppDOM = getModalInputDOM(index)[0].pp;
  const pdDOM = getModalInputDOM(index)[0].pd;

  const dataInput = {
    "id_product": id_product,
    "product_name": pnDOM.value,
    "product_stock": psDOM.value,
    "product_price": ppDOM.value,
    "product_detail": pdDOM.value
  };
  //   console.log(dataInput);
  
  PUT_API(PRODUCT_PUT_API, dataInput, TOKEN_DATA).then(ress => {
    const {message, status} = ress;
    // console.log(ress);
    !status && alert('Gagal, '+message);
    handleGet();
    setTimeout(() => handleLoadingRequest(false), 1000);
  });
}

const handleDelete = (ID) => {
  const dataInput = {
    "id_user": ID
  };

  // console.log(dataInput);
  
  DELL_API(USER_DELL_API, dataInput, TOKEN_DATA).then(ress => {
    const {message: messageUser, status: statusUser} = ress;
    
    if(statusUser) {
      DELL_API(CUSTOMER_DELL_API, dataInput, TOKEN_DATA).then(ress => {
        const {message, status} = ress;
        
        !status && alert('Gagal, '+message);
        handleGet();
        setTimeout(() => handleLoadingRequest(false), 1000);
      });
    }
    else {
      !statusUser && alert('Gagal, '+messageUser);
    }
  });
}

const handleCreateCart = (index, inputUser, dataProduct, btnAddDOM) => {
  // console.log('index create', index);
  // console.log('inputUser create', inputUser);
  // console.log('dataProduct create', dataProduct);

  const dataInput = {
      ...inputUser,
      "jumlahCart": 1,
      "totalHargaCart": dataProduct.product_price,
      
      "idProductItem": dataProduct.id_product,
      "jumlahItem": 1,
      "hargaItem": dataProduct.product_price,
      "totalHargaItem": dataProduct.product_price,
      "keteranganItem": ''
  }

  // alert('ini ku blokir ya');
  
  console.log('dataInput', dataInput);
  POST_API(CART_POST_API, dataInput, TOKEN_DATA).then(ress => {
    const {message, status} = ress;
    // console.log(ress);
    
    if(status) {
      handleGet();
      handleLoadingRequest(false);
      disabledButton(btnAddDOM, false);
      swalNotification(msgSucAddCart, 'success', () => handleLoadingRequest(false))
    } else {
      swalNotification(msgErrAddCart, 'error', () => handleLoadingRequest(false))
    }
  });
}

const handleUpdateCart = (index, inputUser, dataProduct, dataCart, btnAddDOM) => {
  // console.log('index update', index);
  // console.log('inputUser update', inputUser);
  // console.log('dataProduct update', dataProduct);
  // console.log('dataCart update', dataCart);

  const dataInput = {
    ...inputUser,
    "id_cart": dataCart.id_cart,
    "jumlahCart": dataCart.jumlah + 1,
    "totalHargaCart": dataCart.total_harga + dataProduct.product_price,
    
    "idProductItem": dataProduct.id_product,
    "jumlahItem": 1,
    "hargaItem": dataProduct.product_price,
    "totalHargaItem": dataProduct.product_price,
    "keteranganItem": ''
  }
  
  // console.log('===> count total', dataCart.total_harga + dataProduct.product_price);

  // console.log('===> dataInput', dataInput);

  PUT_API(CART_PUT_API, dataInput, TOKEN_DATA).then(ress => {
    const {message, status} = ress;
    // console.log(ress);

    if(status) {
      handleGet();
      handleLoadingRequest(false);
      disabledButton(btnAddDOM, false);
      swalNotification(msgSucAddCart, 'success', () => handleLoadingRequest(false))
    } else {
      swalNotification(msgErrAddCart, 'error', () => handleLoadingRequest(false))
    }
  });
}

const handleAddToCart = (index, id_product, product_price, product_stock) => {
  const btnAddDOM = document.querySelectorAll(`.btn-add-cart${index}`);
  
  disabledButton(btnAddDOM, true);
  handleLoadingRequest(true);
  
  const dataProduct = {
    "id_product": id_product,
    "product_price": product_price,
    "product_stock": product_stock
  }

  // CHECK_SESSION
  // console.log('===> index', index)
  // console.log('===> id_product', id_product)
  // console.log('===> TOKEN_DATA', TOKEN_DATA)

  GET_API_V2(USER_INFO_GET_API, TOKEN_DATA)
  .then(ress => ress?.ok ? ress?.json() : swalNotification(`Server error ${ress?.status}`, 'error'))
  .then(ressJson => {

    const { status: statusToken, message, data: dataToken } = ressJson;
    
    if(statusToken) {
      const { id_user } = dataToken;
      const inputUser = {
        "id_user": id_user,
        "status": 'waiting_payment'
      };

      // console.log('inputUser', inputUser);

      POST_API(CART_INFO_GET_API, inputUser, TOKEN_DATA).then(ressCart => {
        const { status: statusCart, message, data: dataCart } = ressCart;

        // console.log('ressCart', ressCart);
        
        (statusCart && dataCart.id_cart) 
          ? handleUpdateCart(index, inputUser, dataProduct, dataCart, btnAddDOM)
          : handleCreateCart(index, inputUser, dataProduct, btnAddDOM)
    
      });
    }
    else {
      handleLoadingRequest(false)
      swalNotification(`Please login with your account.`, 'info', () => goTo(linkMap.LOGIN, true))
      // swalNotification(`Please login with your account.`, 'error', () => goTo(linkMap.LOGIN));
    }

  })
  .catch(err => swalNotification(`There is some problem, please contact admin.`, 'error'));
}

const handleGet = ($html = '') => {

  handleLoadingRequest(true);
  productContentDOM.innerHTML = '';
  // console.log('token: ', TOKEN_DATA);

  GET_API_V2(PRODUCT_GET_API, TOKEN_DATA)
  .then(ress => ress?.ok ? ress?.json() : swalNotification(`Server error ${ress?.status}`, 'error'))
  .then(ressJson => {
    const { status, message, data } = ressJson;
    console.log(ressJson);
    console.log(data);

    if(status && !!data.length) {
      for (let i = 0; i < data.length; i++) {
        const isImage = isImageExists(`${BASE_API}/${data[i].product_image}`);  

        isImageExistsV2(`${BASE_API}/${data[i].product_image}`).then(
          (ress) => {
            console.log(`===> ress ${BASE_API}/${data[i].product_image}`)
          },
          (err) => {
            console.log(`===> err ${BASE_API}/${data[i].product_image}`)
          }
        );

        $html += `        
        <div class="card card-box-costume">
          <img class="card-img-top" src="${BASE_API}/${isImage ? data[i].product_image : 'img/data-not-found.jpg'}" alt="Card image cap">
          <div class="card-body pl-2 pr-2 pt-1 pb-2">
            <h5 class="card-title limit-text">${data[i].product_name}</h5>
            <p class="card-text limit-text mb-0">${data[i].product_detail}</p>
            <span class="card-price">Rp. <b>${data[i].product_price}</b></span>
            <div class="row">
              <div class="col-6 pl-2 d-flex flex-column justify-content-center">
                <span class="card-stock">Stock <b>${data[i].product_stock}</b></span>
              </div>
              <div class="col-6 d-flex justify-content-end">
                <a href="javascript:void(0)" class="btn btn-sm btn-info" data-toggle="modal" data-target="#productDetail${i+1}">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info" viewBox="0 0 16 16">
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                  </svg>
                </a>
                <a 
                  href="javascript:void(0)" 
                  class="btn btn-sm btn-warning btn-add-cart${i+1}" 
                  onclick="handleAddToCart(${i+1}, '${data[i].id_product}', ${data[i].product_price}, ${data[i].product_stock})" 
                  style="margin-left: 6px;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16">
                    <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/>
                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="modal fade" id="productDetail${i+1}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Product detail</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <img class="card-img-top" src="./img/data-not-found.jpg" alt="Card image cap">
                <div class="card-body">
                  <h5 class="card-title">${data[i].product_name}</h5>
                  <span class="card-price">Rp. <b>${data[i].product_price}</b></span>
                  <span class="card-stock">Tersisa <b>${data[i].product_stock}</b></span>
                  <p class="card-text">${data[i].product_detail}</p>
                  <!-- <div class="row">
                    <div class="col-12 d-flex justify-content-end">
                      <button href="javascript:void(0)" class="btn btn-warning btn-add-cart${i+1}"
                        onclick="handleAddToCart(${i+1}, '${data[i].id_product}', ${data[i].product_price}, ${data[i].product_stock})" 
                        style="margin-left: 6px;">Add to cart</button>
                    </div>
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>`;
      }

      productContentDOM.innerHTML = $html;
      handleLoadingRequest(false);
    }
    else {
      handleLoadingRequest(false)
      swalNotification(message, 'error', () => goTo(linkMap.HOME, true))
    }

  });
}

window.onload = () => {
  handleGet();
  defineLink();
}
