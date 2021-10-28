const card1ContentDOM = document.querySelector('#card1Content');
const card2ContentDOM = document.querySelector('#card2Content');

const getModalInputDOM = (index) => [{
  name: document.querySelector('#inputName'),
  email: document.querySelector('#inputEmail'),
  no_telp: document.querySelector('#inputNumber'),
  ttl: document.querySelector('#inputTtl'),
  jenis_kelamin: document.querySelector('#jk'),
  password: document.querySelector('#inputPassword'),
}];

const handleChangeProfile = (id_user) => {
  handleLoadingRequest(true);
  const nameDOM = getModalInputDOM()[0].name;
  const emailDOM = getModalInputDOM()[0].email;
  const no_telpDOM = getModalInputDOM()[0].no_telp;
  const ttlDOM = getModalInputDOM()[0].ttl;
  const jenis_kelaminDOM = getModalInputDOM()[0].jenis_kelamin;
  const passwordDOM = getModalInputDOM()[0].password;

  const dataInput = {
    "id_user": id_user,
    "name": nameDOM.value,
    "email": emailDOM.value,
    "no_telp": no_telpDOM.value,
    "ttl": ttlDOM.value,
    "jenis_kelamin": jenis_kelaminDOM.value,
    "password": passwordDOM.value
  };
  
  PUT_API(CUSTOMER_PUT_API, dataInput, TOKEN_DATA).then(ress => {
    const {message, status} = ress;
    // console.log(ress);

    if(status) {
      handleGet();
      swalNotification(message, 'success', () => handleLoadingRequest(false))
    } else {
      swalNotification(message, 'error', () => handleLoadingRequest(false))
    }
  });
}

const handleChangePassword = (id_user) => {
  handleLoadingRequest(true);
  const passwordDOM = getModalInputDOM()[0].password;

  const dataInput = {
    "id_user": id_user,
    "password": passwordDOM.value
  };

  // console.log('dataInput', dataInput);
  
  if (passwordDOM.value === '' || passwordDOM.value === undefined || passwordDOM.value === null) {
    alert('Password belum diubah!');
    passwordDOM.focus();
    handleGet();
  } else {
    PUT_API(USER_PUT_API, dataInput, TOKEN_DATA).then(ress => {
      const {message, status} = ress;
      // console.log(ress);

      if(status) {
        handleGet();
        swalNotification(message, 'success', () => handleLoadingRequest(false))
      } else {
        swalNotification(message, 'error', () => handleLoadingRequest(false))
      }
    });
  }
  
}

const handleGet = () => {
  handleLoadingRequest(true);
  card1ContentDOM.innerHTML = '';
  card2ContentDOM.innerHTML = '';
  // console.log('token: ', TOKEN_DATA);

  GET_API_V2(USER_INFO_GET_API, TOKEN_DATA)
  .then(ress => ress?.ok ? ress?.json() : swalNotification(`Server error ${ress?.status}`, 'error'))
  .then(ressJson => {
    const { status, message, data } = ressJson;
    // console.log(ress);
    console.log(data);

    if(status && data.id_user) {
      card1ContentDOM.innerHTML = `
        <div class="card-body box-profile">
        <div class="text-center">
          <img class="profile-user-img img-fluid img-circle"
              src="${data.photo || './img/photo-profile-notfound.jpg'}"
              alt="User profile picture">
        </div>

        <h3 class="profile-username text-center">${data.name.toUpperCase() || 'Robot'}</h3>

        <span class="text-muted text-center">${data.status || '-'}</span>

        <ul class="list-group list-group-unbordered mb-3">
          <li class="list-group-item">
            <b>Jenis Kelamin</b> <a class="float-right">${data.jenis_kelamin === 'l' ? 'Laki - laki' : 'Perempuan'}</a>
          </li>
          <li class="list-group-item">
            <b>Ttl</b> <a class="float-right">${data.ttl || '-'}</a>
          </li>
          <li class="list-group-item">
            <b>Email</b> <a class="float-right">${data.email || '-'}</a>
          </li>
          <li class="list-group-item">
            <b>Nomor Telphone</b> <a class="float-right">${data.no_telp || '-'}</a>
          </li>
        </ul>

        <div class="card-header p-2">
          <ul class="nav nav-pills">
            <li class="nav-item"><a class="nav-link active" href="#activity" data-toggle="tab">Profile</a></li>
            <li class="nav-item"><a class="nav-link" href="#timeline" data-toggle="tab">Password</a></li>
            <!-- <li class="nav-item"><a class="nav-link" href="#photo" data-toggle="tab">Photo</a></li> -->
          </ul>
        </div>
      </div>`;
      
      card2ContentDOM.innerHTML = `
        <div class="card-body">
          <div class="tab-content">
            <div class="active tab-pane" id="activity">
              <div class="form-group">
                <label for="inputName">Name</label>
                <input type="text" class="form-control" name="name" id="inputName" value="${data.name || '-'}">
              </div>
              <div class="form-group">
                <label for="inputEmail">Email</label>
                <input type="email" class="form-control" name="email" id="inputEmail" value="${data.email || '-'}">
              </div>
              <div class="form-group">
                <label for="inputNomor">Nomor Telphone</label>
                <input type="text" class="form-control" id="inputNumber" value="${data.no_telp || '-'}">
              </div>
              <div class="form-group">
                <label for="inputTtl">Tempat tanggal lahir</label>
                <input type="text" class="form-control" id="inputTtl" value="${data.ttl || '='}">
              </div>
              <div class="form-group">
                <label>Jenis Kelamin</label>
                <select class="form-control" id="jk" name="jenis_kelamin">
                  <option></option>
                  <option ${data.jenis_kelamin == 'l' && 'selected'} value="l">Laki - laki</option>
                  <option ${data.jenis_kelamin == 'p' && 'selected'} value="p">Perempuan</option>
                </select>
              </div>
              <div class="form-group" style="text-align: right;">
                <button class="btn btn-primary btn-md" onClick="handleChangeProfile('${data.id_user}')">Perbarui Profile</button>
              </div>
            </div>
            <div class="tab-pane" id="timeline">
              <div class="form-group">
                <label for="inputPassword">Password</label>
                <input type="password" class="form-control" name="password" id="inputPassword" placeholder="********************">
              </div>
              <div class="form-group" style="text-align: right;">
                <button class="btn btn-primary btn-md" onClick="handleChangePassword('${data.id_user}')">Perbarui password</button>
              </div>
            </div>
            <div class="tab-pane" id="photo">
              <form class="form-image" id="photoUpload" action="${ BASE_API+IMAGE_PUT_API+'?page='+TOKEN_DATA }" enctype="multipart/form-data" method="post">
                <div class="form-group">
                  <!-- <label for="inputPassword">Password</label> -->
                  <input type="text" name="data_target" class="form-control" placeholder="Token" value="admin/product?page=${TOKEN_DATA}" />
                  <input type="text" name="id_user" id="id_user" class="form-control" placeholder="Id product" value="${data.id_user}" />
                  <input type="file" name="photo_image" id="input_image" multiple="" accept="image/x-png,image/gif,image/jpeg" required/>
                </div>
                <div class="form-group" style="text-align: right;">
                  <button  type="submit" class="btn btn-primary btn-md">Perbarui Photo Profile</button>
                </div>
              </form>
            </div>
          </div>
        </div>`;

      handleLoadingRequest(false);
    }
    else {
      handleLoadingRequest(false)
      swalNotification(`Please login with your account.`, 'info', () => goTo(linkMap.HOME, true))
    }
    
  });
}

window.onload = () => {
  handleGet();
  defineLink();
}
