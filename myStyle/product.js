const tableDOM = document.querySelector('#dataProduct');
let formClassDOM;
let formIdDOM = (index) => document.querySelector('#formImage'+index);

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
    console.log(dataInput);

    POST_API(PRODUCT_POST_API, dataInput, TOKEN_DATA).then(ress => {
        const {message, status} = ress;
        console.log(ress);
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

const handleUpload = (e, index) => {
    // const formData = $(e).serializeArray();
    console.log('form e', e);
    let xhttp = new XMLHttpRequest();
    let formData = new FormData()
    xhttp.open("POST", BASE_API+IMAGE_PUT_API+'?page='+TOKEN_DATA)
    formData.append('id_product', document.getElementById('id_product'+index).value);     // the text data
    formData.append('product_image', document.getElementById('input_image'+index).files[0]); // since inputs allow multi files submission, therefore files are in array
    xhttp.send(formData);

    // var formData = new FormData();
    // var dataImage = $('#image'+index)[0].files[0];
    // formData.append('file', dataImage);
    // var form_data = new FormData();
    // var file_data = $("#image" + index).prop("files")[0];
    // form_data.append("product_image", file_data);

    // const dataInput = {
    //     "product_image": $('#image'+index)[0].files[0]
    // }

    // $.ajax({
    //     url: BASE_API+IMAGE_PUT_API+'?page='+TOKEN_DATA,
    //     cache: false,
    //     contentType: false,
    //     processData: false,
    //     async: false,
    //     data: dataInput,
    //     type: 'POST',
    //     success: function(ress) {
    //         console.log(ress);
    //     }
    // });

    // console.log(dataInput);
}


const handleDelete = (ID) => {
  const dataInput = {
    "id_user": ID
  };

  console.log(dataInput);
  
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

const handleGet = () => {
  let $html = '';
  tableDOM.innerHTML = '';

  GET_API(PRODUCT_GET_API, TOKEN_DATA).then(ress => {
    const { status, message, data } = ress;
    console.log(data);

    if(status && !!data.length) {
      console.log(ress);
      for (let i = 0; i < data.length; i++) {
        $html += `<tr>
          <td>${i+1}</td>
          <td>${data[i].product_name}</td>
          <td>${data[i].product_stock}</td>
          <td>${data[i].product_image || `
            <!-- <button type="button" class="btn btn-outline-success btn-sm" data-toggle="modal" data-target="#modalImage${i+1}">Upload Image</button> -->
            <!-- <button type="button" class="btn btn-outline-success btn-sm" onclick="alert('belum bisa')">Upload Image</button> -->
            <img src="../img/data-not-found.jpg" class="img-thumbnail rounded mx-auto d-block" alt="...">
          `}</td>
          <td>${data[i].product_price}</td>
          <td>${data[i].product_detail}</td>
          <td>
            <button type="button" class="btn btn-outline-success btn-sm" data-toggle="modal" data-target="#modalEdit${i+1}">Edit</button>
            <button type="button" class="btn btn-outline-danger btn-sm" onclick="handleDelete('${data[i].id_product}')">Delete</button>

            <div class="modal fade" id="modalEdit${i+1}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Edit Product ${data[i].product_name}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fas fa-user"></i></span>
                      </div>
                      <input type="text" id="product_name${i+1}" class="form-control" placeholder="Product name" value="${data[i].product_name}">
                    </div>
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="far fa-calendar-alt"></i></span>
                      </div>
                      <input type="number" id="product_stock${i+1}" class="form-control" placeholder="Product stock" value="${data[i].product_stock}">
                    </div>
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fa fa-inbox" aria-hidden="true"></i></span>
                      </div>
                      <input type="text" id="product_price${i+1}" class="form-control" placeholder="Product price" value="${data[i].product_price}">
                    </div>
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span class="input-group-text"><i class="fa fa-phone" aria-hidden="true"></i></span>
                      </div>
                      <input type="text" id="product_detail${i+1}" class="form-control" placeholder="Product detail" value="${data[i].product_detail}">
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="handleChange('${i+1}', '${data[i].id_product}')">Save changes</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="modal fade" id="modalImage${i+1}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Edit Image ${data[i].product_name}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                        <form class="form-image" action="${ BASE_API+IMAGE_PUT_API+'?page='+TOKEN_DATA }" enctype="multipart/form-data" method="post">
                            <input type="text" name="id_product${i+1}" id="id_product${i+1}" class="form-control" placeholder="Id product" value="${data[i].id_product}">
                            <input type="file" name="product_image" id="input_image${i+1}" multiple="" accept="image/x-png,image/gif,image/jpeg"/>
                            <!-- 
                                <input type="file" class="form-control" /> 
                                <input type="file">
                            -->
                            
                            <input type="submit" value="Submit" class="btn btn-primary" />
                        </form>
                  </div>
                  <div class="modal-footer">
                        <!-- <button type="button"  onclick=")">Upload Image</button> -->
                  </div>
                </div>
              </div>
            </div>
            
          </td>
        </tr>`;
      }

      tableDOM.innerHTML = $html;
    }
    formClassDOM = document.querySelectorAll('.form-image');
    
    for (let i = 0; i < formClassDOM.length; i++) {
        // console.log('ini form', formIdDOM(i+1));
        formIdDOM(i+1).onsubmit = handleUpload(this, i+1);
    }
  });
}

window.onload = () => handleGet();
