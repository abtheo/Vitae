import urlJoin from 'url-join'

const resolveFromRoot = relativePath => { 
    //const serverPath = window.location.pathname.replace("localhost:8080", "http://127.0.0.1:5000");
    const serverPath = ("http://localhost:5000");
    return urlJoin(serverPath, relativePath);
}

/**
 * XmlHttpRequest's getAllResponseHeaders() method returns a string of response
 * headers according to the format described here:
 * http://www.w3.org/TR/XMLHttpRequest/#the-getallresponseheaders-method
 * This method parses that string into a user-friendly key/value pair object.
 */
const parseResponseHeaders = (headerStr) => {
  var headers = {};
  if (!headerStr) {
    return headers;
  }
  var headerPairs = headerStr.split('\u000d\u000a');
  for (var i = 0; i < headerPairs.length; i++) {
    var headerPair = headerPairs[i];
    // Can't use split() here because it does the wrong thing
    // if the header value has the string ": " in it.
    var index = headerPair.indexOf('\u003a\u0020');
    if (index > 0) {
      var key = headerPair.substring(0, index);
      var val = headerPair.substring(index + 2);
      headers[key] = val;
    }
  }
  return headers;
}

/** Makes a GET request. 
 * @param {{ url: string, headers: Object<string, string> }} options
 * @returns {Promise<{ statusCode: Number, responseText: string, headers: Object<string, string> }>}
*/
const get = function({ url, headers }) {
    return new Promise(resolve => {
        const xhr = new XMLHttpRequest()
        xhr.open("GET", resolveFromRoot(url), true);

        for (var key in headers) {
            xhr.setRequestHeader(key, headers[key]);
        }

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                resolve({ 
                    statusCode: xhr.status, 
                    responseText: xhr.responseText,
                    headers: parseResponseHeaders(xhr.getAllResponseHeaders())
                });
            }
        }

        xhr.send(null);
    })
}

/** Makes a POST request. 
 * @param {{ url: string, headers: Object<string, string> }} options
 * @returns {Promise<{ statusCode: Number, responseText: string, headers: Object<string, string> }>}
*/
const post = function({ url, data, headers }) {
    return new Promise(resolve => {
        const xhr = new XMLHttpRequest()
        xhr.open("POST", resolveFromRoot(url), true);

        for (var key in headers) {
            xhr.setRequestHeader(key, headers[key]);
        }

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                resolve({ 
                    statusCode: xhr.status, 
                    responseText: xhr.responseText,
                    headers: parseResponseHeaders(xhr.getAllResponseHeaders())
                });
            }
        }

        xhr.send(data);
    })
};

/** Makes a DELETE request. 
 * @param {{ url: string, headers: Object<string, string> }} options
 * @returns {Promise<{ statusCode: Number, responseText: string, headers: Object<string, string> }>}
*/
const deleteRequest = function({ url, data, headers }) {
    return new Promise(resolve => {
        const xhr = new XMLHttpRequest()
        xhr.open("DELETE", resolveFromRoot(url), true);

        for (var key in headers) {
            xhr.setRequestHeader(key, headers[key]);
        }

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                resolve({ 
                    statusCode: xhr.status, 
                    responseText: xhr.responseText,
                    headers: parseResponseHeaders(xhr.getAllResponseHeaders())
                });
            }
        }

        xhr.send(data);
    })
}

export default {
    get, 
    post, 
    delete: deleteRequest
}