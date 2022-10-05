var generateError = function (message, code) {
    throw { message: message, errorCode: code };
};
generateError("An error occurred!", 500);
