var cat_list = ["Memes", "Cute"];
var img_list = [];
var selectedCategory = "Memes";
var pointer = -1;
var token = 'ymc-ZuIq4fAAAAAAAAAAGMoB-SL0uASSbT_dcWA_vntnglW_DOzRkMelLRewDIom';

function download(path) {
	var xhr = new XMLHttpRequest();
	xhr.responseType = 'blob';
	xhr.onreadystatechange = function () {
	    if (xhr.readyState === 4 && xhr.status === 200) {
	        var imageUrl = (window.URL || window.webkitURL).createObjectURL(xhr.response);
	        document.getElementById("image").style.backgroundImage = "url(" + imageUrl + ")";
	        document.getElementById("image").style.filter = "blur(0px)";
	        console.log("url('"+imageUrl+"')");
	    }
	};
	document.getElementById("image").style.filter = "blur(2px)";
	xhr.open('POST', 'https://content.dropboxapi.com/2/files/download');
	xhr.setRequestHeader('Authorization', 'Bearer ' + token);
	xhr.setRequestHeader('Dropbox-API-Arg', JSON.stringify({ path: path }));
	xhr.send();
}

function getFileExtension(path) {
	var temp = path.split(".");
	return temp[1];
}

function getFileName() {
	var currentdate = new Date(); 
	var datetime = Math.floor(Math.random()*100000).toString() + currentdate.getDate() + "_"
                + (currentdate.getMonth()+1)  + "_" 
                + currentdate.getFullYear()  +"_"
                + currentdate.getHours() + "_"  
                + currentdate.getMinutes() + "_" 
                + currentdate.getSeconds();
    return datetime;
}

function upload(path) {
	var file = document.getElementById("myfile").files[0];
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'https://content.dropboxapi.com/2/files/upload');
	xhr.setRequestHeader('Authorization', 'Bearer ' + token);
	xhr.setRequestHeader('Content-Type', 'application/octet-stream');
	xhr.setRequestHeader('Dropbox-API-Arg', JSON.stringify({path: path}));
	xhr.send(file);
}

function uploadFile() {
	var path = document.getElementById("myfile").value;
	var ext = getFileExtension(path);
	var filename = getFileName();
	var path = "/" + selectedCategory + "/" + filename + "." + ext;
	upload(path);
	console.log(path);
}

function list_folder() {
	var xhr = new XMLHttpRequest();
	xhr.responseType = 'String';
	xhr.onreadystatechange = function () {
	    if (xhr.readyState === 4 && xhr.status === 200) {
	        img_list = JSON.parse(xhr.response).entries;
	        console.log(img_list);
			nextImage();
	    }
	};
	xhr.open('POST', 'https://api.dropboxapi.com/2/files/list_folder');
	xhr.setRequestHeader('Authorization', 'Bearer ' + token);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(JSON.stringify({path:"/" + selectedCategory}));
}

function nextImage() {
	pointer++;
	console.log("/" + selectedCategory + "/" + img_list[pointer].name);
	download("/" + selectedCategory + "/" + img_list[pointer].name);
}

function previousImage() {
	pointer--;
	console.log("/" + selectedCategory + "/" + img_list[pointer].name);
	download("/" + selectedCategory + "/" + img_list[pointer].name);
}

function selectCategory(catg) {
	for (var i=0;i<cat_list.length;i++) {
		document.getElementById(cat_list[i]).className = "";
	}
	document.getElementById(catg).className = "Active";
	pointer = -1;
	selectedCategory = catg;
	list_folder();
}

document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            console.log('left');
            previousImage();
            break;
        case 39:
            console.log('right');
            nextImage();
            break;
    }
};