/**
 * CCTS Role-Based Authorization Middleware
 */

/**
 * Check if user has CCTS entity role
 */
const cctsEntity = (req, res, next) => {
    if (req.user && (req.user.role === 'ccts-entity' || req.user.role === 'ccts-admin')) {
        next();
    } else {
        res.status(403);
        throw new Error('Access denied. CCTS Entity role required.');
    }
};

/**
 * Check if user has CCTS verifier role
 */
const cctsVerifier = (req, res, next) => {
    if (req.user && (req.user.role === 'ccts-verifier' || req.user.role === 'ccts-admin')) {
        next();
    } else {
        res.status(403);
        throw new Error('Access denied. CCTS Verifier role required.');
    }
};

/**
 * Check if user has CCTS admin role
 */
const cctsAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'ccts-admin') {
        next();
    } else {
        res.status(403);
        throw new Error('Access denied. CCTS Admin role required.');
    }
};

/**
 * Check if user has any CCTS role (entity, verifier, or admin)
 */
const anyCCTSRole = (req, res, next) => {
    if (req.user && ['ccts-entity', 'ccts-verifier', 'ccts-admin'].includes(req.user.role)) {
        next();
    } else {
        res.status(403);
        throw new Error('Access denied. CCTS role required.');
    }
};

/**
 * Check if verifier's accreditation is valid
 */
const checkVerifierAccreditation = (req, res, next) => {
    if (req.user.role !== 'ccts-verifier') {
        return next();
    }

    const accreditation = req.user.verifierAccreditation;

    if (!accreditation || !accreditation.accreditationNumber) {
        res.status(403);
        throw new Error('Verifier accreditation not found');
    }

    if (accreditation.validUntil && new Date(accreditation.validUntil) < new Date()) {
        res.status(403);
        throw new Error('Verifier accreditation has expired');
    }

    next();
};

/**
 * Check if verifier is authorized for specific sector
 */
const checkVerifierScope = (sector) => {
    return (req, res, next) => {
        if (req.user.role !== 'ccts-verifier') {
            return next();
        }

        const accreditation = req.user.verifierAccreditation;

        if (!accreditation || !accreditation.scope || accreditation.scope.length === 0) {
            res.status(403);
            throw new Error('Verifier has no authorized sectors');
        }

        if (!accreditation.scope.includes(sector) && !accreditation.scope.includes('All')) {
            res.status(403);
            throw new Error(`Verifier is not authorized for ${sector} sector`);
        }

        next();
    };
};

module.exports = {
    cctsEntity,
    cctsVerifier,
    cctsAdmin,
    anyCCTSRole,
    checkVerifierAccreditation,
    checkVerifierScope
};
