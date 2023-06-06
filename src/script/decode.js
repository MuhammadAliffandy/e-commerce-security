
window.onload = function () {
    // mengambil data image hasil embeddiing dari database
    document.getElementById('cover').src = sessionStorage.getItem('stegData');
    document.getElementById('lihat').addEventListener('click', read, false);
    document.getElementById('lihat').addEventListener('click', getLihat, false);
    document.getElementById('main-form').style.display = 'none'

};

// private key rsa yang telah dibuat sebelumnya

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQCb3I7Vu/d1KyRs0xO4O7d05WhpZAWwq72x6cUWzn7jooQDSDT0
9VKDtDpCFaC5Ko/QG/uni4cNjH7H5vpoUtv37DOu2ZOsbK4ZGJw/WeifwbtgT84p
9atMEG7Bl+GKTA8IhIxODWEzwDJZlruovbTVjC8mUwZwyY5myCSnu2STLQIDAQAB
AoGAGN57Z/0jAe4NVNPlLJtSrXNBUrej9MmibfXn/bibJIU03TUzRfay4NLsDMlY
qNLyuXkNkXFA7leBjzH6uJSoBkpEVZIo5TxTkE41rU+WsT2hneyUYLsSw5p1z2E1
Jilnq86e0Ft2/Vjouk6Ffyn0jctfsodp2eJtSw3LwkzLKgECQQDNNX0oA34+o1oa
28n5346PEIEZ3u1/ZC1+sVj30JZO9TubVNyOh6/4qhB2ogj4dckRkizFF8CH7bDy
/c0rtIuBAkEAwnBOFGgrHUC2Lvvi2T3m3Ksgqyrp7ME3Ecp8TsaR881Q4c7cM8gj
QKOZ9Mwyn0hoHSgHzL3qJcnNbin15KzNrQJBAJpe86DnR9AtKHpt/vn3IBIlk0j3
9+fOX58gINKD2p7ZQpbuduDN2CYTIUFtUZw/Vxvdv8ogvRhEScnx/ac0MYECQCV/
gR9gY4g1tazj+QDKdl5yRk+cbBazwIoW0dhjZTxuiT2zJjZ6T4okwwk55D1hump9
ENwEeEanX43yW7CpPtUCQQCZQj6pBce1AAW4DzY7XuY86WMQTFdA+4wSmb9xgS4l
mdPvRRmRiomSsi2a7ZzwqfNoIayDCj3HWoKqqFEPfRiu
-----END RSA PRIVATE KEY-----`

function read() {
    var img = document.getElementById("cover")
    if (img) {
        
        // melakukan proses ekstraksi pesan
        var dataDecode = steg.decode(img);
        
        // pesan yang di ekstraksi akan dienkripsi
        var decrypt = new JSEncrypt();
        // mengambil private key 
        decrypt.setPrivateKey(privateKey);
        // melakukan proses dekripsi untuk data sebenarnya
        var uncrypted = decrypt.decrypt(dataDecode);
        var splitData = uncrypted.split('}');
        const value = JSON.parse(splitData[0] + '}');
        
        // data ditampilkan 

        const barangV = document.getElementById('barang').innerHTML = value.barang;     
        const hargaV = document.getElementById('harga').innerHTML = value.harga;
        const tanggalV = document.getElementById('tanggal').innerHTML = value.tanggal;
        const namaV = document.getElementById('nama').innerHTML = value.nama;   
        const rekV = document.getElementById('rek').innerHTML = value.rek;
        const bank = document.getElementById('bank').innerHTML = value.bank;
    }else{
        alert('data gagal di load')
    }
}

const getLihat = () => {
    document.getElementById('main-form').style.display = ''
}