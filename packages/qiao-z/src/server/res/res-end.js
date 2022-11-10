/**
 * res.end
 * @param {*} res 
 * @param {*} msg 
 */
const end = (res, msg) => {
    // check
    if (!res) return;

    // clear cookies
    if (res.clearCookies && res.clearCookies.length) {
        res.response.setHeader('Set-Cookie', res.clearCookies);
        delete res.clearCookies;
    }

    // heads
    if (res.heads) {
        const status = res.heads.status;
        const options = res.heads.options;
        const opt = (res.cros && status == 200) ? Object.assign({}, res.cros, options) : options;

        // head
        res.response.writeHead(status, opt);

        // delete
        delete res.cros;
        delete res.heads;
    }

    // delete
    delete res.head;
    delete res.end;

    // end
    res.response.end(msg);
};

export default end;