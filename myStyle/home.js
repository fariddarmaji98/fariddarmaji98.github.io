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

        $html += `
        <div class="card" style="width: 18rem;">
          <img class="card-img-top border-bottom" src="${BASE_API}/${isImage ? data[i].product_image : 'img/data-not-found.jpg'}" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title limit-text">${data[i].product_name}</h5>
            <span class="card-price">Rp. <b>${data[i].product_price}</b></span>
            <span class="card-stock">Tersisa <b>${data[i].product_stock}</b></span>
            <p class="card-text limit-text">${data[i].product_detail}</p>
            <div class="row">
              <div class="col-12 d-flex justify-content-end">
                <button class="btn btn-info" data-toggle="modal" data-target="#productDetail${i+1}">Detail</button>
                <button class="btn btn-warning btn-add-cart${i+1}"
                  onclick="handleAddToCart(${i+1}, '${data[i].id_product}', ${data[i].product_price}, ${data[i].product_stock})" 
                  style="margin-left: 6px;">Add to cart</button>
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
