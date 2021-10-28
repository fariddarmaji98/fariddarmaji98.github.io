
const orderContentDOM = document.querySelector('#orderContent');
const modalContentDOM = document.querySelector('#modalContent');


const sampledata = [{
  id_cart: '',
  total_harga: '',
  bukti_image: '',
  jumlah: '',
  status: '',
  createdAt: '',
  updatedAt: '',
  item: [{
    id_product: '',
    harga: '',
    keterangan: ''
  }] 
}]

// const converArr = (arrData) => {
//   const dataFilter = [];

//   arrData.map((item, index) => {
//     const { id_cart, total_harga, bukti_image, jumlah, status, createdAt } = item;

//     const parent = {
//       id_cart: id_cart,
//       total_harga: total_harga,
//       bukti_image: bukti_image,
//       jumlah: jumlah,
//       status: status,
//       createdAt: createdAt,
//       item: []
//     }

//     const cekData = dataFilter.filter(el => el.id_cart === id_cart);

//     if (dataFilter.length < 1) dataFilter.push(parent);
//     else if (cekData.length < 1) dataFilter.push(parent);
    
//   });

//   arrData.filter((item, index) => {
//     const { id_product, hargaitem, keteranganitem } = item;
//     const child = {
//       id_product: id_product,
//       harga: hargaitem,
//       keterangan: keteranganitem
//     }


//   })

//   console.log('dataFilter.length', !!dataFilter.length);
//   console.log('dataFilter', dataFilter);
// }

const handleCencelOrder = (id_cart) => PUT_API(CART_PUT_APIv1, { 
  "id_cart": id_cart,
  "status": "order_cenceled"
}, TOKEN_DATA).then(ress => {

  const {message, status} = ress;
  console.log(ress);
  !status && alert('Gagal, '+message);
  handleGet();
  setTimeout(() => handleLoadingRequest(false), 1000);
});

const handleConfirmOrder = (id_cart) => window.open(`https://wa.me/08231231412?text=Hai%20saya%20ingin%20mengkonfirmasi%20pembayaran%20pada%20pesanan%20dengan%20ID%20CARD%20${id_cart}`);

const handleRenderModal = (id_cart) => POST_API(CART_ITEM_GET_API, { "id_cart": id_cart }, TOKEN_DATA).then(ress => {
  const { status, message, data } = ress;

  console.log('id_cart', id_cart);
  let $html = `<div class="modal fade" id="orderDetail-${id_cart}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Order detail</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="card-body">
              <ul class="timeline-body list-group list-group-unbordered mb-3">`;
  
  if(status && !!data.length) {
    console.log('data ', data);
    for (let i = 0; i < data.length; i++) {
      $html += `<li class="list-group-item">
        <h5 class="card-title">${data[i].product_name}</h5>
        <span class="card-stock">&nbsp;<b>(${data[i].jumlahitem})</b></span>
        <span class="card-price float-right">Rp. <b>${data[i].total_hargaitem}</b></span>
      </li>` 
    }

    $html += `</ul>
            </div>
          </div>
        </div>
      </div>
    </div>`;
    
    modalContentDOM.innerHTML += $html;
  }

});

// const handleRenderModal = (id_cart) => POST_API(CART_ITEM_GET_API, { "id_cart": id_cart }, TOKEN_DATA).then(ress => {
//   const { status, message, data } = ress;
//   let contentHTML = '';

//   console.log('===> modalContentDOM', modalContentDOM)
//   modalContentDOM.innerHTML += "hmmm";

//   console.log('===> id_cart', id_cart)
//   console.log('===> ress', ress)

//   contentHTML += `<div class="modal fade" id="orderDetail-${id_cart}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
//       <div class="modal-dialog modal-dialog-centered" role="document">
//         <div class="modal-content">
//           <div class="modal-header">
//             <h5 class="modal-title" id="exampleModalLabel">Order detail</h5>
//             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
//               <span aria-hidden="true">&times;</span>
//             </button>
//           </div>
//           <div class="modal-body">
//             <div class="card-body">
//               <ul class="timeline-body list-group list-group-unbordered mb-3">`;
  
//   // console.log('===> contentHTML', contentHTML)

//   if(status && !!data.length) {
//     console.log('===> data', data)

//     // const dataCart = [];
//     // let currentIndex = 0;

//     // for (let i = 0; i < data.length; i++) {
//     //   if(!dataCart.length) {
//     //     dataCart.push(data[i]);
//     //   }
//     //   else {
//     //     for (let index = 0; index < dataCart.length; index++) {

//     //       // console.log('===> id_1', data[i].id_product)
//     //       // console.log('===> id_2', dataCart[index].id_product)

//     //       if(dataCart[index].id_product !== data[i].id_product) {
//     //         // console.log('===> dataCart 1', dataCart);
//     //         console.log('===> nggat sama')
//     //         dataCart.push(data[i]);
//     //       }
//     //       else {
//     //         console.log('===> sama')
//     //         console.log('===> dataCart', dataCart)
//     //         dataCart[index].jumlahitem++;
//     //         dataCart[index].total_hargaitem += data[i].total_hargaitem;
//     //         // console.log('===> dataCart 2', dataCart);
//     //         // console.log('===> data[i]', data[i])
//     //         // dataCart.push(data[i]);
//     //         // currentIndex = i;
//     //       }
//     //     }
//     //   }
//     // }

//     // console.log('===> dataCart', dataCart)

//     for (let i = 0; i < data.length; i++) {
//       contentHTML += `<li class="list-group-item">
//         <h5 class="card-title">${datraCart[i].product_name}</h5>
//         <span class="card-stock">&nbsp;<b>(${datraCart[i].jumlahitem})</b></span>
//         <span class="card-price float-right">Rp. <b>${datraCart[i].total_hargaitem}</b></span>
//       </li>` 
//     }

//     contentHTML += `</ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>`;

//   }

//   console.log('===> contentHTML', contentHTML)
  
//   modalContentDOM.innerHTML += contentHTML;

// });

const handleGet = () => {
  let $html = '';
  orderContentDOM.innerHTML = ''; 
  handleLoadingRequest(true);
  
  GET_API(CART_CURRENT_USER_GET_API, TOKEN_DATA).then(ress => {
    const { status, message, data } = ress;

    console.log('ress', ress);
    if(status && !!data.length) {
      data.map((item, index) => {
        handleRenderModal(item.id_cart);
        $html += `<div class="card box-order">
          <div class="timeline-item">
            <span class="time"><i class="fas fa-clock"></i> ${item.createdAt || '-'}</span>
            <h3 class="timeline-header"><a href="#">ID Cart </a> ${item.id_cart || '-'}</h3>
    
            <ul class="timeline-body list-group list-group-unbordered mb-3">
              <li class="list-group-item">
                Status pesanan <a class="float-right">${item.status || '-'}</a>
              </li>
              <li class="list-group-item">
                Total tagihan <a class="float-right">Rp. ${item.total_harga || '-'}</a>
              </li>
            </ul>
    
            <div class="timeline-footer" style="text-align: right;">
              <a class="btn btn-warning btn-sm" data-toggle="modal" data-target="#orderDetail-${item.id_cart}">Detail</a>
              ${item.status === 'waiting_payment' ? '<a class="btn btn-danger btn-sm" onClick="handleCencelOrder(&#39;'+item.id_cart+'&#39;)">Cencel</a>' : ''}
              ${item.status === 'waiting_payment' ? '<a class="btn btn-primary btn-sm" onClick="handleConfirmOrder(&#39;'+item.id_cart+'&#39;)">Confirmation</a>' : ''}
            </div>
          </div>
        </div>`
      });

      orderContentDOM.innerHTML = $html;
      handleLoadingRequest(false);
    } else {
      handleLoadingRequest(false);
      swalNotification(message, 'error', () => goTo(linkMap.HOME, true))
    }
  });
}

window.onload = () => {
  handleGet();
  defineLink();
}
