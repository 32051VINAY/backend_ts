const { db } = require('../utility/dbManager');


const getAllFunds = () => {

    return new Promise((resolve, reject) => {

        db.all( 
            `select * from mutual_funds`,
            (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }

        });

    });

};


const updateFundNav = (fundId, nav) => {

    return new Promise((resolve, reject) => {

        db.run(
            `UPDATE mutual_funds
            SET latest_nav = ?
            WHERE fund_id = ?`,
            [nav,fundId],
            function(err) {

                if (err) {
                    reject(err);
                } else {

                    resolve({
                        updated: this.changes > 0
                    });

                }

            }
        );

    });

};

const getFundById = (fundId) => {

    return new Promise((resolve, reject) => {
        db.get(
            `select * from mutual_funds where fund_id=?`,[fundId],
             (err, row) => {

            if (err) {
                reject(err);
            } else {
                resolve(row);
            }

        });

    });

};

module.exports = {
    getAllFunds,
    updateFundNav,
    getFundById
};