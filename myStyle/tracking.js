
const shippingContentDOM = document.querySelector('#shippingContent');
const modalContentDOM = document.querySelector('#modalContent');

const handleUpdateCart = (index, inputUser, dataProduct, dataCart, btnAddDOM) => {

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
    !status && alert('Gagal, '+message);
    handleGet();
    setTimeout(() => {
      handleLoadingRequest(false);
      disabledButton(btnAddDOM, false);
    }, 1000);
  });
}

const handleConfirmOrder = (id_cart) => window.open(`https://wa.me/08231231412?text=Hai%20saya%20ingin%20mengkonfirmasi%20pembayaran%20pada%20pesanan%20dengan%20ID%20CARD%20${id_cart}`);

const handleRenderModal = (dataShipping, id_cart, dataResi) => {
  const { 
    code,
    consignee: receiverV1,
    receiver: receiverV2,
    service,
    shipper,
    status,
    kurir,
    current_position,
    date_received,
    date_shipment,
    history
  } = dataShipping;

  const { kurir: jasa_pengiriman, resi: nomor_resi } = dataResi;
  
  // console.log('dataShipping', dataShipping);
  
  let $htmlRecipient = `<div class="modal fade" id="recipientDetail${id_cart}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <div class="flex-left">
              <!-- <span class="text-success">Informasi penerima</span> -->
              <span class="username">
                <a href="javascript:void(0)">${receiverV1.name || receiverV2 || 'Nama tidak dicantumkan'}</a>
              </span>
              <span class="description text-muted">${receiverV1.address || 'Alamat tidak dicantumkan'}</span>
            </div>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      </div>
    </div>`;

  let $htmlSender = `<div class="modal fade" id="senderDetail${id_cart}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <div class="flex-left">
              <!-- <span class="text-success">Informasi pengirim</span> -->
              <span class="username">
                <a href="javascript:void(0)">${shipper.name || 'Nama tidak dicantumkan'}</a>
              </span>
              <span class="description text-muted">${shipper.address || 'Alamat tidak dicantumkan'}</span>
            </div>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      </div>
    </div>`;

  let $htmlShipping = `<div class="modal fade" id="shippingDetail${id_cart}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-success" id="exampleModalLabel">${jasa_pengiriman.toUpperCase()}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">

            <ul class="timeline-body list-group list-group-unbordered mb-3">
              <li class="list-group-item">
                Nomor resi <a class="float-right" onclick="handleCopy('${nomor_resi || '-'}')">${nomor_resi || '-'}</a>
              </li>
              <li class="list-group-item">
                Service <a class="float-right">${service || '-'}</a>
              </li>
              <li class="list-group-item">
                Status pengiriman <a class="float-right">${status || '-'}</a>
              </li>
              <li class="list-group-item">
                Tanggal dikirim <a class="float-right">${date_received || '-'}</a>
              </li>
              <li class="list-group-item">
                Tanggal diterima <a class="float-right">${date_shipment || '-'}</a>
              </li>
              <li class="list-group-item">
                Lokasi paket <a class="float-right">${current_position || '-'}</a>
              </li>
            </ul>

            <div class="timeline stepper-wrapper">`;
            // sortDescHistory
  history.map((item, index) => {
    const { desc, position, time } = item;
    if (index === 0) $htmlShipping += `
    <div>
      <i class="fa fa-truck bg-primary text-white" aria-hidden="true"></i>
      <div class="timeline-item">
        <span class="time"><i class="fas fa-clock"></i> ${time || '-'}</span>
        <h3 class="timeline-header"><a href="javascript:void(0)">${position || '-'}</a></h3>
        <div class="timeline-body">
          ${desc || '-'}
        </div>
      </div>
    </div>`;
    else $htmlShipping += `
    <div>
      <i class="fa fa-map-pin bg-default text-white" aria-hidden="true"></i>
      <div class="timeline-item">
        <span class="time"><i class="fas fa-clock"></i> ${time || '-'}</span>
        <h3 class="timeline-header"><a class="text-muted href="javascript:void(0)">${position || '-'}</a></h3>
        <div class="timeline-body text-muted">
          ${desc || '-'}
        </div>
      </div>
    </div>`;
  })

  $htmlShipping +=`
            </div>
          </div>
        </div>

      </div>
    </div>`;
    
  modalContentDOM.innerHTML += $htmlShipping + $htmlRecipient + $htmlSender;
  handleLoadingRequest(false);
}

const getShippingHistory = (data, id_cart) => {
  const {nomor_resi, jasa_pengiriman} = data;
  const dataResi = {
    "kurir": jasa_pengiriman,
    "resi": nomor_resi
  }

  console.log('===> dataResi', dataResi)
  console.log('===> API', API_BYPASS_CORS.CORS_ANYWHERE+API_CHECK_SHIPPER)
  
  POST_EXTERNAL_API(API_BYPASS_CORS.CORS_ANYWHERE+API_CHECK_SHIPPER, dataResi).then(ress => ress.data.found 
    && handleRenderModal(ress.data.detail, id_cart, dataResi));
  // POST_EXTERNAL_API(API_BYPASS_CORS.CORS_ANYWHERE+API_CHECK_SHIPPER, dataResi).then(ress => {
  //   console.log('===> ress', ress)
  // })
}

const handleGet = () => {
  let $html = '';
  shippingContentDOM.innerHTML = ''; 
  handleLoadingRequest(true);
  
  GET_API_V2(CART_GET_USER_SHIPPING, TOKEN_DATA)
  .then(ress => ress?.ok ? ress?.json() : swalNotification(`Server error ${ress?.status}`, 'error'))
  .then(ressJson => {
    const { status, message, data } = ressJson;

    // console.log('ressJson', ressJson);
    if(status && !!data.length) {
      data.map((item, index) => {

        if (item.nomor_resi) getShippingHistory(item, item.id_cart);
        if (item.nomor_resi) $html += `<div class="card box-order">
          <div class="timeline-item">
            <div>
              <span class="time"><i class="fas fa-clock"></i> ${item.createdAt || '-'}</span>
              <h4 class="timeline-header"><a href="#">ID Cart </a> <span onclick="handleCopy('${item.nomor_resi || '-'}')">${item.id_cart || '-'}</span></h4>
            </div>
    
            <ul class="timeline-body list-group list-group-unbordered mb-3">
              <li class="list-group-item">
                Nomor resi <a class="float-right" onclick="handleCopy('${item.nomor_resi || '-'}')">${item.nomor_resi || '-'}</a>
              </li>
              <li class="list-group-item">
                Jasa pengiriman <a class="float-right">${item.jasa_pengiriman.toUpperCase() || '-'}</a>
              </li>
            </ul>
    
            <div class="timeline-footer" style="text-align: right;">
              <a class="btn btn-warning btn-sm" data-toggle="modal" data-target="#shippingDetail${item.id_cart}"><i class="fa fa-history" aria-hidden="true"></i> Lacak</a>
              <a class="btn btn-info btn-sm" data-toggle="modal" data-target="#senderDetail${item.id_cart}"><i class="fa fa-paper-plane" aria-hidden="true"></i> Pengirim</a>
              <a class="btn btn-info btn-sm" data-toggle="modal" data-target="#recipientDetail${item.id_cart}"><i class="fa fa-inbox" aria-hidden="true"></i> Penerima</a>
              ${item.status === 'null' ? '<a class="btn btn-primary btn-sm" onClick="handleConfirmOrder(&#39;'+item.id_cart+'&#39;)">Confirmation</a>' : ''}
            </div>
          </div>
        </div>`
      });

      shippingContentDOM.innerHTML = $html;
      handleLoadingRequest(true);
    } else {
      handleLoadingRequest(false)
      swalNotification(`Please login with your account.`, 'info', () => goTo(linkMap.HOME, true))
    }
  });
}

window.onload = () => {
  handleGet();
  defineLink();
}
