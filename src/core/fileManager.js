function save(data, fileName) {
    let file = new Blob([data], {type: 'text/xml'});

    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(file, filename);
        return;
    }

    let a = document.createElement("a");
    let url = URL.createObjectURL(file);
    
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
}

export {
    save
};