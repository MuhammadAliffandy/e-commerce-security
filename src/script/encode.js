

window.onload = function () {
    document.getElementById('bayar').addEventListener('click', hide, false);
    document.getElementById('beli').addEventListener('click', getBeli, false);
    document.getElementById('main-form').style.display = 'none'
};

// PUBLIC KEY KUNCI RSA YANG TELAH DIBUAT

const publicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCb3I7Vu/d1KyRs0xO4O7d05Whp
ZAWwq72x6cUWzn7jooQDSDT09VKDtDpCFaC5Ko/QG/uni4cNjH7H5vpoUtv37DOu
2ZOsbK4ZGJw/WeifwbtgT84p9atMEG7Bl+GKTA8IhIxODWEzwDJZlruovbTVjC8m
UwZwyY5myCSnu2STLQIDAQAB
-----END PUBLIC KEY-----`

function hide() {
    // proses enkripsi plaintex rsa menggunakan library jsencrypt
    var encrypt = new JSEncrypt();
    
    // mengambil data gambar
    var img = document.getElementById("img")
    // mengambil data transaksi
    var data = JSON.stringify(getTransaksi())

    // menggunakan public key rsa yang telah ada
    encrypt.setPublicKey(publicKey);
    // melakukan enkripsi data transkasi
    var encrypted = encrypt.encrypt(data);

    
    if (img && data) {
        // melakukan proses embedding gambar dan plaintext yang sudah terenkripsi
        const output = steg.encode(encrypted, img);
        // data hasil embedding masuk kedalam database

        sessionStorage.setItem( 'stegData' ,output); 
    
      
        alert('Transaksi Sukses')
    } else{
        alert('data gagal di load') 
    }
}



const getTransaksi = () => {
    const barangV = document.getElementById('barang').innerText    
    const hargaV = document.getElementById('harga').innerText    
    const tanggalV = document.getElementById('tanggal').innerText    
    const namaV = document.getElementById('nama').value    
    const rekV = document.getElementById('rek').value 
    const bankV = sessionStorage.getItem('bank');
    
    const dataTransaksi = {
        barang : barangV,
        harga : hargaV,
        tanggal : tanggalV,
        nama : namaV,
        rek : rekV,
        bank : bankV
    }

    return dataTransaksi;

}

const getBeli = () => {
    document.getElementById('main-form').style.display = ''
}

const toggleCek = (cekboxid) => {
    const cekbox = document.getElementsByClassName('cekbox');

    for (let i = 0 ; i < cekbox.length ; i++){
        var cekboxs = cekbox[i];
        if(cekboxs.id != cekboxid){
            cekboxs.disabled = document.getElementById(cekboxid).checked;
            sessionStorage.setItem('bank',document.getElementById(cekboxid).value)
        }
    }
}