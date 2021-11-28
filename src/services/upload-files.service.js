import {get} from "./sender";

function getFile(url) {
    return get(`/api${url}`);
}

const uploadFilesServices = {
    getFile,
}

export default uploadFilesServices;