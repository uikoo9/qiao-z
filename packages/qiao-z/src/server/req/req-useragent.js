// ua
import ua from 'qiao-z-ua';

/**
 * handle useragent
 * @param {*} req 
 * @returns 
 */
const handleUseragent = (req) => {
    return (!req || !req.headers || !req.headers['user-agent']) ? {} : ua(req.headers['user-agent']);
};

export default handleUseragent;