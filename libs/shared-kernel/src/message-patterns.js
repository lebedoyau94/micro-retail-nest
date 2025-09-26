"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingPatterns = exports.CustomerPatterns = exports.SupplierPatterns = exports.InventoryPatterns = exports.AuthPatterns = void 0;
var AuthPatterns;
(function (AuthPatterns) {
    AuthPatterns["USER_REGISTER"] = "USER_REGISTER";
    AuthPatterns["USER_LOGIN"] = "USER_LOGIN";
    AuthPatterns["AUTH_VALIDATE"] = "AUTH_VALIDATE";
})(AuthPatterns || (exports.AuthPatterns = AuthPatterns = {}));
var InventoryPatterns;
(function (InventoryPatterns) {
    InventoryPatterns["INV_CREATE"] = "INV_CREATE";
    InventoryPatterns["INV_FIND_ALL"] = "INV_FIND_ALL";
    InventoryPatterns["INV_FIND_ONE"] = "INV_FIND_ONE";
    InventoryPatterns["INV_UPDATE"] = "INV_UPDATE";
    InventoryPatterns["INV_DELETE"] = "INV_DELETE";
    InventoryPatterns["INV_UPDATE_STOCK"] = "INV_UPDATE_STOCK";
})(InventoryPatterns || (exports.InventoryPatterns = InventoryPatterns = {}));
var SupplierPatterns;
(function (SupplierPatterns) {
    SupplierPatterns["SUP_CREATE"] = "SUP_CREATE";
    SupplierPatterns["SUP_FIND_ALL"] = "SUP_FIND_ALL";
    SupplierPatterns["SUP_FIND_ONE"] = "SUP_FIND_ONE";
    SupplierPatterns["SUP_UPDATE"] = "SUP_UPDATE";
    SupplierPatterns["SUP_DELETE"] = "SUP_DELETE";
})(SupplierPatterns || (exports.SupplierPatterns = SupplierPatterns = {}));
// Clientes
var CustomerPatterns;
(function (CustomerPatterns) {
    CustomerPatterns["CUST_CREATE"] = "CUST_CREATE";
    CustomerPatterns["CUST_FIND_ALL"] = "CUST_FIND_ALL";
    CustomerPatterns["CUST_FIND_ONE"] = "CUST_FIND_ONE";
    CustomerPatterns["CUST_UPDATE"] = "CUST_UPDATE";
    CustomerPatterns["CUST_DELETE"] = "CUST_DELETE";
})(CustomerPatterns || (exports.CustomerPatterns = CustomerPatterns = {}));
var BillingPatterns;
(function (BillingPatterns) {
    BillingPatterns["BILL_CREATE"] = "billing.create";
    BillingPatterns["BILL_RETURN"] = "billing.return";
})(BillingPatterns || (exports.BillingPatterns = BillingPatterns = {}));
