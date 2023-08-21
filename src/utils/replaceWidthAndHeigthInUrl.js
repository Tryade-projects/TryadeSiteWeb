
/**
 * 
 * @param {*} param0 
 * @returns 
 */


export function replaceWidthAndHeigthInUrl(url, width, height){

    const replacedUrl = url.replace('{width}', width).replace('{height}', height);
    return replacedUrl;

}


