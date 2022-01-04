
async function getFileFromUrl(url){
    const names = url.split('/');
    const name = names.length ? names[names.length - 1] : '';
    // const response = await uploadFilesServices.getFile(url);
    const response = await fetch(`http://54.169.166.121/do-backend/api${url}`);
    const data = await response.blob();
    return new File([data], name, {
        type: response.headers.get('content-type'),
    });
}

const utils = {
    getFileFromUrl,
};

export default utils;