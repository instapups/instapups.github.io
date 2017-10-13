function showImage() {
	var token = 'ymc-ZuIq4fAAAAAAAAAAGMoB-SL0uASSbT_dcWA_vntnglW_DOzRkMelLRewDIom';

	var xhr = new XMLHttpRequest();
	xhr.responseType = 'blob';
	xhr.onreadystatechange = function () {
	    if (xhr.readyState === 4 && xhr.status === 200) {
	        var imageUrl = (window.URL || window.webkitURL).createObjectURL(xhr.response);
	        document.getElementById("image").style.backgroundImage = "url(" + imageUrl + ")";
	        console.log("url('"+imageUrl+"')");
	    }
	};
	xhr.open('POST', 'https://content.dropboxapi.com/2/files/download');
	xhr.setRequestHeader('Authorization', 'Bearer ' + token);
	xhr.setRequestHeader('Dropbox-API-Arg', JSON.stringify({ path: '/lol/lol.jpg' }));
	xhr.send();
}
