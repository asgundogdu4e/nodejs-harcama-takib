const sendResult = (res, records, error, count) => {
    const result = { success: null, records: null, error: null, count: count ? count : 0 }
    if (error) {
        result.success = false;
        result.error = error;
    } else {
        result.success = true;
        if (records.length > 0) {
            result.records = records;
        } else {
            result.records = [records];
        }

    }
    res.status(200).json(result);
}

module.exports = {
    sendResult
}