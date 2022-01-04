
async function getFileFromUrl(url){
    const names = url.split('/');
    const name = names.length ? names[names.length - 1] : '';
    // const response = await uploadFilesServices.getFile(url);
    const response = await fetch(`http://localhost:8091/api${url}`);
    const data = await response.blob();
    return new File([data], name, {
        type: response.headers.get('content-type'),
    });
}

const utils = {
    getFileFromUrl,
};

export default utils;