const {registerQuery, loginQuery, getUserInfoQuery, editUserQuery, findOrCreateUserByWallet} = require('../queries/userQueries.cjs')
const { isAddress, verifyMessage, getAddress } = require('ethers');
const { jwt } = require('../shared.cjs');
const JWT = process.env.JWT || '12345';

async function register(req, res, next) {
    try {
        const user = await registerQuery(req.body)
        res.status(201).json(user)
    } catch (error) {
        next(error)
    }
}


async function login (req, res, next) {
    try {
        const user = await loginQuery(req.body)
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

async function getUserInfo(req, res, next) {
    try {
        const user = await getUserInfoQuery(req.user.id);
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

async function editUser(req, res, next) {
    try {
        const updatedUser = await editUserQuery(req.body, req.user);
        res.status(201).json(updatedUser)
    } catch (error) {
        next(error)
    }
}

async function getMetamaskNonce(req, res, next) {
    try {
        const { address } = req.params;
        if (!address || !isAddress(address)) {
            const err = new Error('Invalid wallet address');
            err.status = 400;
            throw err;
        }
        
        // Generate a random nonce
        const nonce = Math.floor(Math.random() * 1000000).toString();
        const message = `Sign in to W3GLPop. Nonce: ${nonce}`;
        
        // Store nonce temporarily (in production, use Redis or session storage)
        // For now, we'll include it in the response and verify immediately
        res.status(200).json({ message, nonce });
    } catch (error) {
        next(error);
    }
}

async function verifyMetamaskSignature(req, res, next) {
    try {
        const { address, signature, message } = req.body;
        
        if (!address || !signature || !message) {
            const err = new Error('Missing required fields: address, signature, message');
            err.status = 400;
            throw err;
        }
        
        if (!isAddress(address)) {
            const err = new Error('Invalid wallet address');
            err.status = 400;
            throw err;
        }
        
        // Verify the signature
        try {
            const recoveredAddress = verifyMessage(message, signature);
            const normalizedAddress = getAddress(address);
            const normalizedRecovered = getAddress(recoveredAddress);
            
            if (normalizedAddress.toLowerCase() !== normalizedRecovered.toLowerCase()) {
                const err = new Error('Invalid signature');
                err.status = 401;
                throw err;
            }
        } catch (verifyError) {
            const err = new Error('Signature verification failed');
            err.status = 401;
            throw err;
        }
        
        // Find or create user by wallet address
        const user = await findOrCreateUserByWallet(address);
        
        // Generate JWT token
        const token = await jwt.sign({ id: user.id }, JWT, { expiresIn: '5h' });
        
        res.status(200).json({ ...user, token });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    register,
    login,
    getUserInfo,
    editUser,
    getMetamaskNonce,
    verifyMetamaskSignature
}